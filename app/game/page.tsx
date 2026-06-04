"use client";

import { useState, useEffect, useRef } from "react";

// ノーツ（降ってくる標的）の型定義
interface Note {
  id: number;
  lane: number;
  y: number; // 画面上の上からの位置 (%)
}

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [effect, setEffect] = useState<string | null>(null); // タップエフェクト判定

  const nextNoteId = useRef(0);
  const gameLoopRef = useRef<number | null>(null);

  // レーン数（スマホで片手・両手でもタップしやすい2レーン構成）
  const lanes = [0, 1];

  // ゲーム開始
  const startGame = () => {
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setNotes([]);
    setGameStarted(true);
  };

  // ゲームメインループ
  useEffect(() => {
    if (!gameStarted) return;

    let lastNoteTime = Date.now();

    const updateGame = () => {
      // 1. ノーツを下に動かす
      setNotes((prevNotes) =>
        prevNotes
          .map((note) => ({ ...note, y: note.y + 1.2 })) // 落ちる速度
          .filter((note) => {
            if (note.y > 95) {
              // 画面の一番下まで落ちたらミス
              setCombo(0);
              return false;
            }
            return true;
          })
      );

      // 2. 一定時間ごとにランダムで新しいノーツを生成
      const now = Date.now();
      if (now - lastNoteTime > 800) {
        // 0.8秒ごとに生成
        const randomLane = Math.floor(Math.random() * lanes.length);
        const newNote: Note = {
          id: nextNoteId.current++,
          lane: randomLane,
          y: 0,
        };
        setNotes((prev) => [...prev, newNote]);
        lastNoteTime = now;
      }

      gameLoopRef.current = requestAnimationFrame(updateGame);
    };

    gameLoopRef.current = requestAnimationFrame(updateGame);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameStarted]);

  // タップした時の判定処理
  const handleTap = (lane: number) => {
    if (!gameStarted) return;

    // タップ判定の基準ライン（yが65%〜92%の間がPerfectゾーン）
    const targetNote = notes.find((note) => note.lane === lane && note.y > 65 && note.y < 92);

    if (targetNote) {
      // ヒット成功！
      setNotes((prev) => prev.filter((n) => n.id !== targetNote.id));
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore((prev) => prev + 100 + newCombo * 10); // コンボが繋がるほど高得点
      setEffect("PERFECT!");
    } else {
      // 空振りはミス
      setCombo(0);
      setEffect("MISS");
    }

    // 判定文字を少し経ったら消す
    setTimeout(() => setEffect(null), 300);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between select-none touch-none">
      
      {/* 背景の光 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* ヘッダー・スコア表示 */}
      <header className="p-6 text-center relative z-10">
        <a href="/" className="text-zinc-500 hover:text-purple-400 text-xs transition-colors absolute left-6 top-7">
          ◁ 戻る
        </a>
        <h1 className="text-lg font-bold tracking-widest text-purple-400">14期 BEAT STAGE</h1>
        
        <div className="flex justify-center gap-8 mt-3 font-mono">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase">Score</p>
            <p className="text-xl font-black text-white">{score}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase">Max Combo</p>
            <p className="text-xl font-black text-zinc-300">{maxCombo}</p>
          </div>
        </div>
      </header>

      {/* ゲームプレイエリア */}
      <div className="flex-1 max-w-md w-full mx-auto relative border-x border-zinc-900 bg-zinc-950/40 backdrop-blur-md h-[60vh] overflow-hidden">
        
        {!gameStarted ? (
          // スタート画面
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 z-20 px-6 text-center">
            <h2 className="text-2xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
              開演前の暇つぶしゲーム
            </h2>
            <p className="text-zinc-400 text-xs mb-8 leading-relaxed">
              上から流れてくる「14」のマークが、下のサークルに重なる瞬間にタイミングよくタップせよ！
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-500 transition-all text-sm tracking-widest"
            >
              PLAY START
            </button>
          </div>
        ) : (
          // 判定テキスト
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-30 text-center font-mono">
            {combo > 0 && (
              <div className="text-xs text-purple-400 font-bold tracking-widest animate-bounce">
                {combo} COMBO
              </div>
            )}
            {effect && (
              <div className={`text-2xl font-black tracking-tighter transition-all duration-100 ${
                effect === "PERFECT!" ? "text-yellow-400 scale-110" : "text-zinc-600 scale-95"
              }`}>
                {effect}
              </div>
            )}
          </div>
        )}

        {/* 判定ライン */}
        <div className="absolute bottom-20 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
        
        {/* レーンと降ってくるノーツ */}
        <div className="absolute inset-0 grid grid-cols-2">
          {lanes.map((lane) => (
            <div key={lane} className="relative border-r border-zinc-900/40 last:border-none flex justify-center">
              
              {/* ターゲットの目印サークル */}
              <div className="absolute bottom-14 w-14 h-14 rounded-full border-2 border-zinc-800 flex items-center justify-center bg-zinc-950/20">
                <span className="text-[10px] text-zinc-700 font-bold">TAP</span>
              </div>

              {/* ノーツの描画 */}
              {notes
                .filter((note) => note.lane === lane)
                .map((note) => (
                  <div
                    key={note.id}
                    style={{ top: `${note.y}%` }}
                    className="absolute w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center font-black text-sm text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-white/20 select-none pointer-events-none transition-all duration-75"
                  >
                    14
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* スマホ用下部タップエリア */}
      <footer className="w-full max-w-md mx-auto grid grid-cols-2 gap-2 p-4 bg-zinc-900/30 border-t border-zinc-900 relative z-10">
        <button
          onTouchStart={() => handleTap(0)}
          onClick={() => handleTap(0)}
          className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/30 active:border-purple-500/50 active:shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-2xl text-zinc-500 active:text-purple-300 font-bold transition-all"
        >
          LEFT
        </button>
        <button
          onTouchStart={() => handleTap(1)}
          onClick={() => handleTap(1)}
          className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/30 active:border-purple-500/50 active:shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-2xl text-zinc-500 active:text-purple-300 font-bold transition-all"
        >
          RIGHT
        </button>
      </footer>
    </div>
  );
}