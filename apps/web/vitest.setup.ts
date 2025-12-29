import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// 各テストの後にクリーンアップ
afterEach(() => {
  cleanup();
});

// カスタムマッチャーを追加（必要に応じて）
expect.extend({});

