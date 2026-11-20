-- Minimal stand-in for the parts of Supabase our migrations rely on.
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;

create schema auth;
create table auth.users (id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

grant usage on schema public, auth to anon, authenticated, service_role;
-- Newer Supabase projects do NOT grant new tables to anon/authenticated/service_role by default,
-- so migrations must grant explicitly. (An earlier version of this file granted by default and
-- hid exactly that gap until the first live run.)
-- Supabase lets service_role manage auth.users; tests create users to satisfy foreign keys.
grant all on auth.users to service_role;
