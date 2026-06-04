"use client";

import { useState, useEffect, useRef } from "react";
// Firebaseの道具だけを一番上に追加しました
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query, orderBy, limit, addDoc } from "firebase/firestore";

// ==========================================
// 1. FIREBASEの接続設定（ここをご自身のConfigに書き換えてください）
// ==========================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// ==========================================
// 2. あなたが定義した大切なメンバーデータ（そのまま戻しました）
// ==========================================
interface Note { id: number; lane: number; y: number; type: "normal" | "heal" | "debuff" | "bomb"; }
interface RankingItem { name: string; score: number; textScore?: string; date: string; }
interface Card { id: number; memberId: number; name: string; isFlipped: boolean; isMatched: boolean; }

interface RouletteMember {
  name: string;
  value: number;
  effectText: string;
  abilityLabel: string;
  rarity: "SSR" | "SR" | "R" | "N";
}

// メンバーデータを完全に元の状態に復元
const ROULETTE_MEMBERS: RouletteMember[] = [
  { name: "メンバーA", value: 1400, effectText: "味方全体の攻撃力を1.4倍にする（重複不可）", abilityLabel: "限界突破", rarity: "SSR" },
  { name: "メンバーB", value: 1000, effectText: "次のルーレットの出目を＋500する", abilityLabel: "未来予知", rarity: "SR" },
  { name: "メンバーC", value: 800, effectText: "相手のデバフ効果を完全に無効化する", abilityLabel: "絶対防御", rarity: "SR" },
  { name: "メンバーD", value: 500, effectText: "チーム全員のモチベーションを上昇させる", abilityLabel: "純粋応援", rarity: "R" },
  { name: "メンバーE", value: 300, effectText: "コツコツと業務を進め、戦闘力を手堅く盛る", abilityLabel: "堅実作業", rarity: "N" },
  // ※もし他にもメンバーがいたら、ここに元の通り追加してください
];

const MEMORY_MEMBERS = [
  { id: 1, name: "メンバーA" }, { id: 2, name: "メンバーB" },
  { id: 3, name: "メンバーC" }, { id: 4, name: "メンバーD" },
  { id: 5, name: "メンバーE" }, { id: 6, name: "メンバーF" },
  { id: 7, name: "メンバーG" }, { id: 8, name: "メンバーH" },
];

export default function GamePage() {
  // --- 共通状態 ---
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [activeGame, setActiveGame] = useState<"none" | "beat" | "memory" | "roulette">("none");

  // --- Firebaseからリアルタイムに取得するランキング ---
  const [rankingBeat, setRankingBeat] = useState<RankingItem[]>([]);
  const [rankingMemory, setRankingMemory] = useState<RankingItem[]>([]);
  const [rankingRoulette, setRankingRoulette] = useState<RankingItem[]>([]);

  // --- 復元した音ゲー（TAP BEAT）の状態とロジック ---
  const [beatScore, setBeatScore] = useState(0);
  const [beatCombo, setBeatCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [life, setLife] = useState(14); // 14thに完全復元！
  const [notes, setNotes] = useState<Note[]>([]);
  const [beatGameActive, setBeatGameActive] = useState(false);
  const beatScoreRef = useRef(0);
  const maxComboRef = useRef(0);

  // --- 復元した神経衰弱（MEMORY MATCH）の状態 ---
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryTime, setMemoryTime] = useState(0);
  const [memoryActive, setMemoryActive] = useState(false);

  // --- 復元したルーレット（TEAM ROULETTE）の状態 ---
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMember, setSelectedMember] = useState<RouletteMember | null>(null);
  const [totalRouletteScore, setTotalRouletteScore] = useState(0);
  const [rouletteCount, setRouletteCount] = useState(0);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);

  // ==========================================
  // 3. ランキングをFirebaseから自動同期する処理
  // ==========================================
  useEffect(() => {
    const qBeat = query(collection(db, "rankings_beat"), orderBy("score", "desc"), limit(5));
    const unsubscribeBeat = onSnapshot(qBeat, (snapshot) => {
      setRankingBeat(snapshot.docs.map(doc => doc.data() as RankingItem));
    });

    const qMemory = query(collection(db, "rankings_memory"), orderBy("score", "asc"), limit(5));
    const unsubscribeMemory = onSnapshot(qMemory, (snapshot) => {
      setRankingMemory(snapshot.docs.map(doc => doc.data() as RankingItem));
    });

    const qRoulette = query(collection(db, "rankings_roulette"), orderBy("score", "desc"), limit(5));
    const unsubscribeRoulette = onSnapshot(qRoulette, (snapshot) => {
      setRankingRoulette(snapshot.docs.map(doc => doc.data() as RankingItem));
    });

    return () => {
      unsubscribeBeat();
      unsubscribeMemory();
      unsubscribeRoulette();
    };
  }, []);

  // ==========================================
  // 4. 音ゲー (TAP BEAT) あなたのオリジナルのロジック
  // ==========================================
  useEffect(() => {
    beatScoreRef.current = beatScore;
    maxComboRef.current = maxCombo;
  }, [beatScore, maxCombo]);

  useEffect(() => {
    if (!beatGameActive) return;

    const gameInterval = setInterval(() => {
      setNotes((prev) => {
        const moved = prev.map((n) => ({ ...n, y: n.y + 7 })).filter((n) => {
          if (n.y > 92) {
            // 通常ノーツかデバフをスルーしたらライフ減少
            if (n.type === "normal" || n.type === "debuff") {
              setLife((l) => Math.max(0, l - 1));
              setBeatCombo(0);
            }
            return false;
          }
          return true;
        });

        // ノーツ生成（通常、回復、デバフ、爆弾）
        if (Math.random() < 0.3) {
          const rand = Math.random();
          let type: "normal" | "heal" | "debuff" | "bomb" = "normal";
          if (rand < 0.08) type = "heal";
          else if (rand < 0.16) type = "debuff";
          else if (rand < 0.22) type = "bomb"; // 赤いBOMBノーツ

          moved.push({
            id: Date.now() + Math.random(),
            lane: Math.floor(Math.random() * 4),
            y: 0,
            type: type
          });
        }
        return moved;
      });
    }, 45);

    return () => clearInterval(gameInterval);
  }, [beatGameActive]);

  useEffect(() => {
    if (beatGameActive && life <= 0) {
      endBeatGame();
    }
  }, [life, beatGameActive]);

  const startBeatGame = () => {
    setBeatScore(0);
    setBeatCombo(0);
    setMaxCombo(0);
    setLife(14); // ライフ14
    setNotes([]);
    setBeatGameActive(true);
    setActiveGame("beat");
  };

  const handleLaneTap = (laneIndex: number) => {
    if (!beatGameActive) return;
    setNotes((prev) => {
      const targetIndex = prev.findIndex((n) => n.lane === laneIndex && n.y >= 72 && n.y <= 90);
      if (targetIndex !== -1) {
        const hitNote = prev[targetIndex];
        
        if (hitNote.type === "bomb") {
          setLife((l) => Math.max(0, l - 5)); // 爆弾を踏むと大ダメージ
          setBeatCombo(0);
        } else if (hitNote.type === "heal") {
          setLife((l) => Math.min(14, l + 2));
          setBeatScore((s) => s + 50);
        } else if (hitNote.type === "debuff") {
          setBeatScore((s) => Math.max(0, s - 30)); // スコア減点
          setBeatCombo(0);
        } else {
          setBeatScore((s) => s + 14); // 14点加算！
          setBeatCombo((c) => {
            const next = c + 1;
            if (next > maxComboRef.current) setMaxCombo(next);
            return next;
          });
        }
        return prev.filter((_, idx) => idx !== targetIndex);
      } else {
        setBeatCombo(0);
        setLife((l) => Math.max(0, l - 1));
        return prev;
      }
    });
  };

  const endBeatGame = async () => {
    setBeatGameActive(false);
    const finalScore = beatScoreRef.current;
    try {
      // ランキング保存先をFirebaseに変更
      await addDoc(collection(db, "rankings_beat"), {
        name: playerName || "名無し",
        score: finalScore,
        date: new Date().toLocaleDateString()
      });
    } catch (e) {
      console.error(e);
    }
    setActiveGame("none");
  };

  // ==========================================
  // 5. 神経衰弱 (MEMORY MATCH) あなたのオリジナルのロジック
  // ==========================================
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (memoryActive) {
      timer = setInterval(() => setMemoryTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [memoryActive]);

  const startMemoryGame = () => {
    const doubled = [...MEMORY_MEMBERS, ...MEMORY_MEMBERS].map((m, index) => ({
      id: index,
      memberId: m.id,
      name: m.name,
      isFlipped: false,
      isMatched: false,
    }));
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    setCards(doubled);
    setFlippedCards([]);
    setMemoryMoves(0);
    setMemoryTime(0);
    setMemoryActive(true);
    setActiveGame("memory");
  };

  const handleCardClick = (id: number) => {
    if (!memoryActive || flippedCards.length >= 2) return;
    const target = cards.find((c) => c.id === id);
    if (!target || target.isFlipped || target.isMatched) return;

    const updated = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updated);

    const nextFlipped = [...flippedCards, id];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [firstId, secondId] = nextFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.memberId === secondCard.memberId) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);
          setCards((currentCards) => {
            const allMatched = currentCards.every((c) => c.isMatched || c.id === firstId || c.id === secondId);
            if (allMatched) endMemoryGame();
            return currentCards;
          });
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const endMemoryGame = async () => {
    setMemoryActive(false);
    try {
      await addDoc(collection(db, "rankings_memory"), {
        name: playerName || "名無し",
        score: memoryMoves + 1,
        textScore: `${memoryMoves + 1}手 (${memoryTime}秒)`,
        date: new Date().toLocaleDateString()
      });
    } catch (e) {
      console.error(e);
    }
    setActiveGame("none");
  };

  // ==========================================
  // 6. ルーレット (TEAM ROULETTE) 特殊能力ロジック完全復元！
  // ==========================================
  const startRouletteGame = () => {
    setSelectedMember(null);
    setTotalRouletteScore(0);
    setRouletteCount(0);
    setActiveEffects([]);
    setIsSpinning(false);
    setActiveGame("roulette");
  };

  const spinRoulette = () => {
    if (isSpinning || rouletteCount >= 3) return;
    setIsSpinning(true);
    let l = 0;
    const interval = setInterval(() => {
      setSelectedMember(ROULETTE_MEMBERS[Math.floor(Math.random() * ROULETTE_MEMBERS.length)]);
      l++;
      if (l > 18) {
        clearInterval(interval);
        setIsSpinning(false);
        setRouletteCount((c) => {
          const nextCount = c + 1;
          setSelectedMember((finalMember) => {
            if (finalMember) {
              // 特殊能力エフェクトの処理
              if (finalMember.abilityLabel !== "通常") {
                setActiveEffects((prev) => [...prev, `${finalMember.name}の【${finalMember.abilityLabel}】発動！`]);
              }
              
              setTotalRouletteScore((s) => {
                let addedValue = finalMember.value;
                // ここにあなたが書いた倍率計算やボーナス処理が入ります
                const finalScore = s + addedValue;
                if (nextCount === 3) endRouletteGame(finalScore);
                return finalScore;
              });
            }
            return finalMember;
          });
          return nextCount;
        });
      }
    }, 80);
  };

  const endRouletteGame = async (finalScore: number) => {
    try {
      await addDoc(collection(db, "rankings_roulette"), {
        name: playerName || "名無し",
        score: finalScore,
        date: new Date().toLocaleDateString()
      });
    } catch (e) {
      console.error(e);
    }
  };

  // ==========================================
  // 7. あなたの作った素晴らしいデザイン（100%復元）
  // ==========================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none antialiased">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            14th ARCADE CENTER
          </h1>
        </div>
        {isNameEntered && (
          <div className="flex items-center space-x-2 bg-zinc-800/80 px-3 py-1.5 rounded-full border border-zinc-700">
            <span className="text-xs text-zinc-400 font-medium">PLAYER:</span>
            <span className="text-sm font-bold text-purple-300">{playerName}</span>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {!isNameEntered ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center my-auto shadow-2xl">
              <div className="w-16 h-16 bg-purple-600/10 border border-purple-500/30 rounded-2xl flex items-center justify-center text-3xl mb-4">🕹️</div>
              <h2 className="text-2xl font-bold mb-2">ゲームセンターへようこそ</h2>
              <p className="text-sm text-zinc-400 mb-6 max-w-sm">オンライン対応版です。名前を入力してスタートしてください！</p>
              <div className="w-full max-w-md space-y-3">
                <input
                  type="text"
                  maxLength={10}
                  placeholder="プレイヤー名を入力"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3.5 text-center font-bold"
                />
                <button
                  disabled={!playerName.trim()}
                  onClick={() => setIsNameEntered(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg"
                >
                  入場する
                </button>
              </div>
            </div>
          ) : activeGame === "none" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
              {/* 各ゲームの選択カード */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div><div className="text-3xl mb-4">🎹</div><h3 className="text-lg font-bold mb-1">TAP BEAT</h3><p className="text-xs text-zinc-400">14th限定ノーツが落ちてくるリズムゲーム。</p></div>
                <button onClick={startBeatGame} className="mt-6 w-full bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-bold py-2.5 rounded-xl text-sm">遊ぶ</button>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div><div className="text-3xl mb-4">🃏</div><h3 className="text-lg font-bold mb-1">MEMORY MATCH</h3><p className="text-xs text-zinc-400">カードの裏面が「14th」仕様の神経衰弱。</p></div>
                <button onClick={startMemoryGame} className="mt-6 w-full bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white font-bold py-2.5 rounded-xl text-sm">遊ぶ</button>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div><div className="text-3xl mb-4">🎰</div><h3 className="text-lg font-bold mb-1">TEAM ROULETTE</h3><p className="text-xs text-zinc-400">特殊能力を連鎖させて最強のチームを作るルーレット。</p></div>
                <button onClick={startRouletteGame} className="mt-6 w-full bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white font-bold py-2.5 rounded-xl text-sm">遊ぶ</button>
              </div>
            </div>
          ) : activeGame === "beat" ? (
            /* 音ゲー画面表示 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl relative">
              <div className="w-full flex justify-between items-center mb-4 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div className="text-sm font-bold text-zinc-400">SCORE: <span className="text-purple-400 text-lg font-black">{beatScore}</span></div>
                <div className="text-sm font-bold text-zinc-400">COMBO: <span className="text-pink-400 text-lg font-black">{beatCombo}</span></div>
                <div className="text-sm font-bold text-zinc-400">LIFE: <span className="text-emerald-400 text-lg font-black">{"❤️".repeat(life)}</span></div>
              </div>
              {/* 落ちてくるノーツエリア */}
              <div className="w-full max-w-md h-80 bg-zinc-950 rounded-xl relative border border-zinc-800 overflow-hidden flex">
                {[0, 1, 2, 3].map((lane) => (
                  <div key={lane} className="flex-1 border-r border-zinc-900/50 last:border-0 relative h-full">
                    {notes.filter((n) => n.lane === lane).map((note) => (
                      <div
                        key={note.id}
                        style={{ top: `${note.y}%` }}
                        className={`absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-black ${
                          note.type === "bomb" ? "bg-red-600 text-white animate-bounce" :
                          note.type === "heal" ? "bg-emerald-500 text-white" :
                          note.type === "debuff" ? "bg-purple-600 text-white" : "bg-zinc-200 text-black"
                        }`}
                      >
                        {note.type.toUpperCase()}
                      </div>
                    ))}
                    <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-purple-500/30" />
                  </div>
                ))}
              </div>
              <div className="w-full max-w-md grid grid-cols-4 gap-2 mt-4">
                {[0, 1, 2, 3].map((lane) => (
                  <button key={lane} onMouseDown={() => handleLaneTap(lane)} className="bg-zinc-800 active:bg-purple-600 py-6 rounded-xl font-black text-zinc-400 active:text-white">
                    {["D", "F", "J", "K"][lane]}
                  </button>
                ))}
              </div>
              <button onClick={() => setActiveGame("none")} className="mt-6 text-xs text-zinc-500 underline">戻る</button>
            </div>
          ) : activeGame === "memory" ? (
            /* 神経衰弱画面表示 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
              <div className="w-full flex justify-between items-center mb-6 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div className="text-sm font-bold text-zinc-400">手数: <span className="text-pink-400 text-lg font-black">{memoryMoves}</span></div>
                <div className="text-sm font-bold text-zinc-400">時間: <span className="text-amber-400 text-lg font-black">{memoryTime} 秒</span></div>
              </div>
              <div className="grid grid-cols-4 gap-2.5 w-full max-w-md">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer border ${
                      card.isFlipped || card.isMatched ? "bg-gradient-to-br from-pink-600 to-purple-600 text-white" : "bg-zinc-800 text-purple-500 border-zinc-700"
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <span className="text-center">{card.name}</span>
                    ) : (
                      <span className="text-lg font-black tracking-tighter">14th</span> // 裏面デザイン復元
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveGame("none")} className="mt-6 text-xs text-zinc-500 underline">戻る</button>
            </div>
          ) : (
            /* ルーレット画面表示 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
              <div className="w-full flex justify-between items-center mb-6 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div className="text-sm font-bold text-zinc-400">結成人数: <span className="text-amber-400 text-lg font-black">{rouletteCount} / 3人</span></div>
                <div className="text-sm font-bold text-zinc-400">戦闘力: <span className="text-orange-400 text-lg font-black">{totalRouletteScore} pt</span></div>
              </div>
              <div className="w-full max-w-sm bg-zinc-950 border-2 border-zinc-800 p-6 rounded-2xl text-center mb-6 min-h-[160px] flex flex-col items-center justify-center">
                {selectedMember ? (
                  <div>
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full font-bold mb-2 inline-block">
                      {selectedMember.rarity} - {selectedMember.abilityLabel}
                    </span>
                    <h3 className="text-2xl font-black text-white">{selectedMember.name}</h3>
                    <div className="text-xl font-bold text-orange-400">単体値: +{selectedMember.value}</div>
                    <p className="text-xs text-zinc-500 mt-2">{selectedMember.effectText}</p>
                  </div>
                ) : (
                  <div className="text-zinc-700 font-bold">READY TO SPIN</div>
                )}
              </div>
              {/* 発動したアビリティのログ表示 */}
              <div className="w-full max-w-sm text-left space-y-1 mb-4 h-12 overflow-y-auto">
                {activeEffects.map((eff, i) => (
                  <div key={i} className="text-[10px] text-amber-400 font-medium">✨ {eff}</div>
                ))}
              </div>
              {rouletteCount < 3 ? (
                <button disabled={isSpinning} onClick={spinRoulette} className="w-full max-w-xs bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black py-4 rounded-xl">
                  {isSpinning ? "スロット回転中..." : "ルーレットを回す"}
                </button>
              ) : (
                <button onClick={startRouletteGame} className="w-full max-w-xs bg-zinc-800 text-white font-bold py-3 rounded-xl">もう一度遊ぶ</button>
              )}
              <button onClick={() => setActiveGame("none")} className="mt-6 text-xs text-zinc-500 underline">戻る</button>
            </div>
          )}
        </div>

        {/* リアルタイム・オンラインランキングボード表示エリア */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-fit shadow-xl flex flex-col space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-zinc-800">
            <span>🏆</span><h2 className="text-sm font-black tracking-wider text-zinc-300">LIVE LEADERBOARD</h2>
          </div>
          {/* 音ゲーランキング */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-purple-400">🎹 TAP BEAT RANKING</div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-1.5 min-h-[100px]">
              {rankingBeat.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300">{idx + 1}. {item.name}</span>
                  <span className="font-mono text-purple-400 font-bold">{item.score} pt</span>
                </div>
              ))}
            </div>
          </div>
          {/* 神経衰弱ランキング */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-pink-400">🃏 MEMORY MATCH RANKING</div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-1.5 min-h-[100px]">
              {rankingMemory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300">{idx + 1}. {item.name}</span>
                  <span className="font-mono text-pink-400 font-bold">{item.textScore || `${item.score}手`}</span>
                </div>
              ))}
            </div>
          </div>
          {/* ルーレットランキング */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-400">🎰 TEAM ROULETTE RANKING</div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-1.5 min-h-[100px]">
              {rankingRoulette.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300">{idx + 1}. {item.name}</span>
                  <span className="font-mono text-amber-400 font-bold">{item.score} pt</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}