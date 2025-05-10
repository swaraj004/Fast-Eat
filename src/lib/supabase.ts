
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://feawclawqbqcvqqkpltf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlYXdjbGF3cWJxY3ZxcWtwbHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4Njk1MTAsImV4cCI6MjA2MjQ0NTUxMH0.HXF76pQ2wpHZM2YYxPiIZaCuq-X0rIlvZTxtV1RCCOo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
