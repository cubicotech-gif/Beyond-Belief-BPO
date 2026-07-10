-- Beyond Belief BPO — Supabase schema
-- Run this once in the Supabase SQL editor.

-- =============================================================
-- 1. Storage bucket
-- =============================================================
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

-- Public read for the bucket (writes happen via service role from server).
drop policy if exists "Public read site-images" on storage.objects;
create policy "Public read site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');

-- =============================================================
-- 2. site_images — single-slot fixed images keyed by `slot`
-- =============================================================
create table if not exists public.site_images (
  id          uuid primary key default gen_random_uuid(),
  slot        text not null unique,
  url         text not null,
  alt         text,
  storage_path text,
  updated_at  timestamptz not null default now()
);

create index if not exists site_images_slot_idx on public.site_images (slot);

-- =============================================================
-- 3. team_members
-- =============================================================
create table if not exists public.team_members (
  id           uuid primary key default gen_random_uuid(),
  section      text not null check (section in ('core', 'hods', 'permanent')),
  name         text not null,
  role         text not null,
  photo_url    text,
  storage_path text,
  order_index  int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists team_members_section_idx
  on public.team_members (section, order_index);

-- =============================================================
-- 4. gallery_images
-- =============================================================
create table if not exists public.gallery_images (
  id           uuid primary key default gen_random_uuid(),
  url          text not null,
  caption      text,
  storage_path text,
  order_index  int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists gallery_images_order_idx
  on public.gallery_images (order_index);

-- =============================================================
-- 5. contact_submissions — messages from the public contact form
-- =============================================================
create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_idx
  on public.contact_submissions (created_at desc);

-- =============================================================
-- 6. Row Level Security
--    Public site reads via service-role on the server, so we can
--    leave RLS disabled here. If you ever want the anon key to read
--    directly from the browser, enable RLS and add SELECT policies.
-- =============================================================
alter table public.site_images         disable row level security;
alter table public.team_members        disable row level security;
alter table public.gallery_images      disable row level security;
alter table public.contact_submissions disable row level security;
