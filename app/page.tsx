export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <main className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8 text-center">もねぴあ 14期 卒業ライブ</h1>
        
        <div className="grid grid-cols-1 gap-4">
          <a href="/members" className="block p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-blue-400 transition">
            <h2 className="text-xl font-semibold text-zinc-800">メンバー紹介</h2>
          </a>
          <a href="/schedule" className="block p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-orange-400 transition">
            <h2 className="text-xl font-semibold text-zinc-800">タイムスケジュール</h2>
          </a>
          <a href="/gallery" className="block p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-green-400 transition">
            <h2 className="text-xl font-semibold text-zinc-800">フォトギャラリー</h2>
          </a>
        </div>
      </main>
    </div>
  );
}
