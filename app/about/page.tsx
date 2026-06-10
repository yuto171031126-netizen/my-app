"use client";

import { useState } from "react";

interface Member {
  name: string;
  nickname: string;
  roleGen: string; // 14期運営時の役職
  roleLive: string; // 14期卒ライ運営時の役職
}

export default function MembersTable() {
  const members: Member[] = [
    { name: "稲富 悠人", nickname: "ドミー", roleGen: "交流会", roleLive: "交流会" },
    { name: "メンバーA", nickname: "おたけ", roleGen: "部長", roleLive: "部長" },
    { name: "メンバーB", nickname: "こっこ", roleGen: "副部長", roleLive: "ライブ運営" },
    { name: "メンバーC", nickname: "しなぽん", roleGen: "副部長", roleLive: "映像" },
    { name: "メンバーD", nickname: "とも", roleGen: "—", roleLive: "会計" },
    { name: "メンバーE", nickname: "うっしー", roleGen: "交流会", roleLive: "交流会" },
    { name: "メンバーF", nickname: "まつきよ", roleGen: "映像", roleLive: "映像" },
    { name: "メンバーG", nickname: "ディアナ", roleGen: "SNS", roleLive: "映像" },
    { name: "メンバーH", nickname: "あんこ", roleGen: "デザイン", roleLive: "デザイン" },
    { name: "メンバーI", nickname: "もんろー", roleGen: "—", roleLive: "デザイン" },
    { name: "メンバーJ", nickname: "りずり", roleGen: "ライブ運営", roleLive: "企画" },
    { name: "メンバーK", nickname: "むっきー", roleGen: "ライブ運営", roleLive: "企画" },
    { name: "メンバーL", nickname: "ユン", roleGen: "デザイン", roleLive: "企画" },
    { name: "メンバーM", nickname: "ゆめ", roleGen: "—", roleLive: "企画" },
    { name: "メンバーN", nickname: "やっすん", roleGen: "—", roleLive: "企画" },
    { name: "メンバーO", nickname: "ちぇりこ", roleGen: "ライブ運営", roleLive: "ライブ運営" },
    { name: "メンバーP", nickname: "えすて", roleGen: "ライブ運営", roleLive: "ライブ運営" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-zinc-950 text-zinc-50">
      
      {/* 以前選んだかっこいいヘッダー部分 */}
      <header className="text-center mb-12">
        <p className="text-purple-400 font-bold tracking-widest text-sm uppercase mb-3">MEMBERS</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-300">
          14期紹介
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed tracking-wide">
          はもねぴあ14期を形づくる17人のメンバー。この4年間で交わした言葉も、重ねたハーモニーも、そのすべてを懸けた最後のステージを、今ここにお届けします。
        </p>
      </header>

      {/* メンバー紹介テーブル */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/20 backdrop-blur-sm shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs uppercase tracking-wider font-bold">
              <th className="py-4 px-6">名前</th>
              <th className="py-4 px-6">あだ名</th>
              <th className="py-4 px-6 text-purple-300">14期運営時の役職</th>
              <th className="py-4 px-6 text-purple-400">卒ライ運営時の役職</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-sm font-medium">
            {members.map((member, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-zinc-800/30 transition-colors duration-150 group"
              >
                <td className="py-4 px-6 text-white font-bold group-hover:text-purple-300 transition-colors">
                  {member.name}
                </td>
                <td className="py-4 px-6 text-zinc-300 font-mono">
                  {member.nickname}
                </td>
                <td className="py-4 px-6 text-zinc-400">
                  {member.roleGen === "—" ? (
                    <span className="text-zinc-600 font-mono">—</span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300">
                      {member.roleGen}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 font-semibold shadow-sm">
                    {member.roleLive}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}