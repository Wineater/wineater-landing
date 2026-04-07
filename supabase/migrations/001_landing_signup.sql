-- ============================================================
-- Migration: landing signup tables, bucket, and RPC function
-- ============================================================

-- ── 1. users table ──────────────────────────────────────────
create table if not exists public.users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.users is 'People who signed up via the landing page.';

-- ── 2. stores table ─────────────────────────────────────────
create table if not exists public.stores (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  name            text not null,
  menu_file_path  text,            -- path inside the menus_raw bucket
  gdpr_consent    boolean not null default false,
  gdpr_consent_at timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.stores is 'Stores / restaurants / bars registered via the landing page.';

-- ── 3. updated_at trigger ───────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

create or replace trigger trg_stores_updated_at
  before update on public.stores
  for each row execute function public.set_updated_at();

-- ── 4. menus_raw storage bucket ─────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'menus_raw',
  'menus_raw',
  false,                          -- private bucket
  10485760,                       -- 10 MB per file
  array['application/pdf', 'text/csv', 'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/png', 'image/jpeg']
)
on conflict (id) do nothing;

-- Allow the service-role key (used by our backend) to upload/read objects
create policy "service role can manage menus_raw"
  on storage.objects
  for all
  to service_role
  using (bucket_id = 'menus_raw')
  with check (bucket_id = 'menus_raw');

-- ── 5. RPC: register_store_with_user ────────────────────────
-- Creates (or reuses) a user by email, then creates their store.
-- Returns the new store id.
create or replace function public.register_store_with_user(
  p_name          text,
  p_email         text,
  p_business_name text,
  p_gdpr_consent  boolean default false,
  p_menu_path     text    default null
)
returns uuid
language plpgsql
security definer          -- runs with owner privileges so anon callers can't bypass RLS
set search_path = public
as $$
declare
  v_user_id  uuid;
  v_store_id uuid;
begin
  -- Upsert user: if the email already exists, reuse the existing user_id
  insert into public.users (id, name, email)
  values (gen_random_uuid(), p_name, p_email)
  on conflict (email) do update set
    name = excluded.name
  returning id into v_user_id;

  -- Create the store
  insert into public.stores (user_id, name, menu_file_path, gdpr_consent, gdpr_consent_at)
  values (
    v_user_id,
    p_business_name,
    p_menu_path,
    p_gdpr_consent,
    case when p_gdpr_consent then now() else null end
  )
  returning id into v_store_id;

  return v_store_id;
end;
$$;

comment on function public.register_store_with_user is
  'Landing page signup: upserts a user by email and creates their store record. Returns the new store id.';

-- Grant execute to the anon role so the API (with anon key) can call it
-- The function is security definer so it writes to tables the anon role cannot access directly.
grant execute on function public.register_store_with_user to anon;
