import { createClient } from "@supabase/supabase-js";

// Supabase project credentials
// Get them from: https://app.supabase.com -> Your Project -> Settings -> API
const SUPABASE_URL = "https://nkkkuhasxvetyekekqki.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_QW7CxYP-gPSgZ8z9mIZbjg_a7Q0UJZj";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
