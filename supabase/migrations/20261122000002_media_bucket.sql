-- Phase 5: a public Storage bucket for images uploaded through the admin. Visitors only read
-- (public buckets serve files without policies); uploads happen through signed upload URLs
-- issued by the Python backend, so no insert/update/delete policy exists for anon/authenticated.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 5242880,
  array['image/webp', 'image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/avif']
)
on conflict (id) do nothing;
