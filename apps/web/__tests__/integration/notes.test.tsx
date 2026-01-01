import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotesPage from '@/app/notes/page';

// vi.hoisted()を使用してモック変数をホイスト
const { mockPush, mockRefresh, mockGetSession, mockFrom, mockSignOut } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockRefresh: vi.fn(),
  mockGetSession: vi.fn(),
  mockFrom: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      signOut: mockSignOut,
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
    from: mockFrom,
  },
}));

describe('NotesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip('ログイン済みユーザーがアクセスしたらメモ一覧が表示される', async () => {});

  it.skip('メモが存在する場合、メモのタイトルと作成日が表示される', async () => {});

  it.skip('メモが存在しない場合、「メモがありません」と表示される', async () => {});

  it.skip('「新規作成」ボタンをクリックしたら新規メモ作成ページに遷移する', async () => {});

  it.skip('メモがない場合の「最初のメモを作成」リンクをクリックしたら新規メモ作成ページに遷移する', async () => {});

  it.skip('メモのタイトルをクリックしたらメモ詳細ページに遷移する', async () => {});

  it.skip('ログインしていないユーザーがアクセスしたらログインページにリダイレクトされる', async () => {});

  it.skip('「ログアウト」ボタンをクリックして確認したらログアウトしてログインページに遷移する', async () => {});

  it.skip('「ログアウト」ボタンをクリックしてキャンセルしたらログアウトしない', async () => {});

  it.skip('エラーが発生した場合、エラーメッセージが表示される', async () => {});
});

