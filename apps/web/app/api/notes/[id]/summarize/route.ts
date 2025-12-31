import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const noteId = resolvedParams.id;

    // ダミー実装：認証やDBアクセスをスキップして、常に成功レスポンスを返す
    // 少し遅延を入れてAPI呼び出しをシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ダミー要約を生成
    const summary = `【ダミー要約】これは要約機能のダミー実装です。実際のAI要約機能は後で実装予定です。メモID: ${noteId}`;

    return NextResponse.json({ success: true, summary });
  } catch (error: any) {
    console.error("Summarize error:", error);
    return NextResponse.json(
      { error: error.message || "要約の生成に失敗しました" },
      { status: 500 }
    );
  }
}

