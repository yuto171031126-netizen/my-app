import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcf8f5] text-[#333] text-sm">
      {/* 1. 最上部アテンションバナー */}
      <div className="bg-[#b94040] text-white py-1.5 px-4 text-xs font-bold flex justify-between items-center shadow-sm">
        <span>🌸 【はもねぴあ14期 卒ライ特設ポータル】みんなで作った最高のステージ、いよいよ開幕！</span>
        <span className="bg-amber-300 text-amber-900 px-2 py-0.5 rounded text-[10px]">絆プライスLESS</span>
      </div>

      {/* 2. ヘッダーナビゲーション */}
      <header className="bg-white border-b-2 border-[#b94040] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-[#b94040] tracking-tighter flex items-center gap-2">
                卒ライ.com <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-normal">はもねぴあ14期公式</span>
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
        
        {/* 左サイドバー */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
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

              <button className="w-full bg-[#b94040] text-white font-bold py-2 rounded hover:bg-red-800 transition">
                条件を反映して探す
              </button>
            </div>
          </div>

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
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="font-bold text-sm text-gray-800 border-b pb-1.5 mb-2 flex items-center gap-1">
              📢 卒ライ直前！14期ニュース
            </h2>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex gap-2 items-center">
                <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-bold">必見</span>
                <span className="hover:underline cursor-pointer font-medium">特設WEBアプリ「THE 14th HARMONY」ついに完成＆公開！</span>
                <span className="text-gray-400 text-[10px] ml-auto">3月9日</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[10px] font-bold">笑撃</span>
                <span className="hover:underline cursor-pointer font-medium">裏方・動画編集チームによる秘蔵映像の放映が決定！</span>
                <span className="text-gray-400 text-[10px] ml-auto">3.8</span>
              </li>
            </ul>
          </div>

          {/* バンド＆思い出スペック比較セクション */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2 mb-3">
              <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                🎤 出演バンド スペック＆絆満足度ランキング
              </h2>
              <span className="text-xs text-gray-500">14期全バンド掲載</span>
            </div>

            {/* バンドカード 1 */}
            <div className="border border-gray-300 rounded-lg p-3.5 mb-3 hover:border-[#b94040] transition bg-white">
              <div className="flex flex-wrap justify-between items-start border-b pb-2 mb-2 gap-2">
                <div>
                  <span className="bg-[#b94040] text-white font-bold text-xs px-2 py-0.5 rounded mr-2">推し度 No.1</span>
                  <h3 className="inline text-base font-bold text-[#b94040] hover:underline cursor-pointer">
                    はもねぴあ14期 看板アッパーバンド
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">仲の良さ </span>
                  <span className="text-amber-500 font-bold text-base">★★★★★ 5.0 (MAX)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-100 h-32 rounded flex flex-col items-center justify-center text-gray-400 font-bold border border-dashed border-gray-300 gap-1">
                  <span>📸 ライブ・練習風景</span>
                  <span className="text-[10px] font-normal text-gray-500">（最高の笑顔たち）</span>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <p className="text-gray-700 font-medium">
                    「最高のグルーヴと重厚な低音で会場をひとつにする！」おたけ、こっこ、しなぽん、ともをはじめとする絆の詰まった最強編成。
                  </p>
                  
                  <table className="w-full border-collapse border border-gray-200 text-[11px]">
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border px-2 py-1 font-bold bg-gray-100 w-24">ジャンル / 曲</td>
                        <td className="border px-2 py-1">J-POP / アッパーチューン</td>
                        <td className="border px-2 py-1 font-bold bg-gray-100 w-20">結びつき</td>
                        <td className="border px-2 py-1 text-red-600 font-bold">家族レベル</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1 font-bold bg-gray-100">笑いあり涙あり度</td>
                        <td className="border px-2 py-1 font-bold text-amber-600">涙腺崩壊注意 (100%)</td>
                        <td className="border px-2 py-1 font-bold bg-gray-100">裏の顔</td>
                        <td className="border px-2 py-1">深夜のラーメン常習犯</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end gap-2 pt-1">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded text-xs transition">
                      メンバー紹介を見る
                    </button>
                    <button className="bg-[#b94040] hover:bg-red-800 text-white font-bold px-4 py-1 rounded text-xs transition">
                      思い出ムービー再生 ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* バンドカード 2 */}
            <div className="border border-gray-300 rounded-lg p-3.5 mb-3 hover:border-[#b94040] transition bg-white">
              <div className="flex flex-wrap justify-between items-start border-b pb-2 mb-2 gap-2">
                <div>
                  <span className="bg-gray-600 text-white font-bold text-xs px-2 py-0.5 rounded mr-2">エモ枠 第2位</span>
                  <h3 className="inline text-base font-bold text-[#b94040] hover:underline cursor-pointer">
                    しっとりバラード＆ハーモニー隊
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">ハーモニー美 </span>
                  <span className="text-amber-500 font-bold text-base">★★★★★ 4.9</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-100 h-32 rounded flex flex-col items-center justify-center text-gray-400 font-bold border border-dashed border-gray-300 gap-1">
                  <span>📸 サークル合宿の思い出</span>
                  <span className="text-[10px] font-normal text-gray-500">（満面の笑み）</span>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <p className="text-gray-700 font-medium">
                    透き通るようなコーラスワークと繊細なアレンジで、聴く人の心を一瞬で包み込む実力派バンド。
                  </p>
                  
                  <table className="w-full border-collapse border border-gray-200 text-[11px]">
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border px-2 py-1 font-bold bg-gray-100 w-24">ジャンル / 曲</td>
                        <td className="border px-2 py-1">バラード / アカペラ名曲</td>
                        <td className="border px-2 py-1 font-bold bg-gray-100 w-20">練習の雰囲気</td>
                        <td className="border px-2 py-1 text-blue-600 font-bold">真剣＆和気あいあい</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1 font-bold bg-gray-100">思い出エピソード</td>
                        <td className="border px-2 py-1 text-gray-700" colSpan={3}>合宿の夜、みんなで星を見ながら語り明かしたのが最高の思い出。</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end gap-2 pt-1">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded text-xs transition">
                      メンバー紹介を見る
                    </button>
                    <button className="bg-[#b94040] hover:bg-red-800 text-white font-bold px-4 py-1 rounded text-xs transition">
                      思い出ムービー再生 ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 14期生みんなへのメッセージセクション */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 border border-red-200 rounded-lg shadow-sm">
            <h2 className="font-bold text-sm text-[#b94040] mb-2 flex items-center gap-1.5">
              💖 はもねぴあ14期 仲間たちへ贈る言葉
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              おたけ、こっこ、しなぽん、とも、うっしー、まつきよ、ディアナ、あんこ、もんろー、りずり、むっきー、ユン、ゆめ、やっすん、ちぇりこ、えすて……そして支えてくれたすべての仲間たち。
              この価格.com風のふざけたポータルサイトのように、笑いと情報がぎっしり詰まった最高の4年間でした。いよいよ迎える卒業ライブ、最高のハーモニーを響かせよう！
            </p>
          </div>

        </section>
      </main>

      {/* フッター */}
      <footer className="bg-[#3a3535] text-gray-300 text-xs py-6 mt-8 border-t-4 border-[#b94040]">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-bold text-white text-sm">はもねぴあ14期 卒業ライブ実行委員会 ＆ THE 14th HARMONY</p>
          <p className="text-gray-400">© 2027 hamonepia-14th Graduation Live. All Rights Reserved. 笑いと感動をありがとう。</p>
        </div>
      </footer>
    </div>
  );
}