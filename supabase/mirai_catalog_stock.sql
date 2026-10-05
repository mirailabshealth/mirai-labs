-- mirai_catalog_stock()
-- Customer-safe stock lookup for the catalog's out-of-stock badges (portal.html).
--
-- WHAT IT DOES
-- Returns one row per ACTIVE (compound_id, vial_size) in the catalog with the
-- total AVAILABLE vials across unexpired lots. Items with no lots recorded
-- (or only expired/fully-reserved lots) come back as 0, so the portal shows
-- "Out of stock" for anything with no inventory. The portal calls it on every
-- catalog render and refreshes every 60 seconds, so badges appear/disappear
-- automatically as inventory changes. Until this function exists, the portal
-- degrades gracefully (no badges).
--
-- HOW AVAILABLE IS COMPUTED
-- Mirrors the owner mirai_inventory() RPC exactly: per lot,
--   reserved  = sum(stock_allocations.quantity) where state in ('held','committed')
--   available = on_hand - reserved   (floored at 0 here)
-- Only unexpired lots (expires_on is null or in the future) count.
-- Verified against the live database 2026-10-05: stock_lots has
-- (id, compound_id, vial_size, batch, coa_url, expires_on, on_hand,
--  low_stock, created_at) -- there is NO reserved column on the table.
--
-- SECURITY
-- SECURITY DEFINER so it can read the private lots tables; the
-- mirai_private.verified() gate means only signed-in, email-verified
-- customers can call it (same gate as the catalog itself). EXECUTE is
-- granted to `authenticated` only. It exposes totals per compound/size --
-- no lot-level detail, no costs, no customer data.
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
  with lot_avail as (
    -- Per-lot available, same formula as mirai_inventory().
    select
      l.id as lot_id,
      l.compound_id as cid,
      l.vial_size as vsz,
      greatest(
        l.on_hand - coalesce(sum(a.quantity) filter (where a.state in ('held','committed')), 0),
        0
      )::integer as avail
    from mirai_private.stock_lots as l
    left join mirai_private.stock_allocations as a on a.lot_id = l.id
    where l.expires_on is null
       or l.expires_on > current_date
    group by l.id, l.compound_id, l.vial_size, l.on_hand
  ),
  agg as (
    -- Total available per compound/size across unexpired lots.
    select
      la.cid as acid,
      la.vsz as avsz,
      sum(la.avail)::integer as total_avail
    from lot_avail as la
    group by la.cid, la.vsz
  )
  -- Every active catalog item gets a row; missing lots mean zero available.
  select
    c.compound_id,
    c.vial_size,
    coalesce(g.total_avail, 0) as available
  from (
    select distinct cat.compound_id, cat.vial_size
    from public.mirai_catalog as cat
    where cat.active is not false
  ) as c
  left join agg as g
    on g.acid = c.compound_id
   and g.avsz = c.vial_size;
end;
$$;

revoke all on function public.mirai_catalog_stock() from public, anon;
grant execute on function public.mirai_catalog_stock() to authenticated;
