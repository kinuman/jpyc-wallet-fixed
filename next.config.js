/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Vercelの環境変数は自動的に読み込まれるため、ここでの明示的な設定は不要ですが、
  // ローカル開発との互換性のために残しておきます。
}

module.exports = nextConfig
