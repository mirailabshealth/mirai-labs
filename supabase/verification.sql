-- Mirai Labs portal verification, 2026-10-02. Passed on the hosted project.
-- Run only against a development/test environment when reusing these fixtures.
-- Each block rolls back every temporary account, request and commission.
-- Launch checklist:
-- 1. Connect and test custom SMTP with verified-email authentication retained.
-- 2. Create the owner account; verify its email before granting owner access.
--    Bootstrap only the explicitly confirmed owner UID in mirai_private.administrators.
--    Never assign owner access to the first signup or from user metadata.
-- 3. Test signup, confirmation, recovery and each role through the portal UI.
-- 4. Migrate legacy public pricing pages to authenticated catalog access and remove
--    public price arrays before claiming site-wide account-only pricing.
-- 5. Enable registrationOpen in portal.html only after the above tests pass.
-- 6. Add portal navigation and replace the legacy affiliate application form.
-- 7. Connect request notifications; do not promise automated emails before delivery works.
-- Commission sales thresholds and payout terms still require owner decisions.
-- No automatic payouts or payment checkout are implemented.
-- Current schema and public preview are installed; public registration is closed.

-- Transactional fixtures only. Nothing persists; no emails or real accounts created.
begin;
insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,aud,role) values
('00000000-0000-4000-8000-000000000101','mirai-client-test@example.invalid',now(),'{}','{}','authenticated','authenticated'),
('00000000-0000-4000-8000-000000000102','mirai-affiliate-test@example.invalid',now(),'{}','{}','authenticated','authenticated'),
('00000000-0000-4000-8000-000000000103','mirai-unverified-test@example.invalid',null,'{}','{}','authenticated','authenticated');
insert into public.mirai_affiliates(user_id,code,active,commission_bps) values('00000000-0000-4000-8000-000000000102','MIRAITEST',true,2000);
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000101',true);
set local role authenticated;
do $$ declare c record; qty integer; partner text; actual jsonb; unit_price integer; count_cases integer:=0; first_id uuid; begin
 perform public.mirai_account('Temporary test');
 for c in select * from public.mirai_catalog loop
  foreach qty in array array[1,2,3,4,5,9,10,999] loop
   foreach partner in array array['','MIRAITEST'] loop
    actual:=public.mirai_quote(jsonb_build_array(jsonb_build_object('compound_id',c.compound_id,'vial_size',c.vial_size,'quantity',qty)),partner);
    unit_price:=round(c.single_cents*case when qty>=10 then 0.80 when qty>=5 then 0.85 when qty>=3 then 0.95 else 1.00 end);
    if partner<>'' then unit_price:=round(unit_price*0.95); end if;
    assert (actual->>'total_cents')::integer=unit_price*qty,'Price mismatch';
    count_cases:=count_cases+1;
   end loop;
  end loop;
 end loop;
 assert count_cases=1632,'Expected 102 sizes x 8 quantities x 2 code states';
 first_id:=public.mirai_request('[{"compound_id":"tesamorelin","vial_size":"20 mg/vial","quantity":10}]','MIRAITEST','Temporary test','00000000-0000-4000-8000-000000000111');
 assert first_id=public.mirai_request('[{"compound_id":"tesamorelin","vial_size":"20 mg/vial","quantity":10}]','MIRAITEST','Temporary test','00000000-0000-4000-8000-000000000111'),'Duplicate request';
 assert (select product_total_cents from public.mirai_orders where id=first_id)=114000,'Stacked Tesa total';
 begin perform public.mirai_order_status(first_id,'paid'); raise exception 'Owner restriction failed'; exception when raise_exception then if sqlerrm <> 'Owner access required.' then raise; end if; end;
 begin update public.mirai_affiliates set commission_bps=2000; raise exception 'Direct write restriction failed'; exception when insufficient_privilege then null; end;
 begin perform public.mirai_quote('[{"compound_id":"tesamorelin","vial_size":"20 mg/vial","quantity":10}]','INVALID'); raise exception 'Invalid code accepted'; exception when raise_exception then if sqlerrm <> 'Referral code is not active.' then raise; end if; end;
end $$;
reset role;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000102',true);
set local role authenticated;
do $$ begin
 assert (select count(*) from public.mirai_orders)=0,'Other client orders exposed';
 begin perform public.mirai_quote('[{"compound_id":"tesamorelin","vial_size":"20 mg/vial","quantity":10}]','MIRAITEST'); raise exception 'Self-referral accepted'; exception when raise_exception then if sqlerrm <> 'Your referral code cannot be used for your own purchases.' then raise; end if; end;
end $$;
reset role;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000103',true);
set local role authenticated;
do $$ begin assert (select count(*) from public.mirai_catalog)=0,'Unverified pricing exposed'; end $$;
reset role;
set local role anon;
do $$ begin
 begin perform count(*) from public.mirai_catalog; raise exception 'Anonymous catalog exposed'; exception when insufficient_privilege then null; end;
 begin perform public.mirai_account(null); raise exception 'Anonymous RPC exposed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
select 'PASS: 1,632 price cases; stacked discount; duplicate prevention; owner restrictions; cross-account privacy; invalid/self-referral rejection; unverified and anonymous denied. Fixtures rolled back.' as result;

begin;
insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,aud,role) values
('00000000-0000-4000-8000-000000000101','mirai-owner-test@example.invalid',now(),'{}','{}','authenticated','authenticated'),
('00000000-0000-4000-8000-000000000102','mirai-partner-test@example.invalid',now(),'{}','{}','authenticated','authenticated');
insert into mirai_private.administrators(user_id) values('00000000-0000-4000-8000-000000000101');
insert into public.mirai_affiliate_applications(user_id,profile_url,requested_code,statement) values('00000000-0000-4000-8000-000000000102','https://example.invalid','MIRAITEST','Temporary test');
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000101',true);
set local role authenticated;
do $$ declare id uuid; begin
 perform public.mirai_account('Temporary owner');
 perform public.mirai_review_affiliate('00000000-0000-4000-8000-000000000102',true,'MIRAITEST',2000);
 id:=public.mirai_request('[{"compound_id":"tesamorelin","vial_size":"20 mg/vial","quantity":10}]','MIRAITEST','','00000000-0000-4000-8000-000000000111');
 assert (select count(*) from public.mirai_commissions where order_id=id)=0,'Unpaid commission created';
 perform public.mirai_order_status(id,'confirmed');
 perform public.mirai_order_status(id,'paid');
 perform public.mirai_order_status(id,'paid');
 assert (select count(*) from public.mirai_commissions where order_id=id)=1,'Duplicate commission';
 assert (select amount_cents from public.mirai_commissions where order_id=id)=22800,'Expected 20% of $1140';
 perform public.mirai_order_status(id,'refunded');
 assert (select status from public.mirai_commissions where order_id=id)='reversed','Refund not reversed';
 perform public.mirai_review_affiliate('00000000-0000-4000-8000-000000000102',false,'',500);
 assert (select active from public.mirai_affiliates where code='MIRAITEST')=false,'Partner deactivation failed';
end $$;
reset role;
rollback;
select 'PASS: owner approval, 20% commission on final discounted product revenue, paid-only accrual, idempotent payment update, refund reversal and affiliate deactivation. Fixtures rolled back.' as result;
