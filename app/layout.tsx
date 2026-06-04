import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-zinc-950 text-zinc-50">
        {/* 左上に「14期卒業ライブ」を配置 */}
        <header className="p-6 border-b border-zinc-900">
          <a href="/" className="text-xl font-black text-purple-400 hover:text-white transition-colors">
            14期卒業ライブ
          </a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}