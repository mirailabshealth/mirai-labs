-- Backorder support: 15% off backordered lines + approval skips stock reservation.
--
-- WHAT CHANGED
-- 1. mirai_quote(p_items jsonb, p_code text): backordered lines are now kept
--    separate (grouped by compound/size/backorder instead of merging), get an
--    extra 15% off after quantity and affiliate discounts, and carry a
--    backorder flag through to the saved order items.
-- 2. mirai_approve_order(p_order uuid, p_shipping integer, p_tax integer):
--    backordered lines skip stock reservation (nothing to reserve yet) instead
--    of throwing "Insufficient available stock".
--
-- Run in the Supabase SQL editor.

-- 1) Quote: separate backorder lines, 15% off, flag preserved.
create or replace function public.mirai_quote(p_items jsonb, p_code text default ''::text)
returns jsonb
language plpgsql
as $$
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
 for r in select x->>'compound_id' as id,x->>'vial_size' as size,coalesce((x->>'backorder')::boolean,false) as backorder,sum((x->>'quantity')::integer)::integer as quantity from jsonb_array_elements(p_items) x group by 1,2,3 loop
  qty:=r.quantity;
  if qty>999 then raise exception 'Maximum 999 vials per compound and size.'; end if;
  select * into c from public.mirai_catalog where compound_id=r.id and vial_size=r.size and active;
  if not found then raise exception 'A selected size needs price confirmation. Please contact support.'; end if;
  unit_price:=round(c.single_cents * case when qty>=10 then 0.80 when qty>=5 then 0.85 when qty>=3 then 0.95 else 1.00 end);
  if normalized<>'' then unit_price:=round(unit_price*0.95); end if;
  if r.backorder then unit_price:=round(unit_price*0.85); end if;
  total_price:=total_price+unit_price*qty;
  lines:=lines||jsonb_build_array(jsonb_build_object('compound_id',r.id,'vial_size',r.size,'quantity',qty,'unit_cents',unit_price,'total_cents',unit_price*qty,'backorder',r.backorder));
 end loop;
 return jsonb_build_object('items',lines,'total_cents',total_price,'referral_code',normalized);
end
$$;

-- 2) Approval: backordered lines skip stock reservation.
create or replace function public.mirai_approve_order(p_order uuid, p_shipping integer, p_tax integer)
returns void
language plpgsql
security definer
as $$
declare o public.mirai_orders;s mirai_private.commerce_settings;r record;l record;needed integer;take_n integer;free_n integer;
begin
 if not mirai_private.is_admin() then raise exception 'Owner access required.';end if;
 select * into s from mirai_private.commerce_settings where id=1;
 if s.provider<>'manual' and (not s.payments_ready or not s.email_ready) then raise exception 'Payment and email connections must be tested and enabled before approval.';end if;
 if p_shipping is null or p_tax is null or p_shipping<0 or p_tax<0 then raise exception 'Confirm shipping and tax amounts.';end if;
 select * into o from public.mirai_orders where id=p_order for update;
 if not found then raise exception 'Order not found.';end if;
 if o.status='confirmed' then return;end if;
 if o.status<>'requested' or o.shipping_address is null then raise exception 'Order requires a new request with a shipping address.';end if;
 if p_shipping is distinct from mirai_private.standard_shipping(o.product_total_cents) then raise exception 'Shipping must match the standard rate: $15 below $250 after discounts, otherwise free.';end if;
 for r in select * from jsonb_to_recordset(o.items) as x(compound_id text,vial_size text,quantity integer,backorder boolean) order by compound_id,vial_size loop
  perform 1 from public.mirai_catalog where compound_id=r.compound_id and vial_size=r.vial_size and active for update;
  if not found then raise exception 'A requested size is no longer active.';end if;
  if coalesce(r.backorder,false) then continue; end if;
  needed:=r.quantity;
  for l in select * from mirai_private.stock_lots where compound_id=r.compound_id and vial_size=r.vial_size and (expires_on is null or expires_on>current_date) order by expires_on nulls last,created_at,id for update loop
   select l.on_hand-coalesce(sum(quantity),0) into free_n from mirai_private.stock_allocations where lot_id=l.id and state in ('held','committed');
   take_n:=least(needed,free_n);
   if take_n>0 then insert into mirai_private.stock_allocations(order_id,lot_id,quantity,state) values(o.id,l.id,take_n,'held');needed:=needed-take_n;end if;
   exit when needed=0;
  end loop;
  if needed>0 then raise exception 'Insufficient available stock for % (%). No inventory was reserved.',r.compound_id,r.vial_size;end if;
 end loop;
 update public.mirai_orders set status='confirmed',shipping_cents=p_shipping,tax_cents=p_tax,approved_at=now(),expires_at=case when s.provider='manual' then null else now()+make_interval(hours=>s.hold_hours) end where id=o.id;
 if s.provider<>'manual' then perform mirai_private.enqueue(o.id,'create_payment',o.id||':payment');end if;
 insert into mirai_private.audit_events(actor_id,action,record_id) values(auth.uid(),'order_approved',o.id::text);
end
$$;
