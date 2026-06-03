// メンバーのデータを用意（これを外に出すとよりスマートになります）
const members = [
  { name: "サークル長 太郎", part: "リード" },
  { name: "副長 花子", part: "コーラス" },
  { name: "会計 次郎", part: "ベース" },
];

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">メンバー一覧</h1>
      {/* データをループして表示する */}
      {members.map((member, index) => (
        <div key={index} className="p-4 mb-2 border rounded">
          <p className="font-bold">{member.name}</p>
          <p className="text-sm text-gray-500">{member.part}</p>
        </div>
      ))}
    </div>
  );
}
