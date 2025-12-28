"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [email] = useState("user@example.com"); // 仮データ

  const handleLogout = () => {
    // 仮実装：後でログアウト機能を実装
    alert("ログアウト機能は後で実装します");
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    // 仮実装：後でテーマ切り替えを実装
    console.log("テーマ変更:", newTheme);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black dark:text-zinc-50">MyOS</h1>
          <Link
            href="/notes"
            className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            メモ一覧
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-zinc-50">Settings</h2>

        <div className="space-y-6">
          {/* プロフィールセクション */}
          <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
              プロフィール
            </h3>
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                メールアドレス
              </label>
              <p className="text-zinc-900 dark:text-zinc-50">{email}</p>
            </div>
          </section>

          {/* テーマ設定セクション */}
          <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
              テーマ設定
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleThemeChange("light")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === "light"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                Dark
              </button>
            </div>
          </section>

          {/* ログアウトセクション */}
          <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-zinc-50">
              アカウント
            </h3>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              ログアウト
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}





