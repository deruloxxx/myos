import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteDetailPage from '@/app/notes/[id]/page';

// vi.hoisted()を使用してモック変数をホイスト
const { mockPush, mockGetSession, mockFrom, mockSignOut, mockFetch } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockGetSession: vi.fn(),
  mockFrom: vi.fn(),
  mockSignOut: vi.fn(),
  mockFetch: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useParams: () => ({
    id: 'test-note-id',
  }),
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      signOut: mockSignOut,
    },
    from: mockFrom,
  },
}));

global.fetch = mockFetch;

describe('NoteDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip('ログイン済みユーザーがアクセスしたらメモの詳細が表示される', async () => {});

  it.skip('メモのタイトル、本文、作成日が表示される', async () => {});

  it.skip('「編集」ボタンをクリックしたら編集モードに切り替わる', async () => {});

  it.skip('編集モードでタイトルと本文を変更して「保存」ボタンをクリックしたらメモが更新される', async () => {});

  it.skip('編集モードで「キャンセル」ボタンをクリックしたら編集モードが解除される', async () => {});

  it.skip('「削除」ボタンをクリックして確認したらメモが削除されて一覧ページに遷移する', async () => {});

  it.skip('「削除」ボタンをクリックしてキャンセルしたらメモが削除されない', async () => {});

  it.skip('「翻訳する」ボタンをクリックしたらメモの内容が英語に翻訳される', async () => {});

  it.skip('翻訳中は「翻訳中...」と表示される', async () => {});

  it.skip('翻訳が完了したら翻訳結果が表示される', async () => {});

  it.skip('ログインしていないユーザーがアクセスしたらログインページにリダイレクトされる', async () => {});

  it.skip('存在しないメモIDにアクセスしたらエラーメッセージが表示される', async () => {});

  it.skip('「一覧に戻る」リンクをクリックしたらメモ一覧ページに遷移する', async () => {});

  it.skip('「ログアウト」ボタンをクリックして確認したらログアウトしてログインページに遷移する', async () => {});

  it.skip('保存成功時に成功メッセージが表示される', async () => {});

  it.skip('エラーが発生した場合、エラーメッセージが表示される', async () => {});
});

