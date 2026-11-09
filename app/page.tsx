'use client';

import React, { useState, useEffect } from 'react';

// メインカードの背景スライドショー（実際の写真URLに置き換え可能）
const slideMedia = [
  { type: 'image', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80', caption: '桜と満開の笑顔' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', caption: 'ステージの熱気' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', caption: '大切な仲間たち' },
];

export default function Home() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slideMedia.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf6f2] text-[#3a3330] font-sans">
      {/* 1. 最上部アテンションバナー（桜モチーフ） */}
      <div className="bg-[#2c2421] text-[#e5c378] py-2 px-6 text-xs tracking-widest flex justify-between items-center border-b border-[#e5c378]/30">
        <span className="flex items-center gap-1.5">
          🌸 HAMONEPIA 14TH GRADUATION LIVE — THEMA: <strong className="text-white underline font-serif">"DEAR"</strong>
        </span>
        <span className="text-gray-300 text-[11px]">【卒ライ特設ポータル】</span>
      </div>

      {/* 2. ヘッダー：レター・手紙モチーフのラグジュアリーデザイン */}
      <header className="bg-white/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wider text-[#2c2421] flex items-center gap-3">
              DEAR. <span className="text-xs font-sans font-normal bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full">はもねぴあ14期 卒業ポータル</span>
            </h1>
            <p className="text-xs text-gray-500 font-serif mt-0.5">〜拝啓、4年間を共に過ごした愛しい仲間たちへ〜</p>
          </div>

          {/* 検索バー */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="手紙・バンド・思い出を検索..." 
              className="border border-rose-200 px-4 py-2 rounded-full text-xs w-60 focus:outline-none focus:border-[#e5c378] bg-rose-50/30 shadow-inner"
            />
            <button className="bg-[#2c2421] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-[#453935] transition shadow-xs">
              検索
            </button>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-[#2c2421] text-gray-300 text-xs">
          <div className="max-w-7xl mx-auto flex overflow-x-auto px-4 py-1 gap-1">
            <a href="#top" className="bg-[#e5c378] text-[#2c2421] px-5 py-2 rounded-full font-bold whitespace-nowrap shadow-xs">総合TOP</a>
            <a href="#album" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">1. アルバム（桜の記録）</a>
            <a href="#movies" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">2. 企画映像集</a>
            <a href="#pamphlet" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">3. デジタル版パンフ（DEAR）</a>
            <a href="#access" className="px-5 py-2 rounded-full hover:text-white hover:bg-white/10 whitespace-nowrap transition">会場・アクセス</a>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        
        {/* メインビジュアル：手紙（DEAR）× 桜 × 写真スライドショー */}
        <div className="bg-[#2c2421] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-[#e5c378]/40 min-h-[400px] flex items-center">
          {/* 背景写真スライドショー */}
          {slideMedia.map((media, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                idx === currentIdx ? 'opacity-35' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${media.url})` }}
            />
          ))}
          {/* シックな黒＆桜ピンクのグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1614] via-[#1c1614]/85 to-transparent" />

          {/* コンテンツ */}
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-[#e5c378]/30 px-3 py-1 rounded-full">
              <span className="text-[#e5c378] text-xs font-serif tracking-widest uppercase">GRADUATION LIVE THEME</span>
              <span className="text-rose-300 text-xs font-bold">" DEAR "</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-wide leading-relaxed">
              舞い散る桜の下で紡ぐ、<br />
              一通の特別な手紙（DEAR）。
            </h2>
            <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">
              おたけ、こっこ、しなぽん、とも、そして大切な14期の仲間たちへ。4年間の感謝と愛を込めて、思い出のアルバム・秘蔵映像・デジタルパンフレットをここへ届けます。
            </p>

            <div className="pt-2 flex gap-3">
              <a href="#pamphlet" className="bg-[#e5c378] text-[#2c2421] font-medium px-6 py-3 rounded-full text-xs tracking-wider hover:bg-[#f0d38d] transition shadow-md flex items-center gap-1.5">
                ✉️ デジタルパンフ（手紙）を読む
              </a>
              <a href="#movies" className="border border-white/40 hover:bg-white/10 px-6 py-3 rounded-full text-xs tracking-wider transition">
                映像集を見る ▶
              </a>
            </div>
          </div>
        </div>

        {/* 1. アルバムセクション（桜モチーフ） */}
        <section id="album" className="space-y-4">
          <div className="flex justify-between items-end border-b border-rose-200 pb-3">
            <div>
              <span className="text-[#c29a43] text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                🌸 Gallery & Memories
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2c2421]">1. アルバム（桜色の足跡）</h3>
            </div>
            <span className="text-xs text-gray-500">合宿・練習・最高の笑顔</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition">
              <div className="h-48 bg-[#fbf3eb] flex items-center justify-center text-gray-500 text-xs font-medium">
                [春合宿・小浜温泉の思い出]
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-medium">2025.03 春</span>
                <h4 className="font-serif font-bold text-base text-[#2c2421]">はもねぴあ春合宿イン小浜温泉</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">夜通し語り合い、歌い明かしたかけがえのない時間。</p>
              </div>
            </div>

            <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition">
              <div className="h-48 bg-[#fbf3eb] flex items-center justify-center text-gray-500 text-xs font-medium">
                [スタジオ練習・真剣な一幕]
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">オフショット</span>
                <h4 className="font-serif font-bold text-base text-[#2c2421]">レコーディング＆深夜練習の裏側</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">重ねてきたハーモニーと、その裏にあったたくさんの笑い声。</p>
              </div>
            </div>

            <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition">
              <div className="h-48 bg-[#fbf3eb] flex items-center justify-center text-gray-500 text-xs font-medium">
                [14期全員集合写真]
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-medium">卒業記念</span>
                <h4 className="font-serif font-bold text-base text-[#2c2421]">14期生 Memorial Photo</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">支え合ってきた16人の絆が詰まった最高のアルバム。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 企画映像集セクション */}
        <section id="movies" className="space-y-4">
          <div className="flex justify-between items-end border-b border-rose-200 pb-3">
            <div>
              <span className="text-[#c29a43] text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                🎬 Movie Collection
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2c2421]">2. 企画で使う映像集</h3>
            </div>
            <span className="text-xs text-gray-500">笑撃＆感動のアーカイヴ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 border border-rose-100 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-bold">必見・爆笑必至</span>
                <h4 className="font-serif font-bold text-lg text-[#2c2421] mt-2">14期生 秘蔵サプリンクス映像</h4>
                <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">動画編集チームが愛を込めて制作した、あの日の爆笑＆エモい未公開映像集。</p>
              </div>
              <button className="bg-[#2c2421] text-white hover:bg-[#453935] py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                映像を再生する ▶
              </button>
            </div>

            <div className="bg-white p-6 border border-rose-100 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">DEAR メイン</span>
                <h4 className="font-serif font-bold text-lg text-[#2c2421] mt-2">「DEAR - THE 14th HARMONY」OPムービー</h4>
                <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">ステージの開幕を告げる、手紙と桜が織りなす感動のオープニング。</p>
              </div>
              <button className="bg-[#2c2421] text-white hover:bg-[#453935] py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                映像を再生する ▶
              </button>
            </div>
          </div>
        </section>

        {/* 3. デジタル版パンフセクション（手紙 "DEAR" モチーフ） */}
        <section id="pamphlet" className="space-y-4">
          <div className="flex justify-between items-end border-b border-rose-200 pb-3">
            <div>
              <span className="text-[#c29a43] text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                ✉️ Digital Pamphlet
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2c2421]">3. デジタル版パンフレット</h3>
            </div>
            <span className="text-xs text-gray-500">テーマ：DEAR</span>
          </div>

          <div className="bg-gradient-to-br from-white to-rose-50/40 border border-rose-200/80 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 bg-[#f7eee3] h-64 rounded-xl flex flex-col items-center justify-center text-gray-600 text-xs font-serif border border-[#e5c378]/50 shadow-inner p-4 text-center space-y-2">
              <span className="text-2xl">✉️</span>
              <span className="font-bold text-sm text-[#2c2421]">DEAR</span>
              <span className="text-[11px] text-gray-500">はもねぴあ14期 卒業記念パンフレット</span>
            </div>
            <div className="w-full md:w-2/3 space-y-3">
              <span className="text-[10px] bg-rose-100 text-rose-900 px-3 py-1 rounded-full font-bold">手紙形式パンフレット</span>
              <h4 className="text-2xl font-serif font-bold text-[#2c2421]">DEAR — 16人からあなたへ届ける言葉</h4>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                全出演バンドのセットリスト、手紙（DEAR）として綴られたメンバー一人ひとりからのメッセージ、4年間の思い出を収録。上質な封筒を開くようなワクワク感をお楽しみください。
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <button className="bg-[#2c2421] text-white hover:bg-[#453935] px-6 py-3 rounded-full text-xs font-medium transition shadow-sm flex items-center gap-1.5">
                  ✉️ デジタルパンフ（手紙）を開く
                </button>
                <button className="border border-gray-400 hover:border-black px-5 py-3 rounded-full text-xs font-medium transition">
                  PDF形式で保存
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* フッター */}
      <footer className="bg-[#2c2421] text-gray-400 text-xs py-12 mt-16 border-t border-[#e5c378]/30">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <p className="font-serif text-white tracking-widest text-sm">はもねぴあ14期 卒業ライブ「DEAR」実行委員会</p>
          <p className="font-light text-gray-300">おたけ、こっこ、しなぽん、とも、うっしー、まつきよ、ディアナ、あんこ、もんろー、りずり、むっきー、ユン、ゆめ、やっすん、ちぇりこ、えすて</p>
          <p className="text-gray-500 text-[11px] pt-4">© 2027 hamonepia-14th Graduation Live "DEAR". All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}