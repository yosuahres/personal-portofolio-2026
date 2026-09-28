-- Like counts on writing posts.
-- Visitors can't update posts directly (RLS allows select only); instead they call
-- like_writing_post(), which adds exactly one like to a published post and returns the new total.

alter table public.writing_posts
  add column if not exists like_count integer not null default 0 check (like_count >= 0);

create or replace function public.like_writing_post(post_slug text)
returns integer
language sql
security definer
set search_path = public
as $$
  update public.writing_posts
  set like_count = like_count + 1
  where slug = post_slug
    and published_at is not null
    and published_at <= now()
  returning like_count;
$$;

revoke all on function public.like_writing_post(text) from public;
grant execute on function public.like_writing_post(text) to anon, authenticated;

-- A like isn't an edit: don't bump updated_at when only the like count changes.
drop trigger if exists writing_posts_set_updated_at on public.writing_posts;
create trigger writing_posts_set_updated_at
  before update on public.writing_posts
  for each row
  when (old.like_count is not distinct from new.like_count)
  execute function public.set_updated_at();
