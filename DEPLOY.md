# Vercelへのデプロイガイド

このドキュメントでは、JPYC Wallet ManagerをVercelにデプロイする詳細な手順を説明します。

## 前提条件

- GitHubアカウント
- Vercelアカウント（GitHubでサインアップ可能）
- Node.js 18以上がインストールされていること

## デプロイ手順

### ステップ1: GitHubリポジトリの作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」ボタンから「New repository」を選択
3. リポジトリ名を入力（例: `jpyc-wallet-manager`）
4. 「Create repository」をクリック

### ステップ2: コードをGitHubにプッシュ

プロジェクトディレクトリで以下のコマンドを実行：

```bash
# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: JPYC Wallet Manager"

# メインブランチに変更
git branch -M main

# リモートリポジトリを追加（<your-username>と<your-repo>を置き換え）
git remote add origin https://github.com/<your-username>/<your-repo>.git

# GitHubにプッシュ
git push -u origin main
```

### ステップ3: Vercelにデプロイ

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでサインイン
3. 「New Project」をクリック
4. GitHubリポジトリをインポート
   - 作成したリポジトリを選択
   - 「Import」をクリック

5. プロジェクト設定
   - **Framework Preset**: Next.js（自動検出されます）
   - **Root Directory**: そのまま（変更不要）
   - **Build Command**: `next build`（自動設定）
   - **Output Directory**: `.next`（自動設定）

6. 環境変数の設定
   「Environment Variables」セクションで以下を追加：

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_JPYC_CONTRACT` | `0x6AE7Dfc73E0dDE900d3o9A9FfC03c8d8617d5274` |
   | `NEXT_PUBLIC_POLYGON_RPC` | `https://polygon-rpc.com` |

   各変数について：
   - 「Name」フィールドに変数名を入力
   - 「Value」フィールドに値を入力
   - 「Add」をクリック

7. 「Deploy」をクリック

### ステップ4: デプロイの確認

- デプロイが完了すると、Vercelが自動的にURLを生成します
- 「Visit」ボタンをクリックしてアプリケーションを確認
- デプロイされたURLは `https://your-project-name.vercel.app` の形式になります

## 環境変数の詳細

### NEXT_PUBLIC_JPYC_CONTRACT

JPYCトークンのコントラクトアドレスです。Polygon Mainnet上のJPYCトークンを指します。

- **値**: `0x6AE7Dfc73E0dDE900d3o9A9FfC03c8d8617d5274`
- **説明**: このアドレスは、PolygonネットワークでJPYCトークンのスマートコントラクトを識別します

### NEXT_PUBLIC_POLYGON_RPC

PolygonネットワークへのRPCエンドポイントです。

- **値**: `https://polygon-rpc.com`
- **説明**: アプリケーションがPolygonブロックチェーンと通信するためのエンドポイント
- **代替**: 以下のRPCエンドポイントも使用可能です
  - `https://rpc-mainnet.matic.network`
  - `https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY`（Infuraアカウントが必要）
  - `https://rpc.ankr.com/polygon`

## 再デプロイ

コードを更新した場合：

```bash
git add .
git commit -m "Update description"
git push
```

Vercelが自動的に新しいバージョンをデプロイします。

## カスタムドメインの設定

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Domains」に移動
3. カスタムドメインを追加
4. DNSレコードを設定（Vercelが指示を表示）

## トラブルシューティング

### ビルドエラーが発生する場合

1. **環境変数の確認**
   - Vercelダッシュボード → Settings → Environment Variables
   - 両方の環境変数が正しく設定されているか確認

2. **ローカルでビルドテスト**
   ```bash
   npm run build
   ```
   ローカルでビルドが成功するか確認

3. **依存関係の確認**
   ```bash
   npm install
   ```
   すべての依存関係が正しくインストールされているか確認

### デプロイ後にページが表示されない場合

1. **ブラウザコンソールを確認**
   - F12キーを押してデベロッパーツールを開く
   - Consoleタブでエラーメッセージを確認

2. **MetaMaskの確認**
   - MetaMask拡張機能がインストールされているか
   - Polygonネットワークに接続されているか

3. **Vercelログの確認**
   - Vercelダッシュボード → Deployments → 最新のデプロイを選択
   - ビルドログとランタイムログを確認

### 環境変数を変更した場合

環境変数を変更した後は、再デプロイが必要です：

1. Vercelダッシュボードでプロジェクトを選択
2. 「Deployments」タブに移動
3. 最新のデプロイの右側にある「...」メニューをクリック
4. 「Redeploy」を選択

## パフォーマンス最適化

### 推奨設定

Vercelは自動的に以下の最適化を適用します：

- **Edge Network**: 世界中のエッジロケーションでコンテンツを配信
- **Image Optimization**: 画像を自動的に最適化
- **Automatic HTTPS**: SSL証明書を自動発行
- **Serverless Functions**: サーバーレス環境で実行

### カスタム最適化

`next.config.js`で追加の最適化が可能：

```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
}
```

## セキュリティ

### 環境変数の管理

- 秘密鍵やプライベートな情報は**絶対に**環境変数に含めない
- `NEXT_PUBLIC_`プレフィックスが付いた変数はクライアント側で公開される
- プライベートな設定はサーバーサイドのみで使用する

### ベストプラクティス

- 定期的に依存関係を更新: `npm update`
- セキュリティ監査を実行: `npm audit`
- 本番環境では常にHTTPSを使用（Vercelは自動対応）

## サポート

問題が発生した場合：

1. [Vercelドキュメント](https://vercel.com/docs)を確認
2. [Next.jsドキュメント](https://nextjs.org/docs)を参照
3. GitHubでIssueを作成

## まとめ

このガイドに従えば、JPYC Wallet ManagerをVercelに簡単にデプロイできます。デプロイ後は、世界中どこからでもアクセス可能な高速で安全なWebアプリケーションが利用できます。
