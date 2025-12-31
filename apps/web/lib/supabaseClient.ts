import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// デバッグ用（開発環境のみ）
if (process.env.NODE_ENV === "development") {
  console.log("Supabase URL:", supabaseUrl ? "SET" : "NOT SET");
  console.log("Supabase Anon Key:", supabaseAnonKey ? "SET" : "NOT SET");
}

// ビルド時に環境変数が設定されていない場合でもエラーを出さない
// 実行時に環境変数が設定されていない場合はエラーを投げる
function createSupabaseClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    // ビルド時にはエラーを出さない（クライアントサイドでのみエラー）
    if (typeof window !== "undefined") {
      throw new Error(
        "Missing Supabase environment variables. Please check your .env.local file."
      );
    }
    // ビルド時にはダミークライアントを返す（実際には使用されない）
    return createClient("https://placeholder.supabase.co", "placeholder-key");
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSupabaseClient();

