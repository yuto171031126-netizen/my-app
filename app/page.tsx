export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans p-6 md:p-12">
      {/* メインビジュアル */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">HAMONEPIA 14th Generation</p>
        <h1 className="text-4xl md:text-6xl font-black mb-6">はもねぴあ 14期 卒業ライブ</h1>
        <div className="inline-block px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
          2027.03.20 | 中部講堂
        </div>
      </header>

      {/* メニュー：ここから各ページへ飛ぶ */}
      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <MenuCard href="/about" title="14期紹介 ▷" desc="メンバープロフィール" />
        <MenuCard href="/bands" title="Bands & Members ▷" desc="出演バンド紹介" />
        <MenuCard href="/schedule" title="Time Schedule ▷" desc="当日のタイムテーブル" />
        <MenuCard href="/access" title="Access ▷" desc="会場への行き方" />
        <MenuCard href="/gallery" title="卒業写真一覧 ▷" desc="1年〜4年の思い出" />
      </main>
    </div>
  );
}

// 共通ボタンデザイン
function MenuCard({ href, title, desc }: { href: string, title: string, desc: string }) {
  return (
    <a href={href} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500 transition-all">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-zinc-400 text-sm mt-2">{desc}</p>
    </a>
  );
}