-- Row-level security. Visitors (anon, authenticated) can only read; every write goes through
-- the Python backend with the service-role key, which bypasses RLS.

alter table public.projects         enable row level security;
alter table public.blog_posts       enable row level security;
alter table public.faqs             enable row level security;
alter table public.tech_items       enable row level security;
alter table public.site_settings    enable row level security;
alter table public.media_assets     enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admin_profiles   enable row level security;

-- Content: only published rows are visible.
create policy "published projects are public" on public.projects
  for select to anon, authenticated using (status = 'published');
create policy "published blog posts are public" on public.blog_posts
  for select to anon, authenticated using (status = 'published');
create policy "published faqs are public" on public.faqs
  for select to anon, authenticated using (status = 'published');
create policy "published tech items are public" on public.tech_items
  for select to anon, authenticated using (status = 'published');

-- Settings and media rows are public by design (no secrets in either).
create policy "site settings are public" on public.site_settings
  for select to anon, authenticated using (true);
create policy "media assets are public" on public.media_assets
  for select to anon, authenticated using (true);

-- contact_messages and admin_profiles: RLS on and no policies, so nothing is visible.

-- Defense in depth: take away table privileges as well, so a mistaken policy cannot open a write.
revoke all on public.contact_messages, public.admin_profiles from anon, authenticated;
revoke all on public.projects, public.blog_posts, public.faqs, public.tech_items,
              public.site_settings, public.media_assets from anon, authenticated;
grant select on public.projects, public.blog_posts, public.faqs, public.tech_items,
                public.site_settings, public.media_assets to anon, authenticated;
