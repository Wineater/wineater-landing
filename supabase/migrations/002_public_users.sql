-- ============================================================
-- Migration: simple landing signups table
-- ============================================================

create table if not exists public.public_users (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  business_name   text not null,
  menu_file_path  text,
  gdpr_consent    boolean not null default false,
  created_at      timestamptz not null default now()
);

comment on table public.public_users is 'Landing page signups — one row per form submission.';

-- Allow service role to read/write
grant all on table public.public_users to service_role;
