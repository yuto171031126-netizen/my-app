export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-zinc-950 text-zinc-50">
        <header className="p-6 border-b border-zinc-900">
          <a href="/" className="text-lg font-black text-purple-400 hover:text-white">
            14期卒業ライブ
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}