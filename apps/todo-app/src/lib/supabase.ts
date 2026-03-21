import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabasePublishableKey = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || '';
const SupabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';
// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Server-side Supabase client with service role
export const supabaseAdmin = createClient(supabaseUrl, SupabaseSecretKey);
