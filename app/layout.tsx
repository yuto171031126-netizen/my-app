import "./globals.css"; // これを一番上に足す！

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-zinc-950 text-zinc-50">
        {/* ...以下省略... */}
        {children}
      </body>
    </html>
  );
}