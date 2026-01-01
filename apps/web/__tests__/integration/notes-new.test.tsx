import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewNotePage from '@/app/notes/new/page';

// vi.hoisted()を使用してモック変数をホイスト
const { mockPush, mockGetUser, mockFrom, mockSignOut } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
    },
    from: mockFrom,
  },
}));

describe('NewNotePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip('ページが表示されたらタイトル入力欄と本文入力欄が表示される', async () => {});

  it.skip('タイトル入力欄に文字を入力したら値が更新される', async () => {});

  it.skip('本文入力欄に文字を入力したら値が更新される', async () => {});

  it.skip('タイトルと本文を入力して「保存」ボタンをクリックしたらメモが作成されて一覧ページに遷移する', async () => {});

  it.skip('タイトルが空の状態で「保存」ボタンをクリックしてもメモが作成されない', async () => {});

  it.skip('保存中は「保存中...」と表示される', async () => {});

  it.skip('「キャンセル」リンクをクリックしたらメモ一覧ページに遷移する', async () => {});

  it.skip('ログインしていないユーザーがアクセスしたらエラーメッセージが表示される', async () => {});

  it.skip('保存に失敗した場合、エラーメッセージが表示される', async () => {});

  it.skip('「一覧に戻る」リンクをクリックしたらメモ一覧ページに遷移する', async () => {});

  it.skip('「ログアウト」ボタンをクリックして確認したらログアウトしてログインページに遷移する', async () => {});
});

