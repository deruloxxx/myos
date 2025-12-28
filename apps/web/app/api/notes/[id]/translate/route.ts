import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabaseServer";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Next.js 15ではparamsがPromiseの場合があるため、awaitする
    const resolvedParams = await Promise.resolve(params);
    const noteId = resolvedParams.id;
    console.log("Translate request for noteId:", noteId);

    // リクエストヘッダーからAuthorizationトークンを取得
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No authorization header");
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const accessToken = authHeader.replace("Bearer ", "");
    const supabase = await createServerClient(accessToken);

    // ログインユーザーを取得
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User auth error:", userError);
      return NextResponse.json(
        { error: "認証に失敗しました" },
        { status: 401 }
      );
    }

    console.log("Authenticated user:", user.id);

    // メモを取得
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("id, content, user_id")
      .eq("id", noteId)
      .eq("user_id", user.id)
      .single();

    if (noteError) {
      console.error("Note fetch error:", noteError);
      return NextResponse.json(
        { error: "メモが見つかりません", details: noteError.message },
        { status: 404 }
      );
    }

    if (!note) {
      console.error("Note not found - noteId:", noteId, "userId:", user.id);
      return NextResponse.json(
        { error: "メモが見つかりません" },
        { status: 404 }
      );
    }

    console.log("Note found:", note.id);

    // contentが空の場合はエラー
    if (!note.content || note.content.trim() === "") {
      return NextResponse.json(
        { error: "翻訳する内容がありません" },
        { status: 400 }
      );
    }

    // MyMemory Translation APIを使用（完全無料、APIキー不要）
    // 日10,000文字まで無料で利用可能
    const translateUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(note.content)}&langpair=ja|en`;
    
    const translateResponse = await fetch(translateUrl, {
      method: "GET",
    });

    if (!translateResponse.ok) {
      console.error("MyMemory Translation API error:", translateResponse.status);
      return NextResponse.json(
        { error: "翻訳に失敗しました" },
        { status: 500 }
      );
    }

    const translateData = await translateResponse.json();
    const translatedText = translateData.responseData?.translatedText || "";

    if (!translatedText) {
      return NextResponse.json(
        { error: "翻訳結果が取得できませんでした" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      translatedText,
      originalText: note.content,
    });
  } catch (error: any) {
    console.error("Translate error:", error);
    return NextResponse.json(
      { error: error.message || "翻訳に失敗しました" },
      { status: 500 }
    );
  }
}

