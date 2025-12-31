import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// デバッグ用（開発環境のみ）
if (process.env.NODE_ENV === "development") {
  console.log("Supabase URL:", supabaseUrl ? "SET" : "NOT SET");
  console.log("Supabase Anon Key:", supabaseAnonKey ? "SET" : "NOT SET");
}

// クライアントコンポーネントで使用されるため、ビルド時には評価されない
// 実行時に環境変数が設定されていない場合はエラーを投げる
if (!supabaseUrl || !supabaseAnonKey) {
  // ビルド時にはエラーを出さない（クライアントサイドでのみエラー）
  if (typeof window !== "undefined") {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }
}

// 型安全性のため、非nullアサーションを使用
// 実際の実行時には上記のチェックでエラーが発生する
export const supabase = createClient(
  supabaseUrl!,
  supabaseAnonKey!
);

