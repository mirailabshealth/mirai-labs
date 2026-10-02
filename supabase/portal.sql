-- Applied to project qymwaujpaxbmeohcmueh on 2026-10-02. Run once on a new database.
-- Customer prices are managed in mirai_catalog, not included in this public migration.
-- Mirai Labs portal foundation. No supplier costs, passwords or service keys.
-- All application writes will use reviewed server functions in a later migration.
-- No browser role can modify approvals, prices, orders or commission records.
begin;
create schema if not exists mirai_private;
revoke all on schema mirai_private from public, anon, authenticated;
create table public.mirai_profiles (
 user_id uuid primary key references auth.users(id),
 display_name text not null check (length(display_name) between 1 and 120),
 created_at timestamptz not null default now()
);
create table mirai_private.administrators (
 user_id uuid primary key references auth.users(id),
 created_at timestamptz not null default now()
);
create table public.mirai_catalog (
 compound_id text not null,
 vial_size text not null,
 single_cents integer not null check(single_cents > 0),
 active boolean not null default true,
 primary key(compound_id,vial_size)
);
create table public.mirai_affiliate_applications (
 user_id uuid primary key references auth.users(id),
 profile_url text not null check(length(profile_url) between 8 and 500),
 requested_code text not null check(requested_code ~ '^[A-Z0-9_-]{3,24}$'),
 statement text not null check(length(statement) between 1 and 2000),
 status text not null default 'pending' check(status in ('pending','approved','rejected')),
 created_at timestamptz not null default now(),
 reviewed_at timestamptz
);
create table public.mirai_affiliates (
 user_id uuid primary key references auth.users(id),
 code text not null unique check(code ~ '^[A-Z0-9_-]{3,24}$'),
 active boolean not null default false,
 commission_bps integer not null default 500 check(commission_bps between 500 and 2000),
 approved_at timestamptz not null default now()
);
create table public.mirai_orders (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 request_key uuid not null,
 items jsonb not null check(jsonb_typeof(items)='array'),
 product_total_cents integer not null check(product_total_cents > 0),
 affiliate_id uuid references public.mirai_affiliates(user_id),
 referral_code text,
 status text not null default 'requested' check(status in ('requested','confirmed','paid','shipped','cancelled','refunded')),
 notes text not null default '' check(length(notes)<=2000),
 created_at timestamptz not null default now(),
 unique(user_id,request_key),
 check(affiliate_id is null or affiliate_id <> user_id)
);
create index on public.mirai_orders(user_id,created_at desc);
create index on public.mirai_orders(affiliate_id,created_at desc);
create table public.mirai_commissions (
 order_id uuid primary key references public.mirai_orders(id),
 affiliate_id uuid not null references public.mirai_affiliates(user_id),
 eligible_revenue_cents integer not null check(eligible_revenue_cents>=0),
 commission_bps integer not null check(commission_bps between 500 and 2000),
 amount_cents integer not null check(amount_cents>=0),
 status text not null default 'pending' check(status in ('pending','payable','paid','reversed')),
 created_at timestamptz not null default now()
);
create index on public.mirai_commissions(affiliate_id);
create table mirai_private.audit_events (
 id bigint generated always as identity primary key,
 actor_id uuid references auth.users(id),
 action text not null,
 record_id text not null,
 details jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
-- RLS is enabled explicitly even if the project has automatic RLS enabled.
alter table public.mirai_profiles enable row level security;
alter table public.mirai_catalog enable row level security;
alter table public.mirai_affiliate_applications enable row level security;
alter table public.mirai_affiliates enable row level security;
alter table public.mirai_orders enable row level security;
alter table public.mirai_commissions enable row level security;
alter table mirai_private.administrators enable row level security;
alter table mirai_private.audit_events enable row level security;
-- Deny by default until portal endpoints and access tests are deployed.
revoke all on public.mirai_profiles, public.mirai_catalog,
 public.mirai_affiliate_applications, public.mirai_affiliates,
 public.mirai_orders, public.mirai_commissions from public, anon, authenticated;
revoke all on all tables in schema mirai_private from public, anon, authenticated;
revoke all on all sequences in schema mirai_private from public, anon, authenticated;
commit;
begin;
create function mirai_private.verified() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users where id=auth.uid() and email_confirmed_at is not null and coalesce(is_anonymous,false)=false)
$$;
create function mirai_private.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select mirai_private.verified() and exists(select 1 from mirai_private.administrators where user_id=auth.uid())
$$;
revoke all on function mirai_private.verified(), mirai_private.is_admin() from public, anon;
grant usage on schema mirai_private to authenticated;
grant execute on function mirai_private.verified(), mirai_private.is_admin() to authenticated;
create policy profiles_read on public.mirai_profiles for select to authenticated using(mirai_private.verified() and (user_id=auth.uid() or mirai_private.is_admin()));
create policy catalog_read on public.mirai_catalog for select to authenticated using(mirai_private.verified() and active);
create policy applications_read on public.mirai_affiliate_applications for select to authenticated using(mirai_private.verified() and (user_id=auth.uid() or mirai_private.is_admin()));
create policy affiliates_read on public.mirai_affiliates for select to authenticated using(mirai_private.verified() and (user_id=auth.uid() or mirai_private.is_admin()));
create policy orders_read on public.mirai_orders for select to authenticated using(mirai_private.verified() and (user_id=auth.uid() or mirai_private.is_admin()));
create policy commissions_read on public.mirai_commissions for select to authenticated using(mirai_private.verified() and (affiliate_id=auth.uid() or mirai_private.is_admin()));
grant select on public.mirai_profiles,public.mirai_catalog,public.mirai_affiliate_applications,public.mirai_affiliates,public.mirai_orders,public.mirai_commissions to authenticated;

create function public.mirai_account(p_name text default null) returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if not mirai_private.verified() then raise exception 'Please verify your email and sign in.'; end if;
 if p_name is not null then
  insert into public.mirai_profiles(user_id,display_name) values(auth.uid(),trim(p_name)) on conflict(user_id) do update set display_name=excluded.display_name;
 end if;
 return jsonb_build_object('admin',mirai_private.is_admin(),'profile',(select to_jsonb(p) from public.mirai_profiles p where user_id=auth.uid()),'affiliate',(select to_jsonb(a) from public.mirai_affiliates a where user_id=auth.uid()),'application',(select to_jsonb(a) from public.mirai_affiliate_applications a where user_id=auth.uid()));
end $$;
create function public.mirai_apply(p_profile_url text,p_code text,p_statement text) returns void language plpgsql security definer set search_path='' as $$
begin
 if not mirai_private.verified() then raise exception 'Please verify your email and sign in.'; end if;
 if p_profile_url !~ '^https://' then raise exception 'Use an https profile URL.'; end if;
 insert into public.mirai_affiliate_applications(user_id,profile_url,requested_code,statement) values(auth.uid(),p_profile_url,upper(trim(p_code)),p_statement);
end $$;
-- Prices, quantity discounts and referral eligibility are calculated on the server.
create function public.mirai_quote(p_items jsonb,p_code text default '') returns jsonb language plpgsql security definer set search_path='' as $$
declare r record; c public.mirai_catalog; a public.mirai_affiliates; unit_price integer; qty integer; total_price integer:=0; lines jsonb:='[]'::jsonb; normalized text:=upper(trim(coalesce(p_code,'')));
begin
 if not mirai_private.verified() then raise exception 'Please verify your email and sign in.'; end if;
 if jsonb_typeof(p_items) is distinct from 'array' or jsonb_array_length(p_items) not between 1 and 100 then raise exception 'Choose between 1 and 100 items.'; end if;
 if exists(select 1 from jsonb_array_elements(p_items) x where jsonb_typeof(x->'quantity') is distinct from 'number' or (x->>'quantity') !~ '^[0-9]{1,3}$' or (x->>'quantity')::integer < 1) then raise exception 'Quantities must be whole numbers from 1 to 999.'; end if;
 if normalized<>'' then
  select * into a from public.mirai_affiliates where code=normalized and active;
  if not found then raise exception 'Referral code is not active.'; end if;
  if a.user_id=auth.uid() then raise exception 'Your referral code cannot be used for your own purchases.'; end if;
 end if;
 for r in select x->>'compound_id' as id,x->>'vial_size' as size,sum((x->>'quantity')::integer)::integer as quantity from jsonb_array_elements(p_items) x group by 1,2 loop
  qty:=r.quantity;
  if qty>999 then raise exception 'Maximum 999 vials per compound and size.'; end if;
  select * into c from public.mirai_catalog where compound_id=r.id and vial_size=r.size and active;
  if not found then raise exception 'A selected size needs price confirmation. Please contact support.'; end if;
  unit_price:=round(c.single_cents * case when qty>=10 then 0.80 when qty>=5 then 0.85 when qty>=3 then 0.95 else 1.00 end);
  if normalized<>'' then unit_price:=round(unit_price*0.95); end if;
  total_price:=total_price+unit_price*qty;
  lines:=lines||jsonb_build_array(jsonb_build_object('compound_id',r.id,'vial_size',r.size,'quantity',qty,'unit_cents',unit_price,'total_cents',unit_price*qty));
 end loop;
 return jsonb_build_object('items',lines,'total_cents',total_price,'referral_code',normalized);
end $$;
create function public.mirai_request(p_items jsonb,p_code text,p_notes text,p_request_key uuid) returns uuid language plpgsql security definer set search_path='' as $$
declare q jsonb; order_id uuid; partner uuid;
begin
 if not mirai_private.verified() then raise exception 'Please verify your email and sign in.'; end if;
 select id into order_id from public.mirai_orders where user_id=auth.uid() and request_key=p_request_key;
 if found then return order_id; end if;
 if not exists(select 1 from public.mirai_profiles where user_id=auth.uid()) then raise exception 'Save your name in Account first.'; end if;
 q:=public.mirai_quote(p_items,p_code);
 select user_id into partner from public.mirai_affiliates where code=q->>'referral_code' and active;
 insert into public.mirai_orders(user_id,request_key,items,product_total_cents,affiliate_id,referral_code,notes) values(auth.uid(),p_request_key,q->'items',(q->>'total_cents')::integer,partner,nullif(q->>'referral_code',''),coalesce(p_notes,'')) returning id into order_id;
 return order_id;
end $$;
create function public.mirai_review_affiliate(p_user_id uuid,p_approve boolean,p_code text,p_commission_bps integer default 500) returns void language plpgsql security definer set search_path='' as $$
begin
 if not mirai_private.is_admin() then raise exception 'Owner access required.'; end if;
 perform 1 from public.mirai_affiliate_applications where user_id=p_user_id for update;
 if not found then raise exception 'Application not found.'; end if;
 if p_approve then
  insert into public.mirai_affiliates(user_id,code,active,commission_bps) values(p_user_id,upper(trim(p_code)),true,p_commission_bps) on conflict(user_id) do update set code=excluded.code,active=true,commission_bps=excluded.commission_bps;
 else update public.mirai_affiliates set active=false where user_id=p_user_id;
 end if;
 update public.mirai_affiliate_applications set status=case when p_approve then 'approved' else 'rejected' end,reviewed_at=now() where user_id=p_user_id;
 insert into mirai_private.audit_events(actor_id,action,record_id,details) values(auth.uid(),'affiliate_review',p_user_id::text,jsonb_build_object('approved',p_approve,'commission_bps',p_commission_bps));
end $$;
create function public.mirai_order_status(p_order_id uuid,p_status text) returns void language plpgsql security definer set search_path='' as $$
declare o public.mirai_orders; rate integer;
begin
 if not mirai_private.is_admin() then raise exception 'Owner access required.'; end if;
 select * into o from public.mirai_orders where id=p_order_id for update;
 if not found then raise exception 'Request not found.'; end if;
 if o.status=p_status then return; end if;
 if not ((o.status='requested' and p_status in ('confirmed','cancelled')) or (o.status='confirmed' and p_status in ('paid','cancelled')) or (o.status='paid' and p_status in ('shipped','refunded')) or (o.status='shipped' and p_status='refunded')) then raise exception 'Invalid status transition.'; end if;
 if p_status='paid' and o.affiliate_id is not null then
  select commission_bps into rate from public.mirai_affiliates where user_id=o.affiliate_id;
  insert into public.mirai_commissions(order_id,affiliate_id,eligible_revenue_cents,commission_bps,amount_cents,status) values(o.id,o.affiliate_id,o.product_total_cents,rate,round(o.product_total_cents*rate::numeric/10000),'payable');
 elsif p_status='refunded' then
  update public.mirai_commissions set status='reversed' where order_id=o.id;
 end if;
 update public.mirai_orders set status=p_status where id=o.id;
 insert into mirai_private.audit_events(actor_id,action,record_id,details) values(auth.uid(),'order_status',o.id::text,jsonb_build_object('from',o.status,'to',p_status));
end $$;
-- No client-supplied role, code activation, commission amount or product price is trusted.
revoke all on function public.mirai_account(text),public.mirai_apply(text,text,text),public.mirai_quote(jsonb,text),public.mirai_request(jsonb,text,text,uuid),public.mirai_review_affiliate(uuid,boolean,text,integer),public.mirai_order_status(uuid,text) from public,anon;
grant execute on function public.mirai_account(text),public.mirai_apply(text,text,text),public.mirai_quote(jsonb,text),public.mirai_request(jsonb,text,text,uuid),public.mirai_review_affiliate(uuid,boolean,text,integer),public.mirai_order_status(uuid,text) to authenticated;
commit;
