export default function Home() {
  // 当日、運営からのお礼やタイムリーなアナウンスを載せる枠
  const liveNews = [
    { time: "LIVE INFO", title: "本日は「はもねぴあ 14期 卒業ライブ」にご来場いただきありがとうございます！" },
    { time: "NOTICE", title: "各バンドのセトリ解説・メンバーへのメッセージボードを開放中！" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* 高級イージングで動く背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:-5s] pointer-events-none" />

      {/* ぬるっと品よく浮き上がるメインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 animate-fade-in">
        
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">Welcome to HAMONEPIA 14th Gen Stage</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-300">
            はもねぴあ 14期 卒業ライブ
          </h1>
          <div className="inline-block px-6 py-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full text-zinc-300 text-sm font-medium">
            2027.03.20 | 中部講堂 × パンフレット連動特設サイト
          </div>
        </header>

        {/* 当日用のアナウンス枠 */}
        <section className="mb-12 p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-3xl shadow-xl">
          <h2 className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-4">Live Information</h2>
          <div className="space-y-4">
            {liveNews.map((news, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 pb-3 border-b border-zinc-900 last:border-none last:pb-0">
                <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-purple-400 font-mono text-[10px] font-bold tracking-wider uppercase">{news.time}</span>
                <span className="text-zinc-300 text-sm font-medium leading-relaxed">{news.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* パンフレットから飛んできた人が見たいメニューグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MenuCard href="/about" title="14期生プロフィール ▷" desc="ステージに立つ17人の詳細情報・出身地・一言" />
          <MenuCard href="/bands" title="出演バンド & セトリ解説 ▷" desc="紙面の枠を超えた、各バンドのディープな楽曲解説" />
          <MenuCard href="/schedule" title="Time Schedule ▷" desc="当日の進行スケジュール・タイムテーブル" />
          <MenuCard href="/board" title="Message Board ▷" desc="【当日限定】14期メンバーへの応援・寄せ書きボード" />
          <MenuCard href="/gallery" title="4年間の思い出ギャラリー ▷" desc="パンフレット未収録のオフショット・秘蔵写真一覧" />
          <MenuCard href="/access" title="会場アクセス ▷" desc="中部講堂へのアクセス・帰り道の確認に" />
        </div>
      </main>

      <footer className="text-center py-8 text-zinc-600 text-xs relative z-10">
        &copy; 2027 はもねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}

// メニューカード
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