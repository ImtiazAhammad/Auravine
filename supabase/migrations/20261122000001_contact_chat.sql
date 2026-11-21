-- Phase 4: contact email status and a Postgres-backed rate limiter.
-- Additive only. Visitors (anon, authenticated) get nothing here; the Python backend uses
-- service_role and must be granted explicitly (see migration 3).

alter table public.contact_messages
  add column emailed_at timestamptz,
  add column email_error text check (email_error is null or char_length(email_error) <= 300);

create table public.rate_limits (
  bucket text not null,
  key text not null,
  window_start timestamptz not null,
  count int not null default 0,
  primary key (bucket, key, window_start)
);

alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from public, anon, authenticated;
grant select, insert, update, delete on public.rate_limits to service_role;

-- true = this call is allowed, false = over the limit for the current window.
create function public.hit_rate_limit(
  p_bucket text, p_key text, p_window_seconds int, p_max int
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window timestamptz;
  v_count int;
begin
  if p_window_seconds < 1 or p_max < 1 then
    raise exception 'window and max must be positive';
  end if;
  v_window := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

  insert into rate_limits as r (bucket, key, window_start, count)
  values (p_bucket, p_key, v_window, 1)
  on conflict (bucket, key, window_start) do update set count = r.count + 1
  returning r.count into v_count;

  -- Cheap housekeeping so the table never grows without bound.
  delete from rate_limits where window_start < now() - interval '2 days';

  return v_count <= p_max;
end
$$;

revoke all on function public.hit_rate_limit(text, text, int, int) from public, anon, authenticated;
grant execute on function public.hit_rate_limit(text, text, int, int) to service_role;
