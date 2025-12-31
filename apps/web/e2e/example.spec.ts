import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/');
    
    // ページタイトルを確認
    await expect(page).toHaveTitle(/Create Next App/);
  });
});

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');
    
    // ログインフォームの要素が存在することを確認
    await expect(page.getByLabel('メールアドレス')).toBeVisible();
    await expect(page.getByLabel('パスワード')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // 無効な認証情報でログインを試みる
    await page.getByLabel('メールアドレス').fill('invalid@example.com');
    await page.getByLabel('パスワード').fill('wrongpassword');
    await page.getByRole('button', { name: 'ログイン' }).click();
    
    // エラーメッセージが表示されることを確認
    await expect(page.getByText(/認証に失敗しました|メールアドレスまたはパスワードが正しくありません/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Signup Page', () => {
  test('should display signup form', async ({ page }) => {
    await page.goto('/signup');
    
    // サインアップフォームの要素が存在することを確認
    await expect(page.getByLabel('メールアドレス')).toBeVisible();
    await expect(page.getByLabel('パスワード')).toBeVisible();
    await expect(page.getByRole('button', { name: '登録' })).toBeVisible();
  });
});


