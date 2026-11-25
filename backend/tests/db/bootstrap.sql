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

-- Stand-in for Supabase Storage: buckets and objects, with row-level security on objects and the
-- broad grants Supabase gives anon/authenticated (policies, not grants, decide what is allowed).
create schema storage;
create table storage.buckets (
  id text primary key, name text not null, public boolean not null default false,
  file_size_limit bigint, allowed_mime_types text[]
);
create table storage.objects (
  id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets (id),
  name text
);
alter table storage.objects enable row level security;
grant usage on schema storage to anon, authenticated, service_role;
grant select, insert, update, delete on storage.objects to anon, authenticated, service_role;
grant select on storage.buckets to anon, authenticated, service_role;
