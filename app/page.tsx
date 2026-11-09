import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3a3532] font-sans">
      {/* 1. 最上部アテンションバナー：少し柔らかいトーンに */}
      <div className="bg-[#2a2624] text-[#e6c567] py-2 px-6 text-xs tracking-wider flex justify-between items-center shadow-xs">
        <span>🌸 HAMONEPIA 14TH — SPECIAL GRADUATION PORTAL</span>
        <span className="text-gray-300">【はもねぴあ14期 卒業ライブ特設サイト】</span>
      </div>

      {/* 2. ヘッダー：上品かつ親しみやすいデザイン */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wider text-[#2a2624] flex items-center gap-3">
              卒ライ.com <span className="text-xs font-sans font-normal bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">はもねぴあ14期特設</span>
            </h1>
            <p className="text-xs text-gray-500 font-sans mt-0.5">〜おたけ、こっこ、しなぽん、とも、そして最高の仲間たちと迎える最後の日〜</p>
          </div>

          {/* 検索 */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="バンド・思い出を検索..." 
              className="border border-gray-300 px-4 py-2 rounded-full text-xs w-60 focus:outline-none focus:border-[#d4af37] bg-gray-50 shadow-inner"
            />
            <button className="bg-[#2a2624] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-[#4a4340] transition shadow-xs">
              検索
            </button>
          </div>
        </div>

        {/* タブナビゲーション：丸みを持たせて柔らかく */}
        <div className="bg-[#2a2624] text-gray-300 text-xs">
          <div className="max-w-7xl mx-auto flex overflow-x-auto px-4 py-1 gap-1">
            <a href="#top" className="bg-[#d4af37] text-black px-5 py-2 rounded-full font-bold whitespace-nowrap shadow-xs">総合TOP</a>
            <a href="#album" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">1. アルバム</a>
            <a href="#movies" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">2. 企画映像集</a>
            <a href="#pamphlet" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">3. デジタル版パンフ</a>
            <a href="#access" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">会場・アクセス</a>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        
        {/* ヒーロービジュアル：角を丸くして柔らかい印象に */}
        <div className="bg-gradient-to-br from-[#2a2624] to-[#3a3532] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-[#d4af37]/30">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[#e6c567] text-xs font-sans tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full">Memory & Harmony</span>
            <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-wide leading-relaxed">
              最高の仲間と創り上げた、<br />笑いと感動の記録。
            </h2>
            <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">
              高級感のある落ち着いた雰囲気を残しつつ、みんなとの温かい思い出がたっぷり詰まった14期専用ポータルです。アルバム、映像、デジタルパンフをごゆるりとお楽しみください。
            </p>
            <div className="pt-2 flex gap-3">
              <a href="#pamphlet" className="bg-[#d4af37] text-black font-medium px-6 py-3 rounded-full text-xs tracking-wider hover:bg-[#e6c567] transition shadow-md">
                デジタル版パンフを読む
              </a>
              <a href="#movies" className="border border-white/40 hover:bg-white/10 px-6 py-3 rounded-full text-xs tracking-wider transition">
                映像集を見る ▶
              </a>
            </div>
          </div>
        </div>

        {/* 1. アルバムセクション */}
        <section id="album" className="space-y-4">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3">
            <div>
              <span className="text-[#b8973f] text-xs font-bold tracking-widest uppercase">Gallery</span>
              <h3 className="text-xl font-serif font-bold text-[#2a2624]">1. アルバム（思い出の足跡）</h3>
            </div>
            <span className="text-xs text-gray-500">合宿・ライブ・練習のハイライト</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* アルバムカード1 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-[#f2ece1] flex items-center justify-center text-gray-500 text-xs font-medium">
                [合宿の満面の笑みフォト]
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">2025.03 開催</span>
                <h4 className="font-serif font-bold text-base text-[#2a2624]">はもねぴあ春合宿イン小浜温泉</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">夜通し語り合い、歌い続けた最高の思い出と温泉の記録。</p>
              </div>
            </div>

            {/* アルバムカード2 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-[#f2ece1] flex items-center justify-center text-gray-500 text-xs font-medium">
                [深夜練習の真剣な横顔]
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] bg-pink-100 text-pink-900 px-2.5 py-0.5 rounded-full font-medium">オフショット</span>
                <h4 className="font-serif font-bold text-base text-[#2a2624]">レコーディング＆スタジオの裏側</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">真剣な表情の裏で繰り広げられた爆笑の数々。</p>
              </div>
            </div>

            {/* アルバムカード3 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-48 bg-[#f2ece1] flex items-center justify-center text-gray-500 text-xs font-medium">
                [14期全員集合写真]
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">記念</span>
                <h4 className="font-serif font-bold text-base text-[#2a2624]">結成から現在までの軌跡</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">いつも支え合ってきた最高の仲間たちの写真館。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 企画で使う映像集セクション */}
        <section id="movies" className="space-y-4">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3">
            <div>
              <span className="text-[#b8973f] text-xs font-bold tracking-widest uppercase">Movie Collection</span>
              <h3 className="text-xl font-serif font-bold text-[#2a2624]">2. 企画で使う映像集</h3>
            </div>
            <span className="text-xs text-gray-500">笑撃＆感動の編集映像アーカイヴ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-gray-200/80 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-bold">必見・大爆笑</span>
                <h4 className="font-serif font-bold text-lg text-[#2a2624] mt-2">14期生 秘蔵サプリンクス映像</h4>
                <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">裏方・動画編集チームが総力を挙げて制作した、あの日の爆笑・感動の未公開映像集。</p>
              </div>
              <button className="bg-[#2a2624] text-white hover:bg-[#4a4340] py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                映像を再生する ▶
              </button>
            </div>

            <div className="bg-white p-6 border border-gray-200/80 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">卒ライメイン</span>
                <h4 className="font-serif font-bold text-lg text-[#2a2624] mt-2">「THE 14th HARMONY」記念オープニング</h4>
                <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">ステージの幕開けを飾る、洗練された音楽と映像のシンフォニー。</p>
              </div>
              <button className="bg-[#2a2624] text-white hover:bg-[#4a4340] py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                映像を再生する ▶
              </button>
            </div>
          </div>
        </section>

        {/* 3. デジタル版パンフセクション */}
        <section id="pamphlet" className="space-y-4">
          <div className="flex justify-between items-end border-b border-gray-300 pb-3">
            <div>
              <span className="text-[#b8973f] text-xs font-bold tracking-widest uppercase">Digital Pamphlet</span>
              <h3 className="text-xl font-serif font-bold text-[#2a2624]">3. デジタル版パンフレット</h3>
            </div>
            <span className="text-xs text-gray-500">特製ビューア</span>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 bg-[#f2ece1] h-60 rounded-xl flex items-center justify-center text-gray-500 text-xs font-medium border border-gray-300/60 shadow-inner">
              [デジタルパンフ表紙]
            </div>
            <div className="w-full md:w-2/3 space-y-3">
              <span className="text-[10px] bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold">公式発行</span>
              <h4 className="text-2xl font-serif font-bold text-[#2a2624]">はもねぴあ14期 卒業記念公式パンフレット</h4>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                全バンドのセットリスト、メンバーからの直筆メッセージ、4年間の歴史がこの一冊に凝縮。上質なホテルのラウンジでめくるような、美しさと温かみが共存するデジタル冊子です。
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <button className="bg-[#2a2624] text-white hover:bg-[#4a4340] px-6 py-3 rounded-full text-xs font-medium transition shadow-sm">
                  デジタルパンフを開く（全ページ閲覧）
                </button>
                <button className="border border-gray-400 hover:border-black px-5 py-3 rounded-full text-xs font-medium transition">
                  PDFダウンロード
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* フッター：温かみのある締めくくり */}
      <footer className="bg-[#2a2624] text-gray-400 text-xs py-12 mt-16 border-t border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <p className="font-serif text-white tracking-widest text-sm">はもねぴあ14期 卒業ライブ実行委員会</p>
          <p className="font-light text-gray-300">おたけ、こっこ、しなぽん、とも、うっしー、まつきよ、ディアナ、あんこ、もんろー、りずり、むっきー、ユン、ゆめ、やっすん、ちぇりこ、えすて</p>
          <p className="text-gray-500 text-[11px] pt-4">© 2027 hamonepia-14th Graduation Live. All Rights Reserved. Luxury, Smiles & Harmony.</p>
        </div>
      </footer>
    </div>
  );
}