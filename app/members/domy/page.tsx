export default function MemberProfile() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
        
        {/* プロフィールヘッダー */}
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-black mb-2">稲富 悠人</h1>
          <p className="text-purple-400 font-bold text-lg">あだ名：ドミー</p>
        </div>

        {/* 詳細情報 */}
        <div className="space-y-6 text-zinc-300">
          <div>
            <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-1">役職</h3>
            <p className="text-lg font-medium text-white">14期 交流会担当・ベース</p>
          </div>
          <div>
            <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-1">一言メッセージ</h3>
            <p className="leading-relaxed">卒業ライブ、最高の思い出にしましょう！みんなで作り上げましょう！</p>
          </div>
        </div>

        {/* 戻るボタンのセット */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a 
            href="/about" 
            className="flex-1 text-center py-3 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all"
          >
            ← メンバー紹介に戻る
          </a>
          <a 
            href="/" 
            className="flex-1 text-center py-3 px-4 bg-purple-600 hover:bg-purple-500 rounded-xl transition-all font-bold"
          >
            🏠 トップページへ
          </a>
        </div>
      </div>
    </div>
  );
}