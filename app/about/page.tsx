export default function AboutPage() {
  const members = [
    { name: "稲富 悠人", nickname: "ドミー", role: "14期 交流会担当・ベース" },
    { name: "（準備中）", nickname: "---", role: "部長" },
    { name: "（準備中）", nickname: "---", role: "副部長" },
    { name: "（準備中）", nickname: "---", role: "ライブ運営" },
    { name: "（準備中）", nickname: "---", role: "デザイン" },
    { name: "（準備中）", nickname: "---", role: "会計" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">About 14th Gen</h1>
        
        <div className="grid gap-4">
          {members.map((member, index) => (
            <div key={index} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{member.name}</h2>
                <p className="text-purple-400 font-medium">あだ名：{member.nickname}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">{member.role}</span>
              </div>
            </div>
          ))}
        </div>

        <a href="/" className="inline-block mt-12 text-zinc-500 underline text-sm">← ホームに戻る</a>
      </div>
    </div>
  );
}