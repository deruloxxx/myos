"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// 仮データ
const mockNote = {
  id: "1",
  title: "今日のタスク",
  content: `これはメモの本文です。
長い文章を書くことができます。

複数行にわたって書くことも可能です。
後でAI要約機能を追加する予定です。`,
  createdAt: "2024-12-11",
};

export default function NoteDetailPage() {
  const params = useParams();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    // 仮実装：後でAI要約を実装
    setTimeout(() => {
      setAiSummary("AI要約機能は後で実装します");
      setIsGenerating(false);
    }, 1000);
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
        {/* タイトル */}
        <h2 className="text-3xl font-bold mb-2 text-black dark:text-zinc-50">
          {mockNote.title}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {mockNote.createdAt}
        </p>

        {/* 本文 */}
        <div className="mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {mockNote.content}
            </p>
          </div>
        </div>

        {/* 区切り線 */}
        <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

        {/* AI要約セクション */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50">AI要約</h3>
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors"
            >
              {isGenerating ? "生成中..." : "AI要約する"}
            </button>
          </div>

          {aiSummary ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-zinc-700 dark:text-zinc-300">{aiSummary}</p>
            </div>
          ) : (
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                AI要約を生成すると、メモの内容を要約して表示します。
              </p>
            </div>
          )}
        </div>

        {/* タグ欄（後で実装） */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-zinc-50">タグ</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">
              タグ機能は後で実装
            </span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            編集
          </button>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
            削除
          </button>
        </div>
      </main>
    </div>
  );
}

