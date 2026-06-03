export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <main className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-sm">
        <h1 className="text-4xl font-bold text-zinc-900 mb-6">
          アカペラサークル 卒業記念サイト
        </h1>
        <p className="text-lg text-zinc-600 mb-8">
          これまで一緒に歌ってくれてありがとう。<br />
          ここに私たちの思い出と感謝を綴ります。
        </p>

        <div className="space-y-4">
          <div className="p-4 border border-zinc-200 rounded-xl">
            <h2 className="font-semibold text-zinc-900">卒業生一覧</h2>
            <p className="text-sm text-zinc-500">メンバーのプロフィールはこちら</p>
          </div>
          <div className="p-4 border border-zinc-200 rounded-xl">
            <h2 className="font-semibold text-zinc-900">思い出メッセージ</h2>
            <p className="text-sm text-zinc-500">みんなからの寄せ書き</p>
          </div>
        </div>
      </main>
    </div>
  );
}

