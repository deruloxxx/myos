"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Supabase signup error:", error);
        throw error;
      }

      console.log("Signup success:", data);

      if (data.user) {
        setSuccess(true);
        // メール確認が必要な場合は、ログインページにリダイレクト
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      console.error("Signup error details:", err);
      console.error("Error status:", err.status);
      console.error("Error message:", err.message);
      
      let errorMessage = "登録に失敗しました";
      
      if (err.message) {
        if (err.message.includes("invalid") || err.message.includes("Email")) {
          errorMessage = "メールアドレスが無効です。実際のメールアドレス（Gmail、Yahoo、Outlookなど）を使用してください。テスト用のドメイン（example.com、test.comなど）は使用できません。";
        } else if (err.message.includes("Password") || err.message.includes("password")) {
          errorMessage = "パスワードが要件を満たしていません。6文字以上で設定してください。";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-zinc-50">
            新規登録
          </h1>

          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 rounded">
              登録が完了しました。ログインページに移動します...
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                minLength={5}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                placeholder="your-email@gmail.com"
              />
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                実際のメールアドレス（Gmail、Yahooなど）を使用してください
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "登録中..." : "新規登録"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              すでにアカウントをお持ちの方は{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                ログイン
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

