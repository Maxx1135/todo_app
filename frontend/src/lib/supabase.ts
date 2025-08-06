import { createClient } from "@supabase/supabase-js";
import { VITE_PUBLIC_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } from "../constants";

const Supabase = createClient(VITE_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY);

export default Supabase;
