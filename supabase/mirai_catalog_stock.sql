-- mirai_catalog_stock()
-- Customer-safe stock lookup for the catalog's out-of-stock badges (portal.html).
--
-- WHAT IT DOES
-- Returns one row per ACTIVE (compound_id, vial_size) in the catalog with the
-- total AVAILABLE vials across unexpired lots. Items with no lots recorded
-- (or only expired/fully-reserved lots) come back as 0, so the portal shows
-- "Out of stock" for anything with no inventory -- exactly what the badge is
-- for. The portal calls it on every catalog render and refreshes every
-- 60 seconds, so badges appear/disappear automatically as inventory changes.
-- Until this function exists, the portal degrades gracefully (no badges).
--
-- READS FROM
-- The owner inventory lots table (mirai_private.stock_lots, confirmed in the
-- dashboard Table Editor). The owner RPC mirai_inventory() returns lots with
-- (id, compound_id, vial_size, batch, on_hand, reserved, available,
-- expires_on, low_stock, coa_url); this function aggregates the same
-- underlying table for verified customers, exposing only totals.
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
  with lot_stock as (
    select
      l.compound_id as cid,
      l.vial_size as vsz,
      sum(greatest(l.on_hand - coalesce(l.reserved, 0), 0))::integer as avail
    from mirai_private.stock_lots as l
    where l.expires_on is null
       or l.expires_on > current_date
    group by l.compound_id, l.vial_size
  )
  -- Every active catalog item gets a row; missing lots mean zero available.
  select
    c.compound_id,
    c.vial_size,
    coalesce(s.avail, 0) as available
  from (
    select distinct cat.compound_id, cat.vial_size
    from public.mirai_catalog as cat
    where cat.active is not false
  ) as c
  left join lot_stock as s
    on s.cid = c.compound_id
   and s.vsz = c.vial_size;
end;
$$;

revoke all on function public.mirai_catalog_stock() from public, anon;
grant execute on function public.mirai_catalog_stock() to authenticated;
