export default function BandsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* ヘッダー部分 */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
            Bands & Members
          </h1>
          <p className="text-zinc-400 text-sm mt-2">14期の最高の仲間たちを紹介します。</p>
        </header>

        {/* メンバー一覧のグリッド（ここに並べていく） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* ドミーさんのカード（ここから個人の詳細ページへ飛ぶ） */}
          <a href="/members/domy" className="group block p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple-500/5">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-purple-950 border border-purple-800 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
                Base
              </span>
              <span className="text-zinc-500 text-xs group-hover:text-purple-400 transition-colors">詳細を見る ▷</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">稲富 悠人</h2>
            <p className="text-zinc-400 text-sm">あだ名：ドミー</p>
          </a>

          {/* 他のメンバー用の空枠（Coming Soon） */}
          <div className="p-6 bg-zinc-900/40 border border-zinc-800/60 border-dashed rounded-2xl flex flex-col justify-center items-center text-zinc-600 h-[142px]">
            <p className="text-sm font-medium">Coming Soon...</p>
            <p className="text-xs mt-1">次のメンバーを追加予定</p>
          </div>

          <div className="p-6 bg-zinc-900/40 border border-zinc-800/60 border-dashed rounded-2xl flex flex-col justify-center items-center text-zinc-600 h-[142px]">
            <p className="text-sm font-medium">Coming Soon...</p>
          </div>

        </div>

        {/* 戻るリンク */}
        <div className="mt-12 text-center md:text-left">
          <a href="/" className="text-zinc-500 hover:text-zinc-300 underline text-sm">← ホームに戻る</a>
        </div>
        
      </div>
    </div>
  );
}