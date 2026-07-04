create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  plan text default 'Free',
  created_at timestamptz default now()
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null default 'Reference Resume',
  resume_text text not null,
  parsed_profile jsonb default '{}'::jsonb,
  is_reference boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.verified_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  behavior text not null,
  answer_text text,
  verified_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  company text not null,
  title text not null,
  source text,
  location text,
  salary text,
  url text,
  description text,
  match_score integer default 0,
  status text default 'Prepared',
  mode text default 'Review Mode',
  created_at timestamptz default now()
);

create table if not exists public.resume_variants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade,
  filename text not null,
  content text not null,
  match_score integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.verified_answers enable row level security;
alter table public.jobs enable row level security;
alter table public.resume_variants enable row level security;
alter table public.audit_logs enable row level security;

create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users read own resumes" on public.resumes for select using (auth.uid() = user_id);
create policy "Users write own resumes" on public.resumes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own verified answers" on public.verified_answers for select using (auth.uid() = user_id);
create policy "Users write own verified answers" on public.verified_answers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own jobs" on public.jobs for select using (auth.uid() = user_id);
create policy "Users write own jobs" on public.jobs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own variants" on public.resume_variants for select using (auth.uid() = user_id);
create policy "Users write own variants" on public.resume_variants for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own logs" on public.audit_logs for select using (auth.uid() = user_id);
create policy "Users write own logs" on public.audit_logs for insert with check (auth.uid() = user_id);
