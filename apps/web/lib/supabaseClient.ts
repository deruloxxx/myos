import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// デバッグ用（開発環境のみ）
if (process.env.NODE_ENV === "development") {
  console.log("Supabase URL:", supabaseUrl ? "SET" : "NOT SET");
  console.log("Supabase Anon Key:", supabaseAnonKey ? "SET" : "NOT SET");
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

