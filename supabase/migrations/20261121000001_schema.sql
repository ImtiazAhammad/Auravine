-- Auravine content schema. Translatable text is jsonb {"en": "...", "bn": "..."}:
-- "en" is required and non-blank, "bn" is optional (readers fall back to "en").

create function public.is_bilingual(v jsonb) returns boolean
language sql immutable as $$
  select coalesce(
    jsonb_typeof(v) = 'object'
    and jsonb_typeof(v -> 'en') = 'string'
    and btrim(v ->> 'en') <> ''
    and (not (v ? 'bn') or jsonb_typeof(v -> 'bn') = 'string'),
    false
  )
$$;

create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end
$$;

-- ---------------------------------------------------------------- content tables
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  delivery_status text not null check (delivery_status in ('ongoing', 'completed', 'planned')),
  category text,
  title jsonb not null check (public.is_bilingual(title)),
  description jsonb not null check (public.is_bilingual(description)),
  long_description jsonb check (long_description is null or public.is_bilingual(long_description)),
  details jsonb not null default '{}'::jsonb,
  tech_stack text[] not null default '{}',
  tools text[] not null default '{}',
  hero_image text,
  gallery_images text[] not null default '{}',
  demo_url text,
  repo_url text,
  start_date date,
  end_date date,
  role text,
  team text,
  custom_timeline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  title jsonb not null check (public.is_bilingual(title)),
  excerpt jsonb not null check (public.is_bilingual(excerpt)),
  content jsonb not null check (public.is_bilingual(content)),
  cover_image text,
  published_at date,
  category text,
  tags text[] not null default '{}',
  author_name text,
  read_time_minutes int check (read_time_minutes is null or read_time_minutes > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  question jsonb not null check (public.is_bilingual(question)),
  answer jsonb not null check (public.is_bilingual(answer)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tech_items (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  kind text not null check (kind in ('tech', 'tool', 'hard_skill', 'soft_skill')),
  name text not null check (btrim(name) <> ''),
  icon text,
  category text,
  url text,
  extra jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public: never store secrets here.
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  kind text not null check (kind in ('image', 'video', 'file')),
  source text not null check (source in ('repo', 'storage')),
  alt jsonb check (alt is null or public.is_bilingual(alt)),
  width int,
  height int,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- private tables
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  subject text check (subject is null or char_length(subject) <= 300),
  message text not null check (char_length(message) between 1 and 5000),
  locale text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- updated_at triggers
create trigger set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.faqs
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.tech_items
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();
