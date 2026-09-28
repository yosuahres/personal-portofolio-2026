import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Without both values, data helpers return empty results instead of failing requests.
export const isSupabaseConfigured = Boolean(url && anonKey);

// Public (anon) client: reads only what row level security allows, e.g. published posts.
export const supabase = isSupabaseConfigured
  ? createClient(url!, anonKey!, { auth: { persistSession: false } })
  : null;
