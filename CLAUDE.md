# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack - **ALWAYS RUNNING ON PORT 3000** (do not attempt to start)
- `pnpm build` - Build production bundle
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier

### Environment Setup

- Use pnpm for package management (not npm/yarn/bun)
- Use TailwindCSS for styling (latest version)
- Environment variables (see `.env.example`):
  - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (public reads, post likes)
  - `SUPABASE_SERVICE_ROLE_KEY` - Server-only key for admin writes and storage uploads

## Architecture Overview

### Pages

- `/` - Home hero (portrait, bio, links)
- `/about` - Work and Projects; work entries can link to article pages like `/about/brin`
- `/timeline`, `/links` - Content is kept in typed arrays at the top of each page file
- `/writing` - Posts stored in Supabase and rendered from Markdown

### Data

- **Supabase**: `writing_posts` table (Markdown content, `like_count`) and a public `images` storage bucket
- **Migrations**: SQL lives in `supabase/migrations`; `supabase/seed.sql` holds post content
- **Row level security**: visitors can only read published posts and call `like_writing_post()`
- **Missing keys**: data helpers return empty results, so pages render their empty states

### UI

- **Layout**: `ClientShell` renders the top bar, full-screen menu (`MobileNavMenu`) and command menu
- **Navigation**: menu items are defined in `src/config/navigation.tsx`
- **Work articles**: built from `src/app/about/ArticleParts.tsx`; "Next" order comes from `workArticles.ts`
- **Styling**: TailwindCSS with design tokens in `globals.css`; system font stack; next-themes for dark/light mode
- **State**: Jotai atom for the menu open state
