-- Add a public copyright caption for featured article images.
-- Paste this into the Supabase SQL Editor and run it.

alter table public.articles
add column if not exists image_credit text not null default '';
