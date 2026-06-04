"use client";

import { useState, useEffect, useRef } from "react";

interface Note {
  id: number;
  lane: number;
  y: number;
  isHeal: boolean;
}

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
  const [health, setHealth] = useState(100); 

  const [notes, setNotes] = useState<Note[]>([]);
  const [effect, setEffect] = useState<string | null>(null);
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  // 速度と【レベル】の管理
  const [speed, setSpeed] = useState(1.2); 
  const [level, setLevel] = useState(1); // 初期レベルは1

  const nextNoteId = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const lanes = [0, 1];

  // ランキングの読み込み
  useEffect(() => {
    const savedRanking = localStorage.getItem("14th_game_ranking");
    if (savedRanking) setRanking(JSON.parse(savedRanking));
  }, []);

  // ゲーム開始
  const startGame = () => {
    if (!playerName.trim()) return;
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setNotes([]);
    setHealth(100); 
    setSpeed(1.2);  
    setLevel(1); // レベル1リセット
    setGameOver(false);
    setGameStarted(true);
  };

  // 5秒ごとにレベルアップ ＆ 速度アップするシステム
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const levelTimer = setInterval(() => {
      setLevel((prevLevel) => {
        const nextLevel = prevLevel + 1;
        
        // レベル上昇に合わせてスピードもアップ
        setSpeed((prevSpeed) => {
          const nextSpeed = prevSpeed + 0.15;
          return nextSpeed > 4.0 ? 4.0 : nextSpeed; 
        });

        // 画面に「LEVEL UP!」をぬるっと出すエフェクト
        setEffect(`LEVEL ${nextLevel}!`);
        return nextLevel;
      });
    }, 5000); // 5秒ごとに発動

    return () => clearInterval(levelTimer);
  }, [gameStarted, gameOver]);

  // 体力0の監視
  useEffect(() => {
    if (gameStarted && health <= 0) {
      endGame();
    }
  }, [health, gameStarted]);

  // ゲーム終了
  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);

    const newRecord: RankingItem = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString(),
    };

    const updatedRanking = [...ranking, newRecord]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setRanking(updatedRanking);
    localStorage.setItem("14th_game_ranking", JSON.stringify(updatedRanking));
  };

  // ゲームメインループ
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    let lastNoteTime = Date.now();
    
    const updateGame = () => {
      setNotes((prevNotes) =>
        prevNotes
          .map((note) => ({ ...note, y: note.y + speed })) 
          .filter((note) => {
            if (note.y > 95) {
              setCombo(0);
              if (!note.isHeal) {
                setHealth((prev) => (prev - 10 < 0 ? 0 : prev - 10));
              }
              return false;
            }
            return true;
          })
      );

      const now = Date.now();
      const sampleInterval = Math.max(300, 800 - (level - 1) * 50); // レベルが上がるほどノーツが激しく湧く

      if (now - lastNoteTime > sampleInterval) {
        const randomLane = Math.floor(Math.random() * lanes.length);
        const isHealNote = Math.random() < 0.15; 

        const newNote: Note = { 
          id: nextNoteId.current++, 
          lane: randomLane, 
          y: 0,
          isHeal: isHealNote
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
  }, [gameStarted, gameOver, speed, level]);

  // タップ判定
  const handleTap = (lane: number) => {
    if (!gameStarted || gameOver) return;
    const targetNote = notes.find((note) => note.lane === lane && note.y > 65 && note.y < 92);

    if (targetNote) {
      setNotes((prev) => prev.filter((n) => n.id !== targetNote.id));
      
      if (targetNote.isHeal) {
        setHealth((prev) => (prev + 10 > 100 ? 100 : prev + 10));
        setEffect("HEAL +10!");
      } else {
        const newCombo = combo + 1;
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);
        // レーン成功時、コンボボーナスとは別に基本得点+10の表示イメージに合わせる
        setScore((prev) => prev + 10 + newCombo * 5); 
        setEffect("PERFECT!");
      }
    } else {
      setCombo(0);
      setHealth((prev) => (prev - 10 < 0 ? 0 : prev - 10));
      setEffect("MISS -10");
    }
    setTimeout(() => setEffect(null), 400);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between select-none touch-none">
      
      <header className="p-6 text-center relative z-10 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md">
        <a href="/" className="text-zinc-500 hover:text-purple-400 text-xs absolute left-6 top-7">◁ 戻る</a>
        <h1 className="text-lg font-bold tracking-widest text-purple-400">14th ARCADE CENTER</h1>
      </header>

      <div className="flex-1 max-w-md w-full mx-auto relative px-6 flex flex-col justify-center overflow-y-auto py-6">
        
        {/* 名前入力 */}
        {!isNameEntered && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md">
            <h2 className="text-xl font-black mb-2">エントリーネーム</h2>
            <p className="text-zinc-400 text-xs mb-6">ランキングに刻まれる名前を入力してください</p>
            <input
              type="text"
              maxLength={10}
              placeholder="なまえを入力"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-center focus:outline-none focus:border-purple-500 mb-4 font-bold"
            />
            <button
              onClick={() => playerName.trim() && setIsNameEntered(true)}
              disabled={!playerName.trim()}
              className="w-full py-3 bg-purple-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-xl shadow-lg text-sm tracking-widest"
            >
              ゲーム選択へ ▷
            </button>
          </div>
        )}

        {/* ゲーム選択 ＆ ランキング */}
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
                <div className="font-bold text-white text-sm">GAME 01: 14期 SURVIVAL TAP</div>
                <div className="text-zinc-400 text-xs mt-1">徐々にレベルアップ！ミスを回避して生き残れ（ライフ制）</div>
              </button>
            </div>

            {/* ランキング表示 */}
            <div className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl">
              <h3 className="text-xs font-bold text-yellow-500 tracking-widest uppercase mb-4 text-center">🏆 LOCAL TOP 5 RANKING</h3>
              <div className="space-y-2">
                {ranking.length === 0 ? (
                  <p className="text-center text-zinc-600 text-xs py-4">まだ記録がありません。初代王座を狙え！</p>
                ) : (
                  ranking.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-950/50 border border-white/5 p-3 rounded-xl font-mono">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-black ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-zinc-300" : "text-zinc-600"}`}>
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

        {/* ゲームプレイ画面（UIルール説明 ＆ レベルシステム搭載） */}
        {gameStarted && (
          <div className="flex-1 w-full relative border-x border-zinc-900 bg-zinc-950/40 h-[52vh] overflow-hidden rounded-2xl">
            
            {/* 上部：体力バー ＆ 【LEVEL】表示 */}
            <div className="absolute top-3 left-3 right-3 z-30 bg-zinc-900/90 p-3 rounded-xl border border-white/5 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-[10px] font-mono font-bold mb-1">
                  <span className="text-zinc-400">LIFE: {health}/100</span>
                  <span className="text-zinc-500">x{speed.toFixed(1)}</span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-200 ${
                      health > 50 ? "bg-emerald-500" : health > 20 ? "bg-amber-500" : "bg-red-500 animate-pulse"
                    }`}
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>
              
              {/* レベルバッジ */}
              <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-center font-mono border border-purple-400/30 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <p className="text-[8px] text-purple-200 uppercase leading-none font-bold">LV</p>
                <p className="text-base font-black text-white leading-none mt-0.5">{level}</p>
              </div>
            </div>

            {/* スコア表示 */}
            <div className="absolute top-16 right-3 font-mono text-xs bg-black/50 px-3 py-1 rounded-full border border-white/5 z-30 text-purple-300 font-bold shadow-md">
              SCORE: {score}
            </div>

            {/* ゲーム中のルール早見表 (左側にスタイリッシュに配置) */}
            <div className="absolute top-16 left-3 z-30 font-mono text-[9px] text-zinc-500 bg-zinc-950/60 backdrop-blur-sm p-2 rounded-lg border border-white/5 space-y-1 select-none pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 border border-white/20" />
                <span>通常ノーツ : <span className="text-zinc-300 font-bold">+10 pt</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[6px]">💚</span>
                <span>回復ノーツ : <span className="text-emerald-400 font-bold">+10 HP</span></span>
              </div>
            </div>

            {/* 画面中央のエフェクト文字 (PERFECTやLEVEL UP!) */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-30 text-center font-mono w-full">
              {combo > 0 && <div className="text-xs text-purple-400 font-bold tracking-widest">{combo} COMBO</div>}
              {effect && (
                <div className={`text-2xl font-black tracking-wider transition-all duration-100 uppercase ${
                  effect.includes("LEVEL") ? "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-purple-400 to-cyan-300 scale-120 animate-bounce" :
                  effect.includes("HEAL") ? "text-emerald-400 scale-110" : effect.includes("PERFECT") ? "text-yellow-400" : "text-red-500"
                }`}>
                  {effect}
                </div>
              )}
            </div>

            <div className="absolute bottom-20 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
            <div className="absolute inset-0 grid grid-cols-2 pt-16"> 
              {lanes.map((lane) => (
                <div key={lane} className="relative border-r border-zinc-900/40 last:border-none flex justify-center">
                  <div className="absolute bottom-14 w-14 h-14 rounded-full border-2 border-zinc-800 flex items-center justify-center bg-zinc-950/20">
                    <span className="text-[10px] text-zinc-700 font-bold">TAP</span>
                  </div>
                  
                  {notes.filter((note) => note.lane === lane).map((note) => (
                    <div 
                      key={note.id} 
                      style={{ top: `${note.y}%` }} 
                      className={`absolute w-14 h-14 rounded-full flex items-center justify-center font-black text-sm text-white select-none pointer-events-none ${
                        note.isHeal 
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.7)] border-2 border-white animate-pulse" 
                          : "bg-gradient-to-br from-purple-500 to-blue-600 shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-white/20"
                      }`}
                    >
                      {note.isHeal ? "💚" : "14"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 結果発表 */}
        {gameOver && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md">
            <p className="text-red-500 font-mono text-xs tracking-widest uppercase mb-1 font-bold">GAME OVER</p>
            <h2 className="text-2xl font-black mb-6">サバイバル終了</h2>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono mb-6">
              <p className="text-zinc-500 text-xs">FINAL SCORE</p>
              <p className="text-3xl font-black text-yellow-400 mt-1">{score} <span className="text-xs text-zinc-400">pt</span></p>
              <p className="text-zinc-500 text-[10px] mt-2">最高到達レベル: LV {level} / MAX COMBO: {maxCombo}</p>
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

      {/* 下部スマホコントローラー */}
      {gameStarted && (
        <footer className="w-full max-w-md mx-auto grid grid-cols-2 gap-2 p-4 bg-zinc-900/30 border-t border-zinc-900 relative z-10">
          <button onTouchStart={() => handleTap(0)} onClick={() => handleTap(0)} className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/30 active:border-purple-500/50 rounded-2xl text-zinc-500 active:text-purple-300 font-bold transition-all">LEFT</button>
          <button onTouchStart={() => handleTap(1)} onClick={() => handleTap(1)} className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/30 active:border-purple-500/50 rounded-2xl text-zinc-500 active:text-purple-300 font-bold transition-all">RIGHT</button>
        </footer>
      )}
    </div>
  );
}