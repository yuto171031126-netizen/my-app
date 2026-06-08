import Link from 'next/link'; // 忘れずに追加してください！

export default function GalleryPage() {
  const grades = ["1年", "2年", "3年", "4年"];
  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black mb-8">卒業写真一覧</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-12">
        {grades.map((grade) => (
          <a key={grade} href={`/gallery/${grade}`} className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-500 text-center font-bold">
            {grade}
          </a>
        ))}
      </div>

      {/* ここにホームへ戻るボタンを追加 */}
      <div className="text-center">
        <Link href="/" className="text-zinc-400 hover:text-white underline">
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}