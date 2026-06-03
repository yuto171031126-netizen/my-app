export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <main className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-sm">
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">
          もねぴあ 14期 卒業ライブ
        </h1>
        <p className="text-lg text-zinc-600 mb-8">
          14期の軌跡をここに。
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button className="p-6 border border-zinc-200 rounded-xl hover:bg-zinc-50 text-left">
            <h2 className="font-semibold text-zinc-900">メンバー紹介</h2>
          </button>
          <button className="p-6 border border-zinc-200 rounded-xl hover:bg-zinc-50 text-left">
            <h2 className="font-semibold text-zinc-900">タイムスケジュール</h2>
          </button>
          <button className="p-6 border border-zinc-200 rounded-xl hover:bg-zinc-50 text-left">
            <h2 className="font-semibold text-zinc-900">フォトギャラリー</h2>
          </button>
        </div>
      </main>
    </div>
  );
}
