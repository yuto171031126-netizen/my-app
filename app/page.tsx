'use client';

import React, { useState, useEffect } from 'react';
import { albumByYears, EventItem } from './data';

// メインカードの背景スライドショー
const slideMedia = [
  { type: 'image', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80', caption: '桜と満開の笑顔' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', caption: 'ステージの熱気' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', caption: '大切な仲間たち' },
];

// 舞い散る桜の花びらの初期データ
const petals = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDuration: `${6 + Math.random() * 6}s`,
  animationDelay: `${Math.random() * 5}s`,
  size: `${12 + Math.random() * 12}px`,
  opacity: 0.4 + Math.random() * 0.4,
}));

export default function Home() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeYearKey, setActiveYearKey] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slideMedia.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentYearData = albumByYears.find((y) => y.yearKey === activeYearKey) || albumByYears[0];

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#4a3e3d] font-sans selection:bg-rose-200 relative overflow-hidden">
      
      {/* 🌸 背景でゆらゆら舞い散る桜 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <style jsx>{`
          @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg) translateX(0); }
            50% { transform: translateY(55vh) rotate(180deg) translateX(25px); }
            100% { transform: translateY(110vh) rotate(360deg) translateX(-15px); }
          }
          .sakura-petal {
            position: absolute;
            top: -5%;
            background: linear-gradient(135deg, #ffb7c5, #ffe4e8);
            border-radius: 15px 0 15px 0;
            animation: fall linear infinite;
          }
        `}</style>
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="sakura-petal"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size,
              animationDuration: petal.animationDuration,
              animationDelay: petal.animationDelay,
              opacity: petal.opacity,
            }}
          />
        ))}
      </div>

      {/* コンテンツ本体 */}
      <div className="relative z-10">
        {/* 最上部バナー */}
        <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 text-rose-900 py-2.5 px-6 text-xs font-medium flex justify-between items-center border-b border-rose-200 shadow-xs">
          <span className="flex items-center gap-2">
            🌸 HAMONEPIA 14TH GRADUATION LIVE — THEME: <strong className="font-serif text-rose-800 text-sm">"DEAR"</strong>
          </span>
          <span className="text-rose-700/80 text-[11px] hidden sm:inline">【はもねぴあ14期 卒業記念ポータル】</span>
        </div>

        {/* ヘッダー */}
        <header className="bg-white/90 backdrop-blur-md border-b border-rose-200/60 sticky top-0 z-50 shadow-xs">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#4a3e3d] flex items-center gap-2.5">
                <span>✉️</span> DEAR. 
                <span className="text-xs font-sans font-normal bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full shadow-2xs">
                  はもねぴあ14期 卒ライ特設
                </span>
              </h1>
              <p className="text-xs text-gray-500 mt-1 font-serif">〜拝啓、4年間を共に駆け抜けた愛しい仲間たちへ〜</p>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="思い出・バンド・手紙を検索..." 
                className="border border-rose-200 px-4 py-2 rounded-full text-xs w-60 focus:outline-none focus:border-rose-400 bg-rose-50/30 text-gray-700 shadow-inner"
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full text-xs font-medium transition shadow-xs">
                検索
              </button>
            </div>
          </div>

          <div className="bg-[#5c4b4a] text-rose-100 text-xs">
            <div className="max-w-7xl mx-auto flex overflow-x-auto px-4 py-1.5 gap-2">
              <a href="#top" className="bg-rose-400 text-white px-5 py-2 rounded-full font-bold whitespace-nowrap shadow-xs">総合TOP</a>
              <a href="#album" className="px-5 py-2 rounded-full hover:bg-white/10 whitespace-nowrap transition">1. アルバム（学年別）</a>
              <a href="#movies" className="px-5 py-2 rounded-full hover:bg-white/10 whitespace-nowrap transition">2. 企画で使う映像集</a>
              <a href="#pamphlet" className="px-5 py-2 rounded-full hover:bg-white/10 whitespace-nowrap transition">3. デジタル版パンフ（DEAR）</a>
              <a href="#access" className="px-5 py-2 rounded-full hover:bg-white/10 whitespace-nowrap transition">会場・アクセス</a>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          
          {/* ヒーロービジュアル */}
          <div className="bg-[#fffdf9]/90 backdrop-blur-xs rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-md border border-rose-200/80 min-h-[360px] flex items-center">
            {slideMedia.map((media, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  idx === currentIdx ? 'opacity-20' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${media.url})` }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-rose-50/50" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-rose-100/70 border border-rose-200 px-3.5 py-1 rounded-full">
                <span className="text-rose-800 text-xs font-serif tracking-wider">GRADUATION THEME</span>
                <span className="text-rose-900 text-xs font-bold font-serif">" DEAR "</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-wide leading-relaxed text-[#4a3e3d]">
                舞い散る桜の下で紡ぐ、<br />
                一通の特別な手紙（DEAR）。
              </h2>
              <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed">
                おたけ、こっこ、しなぽん、とも、そして大切な14期の仲間たちへ。4年間の感謝と愛を込めて、思い出のアルバム・秘蔵映像・デジタルパンフレットをここへ届けます。
              </p>

              <div className="pt-2 flex gap-3">
                <a href="#pamphlet" className="bg-rose-500 text-white font-medium px-6 py-3 rounded-full text-xs tracking-wider hover:bg-rose-600 transition shadow-sm flex items-center gap-1.5">
                  ✉️ デジタルパンフ（手紙）を読む
                </a>
                <a href="#movies" className="border border-rose-300 text-gray-700 hover:bg-rose-50 px-6 py-3 rounded-full text-xs tracking-wider transition">
                  映像集を見る ▶
                </a>
              </div>
            </div>
          </div>

          {/* 1. アルバムセクション（学年を選択 → イベント項目を展開） */}
          <section id="album" className="space-y-6">
            <div className="border-b border-rose-200 pb-3">
              <span className="text-rose-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                🌸 Gallery & Memories
              </span>
              <h3 className="text-xl font-serif font-bold text-[#4a3e3d]">1. アルバム（学年・イベント別）</h3>
              <p className="text-xs text-gray-500 mt-1">見たい学年を選ぶと、その年の合宿やライブなどのイベント項目が表示されます。</p>
            </div>

            {/* Step 1: 1〜4年生の学年選択カード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {albumByYears.map((group) => {
                const isSelected = group.yearKey === activeYearKey;
                return (
                  <button
                    key={group.yearKey}
                    onClick={() => setActiveYearKey(group.yearKey)}
                    className={`p-5 rounded-2xl border text-left transition relative overflow-hidden ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md transform scale-[1.02]'
                        : 'bg-white text-[#4a3e3d] border-rose-200/80 hover:border-rose-400 hover:bg-rose-50/50 shadow-2xs'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-lg font-serif font-bold ${isSelected ? 'text-white' : 'text-rose-700'}`}>
                        {group.yearLabel}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'}`}>
                        {group.events.length} イベント
                      </span>
                    </div>
                    <p className={`text-xs font-light line-clamp-1 ${isSelected ? 'text-rose-100' : 'text-gray-500'}`}>
                      {group.catchphrase}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Step 2: 選択した学年のイベント（項目）一覧表示エリア */}
            <div className="bg-white/80 backdrop-blur-xs border border-rose-200/80 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-rose-100 pb-3">
                <h4 className="font-serif font-bold text-lg text-[#4a3e3d] flex items-center gap-2">
                  <span>✨</span> {currentYearData.yearLabel}の思い出イベント一覧
                </h4>
                <span className="text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {currentYearData.catchphrase}
                </span>
              </div>

              {/* イベントカードグリッド */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {currentYearData.events.map((event: EventItem) => (
                  <div key={event.id} className="bg-[#fffdf9] border border-rose-100 rounded-2xl p-4 shadow-2xs hover:shadow-md transition space-y-3">
                    <div className="h-44 bg-[#f5ede4] rounded-xl flex items-center justify-center text-gray-500 text-xs font-medium border border-rose-100/60 overflow-hidden">
                      {event.imageUrl ? (
                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                      ) : (
                        <span>[{event.title}の写真]</span>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-medium">
                        {event.date}
                      </span>
                      <h5 className="font-serif font-bold text-base text-[#4a3e3d]">{event.title}</h5>
                      <p className="text-xs text-gray-600 font-light leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. 企画映像集セクション */}
          <section id="movies" className="space-y-4">
            <div className="flex justify-between items-end border-b border-rose-200 pb-3">
              <div>
                <span className="text-rose-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  🎬 Movie Collection
                </span>
                <h3 className="text-xl font-serif font-bold text-[#4a3e3d]">2. 企画で使う映像集</h3>
              </div>
              <span className="text-xs text-gray-500">笑撃＆感動のアーカイヴ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-rose-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-bold">必見・爆笑必至</span>
                  <h4 className="font-serif font-bold text-lg text-[#4a3e3d] mt-2">14期生 秘蔵サプリンクス映像</h4>
                  <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">動画編集チームが愛を込めて制作した、あの日の爆笑＆エモい未公開映像集。</p>
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                  映像を再生する ▶
                </button>
              </div>

              <div className="bg-white p-6 border border-rose-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">DEAR メイン</span>
                  <h4 className="font-serif font-bold text-lg text-[#4a3e3d] mt-2">「DEAR - THE 14th HARMONY」OPムービー</h4>
                  <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">ステージの開幕を告げる、手紙と桜が織りなす感動のオープニング。</p>
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                  映像を再生する ▶
                </button>
              </div>
            </div>
          </section>

          {/* 3. デジタル版パンフセクション */}
          <section id="pamphlet" className="space-y-4">
            <div className="flex justify-between items-end border-b border-rose-200 pb-3">
              <div>
                <span className="text-rose-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  ✉️ Digital Pamphlet
                </span>
                <h3 className="text-xl font-serif font-bold text-[#4a3e3d]">3. デジタル版パンフレット</h3>
              </div>
              <span className="text-xs text-gray-500">テーマ：DEAR</span>
            </div>

            <div className="bg-gradient-to-br from-white via-rose-50/20 to-orange-50/20 border border-rose-200/80 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 bg-[#f7eee3] h-64 rounded-2xl flex flex-col items-center justify-center text-gray-600 text-xs font-serif border-2 border-dashed border-rose-200/80 shadow-inner p-4 text-center space-y-2 relative overflow-hidden">
                <span className="text-3xl">✉️</span>
                <span className="font-bold text-base text-[#4a3e3d]">DEAR</span>
                <span className="text-[11px] text-gray-500">はもねぴあ14期 卒業記念パンフレット</span>
              </div>

              <div className="w-full md:w-2/3 space-y-3">
                <span className="text-[10px] bg-rose-100 text-rose-800 px-3 py-1 rounded-full font-bold">手紙形式パンフレット</span>
                <h4 className="text-2xl font-serif font-bold text-[#4a3e3d]">DEAR — 16人からあなたへ届ける言葉</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  全出演バンドのセットリスト、手紙（DEAR）として綴られたメンバー一人ひとりからのメッセージ、4年間の思い出を収録。上質な封筒を開くようなワクワク感をお楽しみください。
                </p>
                <div className="pt-3 flex flex-wrap gap-3">
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full text-xs font-medium transition shadow-sm flex items-center gap-1.5">
                    ✉️ デジタルパンフ（手紙）を開く
                  </button>
                  <button className="border border-gray-300 hover:border-gray-500 text-gray-700 px-5 py-3 rounded-full text-xs font-medium transition">
                    PDF形式で保存
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* フッター */}
        <footer className="bg-[#4a3e3d] text-rose-100 text-xs py-12 mt-16 border-t border-rose-200/30">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
            <p className="font-serif text-[#fcf8f2] tracking-widest text-sm">はもねぴあ14期 卒業ライブ「DEAR」実行委員会</p>
            <p className="font-light text-rose-200/90">おたけ, こっこ, しなぽん, とも, うっしー, まつきよ, ディアナ, あんこ, もんろー, りずり, むっきー, ユン, ゆめ, やっすん, ちぇりこ, えすて</p>
            <p className="text-rose-300/60 text-[11px] pt-4">© 2027 hamonepia-14th Graduation Live "DEAR". All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}