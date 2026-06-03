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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
          About 14th Gen ({members.length} Members)
        </h1>
        
        <div className="grid gap-3">
          {members.map((member, index) => (
            <div key={index} className={`p-4 bg-zinc-900 border ${member.path !== "#" ? "border-zinc-700 hover:border-purple-500" : "border-zinc-800"} rounded-xl flex items-center justify-between transition-all`}>
              <div>
                {/* ここでリンクかただの文字かを判定しています */}
                {member.path !== "#" ? (
                  <a href={member.path} className="text-lg font-bold hover:text-purple-400 transition-colors block">
                    {member.name} ▷
                  </a>
                ) : (
                  <span className="text-lg font-bold text-zinc-600">{member.name}</span>
                )}
                <p className="text-purple-400/80 text-sm font-medium">あだ名：{member.nickname}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] uppercase tracking-wider text-zinc-400">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        <a href="/" className="inline-block mt-12 text-zinc-500 underline text-sm">← ホームに戻る</a>
      </div>
    </div>
  );
}