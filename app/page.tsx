export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* 高級イージングで動く背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:-5s] pointer-events-none" />

      {/* ぬるっと品よく浮き上がるメインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 animate-fade-in">
        <header className="text-center mb-16">
          <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">HAMONEPIA 14th Generation</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-300">
            はもねぴあ 14期 卒業ライブ
          </h1>
          <div className="inline-block px-6 py-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full text-zinc-300">
            2027.03.20 | 中部講堂
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MenuCard href="/about" title="14期紹介 ▷" desc="メンバープロフィール" />
          <MenuCard href="/bands" title="Bands & Members ▷" desc="出演バンド紹介" />
          <MenuCard href="/schedule" title="Time Schedule ▷" desc="当日のタイムテーブル" />
          <MenuCard href="/access" title="Access ▷" desc="会場への行き方" />
          <MenuCard href="/gallery" title="卒業写真一覧 ▷" desc="1年〜4年の思い出" />
        </div>
      </main>

      <footer className="text-center py-8 text-zinc-600 text-xs relative z-10">
        &copy; 2027 はもねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}

function MenuCard({ href, title, desc }: { href: string, title: string, desc: string }) {
  return (
    <a 
      href={href} 
      className="p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-zinc-800/60 transition-premium shadow-lg hover:-translate-y-1 block"
    >
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-zinc-400 text-sm mt-1">{desc}</p>
    </a>
  );
}