export default function Members() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8 text-center">メンバー紹介</h1>
        
        {/* ドミーさんの紹介カード */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-zinc-900">稲富 悠人</h2>
            <p className="text-zinc-500 text-lg">あだ名：ドミー</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-zinc-100 pb-2">
              <span className="text-zinc-400">パート</span>
              <span className="font-semibold text-zinc-800">ベース</span>
            </div>
            <div className="flex justify-between border-b border-zinc-100 pb-2">
              <span className="text-zinc-400">出身地</span>
              <span className="font-semibold text-zinc-800">山口県下関市</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-zinc-400">趣味</span>
              <span className="font-semibold text-zinc-800">株、ボウリング、テトリス</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-zinc-500 hover:text-zinc-900 underline">← ホームに戻る</a>
        </div>
      </div>
    </div>
  );
}
