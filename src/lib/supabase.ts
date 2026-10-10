import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Support both Node.js (process.env) and Vite client (import.meta.env)
const getEnvVar = (key: string, viteKey: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[viteKey]) {
    return (import.meta as any).env[viteKey] as string;
  }
  return '';
};

const supabaseUrl = getEnvVar('SUPABASE_URL', 'VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Returns an active Supabase client or throws a descriptive error if environment variables are not set.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    const url = getEnvVar('SUPABASE_URL', 'VITE_SUPABASE_URL');
    const key = getEnvVar('SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY');
    if (!url || !key) {
      throw new Error(
        'Supabase is not configured. Please ensure SUPABASE_URL and SUPABASE_ANON_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are set in your .env file.'
      );
    }
    return createClient(url, key);
  }
  return supabase;
}
