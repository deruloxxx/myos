"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  summary?: string | null;
}

export default function NoteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        // 認証チェック
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        // メモ詳細を取得
        const { data, error: fetchError } = await supabase
          .from("notes")
          .select("*")
          .eq("id", noteId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          throw new Error("メモが見つかりません");
        }

        setNote(data);
        setEditTitle(data.title);
        setEditContent(data.content || "");
      } catch (err: any) {
        console.error("Fetch note error:", err);
        setError(err.message || "メモの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId, router]);

  const handleEdit = () => {
    if (note) {
      setEditTitle(note.title);
      setEditContent(note.content || "");
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    if (note) {
      setEditTitle(note.title);
      setEditContent(note.content || "");
      setIsEditing(false);
      setSaveSuccess(false);
    }
  };

  const handleSave = async () => {
    if (!note) return;

    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const { error: updateError } = await supabase
        .from("notes")
        .update({
          title: editTitle,
          content: editContent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", noteId);

      if (updateError) {
        throw updateError;
      }

      // 更新されたデータを再取得
      const { data: updatedNote, error: fetchError } = await supabase
        .from("notes")
        .select("*")
        .eq("id", noteId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setNote(updatedNote);
      setSaveSuccess(true);
      setIsEditing(false);

      // 3秒後に成功メッセージを消す
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Update error:", err);
      setError(err.message || "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!note) return;

    // 確認ダイアログ
    if (!confirm("本当にこのメモを削除しますか？")) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId);

      if (deleteError) {
        throw deleteError;
      }

      // 削除成功後、一覧ページにリダイレクト
      router.push("/notes");
    } catch (err: any) {
      console.error("Delete error:", err);
      setError(err.message || "削除に失敗しました");
      setDeleting(false);
    }
  };

  const handleTranslate = async () => {
    if (!note) return;

    setIsTranslating(true);
    setError(null);

    try {
      // セッションからアクセストークンを取得
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("ログインが必要です");
      }

      // APIを呼び出し
      const response = await fetch(`/api/notes/${noteId}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "翻訳に失敗しました");
      }

      const result = await response.json();
      setTranslatedText(result.translatedText);
    } catch (err: any) {
      console.error("Translate error:", err);
      setError(err.message || "翻訳に失敗しました");
    } finally {
      setIsTranslating(false);
    }
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
        {loading && (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">読み込み中...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded">
            {error}
          </div>
        )}

        {saveSuccess && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 rounded">
            保存しました
          </div>
        )}

        {note && (
          <>
            {isEditing ? (
              /* 編集モード */
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="edit-title"
                    className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
                  >
                    タイトル
                  </label>
                  <input
                    id="edit-title"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-2xl font-bold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-content"
                    className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300"
                  >
                    本文
                  </label>
                  <textarea
                    id="edit-content"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={15}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                  >
                    {saving ? "保存中..." : "保存"}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium rounded-lg transition-colors"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              /* 表示モード */
              <>
                {/* タイトル */}
                <h2 className="text-3xl font-bold mb-2 text-black dark:text-zinc-50">
                  {note.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  {formatDate(note.created_at)}
                </p>

                {/* 本文 */}
                <div className="mb-8">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {note.content || "（本文なし）"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!loading && !note && !error && (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">メモが見つかりません</p>
            <Link
              href="/notes"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              一覧に戻る
            </Link>
          </div>
        )}

        {note && (
          <>

        {/* 区切り線 */}
        <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

        {/* 翻訳セクション */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50">翻訳</h3>
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors"
            >
              {isTranslating ? "翻訳中..." : "翻訳する"}
            </button>
          </div>

          {translatedText ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {translatedText}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                翻訳ボタンをクリックすると、メモの内容を英語に翻訳します。
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

            {!isEditing && (
              /* アクションボタン（表示モードのみ） */
              <div className="flex gap-3">
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors"
                >
                  {deleting ? "削除中..." : "削除"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}




