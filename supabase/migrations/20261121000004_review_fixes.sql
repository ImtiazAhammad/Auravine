-- Fixes from the Phase 2 review. Earlier migrations are already applied, so this is a new one.

-- 1. Whitespace-only English text (newline, tab, no-break space, zero-width space...) is blank.
--    Also pin the search_path, as Supabase's linter asks.
create or replace function public.is_bilingual(v jsonb) returns boolean
language sql immutable set search_path = '' as $$
  select coalesce(
    pg_catalog.jsonb_typeof(v) = 'object'
    and pg_catalog.jsonb_typeof(v -> 'en') = 'string'
    and pg_catalog.btrim(v ->> 'en', E' \t\r\n\f\v ​⁠﻿') <> ''
    and (not (v ? 'bn') or pg_catalog.jsonb_typeof(v -> 'bn') = 'string'),
    false
  )
$$;

-- 2. Display text that visitors read becomes translatable (existing text becomes {"en": text};
--    blank text becomes NULL). blog_posts.category stays plain text: it is a filter key.
alter table public.projects
  alter column category type jsonb using
    case when nullif(btrim(category), '') is null then null
         else jsonb_build_object('en', category) end,
  alter column role type jsonb using
    case when nullif(btrim(role), '') is null then null
         else jsonb_build_object('en', role) end,
  alter column team type jsonb using
    case when nullif(btrim(team), '') is null then null
         else jsonb_build_object('en', team) end,
  alter column custom_timeline type jsonb using
    case when nullif(btrim(custom_timeline), '') is null then null
         else jsonb_build_object('en', custom_timeline) end,
  add constraint projects_category_bilingual
    check (category is null or public.is_bilingual(category)),
  add constraint projects_role_bilingual
    check (role is null or public.is_bilingual(role)),
  add constraint projects_team_bilingual
    check (team is null or public.is_bilingual(team)),
  add constraint projects_custom_timeline_bilingual
    check (custom_timeline is null or public.is_bilingual(custom_timeline));

alter table public.blog_posts
  alter column author_name type jsonb using
    case when nullif(btrim(author_name), '') is null then null
         else jsonb_build_object('en', author_name) end,
  add constraint blog_posts_author_name_bilingual
    check (author_name is null or public.is_bilingual(author_name));

-- 3. projects.details is {"en": {...}} (later also "bn"): require an English object.
alter table public.projects alter column details set default '{"en": {}}'::jsonb;
update public.projects set details = '{"en": {}}'::jsonb where details = '{}'::jsonb;
alter table public.projects add constraint projects_details_english_object
  check (coalesce(jsonb_typeof(details -> 'en') = 'object', false));
