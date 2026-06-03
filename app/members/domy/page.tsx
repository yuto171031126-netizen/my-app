export default function DomyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl mt-12">
        <span className="px-3 py-1 bg-purple-950 border border-purple-800 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
          Base
        </span>
        <h1 className="text-3xl font-bold mt-4">稲富 悠人 (ドミー)</h1>
        
        <div className="mt-6 space-y-3 text-zinc-300 border-t border-zinc-800 pt-6">
          <p>🏠 <span className="font-semibold text-zinc-400">出身：</span>山口県下関市</p>
          <p>🎯 <span className="font-semibold text-zinc-400">趣味：</span>株、ボウリング、テトリス</p>
        </div>
        
        <a href="/bands" className="text-purple-400 hover:text-purple-300 underline mt-8 block text-sm">
          ← バンド・メンバー一覧に戻る
        </a>
      </div>
    </div>
  );
}