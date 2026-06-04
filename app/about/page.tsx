export default function AboutPage() {
  // ここに17人分のデータを管理します
  // 詳細ページを作ったら path を "/members/名前" のように書き換えてください
  const members = [
    { name: "稲富 悠人", nickname: "ドミー", role: "14期 交流会担当・ベース", path: "/members/domy" },
    { name: "準備中", nickname: "---", role: "部長", path: "#" },
    { name: "準備中", nickname: "---", role: "副部長", path: "#" },
    { name: "準備中", nickname: "---", role: "ライブ運営", path: "#" },
    { name: "準備中", nickname: "---", role: "デザイン", path: "#" },
    { name: "準備中", nickname: "---", role: "会計", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
    { name: "準備中", nickname: "---", role: "---", path: "#" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden">
      
      {/* ゆらゆら動く背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:-4s] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10 animate-fade-in">
        
        <header className="text-center mb-16">
          <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">MEMBERS</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-300">
            14期紹介
          </h1>
          <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
            はもねぴあ14期を形づくる17人のメンバー。それぞれの歌声と想いが、このステージで一つになります。
          </p>
        </header>

        {/* div から a タグのリンクに変更してタップ可能に */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {members.map((member) => (
            <a 
              key={member.id}
              href={`/about/${member.id}`} 
              className="p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all duration-500 group shadow-lg text-center block cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                <span className="text-purple-400 font-bold text-sm">14</span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {member.name}
              </h2>
              <p className="text-zinc-500 text-xs mt-1 tracking-wider uppercase">
                {member.role}
              </p>
            </a>
          ))}
        </div>

      </main>

      <footer className="text-center py-12 text-zinc-600 text-xs relative z-10">
        &copy; 2027 はもねぴあ 14期 卒業ライブ特設サイト
      </footer>
    </div>
  );
}