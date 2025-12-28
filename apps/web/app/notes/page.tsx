"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Note {
  id: string;
  title: string;
  created_at: string;
}

export default function NotesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchNotes = async () => {
      try {
        // 認証チェック
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        // メモ一覧を取得
        const { data, error: fetchError } = await supabase
          .from("notes")
          .select("id,title,created_at")
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setNotes(data || []);
      } catch (err: any) {
        console.error("Fetch notes error:", err);
        setError(err.message || "メモの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
      } else {
        fetchNotes();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // クライアントサイドでのみレンダリング
  if (!mounted || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-zinc-600 dark:text-zinc-400">読み込み中...</div>
      </div>
    );
  }
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded">
            {error}
          </div>
        )}

        {/* メモ一覧 */}
        <div className="space-y-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-1">
                {note.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {formatDate(note.created_at)}
              </p>
            </Link>
          ))}
        </div>

        {notes.length === 0 && !loading && (
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

