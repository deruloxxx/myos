# myos

モノレポ構成のプロジェクトです。

## 構成

```
myos/
├── apps/
│   ├── web/      # Next.js フロントエンドアプリケーション
│   └── api/      # バックエンドAPIサーバー
├── packages/     # 共有パッケージ（型定義、ユーティリティなど）
└── package.json  # ルートのpackage.json（workspaces設定）
```

## セットアップ

```bash
# 依存関係のインストール
npm install
```

## 開発

```bash
# フロントエンドのみ起動
npm run dev:web

# バックエンドのみ起動
npm run dev:api

# 両方起動（別ターミナルで実行）
npm run dev:web
npm run dev:api
```

## ビルド

```bash
# すべてのアプリをビルド
npm run build

# 個別にビルド
npm run build:web
npm run build:api
```

## 各アプリケーション

### apps/web
Next.js 16を使用したフロントエンドアプリケーション
- ポート: 3000

### apps/api
Node.js + TypeScriptを使用したバックエンドAPIサーバー
- ポート: 3001
