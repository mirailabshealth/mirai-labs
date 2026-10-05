-- mirai_catalog_stock()
-- Customer-safe stock lookup for the catalog's out-of-stock badges (portal.html).
--
-- WHAT IT DOES
-- Returns one row per (compound_id, vial_size) with the total AVAILABLE vials
-- across unexpired lots. The portal calls it on every catalog render and
-- refreshes every 60 seconds, so "Out of stock" badges appear/disappear
-- automatically as inventory changes. Until this function exists, the
-- portal degrades gracefully (no badges, current behavior).
--
-- ASSUMPTIONS — verify before running
-- 1. Inventory lots live in public.mirai_lots. If your lots table has a
--    different name, replace "mirai_lots" below.
-- 2. The table has columns: compound_id, vial_size, available, expires_on.
--    If "available" is not a real column (computed in the owner RPC instead),
--    replace sum(l.available) with sum(l.on_hand - l.reserved).
--
-- HOW TO RUN
-- Supabase dashboard -> SQL editor -> paste -> Run. Or: supabase db push
-- if you use the CLI workflow.

create or replace function public.mirai_catalog_stock()
returns table (
  compound_id text,
  vial_size text,
  available integer
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  -- Same gate as the catalog itself: verified customers only.
  if not mirai_private.verified() then
    raise exception 'not verified';
  end if;

  return query
  select
    l.compound_id,
    l.vial_size,
    sum(l.available)::integer as available
  from public.mirai_lots as l
  where l.expires_on is null
     or l.expires_on > current_date
  group by l.compound_id, l.vial_size;
end;
$$;

revoke all on function public.mirai_catalog_stock() from public, anon;
grant execute on function public.mirai_catalog_stock() to authenticated;
