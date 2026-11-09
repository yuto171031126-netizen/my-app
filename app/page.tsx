import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f4f7] text-[#333] text-sm">
      {/* 1. 最上部アテンションバナー */}
      <div className="bg-[#cc0000] text-white py-1 px-4 text-xs font-bold flex justify-between items-center">
        <span>【卒ライ2027】はもねぴあ14期 卒業ライブ特設情報ポータルサイト</span>
        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-[10px]">速報</span>
      </div>

      {/* 2. ヘッダーナビゲーション */}
      <header className="bg-white border-b-2 border-[#cc0000] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#cc0000] tracking-tighter">
              卒ライ.com <span className="text-xs text-gray-500 font-normal">by はもねぴあ14期</span>
            </h1>
            <span className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded">
              掲載バンド数: 14 / 満足度98.5%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="バンド名・曲名・メンバー検索..." 
              className="border-2 border-gray-400 px-3 py-1 rounded-l text-xs w-64 focus:outline-none focus:border-[#cc0000]"
            />
            <button className="bg-[#cc0000] text-white px-4 py-1 rounded-r font-bold text-xs hover:bg-red-700">
              検索
            </button>
          </div>
        </div>

        {/* カテゴリタブ */}
        <div className="bg-[#333] text-white text-xs">
          <div className="max-w-7xl mx-auto flex overflow-x-auto">
            <a href="#top" className="bg-[#cc0000] px-4 py-2 font-bold whitespace-nowrap">総合TOP</a>
            <a href="#bands" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">出演バンド比較</a>
            <a href="#setlist" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">タイムテーブル</a>
            <a href="#access" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">会場アクセス</a>
            <a href="#ticket" className="px-4 py-2 hover:bg-gray-700 whitespace-nowrap">チケット予約（無料）</a>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* 左サイドバー: 条件絞り込み（ポータルサイト特有の要素） */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-white p-3 border border-gray-300 rounded shadow-sm">
            <h2 className="font-bold border-b-2 border-gray-800 pb-1 mb-2 text-sm text-[#0044cc]">
              🔍 条件でバンドを絞り込む
            </h2>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">■ ジャンル</label>
                <div className="space-y-1 pl-1">
                  <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> J-POP / 邦ロック</label>
                  <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> 洋楽 / R&B</label>
                  <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> アニソン / ボカロ</label>
                  <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> バラード・しっとり系</label>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">■ 構成人数</label>
                <div className="space-y-1 pl-1">
                  <label className="flex items-center gap-1"><input type="checkbox" /> 5人編成</label>
                  <label className="flex items-center gap-1"><input type="checkbox" /> 6人編成</label>
                  <label className="flex items-center gap-1"><input type="checkbox" /> ヤロボ / ギャロボ</label>
                </div>
              </div>

              <button className="w-full bg-[#0044cc] text-white font-bold py-1.5 rounded hover:bg-blue-800 transition">
                この条件で検索する
              </button>
            </div>
          </div>

          {/* ピックアップ広告風枠 */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded">
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-1 rounded">注目</span>
            <h3 className="font-bold text-xs mt-1 text-red-700">【学割・早割】来場者限定特典</h3>
            <p className="text-[11px] text-gray-600 mt-1">当日来場者全員に14期特製ステッカー＆パンフレット配布決定！</p>
          </div>
        </aside>

        {/* 中央メインエリア */}
        <section className="lg:col-span-3 space-y-4">
          
          {/* お知らせ・トピックス */}
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <h2 className="font-bold text-base text-[#cc0000] border-b pb-1 mb-2">
              📢 14期卒ライ 最新トピックス
            </h2>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex gap-2">
                <span className="text-gray-400">2027.03.01</span>
                <span className="bg-red-100 text-red-700 px-1 rounded text-[10px] font-bold">重要</span>
                <span className="hover:underline cursor-pointer">特設WEBアプリ「THE 14th HARMONY」正式リリース！</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-400">2027.02.20</span>
                <span className="bg-blue-100 text-blue-700 px-1 rounded text-[10px]">NEW</span>
                <span className="hover:underline cursor-pointer">タイムテーブル＆セットリスト第一弾を公開しました</span>
              </li>
            </ul>
          </div>

          {/* バンドランキング・スペック比較カード */}
          <div className="bg-white p-4 border border-gray-300 rounded shadow-sm">
            <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2 mb-3">
              <h2 className="font-bold text-base text-gray-800">
                🏆 出演バンドスペック比較＆おすすめ一覧
              </h2>
              <span className="text-xs text-gray-500">更新日: 2027年3月9日</span>
            </div>

            {/* バンドカード 1 */}
            <div className="border border-gray-300 rounded p-3 mb-3 hover:border-blue-500 bg-white">
              <div className="flex flex-wrap justify-between items-start border-b pb-2 mb-2 gap-2">
                <div>
                  <span className="bg-red-600 text-white font-bold text-xs px-2 py-0.5 rounded mr-2">第1位</span>
                  <h3 className="inline text-base font-bold text-[#0044cc] hover:underline cursor-pointer">
                    バンド名 A（例: Official髭男dismカバー）
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">おすすめ度 </span>
                  <span className="text-orange-500 font-bold text-base">★★★★★ 4.9</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-100 h-28 rounded flex items-center justify-center text-gray-400 font-bold">
                  [バンド写真/アイキャッチ]
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <p className="text-gray-700 font-semibold">
                    重厚なベースラインと伸びやかなリードヴォーカルが特徴の14期看板バンド。
                  </p>
                  
                  {/* 価格.com風 スペック表 */}
                  <table className="w-full border-collapse border border-gray-200 text-[11px]">
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border px-2 py-0.5 font-bold bg-gray-100 w-20">演奏ジャンル</td>
                        <td className="border px-2 py-0.5">J-POP / アッパーチューン</td>
                        <td className="border px-2 py-0.5 font-bold bg-gray-100 w-20">メンバー構成</td>
                        <td className="border px-2 py-0.5">6人 (Lead, Top, Mid, Low, Bass, VoicePerc)</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-0.5 font-bold bg-gray-100">出演時間</td>
                        <td className="border px-2 py-0.5 text-red-600 font-bold">14:30 〜 (ブロックA)</td>
                        <td className="border px-2 py-0.5 font-bold bg-gray-100">盛り上がり度</td>
                        <td className="border px-2 py-0.5 text-orange-600 font-bold">MAX (SSS)</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end gap-2 pt-1">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-3 py-1 rounded text-xs">
                      詳細・セットリスト
                    </button>
                    <button className="bg-[#cc0000] hover:bg-red-700 text-white font-bold px-4 py-1 rounded text-xs">
                      演奏動画を再生 ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* バンドカード 2 */}
            <div className="border border-gray-300 rounded p-3 mb-3 hover:border-blue-500 bg-white">
              <div className="flex flex-wrap justify-between items-start border-b pb-2 mb-2 gap-2">
                <div>
                  <span className="bg-gray-600 text-white font-bold text-xs px-2 py-0.5 rounded mr-2">第2位</span>
                  <h3 className="inline text-base font-bold text-[#0044cc] hover:underline cursor-pointer">
                    バンド名 B（例: バラードアカペラ）
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">おすすめ度 </span>
                  <span className="text-orange-500 font-bold text-base">★★★★☆ 4.7</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-100 h-28 rounded flex items-center justify-center text-gray-400 font-bold">
                  [バンド写真/アイキャッチ]
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <p className="text-gray-700 font-semibold">
                    澄み切ったハーモニーと繊細な表現力で会場を包み込むしっとり系バンド。
                  </p>
                  
                  <table className="w-full border-collapse border border-gray-200 text-[11px]">
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="border px-2 py-0.5 font-bold bg-gray-100 w-20">演奏ジャンル</td>
                        <td className="border px-2 py-0.5">バラード / 邦楽カバー</td>
                        <td className="border px-2 py-0.5 font-bold bg-gray-100 w-20">メンバー構成</td>
                        <td className="border px-2 py-0.5">5人 (コーラス重視)</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-0.5 font-bold bg-gray-100">出演時間</td>
                        <td className="border px-2 py-0.5 text-red-600 font-bold">15:15 〜 (ブロックB)</td>
                        <td className="border px-2 py-0.5 font-bold bg-gray-100">エモさ指数</td>
                        <td className="border px-2 py-0.5 text-blue-600 font-bold">100%</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end gap-2 pt-1">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-3 py-1 rounded text-xs">
                      詳細・セットリスト
                    </button>
                    <button className="bg-[#cc0000] hover:bg-red-700 text-white font-bold px-4 py-1 rounded text-xs">
                      演奏動画を再生 ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-[#333] text-gray-300 text-xs py-6 mt-8 border-t-4 border-[#cc0000]">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-bold text-white">はもねぴあ14期 卒業ライブ実行委員会</p>
          <p>© 2027 hamonepia-14th Graduation Live. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}