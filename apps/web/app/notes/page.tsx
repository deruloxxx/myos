"use client";

import Link from "next/link";

// 仮データ
const mockNotes = [
  {
    id: "1",
    title: "今日のタスク",
    createdAt: "2024-12-11",
  },
  {
    id: "2",
    title: "プロジェクトのアイデア",
    createdAt: "2024-12-10",
  },
  {
    id: "3",
    title: "読書メモ",
    createdAt: "2024-12-09",
  },
];

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-black dark:text-zinc-50">MyOS</h1>
          <div className="flex gap-2">
            <Link
              href="/settings"
              className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              設定
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50">メモ一覧</h2>
          <Link
            href="/notes/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            新規作成
          </Link>
        </div>

        {/* メモ一覧 */}
        <div className="space-y-3">
          {mockNotes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-1">
                {note.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{note.createdAt}</p>
            </Link>
          ))}
        </div>

        {mockNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">メモがありません</p>
            <Link
              href="/notes/new"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              最初のメモを作成
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

