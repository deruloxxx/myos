"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // 仮実装：後でDB保存を実装
    console.log("保存:", { title, content });
    alert("保存機能は後で実装します");
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
            一覧に戻る
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-zinc-50">新規メモ作成</h2>

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
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              保存
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




