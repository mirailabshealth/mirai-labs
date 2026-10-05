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
-- READS FROM
-- The owner inventory lots table. The owner RPC mirai_inventory() returns
-- lots with (id, compound_id, vial_size, batch, on_hand, reserved,
-- available, expires_on, low_stock, coa_url); this function aggregates the
-- same underlying table for verified customers, exposing only totals.
--
-- !!! VERIFY THE TABLE NAME BEFORE RUNNING !!!
-- This assumes the lots table is mirai_private.inventory_lots. Check in the
-- dashboard: Table Editor -> schema dropdown -> mirai_private -> confirm the
-- lots table name. If it differs, replace it in the query below before
-- running. A wrong name fails loudly at creation time ("relation does not
-- exist") and changes nothing.
--
-- HOW TO RUN
-- Supabase dashboard -> SQL editor -> paste -> Run.

create or replace function public.mirai_catalog_stock()
returns table (
  compound_id text,
  vial_size text,
  available integer
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  -- Same gate as the catalog itself: verified customers only.
  if not mirai_private.verified() then
    raise exception 'Please verify your email and sign in.';
  end if;

  return query
  select
    l.compound_id,
    l.vial_size,
    sum(greatest(l.on_hand - coalesce(l.reserved, 0), 0))::integer as available
  from mirai_private.inventory_lots as l
  where l.expires_on is null
     or l.expires_on > current_date
  group by l.compound_id, l.vial_size;
end;
$$;

revoke all on function public.mirai_catalog_stock() from public, anon;
grant execute on function public.mirai_catalog_stock() to authenticated;
