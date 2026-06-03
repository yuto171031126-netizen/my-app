export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500 selection:text-white">
      {/* メインビジュアル / 看板部分 */}
      <header className="relative pt-24 pb-20 px-6 overflow-hidden bg-gradient-to-b from-purple-900/40 via-zinc-950 to-zinc-950 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">MONEPIA 14th Generation</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300 mb-6 drop-shadow-xl">
          もねぴあ 14期 卒業ライブ
        </h1>
        
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 py-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-zinc-300 font-medium backdrop-blur-sm shadow-xl">
          <div>📅 <span className="text-white">2026.03.20</span> (Fri)</div>
          <div className="hidden sm:block text-zinc-700">|</div>
          <div>📍 <span className="text-white">中部講堂</span></div>
        </div>
      </header>

      {/* メニューリンク部分 */}
      <main className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <a href="/about" className="group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">About ▷</h2>
            <p className="text-zinc-400 text-sm mt-2">卒業ライブへの想い、14期生からのご挨拶。</p>
          </a>

          <a href="/bands" className="group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Bands & Members ▷</h2>
            <p className="text-zinc-400 text-sm mt-2">出演バンド紹介。メンバーのプロフィールはこちら！</p>
          </a>

          <a href="/schedule" className="group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Time Schedule ▷</h2>
            <p className="text-zinc-400 text-sm mt-2">当日のタイムテーブル・香盤表はこちら。</p>
          </a>

          <a href="/access" className="group relative p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-purple-500/10">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Access ▷</h2>
            <p className="text-zinc-400 text-sm mt-2">会場へのアクセス・地図・お越しの方へ。</p>
          </a>

        </div>
      </main>

      <footer className="text-center py-8 border-t border-zinc-900 text-zinc-600 text-xs">
        &copy; 2026 もねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}