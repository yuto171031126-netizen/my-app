"use client"; // カウントダウンの計算にJavaScriptを使うため追加

import { useState, useEffect } from "react";

export default function Home() {
  // カウントダウンの残り日数を計算するロジック
  const [daysLeft, setDaysLeft] = useState<number | string>("--");

  useEffect(() => {
    const targetDate = new Date("2027-03-20T00:00:00"); // ライブ当日
    const calculateDays = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days > 0 ? days : 0);
    };

    calculateDays();
    const timer = setInterval(calculateDays, 60000); // 1分ごとに更新
    return () => clearInterval(timer);
  }, []);

  // お知らせ（News）のデータ。ここを書き換えるだけでリアルタイムに告知を出せます！
  const newsList = [
    { date: "2026.06.04", title: "特設サイトがオープンしました！メンバー詳細を公開中！" },
    { date: "2026.07.01", title: "【予告】出演バンド一覧＆タイムテーブルは秋頃に解禁予定！" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* 高級イージングで動く背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:-5s] pointer-events-none" />

      {/* ぬるっと品よく浮き上がるメインコンテンツ */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 animate-fade-in">
        
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">HAMONEPIA 14th Generation</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-300">
            はもねぴあ 14期 卒業ライブ
          </h1>
          <div className="inline-block px-6 py-2 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full text-zinc-300">
            2027.03.20 | 中部講堂
          </div>
        </header>

        {/* 【新機能】高級感のあるカウントダウンボード */}
        <section className="mb-12 p-6 bg-zinc-900/20 backdrop-blur-md border border-white/5 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mb-1">Countdown to Stage</p>
          <div className="text-sm text-zinc-400 font-medium">
            本番まであと <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-400 font-mono mx-1">{daysLeft}</span> 日
          </div>
        </section>

        {/* 【新機能】リアルタイムNews枠 */}
        <section className="mb-12 p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-3xl shadow-xl">
          <h2 className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-4">Latest News</h2>
          <div className="space-y-4">
            {newsList.map((news, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-zinc-900 last:border-none last:pb-0">
                <span className="text-zinc-500 font-mono text-xs tracking-wider">{news.date}</span>
                <span className="text-zinc-300 text-sm font-medium">{news.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* メニューグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MenuCard href="/about" title="14期紹介 ▷" desc="メンバープロフィール" />
          <MenuCard href="/bands" title="Bands & Members ▷" desc="出演バンド紹介（準備中）" disabled={true} />
          <MenuCard href="/schedule" title="Time Schedule ▷" desc="当日のタイムテーブル（準備中）" disabled={true} />
          <MenuCard href="/access" title="Access ▷" desc="会場への行き方" />
          <MenuCard href="/gallery" title="卒業写真一覧 ▷" desc="1年〜4年の思い出" />
        </div>
      </main>

      <footer className="text-center py-8 text-zinc-600 text-xs relative z-10">
        &copy; 2027 はもねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}

// メニューカード（準備中のものは半透明にしてクリックできないように対応）
function MenuCard({ href, title, desc, disabled = false }: { href: string, title: string, desc: string, disabled?: boolean }) {
  if (disabled) {
    return (
      <div className="p-6 bg-zinc-900/10 backdrop-blur-xs border border-white/5 rounded-2xl opacity-40 shadow-sm select-none">
        <h2 className="text-xl font-bold text-zinc-500">{title}</h2>
        <p className="text-zinc-600 text-sm mt-1">{desc}</p>
      </div>
    );
  }

  return (
    <a 
      href={href} 
      className="p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-zinc-800/60 transition-premium shadow-lg hover:-translate-y-1 block"
    >
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-zinc-400 text-sm mt-1">{desc}</p>
    </a>
  );
}