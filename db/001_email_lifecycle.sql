-- Dedicated website data. No assessment answers, scores, or written evidence.
begin;
create table if not exists ng_email_contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  name text not null,
  verified_at timestamptz,
  marketing_opt_in boolean not null default false,
  consent_version text,
  preference_version uuid not null default gen_random_uuid(),
  crm_synced_version uuid,
  crm_person_id uuid,
  crm_note_id uuid,
  crm_target_id uuid,
  crm_sync_uncertain boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists ng_email_requests (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references ng_email_contacts(id) on delete cascade,
  token_hash text not null unique,
  name text not null,
  reminder_requested boolean not null,
  marketing_requested boolean not null,
  due_at timestamptz not null default now() + interval '75 days',
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '48 hours',
  confirmed_at timestamptz,
  revoked_at timestamptz
);
create table if not exists ng_email_reminders (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references ng_email_contacts(id) on delete cascade,
  request_id uuid not null unique references ng_email_requests(id) on delete cascade,
  due_at timestamptz not null,
  status text not null default 'pending' check(status in ('pending','processing','accepted','cancelled','uncertain')),
  claimed_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);
create unique index if not exists ng_one_active_reminder on ng_email_reminders(contact_id) where status in ('pending','processing');
create index if not exists ng_due_reminders on ng_email_reminders(due_at) where status = 'pending';
create index if not exists ng_email_requests_contact on ng_email_requests(contact_id);
create table if not exists ng_email_rate_limits (
  key text primary key,
  count integer not null,
  expires_at timestamptz not null
);
-- All access is through the private server connection, never a public Data API.
revoke all on ng_email_contacts, ng_email_requests, ng_email_reminders, ng_email_rate_limits from public;
commit;
