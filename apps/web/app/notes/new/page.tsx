"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import type { NoteInsert } from "@/lib/types";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ユーザーIDを取得
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("ログインが必要です");
      }

      // NoteInsert型でデータを準備
      const noteData: NoteInsert = {
        title,
        content,
        userId: user.id,
      };

      // スネークケースに変換してSupabaseに送信
      const { error: insertError } = await supabase.from("notes").insert({
        title: noteData.title,
        content: noteData.content,
        user_id: noteData.userId,
      });

      if (insertError) {
        throw insertError;
      }

      // 保存成功後、一覧ページにリダイレクト
      router.push("/notes");
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "保存に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black dark:text-zinc-50">MyOS</h1>
          <div className="flex gap-2">
            <Link
              href="/notes"
              className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              一覧に戻る
            </Link>
            <button
              onClick={async () => {
                if (confirm("ログアウトしますか？")) {
                  await supabase.auth.signOut();
                  router.push("/login");
                }
              }}
              className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-zinc-50">新規メモ作成</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
            >
              タイトル
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              placeholder="メモのタイトル"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
            >
              本文
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 resize-none"
              placeholder="メモの内容を入力してください..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "保存中..." : "保存"}
            </button>
            <Link
              href="/notes"
              className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium rounded-lg transition-colors"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}




