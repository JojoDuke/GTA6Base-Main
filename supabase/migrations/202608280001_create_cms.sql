-- GTA6Base CMS schema.
-- Paste this entire file into the Supabase SQL Editor and run it.

create extension if not exists pgcrypto;

create type public.article_status as enum ('draft', 'published');

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  excerpt text not null,
  category text not null,
  tag text,
  body jsonb not null default '[]'::jsonb,
  image_path text,
  image_alt text not null default '',
  status public.article_status not null default 'draft',
  published_at timestamptz,
  featured_order smallint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_slug_not_blank check (char_length(trim(slug)) > 0),
  constraint articles_category_check
    check (category in ('News', 'Character', 'Vehicle', 'Location')),
  constraint articles_featured_order_check
    check (featured_order is null or featured_order between 1 and 3)
);

create unique index articles_slug_key on public.articles (slug);
create unique index articles_featured_order_key
  on public.articles (featured_order)
  where featured_order is not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_set_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.articles enable row level security;

create policy "Users can read their own admin row"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

create policy "Published articles are public"
on public.articles
for select
to anon, authenticated
using (status = 'published');

create policy "Admins can read all articles"
on public.articles
for select
to authenticated
using (public.is_admin());

create policy "Admins can insert articles"
on public.articles
for insert
to authenticated
with check (public.is_admin());

create policy "Admins can update articles"
on public.articles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can delete articles"
on public.articles
for delete
to authenticated
using (public.is_admin());

grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;
grant select on public.admin_users to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-images',
  'article-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

create policy "Admins can upload article images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'article-images'
  and public.is_admin()
);

create policy "Admins can update article images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'article-images'
  and public.is_admin()
)
with check (
  bucket_id = 'article-images'
  and public.is_admin()
);

create policy "Admins can delete article images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'article-images'
  and public.is_admin()
);

create policy "Admins can list article images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'article-images'
  and public.is_admin()
);

-- After you create your Auth user, run this with your UUID:
-- insert into public.admin_users (user_id)
-- values ('PASTE-YOUR-AUTH-USER-UUID-HERE');
