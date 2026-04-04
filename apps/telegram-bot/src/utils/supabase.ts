import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';

if (!supabaseUrl || !supabaseSecretKey) {
  console.error('Supabase URL or Secret Key is missing from env variables.');
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey);
