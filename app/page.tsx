'use client';

import React, { useState, useEffect } from 'react';
import { albumByYears, EventItem, PhotoDetail } from './data';

const slideMedia = [
  { type: 'image', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80', caption: '桜と満開の笑顔' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', caption: 'ステージの熱気' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', caption: '大切な仲間たち' },
];

const petals = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDuration: `${6 + Math.random() * 6}s`,
  animationDelay: `${Math.random() * 5}s`,
  size: `${10 + Math.random() * 10}px`,
  opacity: 0.4 + Math.random() * 0.4,
}));

export default function Home() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeYearKey, setActiveYearKey] = useState<'1st' | '2nd' | '3rd' | '4th'>('1st');
  
  // 🌟 3段階目（イベントの詳細・写真一覧を見ている状態）を管理するステート
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slideMedia.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentYearData = albumByYears.find((y) => y.yearKey === activeYearKey) || albumByYears[0];

  // 学年を切り替えたら詳細表示をリセット
  const handleYearChange = (yearKey: '1st' | '2nd' | '3rd' | '4th') => {
    setActiveYearKey(yearKey);
    setSelectedEvent(null);
  };

  // デジタル版パンフレット（PDF）を開く関数
  const handleOpenPdf = () => {
    // 実際のPDFのパスやSupabaseのURLに書き換えてください
    window.open('/sample-pamphlet.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#4a3e3d] font-sans selection:bg-rose-200 relative overflow-hidden">
      
      {/* 🌸 背景の桜 */}
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

      <div className="relative z-10">
        {/* 最上部バナー（スマホで文字がはみ出さないよう調整） */}
        <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 text-rose-900 py-2 px-4 sm:px-6 text-[11px] sm:text-xs font-medium flex justify-between items-center border-b border-rose-200">
          <span className="truncate">
            🌸 HAMONEPIA 14TH — THEME: <strong className="font-serif text-rose-800">"DEAR"</strong>
          </span>
          <span className="hidden sm:inline text-rose-700/80">【はもねぴあ14期 卒業記念ポータル】</span>
        </div>

        {/* ヘッダー */}
        <header className="bg-white/90 backdrop-blur-md border-b border-rose-200/60 sticky top-0 z-50 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#4a3e3d] flex items-center gap-2">
                <span>✉️</span> DEAR. 
                <span className="text-[10px] sm:text-xs font-sans font-normal bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  14期 卒ライ特設
                </span>
              </h1>
            </div>

            {/* スマホでは非表示にする検索バー */}
            <div className="hidden md:flex items-center gap-2">
              <input 
                type="text" 
                placeholder="思い出・手紙を検索..." 
                className="border border-rose-200 px-3.5 py-1.5 rounded-full text-xs w-52 focus:outline-none focus:border-rose-400 bg-rose-50/30 text-gray-700"
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition">
                検索
              </button>
            </div>
          </div>

          {/* ナビゲーションメニュー（スマホでスクロール可能） */}
          <div className="bg-[#5c4b4a] text-rose-100 text-xs">
            <div className="max-w-7xl mx-auto flex overflow-x-auto px-4 py-2 gap-3 scrollbar-none">
              <a href="#top" className="bg-rose-400 text-white px-4 py-1.5 rounded-full font-bold whitespace-nowrap shadow-xs">総合TOP</a>
              <a href="#album" className="px-4 py-1.5 rounded-full hover:bg-white/10 whitespace-nowrap transition">アルバム</a>
              <a href="#movies" className="px-4 py-1.5 rounded-full hover:bg-white/10 whitespace-nowrap transition">映像集</a>
              <a href="#pamphlet" className="px-4 py-1.5 rounded-full hover:bg-white/10 whitespace-nowrap transition">デジタルパンフ</a>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12">
          
          {/* ヒーロービジュアル */}
          <div className="bg-[#fffdf9]/90 backdrop-blur-xs rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-md border border-rose-200/80 min-h-[320px] flex items-center">
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

            <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 bg-rose-100/70 border border-rose-200 px-3 py-0.5 rounded-full text-[11px] sm:text-xs">
                <span className="text-rose-800 font-serif">GRADUATION THEME</span>
                <span className="text-rose-900 font-bold font-serif">" DEAR "</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-wide leading-snug sm:leading-relaxed text-[#4a3e3d]">
                舞い散る桜の下で紡ぐ、<br />
                一通の特別な手紙（DEAR）。
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                おたけ、こっこ、しなぽん、とも、そして大切な14期の仲間たちへ。4年間の感謝と愛を込めて、思い出のアルバム・秘蔵映像・パンフレットをお届けします。
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a href="#pamphlet" className="bg-rose-500 text-white font-medium px-5 py-2.5 rounded-full text-xs hover:bg-rose-600 transition shadow-sm flex items-center gap-1.5">
                  ✉️ デジタルパンフを読む
                </a>
                <a href="#movies" className="border border-rose-300 text-gray-700 hover:bg-rose-50 px-5 py-2.5 rounded-full text-xs transition">
                  映像集を見る ▶
                </a>
              </div>
            </div>
          </div>

          {/* 1. アルバムセクション（3段階ドリルダウンUI） */}
          <section id="album" className="space-y-6">
            <div className="border-b border-rose-200 pb-3">
              <span className="text-rose-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                🌸 Gallery & Memories
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#4a3e3d]">思い出アルバム（学年・イベント別）</h3>
              <p className="text-xs text-gray-500 mt-1">学年を選び、イベントをクリックすると、中の写真や思い出が表示されます。</p>
            </div>

            {/* Step 1: 1〜4年生の学年選択ボタン（スマホで2列、PCで4列） */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {albumByYears.map((group) => {
                const isSelected = group.yearKey === activeYearKey;
                return (
                  <button
                    key={group.yearKey}
                    onClick={() => handleYearChange(group.yearKey)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition relative overflow-hidden ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md transform scale-[1.01]'
                        : 'bg-white text-[#4a3e3d] border-rose-200/80 hover:border-rose-400 hover:bg-rose-50/50 shadow-2xs'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-base sm:text-lg font-serif font-bold ${isSelected ? 'text-white' : 'text-rose-700'}`}>
                        {group.yearLabel}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'}`}>
                        {group.events.length}件
                      </span>
                    </div>
                    <p className={`text-[11px] sm:text-xs font-light line-clamp-1 ${isSelected ? 'text-rose-100' : 'text-gray-500'}`}>
                      {group.catchphrase}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Step 2 & 3: イベント一覧 または 選択したイベント内の写真詳細 */}
            <div className="bg-white/80 backdrop-blur-xs border border-rose-200/80 rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 shadow-sm">
              
              {selectedEvent ? (
                // 🌟 ステップ3：イベントの中の写真・詳細一覧ビュー
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-wrap justify-between items-center border-b border-rose-100 pb-3 gap-2">
                    <div>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-bold">
                        {selectedEvent.date}
                      </span>
                      <h4 className="font-serif font-bold text-lg sm:text-xl text-[#4a3e3d] mt-1">
                        ✨ {selectedEvent.title} の思い出写真館
                      </h4>
                    </div>
                    {/* 戻るボタン */}
                    <button 
                      onClick={() => setSelectedEvent(null)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-xs transition font-medium flex items-center gap-1"
                    >
                      🔙 イベント一覧に戻る
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                    📝 {selectedEvent.description}
                  </p>

                  {/* 中の写真グリッド */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {selectedEvent.detailPhotos && selectedEvent.detailPhotos.length > 0 ? (
                      selectedEvent.detailPhotos.map((photo: PhotoDetail) => (
                        <div key={photo.id} className="bg-[#fffdf9] border border-rose-100 rounded-2xl p-3 shadow-2xs space-y-2">
                          <div className="h-48 bg-[#f5ede4] rounded-xl overflow-hidden border border-rose-100/60">
                            <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                          </div>
                          <div>
                            <h5 className="font-serif font-bold text-sm text-[#4a3e3d]">{photo.title}</h5>
                            <p className="text-[11px] text-gray-500 font-light mt-0.5">{photo.caption}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 col-span-full text-py-8">（写真がまだ登録されていません）</p>
                    )}
                  </div>
                </div>
              ) : (
                // 🌟 ステップ2：その学年のイベント項目一覧ビュー
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center border-b border-rose-100 pb-3 gap-2">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#4a3e3d] flex items-center gap-2">
                      <span>✨</span> {currentYearData.yearLabel}の思い出イベント一覧
                    </h4>
                    <span className="text-[11px] text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      {currentYearData.catchphrase}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
                    {currentYearData.events.map((event: EventItem) => (
                      <div 
                        key={event.id} 
                        onClick={() => setSelectedEvent(event)} // 👈 クリックすると中の写真へドリルダウン！
                        className="bg-[#fffdf9] border border-rose-100 rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-rose-300 transition cursor-pointer group space-y-3"
                      >
                        <div className="h-40 sm:h-44 bg-[#f5ede4] rounded-xl overflow-hidden border border-rose-100/60 relative">
                          {event.imageUrl ? (
                            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">[{event.title}]</div>
                          )}
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold bg-rose-900/30">
                            写真をみる 🔍
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full font-medium">
                            {event.date}
                          </span>
                          <h5 className="font-serif font-bold text-sm sm:text-base text-[#4a3e3d] group-hover:text-rose-600 transition">
                            {event.title} ▶
                          </h5>
                          <p className="text-[11px] sm:text-xs text-gray-600 font-light line-clamp-2 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* 2. 企画映像集セクション */}
          <section id="movies" className="space-y-4">
            <div className="flex justify-between items-end border-b border-rose-200 pb-3">
              <div>
                <span className="text-rose-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  🎬 Movie Collection
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#4a3e3d]">2. 企画で使う映像集</h3>
              </div>
              <span className="text-xs text-gray-500 hidden sm:inline">笑撃＆感動のアーカイヴ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 border border-rose-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full font-bold">必見・爆笑必至</span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#4a3e3d] mt-2">14期生 秘蔵サプリンクス映像</h4>
                  <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">動画編集チームが愛を込めて制作した、あの日の爆笑＆エモい未公開映像集。</p>
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                  映像を再生する ▶
                </button>
              </div>

              <div className="bg-white p-5 sm:p-6 border border-rose-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">DEAR メイン</span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#4a3e3d] mt-2">「DEAR - THE 14th HARMONY」OPムービー</h4>
                  <p className="text-xs text-gray-600 mt-1.5 font-light leading-relaxed">ステージの開幕を告げる、手紙と桜が織りなす感動のオープニング。</p>
                </div>
                <button className="bg-rose-500 hover:bg-rose-600 text-white py-2.5 px-5 rounded-full text-xs font-medium transition self-start shadow-xs">
                  映像を再生する ▶
                </button>
              </div>
            </div>
          </section>

          {/* 3. デジタル版パンフセクション（PDFを開く機能付き） */}
          <section id="pamphlet" className="space-y-4">
            <div className="flex justify-between items-end border-b border-rose-200 pb-3">
              <div>
                <span className="text-rose-500 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  ✉️ Digital Pamphlet
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#4a3e3d]">3. デジタル版パンフレット</h3>
              </div>
              <span className="text-xs text-gray-500">テーマ：DEAR</span>
            </div>

            <div className="bg-gradient-to-br from-white via-rose-50/20 to-orange-50/20 border border-rose-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 bg-[#f7eee3] h-56 sm:h-64 rounded-2xl flex flex-col items-center justify-center text-gray-600 text-xs font-serif border-2 border-dashed border-rose-200/80 shadow-inner p-4 text-center space-y-2 relative">
                <span className="text-3xl">✉️</span>
                <span className="font-bold text-base text-[#4a3e3d]">DEAR</span>
                <span className="text-[11px] text-gray-500">はもねぴあ14期 卒業記念パンフレット</span>
              </div>

              <div className="w-full md:w-2/3 space-y-3">
                <span className="text-[10px] bg-rose-100 text-rose-800 px-3 py-1 rounded-full font-bold">手紙形式パンフレット</span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#4a3e3d]">DEAR — 16人からあなたへ届ける言葉</h4>
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                  全出演バンドのセットリスト、手紙（DEAR）として綴られたメンバー一人ひとりからのメッセージ、4年間の思い出を収録。
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button 
                    onClick={handleOpenPdf}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full text-xs font-medium transition shadow-sm flex items-center gap-1.5"
                  >
                    ✉️ デジタルパンフ（PDF）を開く
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* フッター */}
        <footer className="bg-[#4a3e3d] text-rose-100 text-xs py-10 sm:py-12 mt-16 border-t border-rose-200/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <p className="font-serif text-[#fcf8f2] tracking-widest text-sm">はもねぴあ14期 卒業ライブ「DEAR」実行委員会</p>
            <p className="font-light text-rose-200/90 text-[11px] sm:text-xs">おたけ, こっこ, しなぽん, とも, うっしー, まつきよ, ディアナ, あんこ, もんろー, りずり, むっきー, ユン, ゆめ, やっすん, ちぇりこ, えすて</p>
            <p className="text-rose-300/60 text-[10px] sm:text-[11px] pt-4">© 2027 hamonepia-14th Graduation Live "DEAR". All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}