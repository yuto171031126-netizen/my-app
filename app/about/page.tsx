"use client";

// Firebaseなどは以前のものをそのまま引き継ぎ
// (import initializeApp, getFirestore, etc.)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase初期化（以前のYOUR_API_KEYなどを使用）
const firebaseConfig = {
  // ここに自分のConfigを貼り付ける
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// ==========================================
// 型定義（1枚目の画像の情報を統合）
// ==========================================
interface Member {
  id: string; // 詳細ページへのリンクID (例: "dommy", "otake")
  nickname: string; // これをカードのメインタイトルにする
  roleGen: string; // 14期運営時の役職
  roleLive: string; // 14期卒ライ運営時の役職
  // 必要であればパートなども追加可能
  // parts?: string[];
}

// メンバーデータ（1枚目の画像の情報をベースに本名を削除しIDを追加）
const members: Member[] = [
  { id: "dommy", nickname: "ドミー", roleGen: "交流会", roleLive: "交流会" },
  { id: "otake", nickname: "おたけ", roleGen: "部長", roleLive: "部長" },
  { id: "kokko", nickname: "こっこ", roleGen: "副部長", roleLive: "ライブ運営" },
  { id: "shinapon", nickname: "しなぽん", roleGen: "副部長", roleLive: "映像" },
  { id: "tomo", nickname: "とも", roleGen: "—", roleLive: "会計" },
  { id: "usshy", nickname: "うっしー", roleGen: "交流会", roleLive: "交流会" },
  { id: "matsukiyo", nickname: "まつきよ", roleGen: "映像", roleLive: "映像" },
  { id: "diana", nickname: "ディアナ", roleGen: "SNS", roleLive: "映像" },
  { id: "anko", nickname: "あんこ", roleGen: "デザイン", roleLive: "デザイン" },
  { id: "monro", nickname: "もんろー", roleGen: "—", roleLive: "デザイン" },
  { id: "rizuri", nickname: "りずり", roleGen: "ライブ運営", roleLive: "企画" },
  { id: "mukky", nickname: "むっきー", roleGen: "ライブ運営", roleLive: "企画" },
  { id: "yun", nickname: "ユン", roleGen: "デザイン", roleLive: "企画" },
  { id: "yume", nickname: "ゆめ", roleGen: "—", roleLive: "企画" },
  { id: "yassun", nickname: "やっすん", roleGen: "—", roleLive: "企画" },
  { id: "cheriko", nickname: "ちぇりこ", roleGen: "ライブ運営", roleLive: "ライブ運営" },
  { id: "este", nickname: "えすて", roleGen: "ライブ運営", roleLive: "ライブ運営" },
];

export default function MembersGallery() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 bg-zinc-950 text-zinc-50 font-sans">
      
      {/* 1枚目の画像で選んだかっこいいヘッダー（そのまま維持） */}
      <header className="text-center mb-16">
        <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">MEMBERS</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-300">
          14期紹介
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed tracking-wide">
          はもねぴあ14期を形づくる17人のメンバー。この4年間で交わした言葉も、重ねたハーモニーも、そのすべてを懸けた最後のステージを、今ここにお届けします。
        </p>
      </header>

      {/* 2枚目の画像のようなギャラリー（グリッドレイアウト） */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

// 2枚目の画像を再現したクリック可能なメンバーカード（修正版）
function MemberCard({ member }: { member: Member }) {
  // 詳細ページへのURL (例: /about/dommy)
  const detailUrl = `/about/${member.id}`;

  return (
    <a 
      href={detailUrl}
      className="p-6 bg-zinc-900 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-sm select-none
        transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:bg-zinc-800/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
        active:scale-[0.98] active:border-purple-400 active:bg-purple-900/20 active:shadow-[0_0_20px_rgba(168,85,247,0.4)]
      "
    >
      {/* カード上部：アバター部分 */}
      <div className="w-16 h-16 rounded-full bg-zinc-800 mb-4 flex items-center justify-center text-3xl shadow-inner border border-zinc-700">👤</div>

      {/* カード中央：あだ名 */}
      <h2 className="text-2xl font-black text-white hover:text-purple-300 transition-colors duration-150">
        {member.nickname}
      </h2>

      {/* カード下部：役職情報をスタイリッシュにタグ化 */}
      <div className="mt-4 space-y-1.5 w-full flex flex-col items-center">
        {/* 14期運営時の役職 */}
        {member.roleGen !== "—" && (
          <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-[10px] text-zinc-400 font-mono">
            {member.roleGen}
          </span>
        )}
        
        {/* 卒ライ運営時の役職 */}
        <span className="inline-block px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 font-semibold shadow-sm">
          {member.roleLive}
        </span>
      </div>
    </a>
  );
}