import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnvOrNull } from "./env";

export function createPublicClient() {
  const config = getSupabaseEnvOrNull();

  if (!config) {
    return null;
  }

  return createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
