export default function Home() {
  const liveNews = [
    { time: "LIVE INFO", title: "本日は「はもねぴあ 14期 卒業ライブ」にご来場いただきありがとうございます！" },
    { time: "NOTICE", title: "パンフレットのQRコードより、各メンバーのプロフィールや4年間の思い出ギャラリーをご覧いただけます。" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* 背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:-5s] pointer-events-none" />

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

        {/* アナウンス枠 */}
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

        {/* メニューグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MenuCard href="/about" title="14期生プロフィール ▷" desc="ステージに立つ17人の詳細情報・出身地・一言" />
          <MenuCard href="/bands" title="出演バンド紹介 ▷" desc="卒業ライブを彩る各出演バンドの紹介" />
          <MenuCard href="/schedule" title="Time Schedule ▷" desc="当日の進行スケジュール・タイムテーブル" />
          <MenuCard href="/gallery" title="4年間の思い出ギャラリー ▷" desc="パンフレット未収録のオフショット・秘蔵写真一覧" />
          
          {/* 【予告】ミニゲーム用のボタンを先行設置！ */}
          <MenuCard href="/game" title="14期限定ミニゲーム ▷" desc="【お楽しみ】開演までの待ち時間に遊べるミニゲーム" isGame={true} />

          <div className="md:col-span-2">
            <MenuCard href="/access" title="会場アクセス ▷" desc="中部講堂へのアクセス・帰り道の確認に" />
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-zinc-600 text-xs relative z-10">
        &copy; 2027 はもねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}

// メニューカード（スマホタップ対応版）
function MenuCard({ href, title, desc, isGame = false }: { href: string, title: string, desc: string, isGame?: boolean }) {
  return (
    <a 
      href={href} 
      className={`p-6 bg-zinc-900/40 backdrop-blur-sm border rounded-2xl shadow-lg block select-none
        transition-premium hover:-translate-y-1
        ${isGame 
          ? 'border-purple-500/30 bg-purple-950/10 hover:border-purple-400' 
          : 'border-white/10 hover:border-purple-500/50 hover:bg-zinc-800/60'
        }
        active:scale-[0.98] active:border-purple-400 active:bg-purple-900/20 active:shadow-[0_0_20px_rgba(168,85,247,0.4)]
      `}
    >
      <h2 className={`text-xl font-bold ${isGame ? 'text-purple-300' : 'text-white'}`}>{title}</h2>
      <p className="text-zinc-400 text-sm mt-1">{desc}</p>
    </a>
  );
}