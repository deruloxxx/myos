import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsPage from '@/app/settings/page';

// vi.hoisted()を使用してモック変数をホイスト
const { mockPush, mockGetUser, mockSignOut } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockGetUser: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
    },
  },
}));

// window.confirmとwindow.alertをモック
const mockConfirm = vi.fn();
const mockAlert = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  global.confirm = mockConfirm;
  global.alert = mockAlert;
  mockGetUser.mockResolvedValue({
    data: { user: { email: 'test@example.com' } },
    error: null,
  });
});

describe('SettingsPage', () => {
  it('should logout when logout button is clicked and confirmed', async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(true);
    mockSignOut.mockResolvedValue({ error: null });

    render(<SettingsPage />);

    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('should not logout when confirmation is cancelled', async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(false);

    render(<SettingsPage />);

    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockSignOut).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should show error alert when logout fails', async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(true);
    mockSignOut.mockResolvedValue({
      error: { message: 'Logout failed' },
    });

    render(<SettingsPage />);

    const logoutButton = screen.getByRole('button', { name: 'ログアウト' });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('ログアウトに失敗しました');
    });
  });
});


