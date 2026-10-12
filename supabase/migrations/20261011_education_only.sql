-- Close new commerce and affiliate operations without deleting historical records.
-- Apply separately in Supabase; publishing the static website does NOT apply this.
begin;
create or replace function mirai_private.education_only_guard() returns trigger
language plpgsql set search_path='' as $$
begin
 if TG_OP='INSERT' then
  raise exception 'Mirai Labs is educational only. Sales and affiliate applications are closed.';
 end if;
 if TG_TABLE_NAME='mirai_orders' then
  if new.status='confirmed' and old.status is distinct from new.status then raise exception 'New order approvals are closed.';end if;
 elsif TG_TABLE_NAME in ('mirai_affiliate_applications','mirai_public_affiliate_applications') then
  if new.status in ('approved','activated') and old.status is distinct from new.status then raise exception 'Affiliate approvals and activation are closed.';end if;
 elsif TG_TABLE_NAME='mirai_affiliates' then
  if new.active and not old.active then raise exception 'Affiliate activation is closed.';end if;
 end if;
 return new;
end $$;
revoke all on function mirai_private.education_only_guard() from public,anon,authenticated;
-- Base tables are known from the tracked foundation and guest application migrations.
do $$ declare t text; f record; begin
 foreach t in array array['mirai_orders','mirai_affiliate_applications','mirai_public_affiliate_applications','mirai_affiliates'] loop
  execute format('drop trigger if exists education_only_guard on public.%I',t);
  execute format('create trigger education_only_guard before insert or update on public.%I for each row execute function mirai_private.education_only_guard()',t);
 end loop;
 -- Cover all existing overloads, including older clients. Historical reads and
 -- paid-order fulfillment, reconciliation, refunds and support remain available.
 for f in select p.oid::regprocedure as signature from pg_proc p join pg_namespace n on n.oid=p.pronamespace
 where n.nspname='public' and p.proname in
 ('mirai_request','mirai_request_v2','mirai_quote','mirai_shipping_quote','mirai_apply','mirai_public_apply','mirai_review_affiliate','mirai_review_public_affiliate','mirai_activate_public_affiliate','mirai_approve_order','mirai_test_payment_email') loop
  execute format('revoke all on function %s from public,anon,authenticated',f.signature);
 end loop;
 if to_regclass('mirai_private.commerce_jobs') is not null then
  update mirai_private.commerce_jobs set state='skipped',lease_token=null,lease_until=null,last_error='Education-only closure: payment instructions stopped.'
   where kind in ('manual_payment_instructions','payment_email_test') and state in ('pending','processing','prepared');
 end if;
 if to_regclass('cron.job') is not null then
  perform cron.unschedule(jobid) from cron.job where jobname='mirai-manual-payment-email';
 end if;
end $$;
-- Stop future instruction jobs from becoming sendable even if a worker remains active.
create or replace function mirai_private.education_only_payment_guard() returns trigger
language plpgsql set search_path='' as $$
begin
 if new.kind in ('manual_payment_instructions','payment_email_test') and new.state in ('pending','processing','prepared','sending') then
  if TG_OP='INSERT' then new.state:='skipped';new.last_error:='Education-only closure';
  else raise exception 'Payment instruction delivery is closed.';end if;
 end if;
 return new;
end $$;
revoke all on function mirai_private.education_only_payment_guard() from public,anon,authenticated;
do $$ begin
 if to_regclass('mirai_private.commerce_jobs') is not null then
  execute 'drop trigger if exists education_only_payment_guard on mirai_private.commerce_jobs';
  execute 'create trigger education_only_payment_guard before insert or update on mirai_private.commerce_jobs for each row execute function mirai_private.education_only_payment_guard()';
 end if;
end $$;
commit;
-- A delivery already sent to SMTP cannot be recalled. Review any jobs already
-- marked sending; do not retry them blindly. Do not reset migration history.
