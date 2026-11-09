import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#2c2a29] font-sans">
      {/* 1. 最上部ヒルトン風ラグジュアリー・アナウンスバー */}
      <div className="bg-[#1a1818] text-[#d4af37] py-2 px-6 text-xs tracking-widest flex justify-between items-center border-b border-[#d4af37]/30">
        <span>HILTON & HAMONEPIA 14TH — SPECIAL GRADUATION PORTAL</span>
        <span className="text-gray-300">【はもねぴあ14期 卒業ライブ公式特設サイト】</span>
      </div>

      {/* 2. ヘッダー：ラグジュアリーなホテルブランド風デザイン */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wider text-[#1a1818] flex items-center gap-3">
              HAMONEPIA 14TH <span className="text-xs font-sans font-normal tracking-normal bg-[#1a1818] text-[#d4af37] px-2.5 py-1 rounded">ラグジュアリー特設版</span>
            </h1>
            <p className="text-xs text-gray-500 font-serif tracking-wide mt-0.5">〜おたけ、こっこ、しなぽん、とも、そしてすべての仲間たちへ贈る最上級のステージ〜</p>
          </div>

          {/* 検索・クイックアクション */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="バンド・コンテンツを検索..." 
              className="border border-gray-300 px-3.5 py-2 rounded text-xs w-60 focus:outline-none focus:border-[#d4af37] bg-[#faf8f5]"
            />
            <button className="bg-[#1a1818] text-white px-5 py-2 rounded text-xs font-medium hover:bg-[#333] transition tracking-wider">
              検索
            </button>
          </div>
        </div>

        {/* 構成タブナビゲーション */}
        <div className="bg-[#1a1818] text-gray-300 text-xs tracking-wider">
          <div className="max-w-7xl mx-auto flex overflow-x-auto">
            <a href="#top" className="bg-[#d4af37] text-black px-6 py-3 font-bold whitespace-nowrap">総合TOP</a>
            <a href="#album" className="px-6 py-3 hover:text-white hover:bg-white/10 whitespace-nowrap">1. アルバム</a>
            <a href="#movies" className="px-6 py-3 hover:text-white hover:bg-white/10 whitespace-nowrap">2. 企画で使う映像集</a>
            <a href="#pamphlet" className="px-6 py-3 hover:text-white hover:bg-white/10 whitespace-nowrap">3. デジタル版パンフ</a>
            <a href="#access" className="px-6 py-3 hover:text-white hover:bg-white/10 whitespace-nowrap">会場・アクセス</a>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        
        {/* ヒーロービジュアル（ホテルエントランス風） */}
        <div className="bg-[#1a1818] text-white rounded-xl p-8 md:p-12 relative overflow-hidden shadow-md border border-[#d4af37]/20">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[#d4af37] text-xs font-serif tracking-widest uppercase border-b border-[#d4af37] pb-1">Exclusive Experience</span>
            <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-wide leading-tight">
              最高の仲間と創り上げた、<br />極上のハーモニーの記録。
            </h2>
            <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">
              価格.comの楽しさと、ヒルトンのような洗練された美しさを融合させた14期専用ポータル。アルバム、秘蔵映像、そしてデジタルパンフレットをご堪能ください。
            </p>
            <div className="pt-2 flex gap-3">
              <a href="#pamphlet" className="bg-[#d4af37] text-black font-medium px-6 py-2.5 rounded text-xs tracking-wider hover:bg-[#c59b27] transition">
                デジタル版パンフを読む
              </a>
              <a href="#movies" className="border border-white/40 hover:border-white px-6 py-2.5 rounded text-xs tracking-wider transition">
                映像集を見る ▶
              </a>
            </div>
          </div>
        </div>

        {/* 1. アルバムセクション */}
        <section id="album" className="space-y-4">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3">
            <div>
              <span className="text-[#d4af37] text-xs font-serif tracking-widest uppercase">Gallery</span>
              <h3 className="text-xl font-serif font-bold text-[#1a1818]">1. アルバム（思い出の足跡）</h3>
            </div>
            <span className="text-xs text-gray-500">合宿・ライブ・練習のハイライト</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* アルバムカード1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition">
              <div className="h-48 bg-[#eae4db] flex items-center justify-center text-gray-500 font-serif text-sm">
                [合宿の満面の笑みフォト]
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded">2025.03 開催</span>
                <h4 className="font-serif font-bold text-sm text-[#1a1818]">はもねぴあ春合宿イン小浜温泉</h4>
                <p className="text-xs text-gray-600 font-light">夜通し語り合い、歌い続けた最高の思い出と温泉の記録。</p>
              </div>
            </div>

            {/* アルバムカード2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition">
              <div className="h-48 bg-[#eae4db] flex items-center justify-center text-gray-500 font-serif text-sm">
                [深夜練習の真剣な横顔]
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded">オフショット</span>
                <h4 className="font-serif font-bold text-sm text-[#1a1818]">レコーディング＆スタジオの裏側</h4>
              </div>
            </div>

            {/* アルバムカード3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition">
              <div className="h-48 bg-[#eae4db] flex items-center justify-center text-gray-500 font-serif text-sm">
                [14期全員集合写真]
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded">記念</span>
                <h4 className="font-serif font-bold text-sm text-[#1a1818]">結成から現在までの軌跡グラフ</h4>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 企画で使う映像集セクション */}
        <section id="movies" className="space-y-4">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3">
            <div>
              <span className="text-[#d4af37] text-xs font-serif tracking-widest uppercase">Movie Collection</span>
              <h3 className="text-xl font-serif font-bold text-[#1a1818]">2. 企画で使う映像集</h3>
            </div>
            <span className="text-xs text-gray-500">笑撃＆感動の編集映像アーカイヴ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">必見・大爆笑</span>
                <h4 className="font-serif font-bold text-base text-[#1a1818] mt-2">14期生 秘蔵サプリンクス映像</h4>
                <p className="text-xs text-gray-600 mt-1 font-light">裏方・動画編集チームが総力を挙げて制作した、あの日の爆笑・感動の未公開映像。</p>
              </div>
              <button className="bg-[#1a1818] text-white hover:bg-[#333] py-2 px-4 rounded text-xs font-medium transition self-start">
                映像を再生する ▶
              </button>
            </div>

            <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">卒ライメイン</span>
                <h4 className="font-serif font-bold text-base text-[#1a1818] mt-2">「THE 14th HARMONY」記念オープニングムービー</h4>
                <p className="text-xs text-gray-600 mt-1 font-light">ステージの幕開けを飾る、洗練された音楽と映像のシンフォニー。</p>
              </div>
              <button className="bg-[#1a1818] text-white hover:bg-[#333] py-2 px-4 rounded text-xs font-medium transition self-start">
                映像を再生する ▶
              </button>
            </div>
          </div>
        </section>

        {/* 3. デジタル版パンフセクション */}
        <section id="pamphlet" className="space-y-4">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3">
            <div>
              <span className="text-[#d4af37] text-xs font-serif tracking-widest uppercase">Digital Pamphlet</span>
              <h3 className="text-xl font-serif font-bold text-[#1a1818]">3. デジタル版パンフレット</h3>
            </div>
            <span className="text-xs text-gray-500">特製ビューア</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 bg-[#eae4db] h-56 rounded flex items-center justify-center text-gray-500 font-serif text-sm border border-gray-300">
              [デジタルパンフ表紙]
            </div>
            <div className="w-full md:w-2/3 space-y-3">
              <span className="text-[10px] bg-[#d4af37]/20 text-[#9a7b1c] px-2.5 py-1 rounded font-bold">公式発行</span>
              <h4 className="text-xl font-serif font-bold text-[#1a1818]">はもねぴあ14期 卒業記念公式パンフレット</h4>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                全バンドのセットリスト、メンバーからの直筆メッセージ、4年間の歴史がこの一冊に凝縮。高級ホテルの客室に置かれたガイドブックをイメージした美しいデジタル冊子です。
              </p>
              <div className="pt-2 flex gap-3">
                <button className="bg-[#1a1818] text-white hover:bg-[#333] px-5 py-2.5 rounded text-xs font-medium transition">
                  デジタルパンフを開く（全ページ閲覧）
                </button>
                <button className="border border-gray-400 hover:border-black px-4 py-2.5 rounded text-xs font-medium transition">
                  PDFダウンロード
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ヒルトン風ラグジュアリーフッター */}
      <footer className="bg-[#1a1818] text-gray-400 text-xs py-10 mt-16 border-t border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <p className="font-serif text-white tracking-widest text-sm">はもねぴあ14期 卒業ライブ実行委員会</p>
          <p className="font-light">おたけ、こっこ、しなぽん、とも、うっしー、まつきよ、ディアナ、あんこ、もんろー、りずり、むっきー、ユン、ゆめ、やっすん、ちぇりこ、えすて</p>
          <p className="text-gray-500 text-[11px] pt-4">© 2027 hamonepia-14th Graduation Live. All Rights Reserved. Luxury & Harmony.</p>
        </div>
      </footer>
    </div>
  );
}