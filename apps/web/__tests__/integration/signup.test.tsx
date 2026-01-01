import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';

// vi.hoisted()を使用してモック変数をホイスト
const { mockPush, mockRefresh, mockSignInWithPassword } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockRefresh: vi.fn(),
  mockSignInWithPassword: vi.fn(),
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
      signInWithPassword: mockSignInWithPassword,
    },
  },
}));

describe('SignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
    
  // 登録完了後はログインしている状態にしたい
  it.skip('ユーザーが正しいメールアドレス、パスワードを入力して新規登録を押下したら登録完了画面に遷移する。', async () => {
    const user = userEvent.setup();
    mockSignInWithPassword.mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    });

    render(<LoginPage />);

    const emailInput = screen.getByLabelText('メールアドレス');
    const passwordInput = screen.getByLabelText('パスワード');
    const submitButton = screen.getByRole('button', { name: 'ログイン' });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/notes');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
  
  it.skip('ユーザーが不適切なメールアドレス、パスワードを入力して新規登録を押下したら登録画面にてエラーが表示される', async () => {})
});


