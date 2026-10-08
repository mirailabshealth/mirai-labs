begin;
create table public.mirai_public_affiliate_applications (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
 full_name text not null check(length(full_name) between 2 and 120),
 email text not null check(length(email) between 3 and 254),
 platform text not null check(platform in ('instagram','tiktok','youtube','facebook','other','website')),
 profile text not null check(length(profile) between 2 and 500),
 statement text not null check(length(statement) between 10 and 1850),
 status text not null default 'pending' check(status in ('pending','approved','rejected','activated')),
 reviewed_at timestamptz, claimed_by uuid references auth.users(id),
 consent_version text not null default '2026-10-08', request_key uuid not null unique
);
alter table public.mirai_public_affiliate_applications enable row level security;
revoke all on public.mirai_public_affiliate_applications from public,anon,authenticated;
grant select on public.mirai_public_affiliate_applications to authenticated;
create policy owner_read on public.mirai_public_affiliate_applications for select to authenticated using(mirai_private.is_admin());
create index on public.mirai_public_affiliate_applications(email,created_at);
create function public.mirai_public_apply(p_name text,p_email text,p_platform text,p_profile text,p_statement text,p_consent boolean,p_key uuid,p_website text default '') returns void language plpgsql security definer set search_path='' as $$
declare e text:=lower(trim(p_email));
begin
 if coalesce(p_website,'')<>'' then return;end if;
 if p_consent is distinct from true then raise exception 'Please accept the application terms.';end if;
 if p_key is null or p_name is null or length(trim(p_name)) not between 2 and 120 or e is null or length(e)>254 or e !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or p_platform is null or p_platform not in ('instagram','tiktok','youtube','facebook','other','website') or p_profile is null or length(trim(p_profile)) not between 2 and 500 or p_statement is null or length(trim(p_statement)) not between 10 and 1850 then raise exception 'Check your name, email, profile and audience details.';end if;
 if trim(p_profile) !~ '^https://[^[:space:]]+$' and (p_platform in ('website','other') or trim(p_profile) !~ '^@?[A-Za-z0-9_.-]{2,100}$') then raise exception 'Enter a valid handle, or a full https:// profile link.';end if;
 -- Serialized, bounded public intake. No anonymous read or update permission.
 perform pg_advisory_xact_lock(834276191);
 if exists(select 1 from public.mirai_public_affiliate_applications where request_key=p_key) then return;end if;
 if (select count(*) from public.mirai_public_affiliate_applications where created_at>now()-interval '1 hour')>=100 then raise exception 'Applications are temporarily busy. Please try again later.';end if;
 -- Same response for duplicate emails; never expose another applicant's details.
 if exists(select 1 from public.mirai_public_affiliate_applications where email=e and created_at>now()-interval '24 hours') then return;end if;
 insert into public.mirai_public_affiliate_applications(full_name,email,platform,profile,statement,request_key) values(trim(p_name),e,p_platform,trim(p_profile),trim(p_statement),p_key);
end $$;
create function public.mirai_review_public_affiliate(p_id uuid,p_approve boolean) returns void language plpgsql security definer set search_path='' as $$
begin
 if not mirai_private.is_admin() then raise exception 'Owner access required.';end if;
 if p_approve is null then raise exception 'Choose a decision.';end if;
 update public.mirai_public_affiliate_applications set status=case when p_approve then 'approved' else 'rejected' end,reviewed_at=now() where id=p_id and status<>'activated';
 if not found then raise exception 'Application not found or already activated.';end if;
 insert into mirai_private.audit_events(actor_id,action,record_id,details) values(auth.uid(),'public_affiliate_review',p_id::text,jsonb_build_object('approved',p_approve));
end $$;
create function public.mirai_public_application_status() returns jsonb language plpgsql security definer set search_path='' as $$
declare e text; r public.mirai_public_affiliate_applications;
begin
 if not mirai_private.verified() then raise exception 'Verify your email and sign in.';end if;
 select lower(email) into e from auth.users where id=auth.uid();
 select * into r from public.mirai_public_affiliate_applications where email=e order by (status='approved') desc,created_at desc limit 1;
 if not found then return null;end if;
 return jsonb_build_object('id',r.id,'status',r.status);
end $$;
create function public.mirai_activate_public_affiliate(p_code text) returns void language plpgsql security definer set search_path='' as $$
declare e text; r public.mirai_public_affiliate_applications; u text;
begin
 if not mirai_private.verified() then raise exception 'Verify your email and sign in.';end if;
 select lower(email) into e from auth.users where id=auth.uid();
 select * into r from public.mirai_public_affiliate_applications where email=e and status='approved' order by created_at desc limit 1 for update;
 if not found then raise exception 'An approved application matching your verified email is required.';end if;
 if exists(select 1 from public.mirai_affiliate_applications where user_id=auth.uid()) then raise exception 'Your account already has an application. Contact support to link your approval.';end if;
 u:=case when r.profile like 'https://%' then r.profile else case r.platform when 'instagram' then 'https://www.instagram.com/' when 'tiktok' then 'https://www.tiktok.com/@' when 'youtube' then 'https://www.youtube.com/@' when 'facebook' then 'https://www.facebook.com/' end || ltrim(r.profile,'@') end;
 insert into public.mirai_affiliate_applications(user_id,profile_url,requested_code,statement,status,reviewed_at) values(auth.uid(),u,upper(trim(p_code)),r.statement,'approved',r.reviewed_at);
 insert into public.mirai_affiliates(user_id,code,active,commission_bps) values(auth.uid(),upper(trim(p_code)),true,500);
 update public.mirai_public_affiliate_applications set status='activated',claimed_by=auth.uid() where id=r.id;
 insert into mirai_private.audit_events(actor_id,action,record_id,details) values(auth.uid(),'public_affiliate_activation',r.id::text,jsonb_build_object('code',upper(trim(p_code))));
end $$;
revoke all on function public.mirai_public_apply(text,text,text,text,text,boolean,uuid,text),public.mirai_review_public_affiliate(uuid,boolean),public.mirai_public_application_status(),public.mirai_activate_public_affiliate(text) from public,anon,authenticated;
grant execute on function public.mirai_public_apply(text,text,text,text,text,boolean,uuid,text) to anon,authenticated;
grant execute on function public.mirai_review_public_affiliate(uuid,boolean),public.mirai_public_application_status(),public.mirai_activate_public_affiliate(text) to authenticated;
commit;

-- Verified transactionally: guest submission, idempotency, anonymous read/review denial, owner review, verified-email activation, permanent code reservation. All test fixtures rolled back.
