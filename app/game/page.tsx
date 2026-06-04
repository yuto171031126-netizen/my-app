"use client";

import { useState, useEffect, useRef } from "react";

interface Note {
  id: number;
  lane: number;
  y: number;
}

// ローカル用のランキングデータ型
interface RankingItem {
  name: string;
  score: number;
  date: string;
}

export default function GamePage() {
  // プレイヤー管理
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);

  // ゲーム状態
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 制限時間30秒
  const [notes, setNotes] = useState<Note[]>([]);
  const [effect, setEffect] = useState<string | null>(null);

  // ランキング（上位5位）
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  const nextNoteId = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const lanes = [0, 1];

  // アプリ起動時に保存されているランキングを読み込む
  useEffect(() => {
    const savedRanking = localStorage.getItem("14th_game_ranking");
    if (savedRanking) {
      setRanking(JSON.parse(savedRanking));
    }
  }, []);

  // ゲーム開始
  const startGame = () => {
    if (!playerName.trim()) return;
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setNotes([]);
    setTimeLeft(30); // 30秒セット
    setGameOver(false);
    setGameStarted(true);
  };

  // タイマーのカウントダウン
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, gameOver]);

  // ゲーム終了処理とランキング更新
  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);

    // 新しいスコアをランキングに反映
    const newRecord: RankingItem = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString(),
    };

    const updatedRanking = [...ranking, newRecord]
      .sort((a, b) => b.score - a.score) // スコア高い順
      .slice(0, 5); // 上位5人のみ

    setRanking(updatedRanking);
    localStorage.setItem("14th_game_ranking", JSON.stringify(updatedRanking)); // スマホに保存
  };

  // ゲームメインループ
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    let lastNoteTime = Date.now();
    const updateGame = () => {
      setNotes((prevNotes) =>
        prevNotes
          .map((note) => ({ ...note, y: note.y + 1.5 })) // 少し速度をアップ
          .filter((note) => {
            if (note.y > 95) {
              setCombo(0);
              return false;
            }
            return true;
          })
      );

      const now = Date.now();
      if (now - lastNoteTime > 600) {
        const randomLane = Math.floor(Math.random() * lanes.length);
        const newNote: Note = { id: nextNoteId.current++, lane: randomLane, y: 0 };
        setNotes((prev) => [...prev, newNote]);
        lastNoteTime = now;
      }
      gameLoopRef.current = requestAnimationFrame(updateGame);
    };

    gameLoopRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameStarted, gameOver]);

  const handleTap = (lane: number) => {
    if (!gameStarted || gameOver) return;
    const targetNote = notes.find((note) => note.lane === lane && note.y > 65 && note.y < 92);

    if (targetNote) {
      setNotes((prev) => prev.filter((n) => n.id !== targetNote.id));
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore((prev) => prev + 100 + newCombo * 10);
      setEffect("PERFECT!");
    } else {
      setCombo(0);
      setEffect("MISS");
    }
    setTimeout(() => setEffect(null), 300);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between select-none touch-none">
      
      {/* 共通ヘッダー */}
      <header className="p-6 text-center relative z-10 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md">
        <a href="/" className="text-zinc-500 hover:text-purple-400 text-xs absolute left-6 top-7">◁ 戻る</a>
        <h1 className="text-lg font-bold tracking-widest text-purple-400">14th ARCADE CENTER</h1>
      </header>

      {/* 画面切り替えのメインエリア */}
      <div className="flex-1 max-w-md w-full mx-auto relative px-6 flex flex-col justify-center overflow-y-auto py-6">
        
        {/* ステップ1: 名前入力画面 */}
        {!isNameEntered && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md">
            <h2 className="text-xl font-black mb-2">エントリーネーム</h2>
            <p className="text-zinc-400 text-xs mb-6">ランキングに刻まれる名前を入力してください</p>
            <input
              type="text"
              maxLength={10}
              placeholder="なまえを入力 (最大10文字)"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-center focus:outline-none focus:border-purple-500 mb-4 font-bold"
            />
            <button
              onClick={() => playerName.trim() && setIsNameEntered(true)}
              disabled={!playerName.trim()}
              className="w-full py-3 bg-purple-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-xl shadow-lg transition-all text-sm tracking-widest"
            >
              ゲーム選択へ ▷
            </button>
          </div>
        )}

        {/* ステップ2: ミニゲーム選択 ＆ ランキング画面 */}
        {isNameEntered && !gameStarted && !gameOver && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl backdrop-blur-md text-center">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Current Player</p>
              <h2 className="text-lg font-bold text-purple-300 mb-6">🔥 {playerName} 🔥</h2>
              
              <p className="text-left text-zinc-400 text-xs font-bold mb-3 uppercase tracking-wider">Select Mini Game</p>
              <button
                onClick={startGame}
                className="w-full p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl text-left hover:border-purple-400 active:scale-[0.98] transition-all block mb-3"
              >
                <div className="font-bold text-white text-sm">GAME 01: 14期 BEAT TAP</div>
                <div className="text-zinc-400 text-xs mt-1">上から降ってくるノーツをリズムよく叩け！（制限時間: 30秒）</div>
              </button>
              <div className="w-full p-4 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl text-left opacity-40 select-none">
                <div className="font-bold text-zinc-500 text-sm">GAME 02: COMING SOON...</div>
              </div>
            </div>

            {/* TOP 5 ランキングボード */}
            <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl">
              <h3 className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-4 text-center">🏆 LOCAL TOP 5 RANKING</h3>
              <div className="space-y-2">
                {ranking.length === 0 ? (
                  <p className="text-center text-zinc-600 text-xs py-4">まだ記録がありません。初代王座を狙え！</p>
                ) : (
                  ranking.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-950/50 border border-white/5 p-3 rounded-xl font-mono">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-black ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-zinc-300" : idx === 2 ? "text-amber-600" : "text-zinc-600"}`}>
                          {idx + 1}位
                        </span>
                        <span className="text-sm font-bold text-zinc-200">{item.name}</span>
                      </div>
                      <span className="text-sm font-black text-purple-400">{item.score} pt</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ステップ3: ゲームプレイ画面（30秒制限時間付き） */}
        {gameStarted && (
          <div className="flex-1 w-full relative border-x border-zinc-900 bg-zinc-950/40 h-[50vh] overflow-hidden rounded-2xl">
            <div className="absolute top-4 left-4 font-mono text-sm bg-black/40 px-3 py-1 rounded-full border border-white/10 z-30">
              TIME: <span className={`font-black ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-green-400"}`}>{timeLeft}</span>s
            </div>
            <div className="absolute top-4 right-4 font-mono text-sm bg-black/40 px-3 py-1 rounded-full border border-white/10 z-30 text-purple-300 font-bold">
              SCORE: {score}
            </div>

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-30 text-center font-mono">
              {combo > 0 && <div className="text-xs text-purple-400 font-bold tracking-widest">{combo} COMBO</div>}
              {effect && <div className={`text-2xl font-black ${effect === "PERFECT!" ? "text-yellow-400 scale-110" : "text-zinc-600"}`}>{effect}</div>}
            </div>

            <div className="absolute bottom-20 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
            <div className="absolute inset-0 grid grid-cols-2">
              {lanes.map((lane) => (
                <div key={lane} className="relative border-r border-zinc-900/40 last:border-none flex justify-center">
                  <div className="absolute bottom-14 w-14 h-14 rounded-full border-2 border-zinc-800 flex items-center justify-center bg-zinc-950/20">
                    <span className="text-[10px] text-zinc-700 font-bold">TAP</span>
                  </div>
                  {notes.filter((note) => note.lane === lane).map((note) => (
                    <div key={note.id} style={{ top: `${note.y}%` }} className="absolute w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center font-black text-sm text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-white/20">
                      14
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ステップ4: リザルト（結果発表）画面 */}
        {gameOver && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md">
            <p className="text-red-400 font-mono text-xs tracking-widest uppercase mb-1">TIME UP!</p>
            <h2 className="text-2xl font-black mb-6">FINISH</h2>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono mb-6">
              <p className="text-zinc-500 text-xs">FINAL SCORE</p>
              <p className="text-3xl font-black text-yellow-400 mt-1">{score} <span className="text-xs text-zinc-400">pt</span></p>
              <p className="text-zinc-500 text-[10px] mt-2">MAX COMBO: {maxCombo}</p>
            </div>
            <button
              onClick={() => setGameOver(false)}
              className="w-full py-3 bg-zinc-800 text-white font-bold rounded-xl mb-2 hover:bg-zinc-700 transition-all text-sm"
            >
              アーケードトップに戻る
            </button>
          </div>
        )}

      </div>

      {/* ゲーム中の時だけ表示される下部スマホコントローラー */}
      {gameStarted && (
        <footer className="w-full max-w-md mx-auto grid grid-cols-2 gap-2 p-4 bg-zinc-900/30 border-t border-zinc-900 relative z-10">
          <button onTouchStart={() => handleTap(0)} onClick={() => handleTap(0)} className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/30 active:border-purple-500/50 rounded-2xl text-zinc-500 active:text-purple-300 font-bold transition-all">LEFT</button>
          <button onTouchStart={() => handleTap(1)} onClick={() => handleTap(1)} className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/30 active:border-purple-500/50 rounded-2xl text-zinc-500 active:text-purple-300 font-bold transition-all">RIGHT</button>
        </footer>
      )}
    </div>
  );
}