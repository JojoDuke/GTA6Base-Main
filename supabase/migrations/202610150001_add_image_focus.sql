-- Stores the featured-image crop chosen in the CMS.
-- Paste this into the Supabase SQL Editor and run it.

alter table public.articles
add column if not exists image_focus_x smallint not null default 50;

alter table public.articles
add column if not exists image_focus_y smallint not null default 0;

alter table public.articles
drop constraint if exists articles_image_focus_x_check;

alter table public.articles
drop constraint if exists articles_image_focus_y_check;

alter table public.articles
add constraint articles_image_focus_x_check
check (image_focus_x between 0 and 100);

alter table public.articles
add constraint articles_image_focus_y_check
check (image_focus_y between 0 and 100);
