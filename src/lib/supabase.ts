import { createClient } from "@supabase/supabase-js";

// Chave anon (pública, feita para o frontend). RLS só permite INSERT.
const SUPABASE_URL = "https://dhuvzveqsjzjfkszhxwn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRodXZ6dmVxc2p6amZrc3poeHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMzU0OTQsImV4cCI6MjA5OTkxMTQ5NH0.jFh9Blvi7xceP5mssUy3j4bCQvabPo9se0OnqPco_oE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
