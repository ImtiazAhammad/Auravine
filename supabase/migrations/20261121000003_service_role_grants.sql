-- service_role is the Python backend's identity. Newer Supabase projects do not grant it
-- privileges on new tables automatically, so grant them explicitly. It bypasses row-level
-- security, which is why visitors (anon, authenticated) get none of these writes.

grant all on public.projects, public.blog_posts, public.faqs, public.tech_items,
             public.site_settings, public.media_assets, public.contact_messages,
             public.admin_profiles to service_role;

-- Future tables created by this role get the same grant.
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
