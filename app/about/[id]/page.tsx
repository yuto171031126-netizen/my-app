import { ReactNode } from "react";

// 詳細画面で表示するためのダミーデータ（後から実際の情報に書き換えられます）
const memberData: Record<string, { name: string; role: string; home: string; bands: string[]; message: string }> = {
  member1: {
    name: "メンバー 1",
    role: "Vocal / Leader",
    home: "長崎県",
    bands: ["あかぺらバンドA", "14期全体バンド"],
    message: "4年間最高の仲間と歌えて幸せでした！最高のステージにします！"
  },
  member2: {
    name: "メンバー 2",
    role: "Vocal",
    home: "福岡県",
    bands: ["あかぺらバンドB"],
    message: "見に来てくれた皆さんの心に届くように一生懸命歌います。"
  },
  // 他のメンバーも同様にここにデータを追加していくことができます
};

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  // URLの[id]（member1など）に合わせてデータを取得。なければデフォルトを表示
  const member = memberData[params.id] || {
    name: "はもねぴあ 14期生",
    role: "Vocal",
    home: "未設定",
    bands: ["出演バンド一覧"],
    message: "ここにみんなへの一言が入ります。"
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden">
      
      {/* 共通のゆらゆら動く背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:-4s] pointer-events-none" />

      <main className="max-w-2xl mx-auto px-6 py-16 relative z-10 animate-fade-in">
        
        {/* 戻るボタン */}
        <div className="mb-8">
          <a href="/about" className="text-zinc-400 hover:text-purple-400 transition-colors text-sm inline-flex items-center gap-2 group">
            <span className="transform group-hover:-translate-x-1 transition-transform">◁</span> メンバー一覧に戻る
          </a>
        </div>

        {/* プロフィールメインカード */}
        <div className="p-8 md:p-12 bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl relative">
          
          <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            {member.role}
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-8 text-white tracking-tight">
            {member.name}
          </h1>

          <div className="space-y-6">
            {/* 出身地 */}
            <InfoSection title="出身地">
              <p className="text-zinc-200">{member.home}</p>
            </InfoSection>

            {/* 卒ライ出演バンド */}
            <InfoSection title="卒ライ出演バンド">
              <div className="flex flex-wrap gap-2">
                {member.bands.map((band, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-sm text-zinc-300">
                    {band}
                  </span>
                ))}
              </div>
            </InfoSection>

            {/* みんなへの一言 */}
            <InfoSection title="みんなへの一言">
              <p className="text-zinc-300 text-base leading-relaxed bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/80 italic">
                “ {member.message} ”
              </p>
            </InfoSection>
          </div>

        </div>
      </main>

      <footer className="text-center py-12 text-zinc-600 text-xs relative z-10">
        &copy; 2027 はもねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}

// 共通のレイアウトパーツ
function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-zinc-800/60 pt-4 first:border-none first:pt-0">
      <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{title}</h2>
      {children}
    </div>
  );
}