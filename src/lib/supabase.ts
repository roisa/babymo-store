import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let _browser: SupabaseClient | null = null;
export function supabaseBrowser(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (_browser) return _browser;
  _browser = createClient(url!, anonKey!, {
    auth: { persistSession: false },
  });
  return _browser;
}

let _admin: SupabaseClient | null = null;
export function supabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (_admin) return _admin;
  _admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _admin;
}
