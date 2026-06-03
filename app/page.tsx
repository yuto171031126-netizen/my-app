export default function MembersList() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">メンバー紹介</h1>
      <a href="/members/domy" className="block p-4 border rounded-xl hover:bg-zinc-100">
        稲富 悠人 (ドミー)
      </a>
      <a href="/" className="text-zinc-500 mt-8 block">← ホームに戻る</a>
    </div>
  );
}
