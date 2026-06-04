"use client";

import { useState, useEffect, useRef } from "react";

// ==========================================
// 型定義
// ==========================================
interface Note { id: number; lane: number; y: number; isHeal: boolean; }
interface RankingItem { name: string; score: number; textScore?: string; date: string; }
interface Card { id: number; memberId: number; name: string; isFlipped: boolean; isMatched: boolean; }

// 14期のメンバーリスト（仮で14人。後でお名前に変更してください！）
const MEMBER_LIST = [
  "メンバーA", "メンバーB", "メンバーC", "メンバーD", "メンバーE", 
  "メンバーF", "メンバーG", "メンバーH", "メンバーI", "メンバーJ", 
  "メンバーK", "メンバーL", "メンバーM", "メンバーN"
];

export default function GamePage() {
  // プレイヤー ＆ モード管理
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [activeGame, setActiveGame] = useState<"none" | "beat" | "memory">("none");

  // ランキングデータ（ゲームごとに分離）
  const [rankingBeat, setRankingBeat] = useState<RankingItem[]>([]);
  const [rankingMemory, setRankingMemory] = useState<RankingItem[]>([]);

  // ------------------------------------------
  // GAME 01: 音ゲー用の状態
  // ------------------------------------------
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [health, setHealth] = useState(100); 
  const [notes, setNotes] = useState<Note[]>([]);
  const [effect, setEffect] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1.2); 
  const [level, setLevel] = useState(1); 
  const nextNoteId = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const lanes = [0, 1];

  // ------------------------------------------
  // GAME 02: 神経衰弱用の状態
  // ------------------------------------------
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [memoryTime, setMemoryTime] = useState(0); // 経過タイム（秒）
  const [memoryStarted, setMemoryStarted] = useState(false);
  const [memoryOver, setMemoryOver] = useState(false);
  const [isLock, setIsLock] = useState(false); // アニメーション中の連続タップ防止
  const memoryTimerRef = useRef<number | null>(null);

  // 起動時にランキング読み込み
  useEffect(() => {
    const savedBeat = localStorage.getItem("14th_ranking_beat");
    const savedMemory = localStorage.getItem("14th_ranking_memory");
    if (savedBeat) setRankingBeat(JSON.parse(savedBeat));
    if (savedMemory) setRankingMemory(JSON.parse(savedMemory));
  }, []);

  // ==========================================
  // GAME 01: 音ゲー ロジック
  // ==========================================
  const startBeatGame = () => {
    setScore(0); setCombo(0); setMaxCombo(0); setNotes([]); setHealth(100); setSpeed(1.2); setLevel(1);
    setActiveGame("beat");
  };

  useEffect(() => {
    if (activeGame !== "beat" || health <= 0) {
      if (activeGame === "beat" && health <= 0) endBeatGame();
      return;
    }
    const levelTimer = setInterval(() => {
      setLevel((prev) => {
        const next = prev + 1;
        setSpeed((s) => Math.min(4.0, s + 0.15));
        setEffect(`LEVEL ${next}!`);
        return next;
      });
    }, 5000);
    return () => clearInterval(levelTimer);
  }, [activeGame, health]);

  const endBeatGame = () => {
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    const newRecord: RankingItem = { name: playerName, score: score, date: new Date().toLocaleDateString() };
    const updated = [...rankingBeat, newRecord].sort((a, b) => b.score - a.score).slice(0, 5);
    setRankingBeat(updated);
    localStorage.setItem("14th_ranking_beat", JSON.stringify(updated));
    setActiveGame("none");
    alert(`ゲームオーバー！ スコア: ${score} pt`);
  };

  useEffect(() => {
    if (activeGame !== "beat") return;
    let lastNoteTime = Date.now();
    const updateGame = () => {
      setNotes((prev) =>
        prev.map((n) => ({ ...n, y: n.y + speed })).filter((n) => {
          if (n.y > 95) {
            setCombo(0);
            if (!n.isHeal) setHealth((h) => Math.max(0, h - 10));
            return false;
          }
          return true;
        })
      );
      const now = Date.now();
      const interval = Math.max(300, 800 - (level - 1) * 50);
      if (now - lastNoteTime > interval) {
        setNotes((prev) => [...prev, { id: nextNoteId.current++, lane: Math.floor(Math.random() * 2), y: 0, isHeal: Math.random() < 0.15 }]);
        lastNoteTime = now;
      }
      gameLoopRef.current = requestAnimationFrame(updateGame);
    };
    gameLoopRef.current = requestAnimationFrame(updateGame);
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, [activeGame, speed, level]);

  const handleBeatTap = (lane: number) => {
    const target = notes.find((n) => n.lane === lane && n.y > 65 && n.y < 92);
    if (target) {
      setNotes((prev) => prev.filter((n) => n.id !== target.id));
      if (target.isHeal) {
        setHealth((h) => Math.min(100, h + 10));
        setEffect("HEAL +10!");
      } else {
        const newCombo = combo + 1;
        setCombo(newCombo);
        if (newCombo > maxCombo) setMaxCombo(newCombo);
        const added = Math.floor(10 * (1 + Math.floor(newCombo / 10) * 0.1));
        setScore((s) => s + added);
        setEffect(`PERFECT! +${added}`);
      }
    } else {
      setCombo(0);
      setHealth((h) => Math.max(0, h - 10));
      setEffect("MISS -10");
    }
    setTimeout(() => setEffect(null), 400);
  };

  // ==========================================
  // GAME 02: 神経衰弱 ロジック
  // ==========================================
  const startMemoryGame = () => {
    // 28枚のカードデッキ生成（14人 × 2枚）
    let deck: Card[] = [];
    MEMBER_LIST.forEach((name, id) => {
      deck.push({ id: id * 2, memberId: id, name, isFlipped: false, isMatched: false });
      deck.push({ id: id * 2 + 1, memberId: id, name, isFlipped: false, isMatched: false });
    });
    // シャッフル
    deck.sort(() => Math.random() - 0.5);

    setCards(deck);
    setSelectedIndices([]);
    setMemoryTime(0);
    setMemoryOver(false);
    setIsLock(false);
    setMemoryStarted(true);
    setActiveGame("memory");

    // タイマースタート
    if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
    memoryTimerRef.current = window.setInterval(() => {
      setMemoryTime((t) => t + 1);
    }, 1000);
  };

  const handleCardClick = (index: number) => {
    if (isLock || cards[index].isFlipped || cards[index].isMatched) return;

    // 1枚目または2枚目をめくるムーブ
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const nextSelect = [...selectedIndices, index];
    setSelectedIndices(nextSelect);

    if (nextSelect.length === 2) {
      setIsLock(true);
      const [firstIdx, secondIdx] = nextSelect;

      if (cards[firstIdx].memberId === cards[secondIdx].memberId) {
        // ペア成立！
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedIndices([]);
          setIsLock(false);

          // 全て揃ったかチェック
          if (matchedCards.every((c) => c.isMatched)) {
            endMemoryGame(true);
          }
        }, 500);
      } else {
        // 不一致…カードを裏に戻す
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setSelectedIndices([]);
          setIsLock(false);
        }, 1000); // 1秒間だけ見せてから戻る
      }
    }
  };

  const endMemoryGame = (isClear: boolean) => {
    if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
    setMemoryStarted(false);
    setMemoryOver(true);

    if (isClear) {
      // タイムアタックなので、スコアは「秒数」（低いほど高順位）
      // ランキング保存用にscoreに変換（ソートのためタイムをscoreに入れる。低い順ソート）
      const newRecord: RankingItem = {
        name: playerName,
        score: memoryTime, // ソート用秒数
        textScore: `${memoryTime}秒`,
        date: new Date().toLocaleDateString()
      };
      const updated = [...rankingMemory, newRecord].sort((a, b) => a.score - b.score).slice(0, 5);
      setRankingMemory(updated);
      localStorage.setItem("14th_ranking_memory", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between select-none">
      
      {/* 共通ヘッダー */}
      <header className="p-6 text-center relative z-10 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md">
        {activeGame !== "none" ? (
          <button onClick={() => { setActiveGame("none"); if(memoryTimerRef.current) clearInterval(memoryTimerRef.current); }} className="text-zinc-500 hover:text-purple-400 text-xs absolute left-6 top-7">◁ 中断</button>
        ) : (
          <a href="/" className="text-zinc-500 hover:text-purple-400 text-xs absolute left-6 top-7">◁ 戻る</a>
        )}
        <h1 className="text-lg font-bold tracking-widest text-purple-400">14th ARCADE CENTER</h1>
      </header>

      {/* メメインコンテンツ */}
      <div className="flex-1 max-w-xl w-full mx-auto relative px-4 flex flex-col justify-center py-6 overflow-y-auto">
        
        {/* ステップ1: 名前入力 */}
        {!isNameEntered && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md max-w-md mx-auto w-full">
            <h2 className="text-xl font-black mb-2">エントリーネーム</h2>
            <p className="text-zinc-400 text-xs mb-6">ランキングに刻まれる名前を入力してください</p>
            <input
              type="text"
              maxLength={10}
              placeholder="名前を入力"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-center focus:outline-none focus:border-purple-500 mb-4 font-bold"
            />
            <button
              onClick={() => playerName.trim() && setIsNameEntered(true)}
              disabled={!playerName.trim()}
              className="w-full py-3 bg-purple-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-xl shadow-lg text-sm tracking-widest"
            >
              ゲームセンターへ入場 ▷
            </button>
          </div>
        )}

        {/* ステップ2: 総合ゲーム選択 ＆ 各自ランキング */}
        {isNameEntered && activeGame === "none" && !memoryOver && (
          <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl backdrop-blur-md text-center">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Player</p>
              <h2 className="text-lg font-bold text-purple-300 mb-6">🔥 {playerName} 🔥</h2>
              
              <p className="text-left text-zinc-400 text-xs font-bold mb-3 uppercase tracking-wider">Select Mini Game</p>
              
              {/* GAME 01 */}
              <button
                onClick={startBeatGame}
                className="w-full p-4 bg-gradient-to-r from-purple-900/20 to-zinc-900/40 border border-purple-500/20 rounded-2xl text-left hover:border-purple-500/50 active:scale-[0.98] transition-all block mb-3"
              >
                <div className="font-bold text-white text-sm">GAME 01: 14th SURVIVAL TAP</div>
                <div className="text-zinc-400 text-xs mt-1">レベルが上がるほど高速化するサバイバル音ゲー！</div>
              </button>

              {/* GAME 02: 神経衰弱 */}
              <button
                onClick={startMemoryGame}
                className="w-full p-4 bg-gradient-to-r from-blue-900/20 to-zinc-900/40 border border-blue-500/20 rounded-2xl text-left hover:border-blue-500/50 active:scale-[0.98] transition-all block"
              >
                <div className="font-bold text-white text-sm">GAME 02: 14期生 真剣衰弱 🃏</div>
                <div className="text-zinc-400 text-xs mt-1">全28枚のカードを最速でめくり切れ！タイムアタック競争</div>
              </button>
            </div>

            {/* ランキングボード */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-2xl">
                <h3 className="text-[10px] font-bold text-purple-400 tracking-widest uppercase mb-3 text-center">🏆 SURVIVAL TAP TOP 5</h3>
                <div className="space-y-1.5 text-xs">
                  {rankingBeat.slice(0,5).map((item, i) => (
                    <div key={i} className="flex justify-between font-mono bg-zinc-950/40 p-2 rounded-lg border border-white/5">
                      <span>{i+1}位. {item.name}</span><span className="text-purple-400 font-bold">{item.score} pt</span>
                    </div>
                  ))}
                  {rankingBeat.length === 0 && <p className="text-center text-zinc-600 py-2">記録なし</p>}
                </div>
              </div>

              <div className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-2xl">
                <h3 className="text-[10px] font-bold text-blue-400 tracking-widest uppercase mb-3 text-center">🏆 真剣衰弱 最速タイム TOP 5</h3>
                <div className="space-y-1.5 text-xs">
                  {rankingMemory.slice(0,5).map((item, i) => (
                    <div key={i} className="flex justify-between font-mono bg-zinc-950/40 p-2 rounded-lg border border-white/5">
                      <span>{i+1}位. {item.name}</span><span className="text-blue-400 font-bold">{item.textScore || `${item.score}秒`}</span>
                    </div>
                  ))}
                  {rankingMemory.length === 0 && <p className="text-center text-zinc-600 py-2">記録なし</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* GAME 01 プレイ画面 */}
        {/* ------------------------------------------ */}
        {activeGame === "beat" && (
          <div className="w-full max-w-md mx-auto flex flex-col justify-center">
            <div className="w-full relative border-x border-zinc-900 bg-zinc-950/40 h-[50vh] overflow-hidden rounded-2xl">
              <div className="absolute top-3 left-3 right-3 z-30 bg-zinc-900/90 p-3 rounded-xl border border-white/5 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-mono font-bold mb-1">
                    <span className="text-zinc-300">LIFE: {health}/100</span>
                    <span className="text-purple-400 font-black">LV.{level}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                    <div className={`h-full ${health > 50 ? "bg-emerald-500" : health > 20 ? "bg-amber-500" : "bg-red-500 animate-pulse"}`} style={{ width: `${health}%` }} />
                  </div>
                </div>
              </div>

              <div className="absolute top-16 right-3 font-mono text-xs bg-black/60 px-3 py-1 rounded-full text-purple-300 font-black">SCORE: {score}</div>
              <div className="absolute top-16 left-3 z-30 font-mono text-[10px] text-zinc-300 bg-zinc-900/90 p-2 rounded-xl border border-white/10 space-y-1 shadow-xl">
                <div>🔮 通常 : <span className="text-yellow-400">+10 pt</span></div>
                <div>💚 回復 : <span className="text-emerald-400">+10 HP</span></div>
              </div>

              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-30 text-center font-mono w-full">
                {combo > 0 && <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-wider">{combo} COMBO</div>}
                {effect && <div className="text-2xl font-black text-yellow-400 tracking-widest">{effect}</div>}
              </div>

              <div className="absolute bottom-20 left-0 right-0 h-[2px] bg-zinc-800/50 pointer-events-none" />
              <div className="absolute inset-0 grid grid-cols-2 pt-16">
                {lanes.map((lane) => (
                  <div key={lane} className="relative border-r border-zinc-900/40 last:border-none flex justify-center">
                    <div className="absolute bottom-14 w-14 h-14 rounded-full border-2 border-zinc-800 flex items-center justify-center"><span className="text-[10px] text-zinc-700 font-bold">TAP</span></div>
                    {notes.filter((n) => n.lane === lane).map((n) => (
                      <div key={n.id} style={{ top: `${n.y}%` }} className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-black text-xs text-white ${n.isHeal ? "bg-gradient-to-br from-emerald-400 to-teal-500" : "bg-gradient-to-br from-purple-500 to-blue-600"}`}>
                        {n.isHeal ? "💚" : "14"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <footer className="grid grid-cols-2 gap-2 mt-4">
              <button onTouchStart={() => handleBeatTap(0)} onClick={() => handleBeatTap(0)} className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/40 rounded-2xl font-bold text-zinc-500 active:text-purple-300">LEFT</button>
              <button onTouchStart={() => handleBeatTap(1)} onClick={() => handleBeatTap(1)} className="h-24 bg-zinc-900/60 border border-white/5 active:bg-purple-900/40 rounded-2xl font-bold text-zinc-500 active:text-purple-300">RIGHT</button>
            </footer>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* GAME 02 プレイ画面（神経衰弱 28枚） */}
        {/* ------------------------------------------ */}
        {activeGame === "memory" && (
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
            
            {/* 上部：現在の計測タイム */}
            <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md mb-4">
              <span className="text-xs text-zinc-400 font-bold tracking-widest font-mono">⏱ TIME ATTACK</span>
              <span className="text-2xl font-black font-mono text-blue-400 animate-pulse">{memoryTime} <span className="text-xs text-zinc-400">秒</span></span>
            </div>

            {/* 28枚のカードグリッド（スマホでも収まるように7列×4行、または4列×7行） */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-900">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-[3/4] relative rounded-xl cursor-pointer select-none border transition-all duration-300 transform perspective-500 active:scale-95 ${
                    card.isMatched ? "opacity-20 pointer-events-none scale-90 border-transparent" : ""
                  }`}
                >
                  {/* カードの回転ムーブを実現するインナークラス構造 */}
                  <div className={`w-full h-full relative transition-transform duration-500 style-3d ${
                    card.isFlipped || card.isMatched ? "rotate-y-180" : ""
                  }`}>
                    
                    {/* カードの裏面（めくる前のスタイリッシュなデザイン） */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 rounded-xl flex items-center justify-center backface-hidden shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <span className="text-xs font-black text-blue-400">14</span>
                      </div>
                    </div>

                    {/* カードの表面（めくった後のメンバー表示） */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-400/40 rounded-xl flex flex-col items-center justify-center rotate-y-180 backface-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)] p-1">
                      
                      {/* 【将来用】ここにメンバーの顔写真を<img>で入れられます！ */}
                      <div className="w-8 h-8 rounded-full bg-zinc-800 mb-1 flex items-center justify-center text-[10px]">👤</div>
                      
                      <span className="text-[10px] md:text-xs font-black text-center text-white truncate w-full px-0.5">
                        {card.name}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* 真剣衰弱結果発表 */}
        {/* ------------------------------------------ */}
        {memoryOver && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md max-w-md mx-auto w-full">
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-1 font-bold">🎯 GAME CLEAR!!</p>
            <h2 className="text-2xl font-black mb-6">全メンバー発見！</h2>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono mb-6">
              <p className="text-zinc-500 text-xs">RECORD TIME</p>
              <p className="text-3xl font-black text-yellow-400 mt-1">{memoryTime} <span className="text-xs text-zinc-400">秒</span></p>
            </div>
            <button
              onClick={() => setMemoryOver(false)}
              className="w-full py-3 bg-zinc-800 text-white font-bold rounded-xl mb-2 hover:bg-zinc-700 transition-all text-sm"
            >
              アーケードトップに戻る
            </button>
          </div>
        )}

      </div>
    </div>
  );
}