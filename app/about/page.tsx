export default function AboutPage() {
  // あなたが元々定義していたデータ構造（path をリンクのIDとして活用します）
  // ※もしメンバーが足りない、または名前を変更したい場合はここを自由にいじってください！
  const members = [
    { name: "メンバー 1", nickname: "メン1", role: "Vocal / Leader", path: "member1" },
    { name: "メンバー 2", nickname: "メン2", role: "Vocal", path: "member2" },
    { name: "メンバー 3", nickname: "メン3", role: "Vocal", path: "member3" },
    { name: "メンバー 4", nickname: "メン4", role: "Vocal", path: "member4" },
    { name: "メンバー 5", nickname: "メン5", role: "Vocal", path: "member5" },
    { name: "メンバー 6", nickname: "メン6", role: "Chorus", path: "member6" },
    { name: "メンバー 7", nickname: "メン7", role: "Chorus", path: "member7" },
    { name: "メンバー 8", nickname: "メン8", role: "Chorus", path: "member8" },
    { name: "メンバー 9", nickname: "メン9", role: "Chorus", path: "member9" },
    { name: "メンバー 10", nickname: "メン10", role: "Chorus", path: "member10" },
    { name: "メンバー 11", nickname: "メン11", role: "Bass", path: "member11" },
    { name: "メンバー 12", nickname: "メン12", role: "Bass", path: "member12" },
    { name: "メンバー 13", nickname: "メン13", role: "Percussion", path: "member13" },
    { name: "メンバー 14", nickname: "メン14", role: "Percussion", path: "member14" },
    { name: "メンバー 15", nickname: "メン15", role: "Arranger", path: "member15" },
    { name: "メンバー 16", nickname: "メン16", role: "Staff", path: "member16" },
    { name: "メンバー 17", nickname: "メン17", role: "Staff", path: "member17" },
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
          <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxedtracking-wide">
           はもねぴあ14期を形づくる17人のメンバー。出会いから今日までのすべてをメロディに変えて、17の個性が一つに溶け合う最後のステージを、あなたへ。
          </p>
        </header>

        {/* member.id の代わりに member.path を使うように修正しました */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {members.map((member) => (
            <a 
              key={member.path}
              href={`/about/${member.path}`} 
              className="p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-zinc-800/60 transition-all duration-500 group shadow-lg text-center block cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                <span className="text-purple-400 font-bold text-sm">14</span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                {member.name}
              </h2>
              {member.nickname && (
                <p className="text-zinc-400 text-xs mt-1 italic">({member.nickname})</p>
              )}
              <p className="text-zinc-500 text-xs mt-2 tracking-wider uppercase">
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