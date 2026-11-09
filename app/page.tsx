import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcf8f5] text-[#333] text-sm">
      {/* 1. 最上部アテンションバナー：エモさとポータル感を両立 */}
      <div className="bg-[#b94040] text-white py-1.5 px-4 text-xs font-bold flex justify-between items-center shadow-sm">
        <span>🌸 【はもねぴあ14期 卒ライ特設ポータル】みんなで作った最高のステージ、いよいよ開幕！</span>
        <span className="bg-amber-300 text-amber-900 px-2 py-0.5 rounded text-[10px] shadow-xs">絆プライスLESS</span>
      </div>

      {/* 2. ヘッダーナビゲーション */}
      <header className="bg-white border-b-2 border-[#b94040] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-[#b94040] tracking-tighter flex items-center gap-2">
                卒ライ.com <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-normal">はもねぴあ14期公式（？）</span>
              </h1>
              <p className="text-[11px] text-gray-500">〜笑いあり、涙あり、ベースの重低音ありの思い出データベース〜</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="バンド名・推しメンバー検索..." 
              className="border-2 border-gray-300 px-3 py-1.5 rounded-l text-xs w-64 focus:outline-none focus:border-[#b94040]"
            />
            <button className="bg-[#b94040] text-white px-4 py-1.5 rounded-r font-bold text-xs hover:bg-red-800 transition">
              検索
            </button>
          </div>
        </div>

        {/* カテゴリタブ */}
        <div className="bg-[#3a3535] text-white text-xs">
          <div className="max-w-7xl mx-auto flex overflow-x-auto">
            <a href="#top" className="bg-[#b94040] px-4 py-2 font-bold whitespace-nowrap">総合TOP</a>
            <a href="#bands" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">全バンド比較</a>
            <a href="#memories" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">14期思い出アルバム</a>
            <a href="#messages" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">仲間からのメッセージ</a>
            <a href="#access" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">会場アクセス</a>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* 左サイドバー: 検索＆14期メンバーピックアップ */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-xs">
            <h2 className="font-bold border-b-2 border-gray-700 pb-1 mb-2 text-sm text-[#b94040] flex items-center gap-1">
              🔍 14期生を条件で探す
            </h2>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1 text-gray-700">■ パートで絞り込み</label>
                <div className="space-y-1 pl-1 text-gray-600">
                  <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Lead / Chorus</label>
                  <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Bass（低音の魅力）</label>
                  <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Voice Percussion</label>
                  <label className="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> アレンジ・裏方班</label>
                </div>
              </div>

              <button className="w-full bg-[#b94040] text-white font-bold py-2 rounded shadow-xs hover:bg-red-800 transition">
                条件を反映して探す
              </button>
            </div>
          </div>

          {/* 14期仲良しコラム枠 */}
          <div className="bg-pink-50 border-2 border-pink-200 p-3 rounded-lg">
            <span className="bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">エモい特設枠</span>
            <h3 className="font-bold text-xs mt-1.5 text-pink-900">✨ はもねぴあ14期の歩み</h3>
            <p className="text-[11px] text-gray-700 mt-1 leading-relaxed">
              合宿での大笑いも、深夜の練習も、全部が宝物。最高の同期と迎える最後の日。
            </p>
          </div>
        </aside>

        {/* 中央メインエリア */}
        <section className="lg:col-span-3 space-y-4">
          
          {/* 最新トピックス */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xs">
            <h2 className="font-bold text-sm text-gray-800 border-b pb-1.5 mb-