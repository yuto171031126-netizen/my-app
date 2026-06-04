"use client";

import { useState, useEffect, useRef } from "react";
// Firebase用のインポート（すべて一番上に集めました）
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query, orderBy, limit, addDoc } from "firebase/firestore";

// ==========================================
// 1. FIREBASE 初期化設定
// ==========================================
const firebaseConfig = {
  // 【重要】ここに自分のFirebaseのConfigを貼り付けてください
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// サーバーサイドレンダリング(SSR)エラーを防ぐための初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// ==========================================
// 2. 型定義 (TypeScript Interfaces)
// ==========================================
interface Note { id: number; lane: number; y: number; isHeal: boolean; }
interface RankingItem { name: string; score: number; textScore?: string; date: string; }
interface Card { id: number; memberId: number; name: string; isFlipped: boolean; isMatched: boolean; }
interface RouletteMember { name: string; value: number; effectText: string; abilityLabel?: string; }

// ==========================================
// 3. 定数データ (ゲームのメンバーデータなど)
// ==========================================
const ROULETTE_MEMBERS: RouletteMember[] = [
  { name: "メンバーA", value: 3, effectText: "標準的な頼れる同期。", abilityLabel: "通常" },
  { name: "メンバーB", value: 5, effectText: "常にテンションが高いムードメーカー。", abilityLabel: "熱血" },
  { name: "メンバーC", value: -2, effectText: "冷静沈着。時に冷徹。", abilityLabel: "冷静" },
  { name: "メンバーD", value: 8, effectText: "ここぞという時に大金星を挙げる天才。", abilityLabel: "覚醒" },
  { name: "メンバーE", value: 1, effectText: "コツコツと実績を積み上げるタイプ。", abilityLabel: "堅実" },
];

const MEMORY_MEMBERS = [
  { id: 1, name: "メンバーA" }, { id: 2, name: "メンバーB" },
  { id: 3, name: "メンバーC" }, { id: 4, name: "メンバーD" },
  { id: 5, name: "メンバーE" }, { id: 6, name: "メンバーF" },
  { id: 7, name: "メンバーG" }, { id: 8, name: "メンバーH" },
];

// ==========================================
// 4. メインコンポーネント本体
// ==========================================
export default function GamePage() {
  // --- 共通状態 ---
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [activeGame, setActiveGame] = useState<"none" | "beat" | "memory" | "roulette">("none");

  // --- オンラインランキング状態 (Firebaseからリアルタイム取得) ---
  const [rankingBeat, setRankingBeat] = useState<RankingItem[]>([]);
  const [rankingMemory, setRankingMemory] = useState<RankingItem[]>([]);
  const [rankingRoulette, setRankingRoulette] = useState<RankingItem[]>([]);

  // --- 音ゲー状態 ---
  const [beatScore, setBeatScore] = useState(0);
  const [beatCombo, setBeatCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [life, setLife] = useState(10);
  const [notes, setNotes] = useState<Note[]>([]);
  const [beatGameActive, setBeatGameActive] = useState(false);
  const beatScoreRef = useRef(0);
  const maxComboRef = useRef(0);

  // --- 神経衰弱状態 ---
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryTime, setMemoryTime] = useState(0);
  const [memoryActive, setMemoryActive] = useState(false);

  // --- ルーレット状態 ---
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedMember, setSelectedMember] = useState<RouletteMember | null>(null);
  const [totalRouletteScore, setTotalRouletteScore] = useState(0);
  const [rouletteCount, setRouletteCount] = useState(0);

  // ==========================================
  // 5. FIREBASE リアルタイムランキング監視 (useEffect)
  // ==========================================
  useEffect(() => {
    // ① 音ゲーのランキング監視 (上位5件)
    const qBeat = query(collection(db, "rankings_beat"), orderBy("score", "desc"), limit(5));
    const unsubscribeBeat = onSnapshot(qBeat, (snapshot) => {
      setRankingBeat(snapshot.docs.map(doc => doc.data() as RankingItem));
    });

    // ② 神経衰弱のランキング監視 (手数が少ない順・上位5件)
    const qMemory = query(collection(db, "rankings_memory"), orderBy("score", "asc"), limit(5));
    const unsubscribeMemory = onSnapshot(qMemory, (snapshot) => {
      setRankingMemory(snapshot.docs.map(doc => doc.data() as RankingItem));
    });

    // ③ ルーレットのランキング監視 (上位5件)
    const qRoulette = query(collection(db, "rankings_roulette"), orderBy("score", "desc"), limit(5));
    const unsubscribeRoulette = onSnapshot(qRoulette, (snapshot) => {
      setRankingRoulette(snapshot.docs.map(doc => doc.data() as RankingItem));
    });

    // 画面を閉じるときに監視を解除する設定
    return () => {
      unsubscribeBeat();
      unsubscribeMemory();
      unsubscribeRoulette();
    };
  }, []);

  // ==========================================
  // 6. 音ゲー (TAP BEAT) ロジック
  // ==========================================
  useEffect(() => {
    beatScoreRef.current = beatScore;
    maxComboRef.current = maxCombo;
  }, [beatScore, maxCombo]);

  useEffect(() => {
    if (!beatGameActive) return;

    const gameInterval = setInterval(() => {
      setNotes((prev) => {
        const moved = prev.map((n) => ({ ...n, y: n.y + 6 })).filter((n) => {
          if (n.y > 90) {
            if (!n.isHeal) {
              setLife((l) => Math.max(0, l - 1));
              setBeatCombo(0);
            }
            return false;
          }
          return true;
        });

        if (Math.random() < 0.25) {
          moved.push({
            id: Date.now() + Math.random(),
            lane: Math.floor(Math.random() * 4),
            y: 0,
            isHeal: Math.random() < 0.1,
          });
        }
        return moved;
      });
    }, 50);

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
    setLife(10);
    setNotes([]);
    setBeatGameActive(true);
    setActiveGame("beat");
  };

  const handleLaneTap = (laneIndex: number) => {
    if (!beatGameActive) return;
    setNotes((prev) => {
      const targetIndex = prev.findIndex((n) => n.lane === laneIndex && n.y >= 70 && n.y <= 88);
      if (targetIndex !== -1) {
        const hitNote = prev[targetIndex];
        if (hitNote.isHeal) {
          setLife((l) => Math.min(10, l + 2));
          setBeatScore((s) => s + 30);
        } else {
          setBeatScore((s) => s + 10);
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

  // 【Firebaseオンライン保存】音ゲー終了時
  const endBeatGame = async () => {
    setBeatGameActive(false);
    const finalScore = beatScoreRef.current;
    try {
      await addDoc(collection(db, "rankings_beat"), {
        name: playerName || "名無し",
        score: finalScore,
        date: new Date().toLocaleDateString()
      });
    } catch (e) {
      console.error("Firebase保存エラー:", e);
    }
    setActiveGame("none");
  };

  // ==========================================
  // 7. 神経衰弱 (MEMORY MATCH) ロジック
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
          // 全員揃ったかチェック
          setCards((currentCards) => {
            const allMatched = currentCards.every((c) => c.isMatched || c.id === firstId || c.id === secondId);
            if (allMatched) endMemoryGame();
            return currentCards;
          });
        }, 600);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // 【Firebaseオンライン保存】神経衰弱終了時
  const endMemoryGame = async () => {
    setMemoryActive(false);
    try {
      await addDoc(collection(db, "rankings_memory"), {
        name: playerName || "名無し",
        score: memoryMoves + 1, // スコア列には手数を保存
        textScore: `${memoryMoves + 1}手 (${memoryTime}秒)`,
        date: new Date().toLocaleDateString()
      });
    } catch (e) {
      console.error(e);
    }
    setActiveGame("none");
  };

  // ==========================================
  // 8. ルーレット (ROULETTE) ロジック
  // ==========================================
  const startRouletteGame = () => {
    setSelectedMember(null);
    setTotalRouletteScore(0);
    setRouletteCount(0);
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
      if (l > 15) {
        clearInterval(interval);
        setIsSpinning(false);
        setRouletteCount((c) => {
          const nextCount = c + 1;
          setSelectedMember((finalMember) => {
            if (finalMember) {
              setTotalRouletteScore((s) => {
                const finalScore = s + finalMember.value;
                if (nextCount === 3) endRouletteGame(finalScore);
                return finalScore;
              });
            }
            return finalMember;
          });
          return nextCount;
        });
      }
    }, 100);
  };

  // 【Firebaseオンライン保存】ルーレット終了時
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
  // 9. 画面のレイアウト (JSX 表示部分)
  // ==========================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none antialiased">
      {/* ヘッダー */}
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

      {/* メインエリア */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 左・中央列: ゲーム画面 */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {!isNameEntered ? (
            /* 名前入力画面 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center my-auto shadow-2xl">
              <div className="w-16 h-16 bg-purple-600/10 border border-purple-500/30 rounded-2xl flex items-center justify-center text-3xl mb-4">🕹️</div>
              <h2 className="text-2xl font-bold mb-2">ゲームセンターへようこそ</h2>
              <p className="text-sm text-zinc-400 mb-6 max-w-sm">オンラインランキングに対応しています。名前を入力してゲームを始めましょう！</p>
              <div className="w-full max-w-md space-y-3">
                <input
                  type="text"
                  maxLength={10}
                  placeholder="プレイヤー名を入力 (最大10文字)"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3.5 text-center font-bold tracking-wide focus:outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-600"
                />
                <button
                  disabled={!playerName.trim()}
                  onClick={() => setIsNameEntered(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                >
                  ゲームスタート
                </button>
              </div>
            </div>
          ) : activeGame === "none" ? (
            /* ゲーム選択メニュー */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
              {/* 音ゲー */}
              <div className="bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl">
                <div>
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">🎹</div>
                  <h3 className="text-lg font-bold mb-1">TAP BEAT</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">落ちてくるノーツをタイミングよく叩く爽快リズムゲーム。</p>
                </div>
                <button onClick={startBeatGame} className="mt-6 w-full bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 text-purple-300 hover:text-white font-bold py-2.5 rounded-xl transition-all text-sm">
                  遊ぶ
                </button>
              </div>

              {/* 神経衰弱 */}
              <div className="bg-zinc-900 border border-zinc-800 hover:border-pink-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl">
                <div>
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">🃏</div>
                  <h3 className="text-lg font-bold mb-1">MEMORY MATCH</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">配属された同期メンバーの顔と名前を一致させる記憶力ゲーム。</p>
                </div>
                <button onClick={startMemoryGame} className="mt-6 w-full bg-pink-600/20 hover:bg-pink-600 border border-pink-500/30 text-pink-300 hover:text-white font-bold py-2.5 rounded-xl transition-all text-sm">
                  遊ぶ
                </button>
              </div>

              {/* ルーレット */}
              <div className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl">
                <div>
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">🎰</div>
                  <h3 className="text-lg font-bold mb-1">TEAM ROULETTE</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">3回ルーレットを回して最強の同期チームを結成し、合計ポイントを競う運ゲー。</p>
                </div>
                <button onClick={startRouletteGame} className="mt-6 w-full bg-amber-600/20 hover:bg-amber-600 border border-amber-500/30 text-amber-300 hover:text-white font-bold py-2.5 rounded-xl transition-all text-sm">
                  遊ぶ
                </button>
              </div>
            </div>
          ) : activeGame === "beat" ? (
            /* 音ゲー画面 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl relative overflow-hidden">
              <div className="w-full flex justify-between items-center mb-4 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div className="text-sm font-bold text-zinc-400">SCORE: <span className="text-purple-400 text-lg font-black">{beatScore}</span></div>
                <div className="text-sm font-bold text-zinc-400">COMBO: <span className="text-pink-400 text-lg font-black">{beatCombo}</span></div>
                <div className="text-sm font-bold text-zinc-400">LIFE: <span className="text-emerald-400 text-lg font-black">{"❤️".repeat(life)}</span></div>
              </div>

              {/* 落ちてくるエリア */}
              <div className="w-full max-w-md h-80 bg-zinc-950 rounded-xl relative border border-zinc-800 overflow-hidden flex">
                {[0, 1, 2, 3].map((lane) => (
                  <div key={lane} className="flex-1 border-r border-zinc-900/50 last:border-0 relative h-full bg-gradient-to-b from-transparent to-zinc-900/20">
                    {notes.filter((n) => n.lane === lane).map((note) => (
                      <div
                        key={note.id}
                        style={{ top: `${note.y}%` }}
                        className={`absolute left-1/2 -translate-x-1/2 w-10 h-6 rounded-full shadow-lg flex items-center justify-center text-[10px] font-black transition-all ${
                          note.isHeal ? "bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse text-white" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        }`}
                      >
                        {note.isHeal ? "HEAL" : "TAP"}
                      </div>
                    ))}
                    {/* 判定ラインのガイド線 */}
                    <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-purple-500/30 dashed" />
                  </div>
                ))}
              </div>

              {/* タップボタン */}
              <div className="w-full max-w-md grid grid-cols-4 gap-2 mt-4">
                {[0, 1, 2, 3].map((lane) => (
                  <button
                    key={lane}
                    onMouseDown={() => handleLaneTap(lane)}
                    onTouchStart={(e) => { e.preventDefault(); handleLaneTap(lane); }}
                    className="bg-zinc-800 active:bg-purple-600 border-b-4 border-zinc-950 active:border-purple-800 py-6 rounded-xl font-black transition-all text-zinc-400 active:text-white"
                  >
                    DFJK[lane]
                  </button>
                ))}
              </div>

              <button onClick={() => setActiveGame("none")} className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 underline">
                メニューに戻る(進捗は破棄されます)
              </button>
            </div>
          ) : activeGame === "memory" ? (
            /* 神経衰弱画面 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
              <div className="w-full flex justify-between items-center mb-6 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div className="text-sm font-bold text-zinc-400">手数: <span className="text-pink-400 text-lg font-black">{memoryMoves}</span></div>
                <div className="text-sm font-bold text-zinc-400">経過時間: <span className="text-amber-400 text-lg font-black">{memoryTime} 秒</span></div>
              </div>

              <div className="grid grid-cols-4 gap-2.5 w-full max-w-md">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-xl flex items-center justify-center font-bold text-xs cursor-pointer transition-all duration-300 transform border select-none ${
                      card.isFlipped || card.isMatched
                        ? "bg-gradient-to-br from-pink-600 to-purple-600 border-pink-400 text-white rotate-0 shadow-lg"
                        : "bg-zinc-800 border-zinc-700 text-transparent hover:bg-zinc-700 -rotate-3"
                    }`}
                  >
                    {(card.isFlipped || card.isMatched) && (
                      <span className="text-center px-1 break-all leading-tight">{card.name}</span>
                    )}
                  </div>
                ))}
              </div>

              <button onClick={() => setActiveGame("none")} className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 underline">
                メニューに戻る
              </button>
            </div>
          ) : (
            /* ルーレット画面 */
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
              <div className="w-full flex justify-between items-center mb-6 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div className="text-sm font-bold text-zinc-400">結成人数: <span className="text-amber-400 text-lg font-black">{rouletteCount} / 3人</span></div>
                <div className="text-sm font-bold text-zinc-400">チーム戦闘力: <span className="text-orange-400 text-lg font-black">{totalRouletteScore} pt</span></div>
              </div>

              {/* ルーレットの液晶風ディスプレイ */}
              <div className="w-full max-w-sm bg-zinc-950 border-2 border-zinc-800 p-8 rounded-2xl text-center mb-6 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {selectedMember ? (
                  <div className="animate-fade-in">
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold mb-2 inline-block">
                      {selectedMember.abilityLabel}
                    </span>
                    <h3 className="text-2xl font-black text-white mb-1">{selectedMember.name}</h3>
                    <div className="text-xl font-extrabold text-orange-400 mb-2">戦闘力: {selectedMember.value > 0 ? `+${selectedMember.value}` : selectedMember.value}</div>
                    <p className="text-xs text-zinc-400 max-w-xs">{selectedMember.effectText}</p>
                  </div>
                ) : (
                  <div className="text-zinc-600 font-bold tracking-widest text-sm">ROULETTE DISPLAY</div>
                )}
              </div>

              {rouletteCount < 3 ? (
                <button
                  disabled={isSpinning}
                  onClick={spinRoulette}
                  className="w-full max-w-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-black font-black py-4 px-6 rounded-xl transition-all text-base shadow-lg active:scale-95"
                >
                  {isSpinning ? "スロット回転中..." : "ルーレットを回す"}
                </button>
              ) : (
                <div className="text-center w-full">
                  <div className="text-sm font-bold text-emerald-400 mb-4 animate-bounce">🎉 チーム結成完了！ランキングに登録されました</div>
                  <button onClick={startRouletteGame} className="w-full max-w-xs bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm">
                    もう一度遊ぶ
                  </button>
                </div>
              )}

              <button onClick={() => setActiveGame("none")} className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 underline">
                メニューに戻る
              </button>
            </div>
          )}
        </div>

        {/* 右列: リアルタイム・オンラインランキングボード */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 h-fit shadow-xl flex flex-col space-y-6">
          <div className="flex items-center space-x-2 pb-2 border-b border-zinc-800">
            <span className="text-lg">🏆</span>
            <h2 className="text-sm font-black tracking-wider text-zinc-300 uppercase">LIVE LEADERBOARD</h2>
          </div>

          {/* 音ゲー枠 */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-purple-400 flex items-center space-x-1">
              <span>🎹</span> <span>TAP BEAT RANKING</span>
            </div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-1.5 min-h-[140px]">
              {rankingBeat.length === 0 ? (
                <div className="text-xs text-zinc-600 text-center py-10 font-medium">データがありません</div>
              ) : (
                rankingBeat.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-semibold text-zinc-300 truncate max-w-[120px]">{idx + 1}. {item.name}</span>
                    <span className="font-mono font-bold text-purple-400">{item.score} pt</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 神経衰弱枠 */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-pink-400 flex items-center space-x-1">
              <span>🃏</span> <span>MEMORY RANKING (手数少順)</span>
            </div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-1.5 min-h-[140px]">
              {rankingMemory.length === 0 ? (
                <div className="text-xs text-zinc-600 text-center py-10 font-medium">データがありません</div>
              ) : (
                rankingMemory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-semibold text-zinc-300 truncate max-w-[120px]">{idx + 1}. {item.name}</span>
                    <span className="font-mono font-bold text-pink-400">{item.textScore || `${item.score}手`}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ルーレット枠 */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center space-x-1">
              <span>🎰</span> <span>TEAM ROULETTE RANKING</span>
            </div>
            <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-900 space-y-1.5 min-h-[140px]">
              {rankingRoulette.length === 0 ? (
                <div className="text-xs text-zinc-600 text-center py-10 font-medium">データがありません</div>
              ) : (
                rankingRoulette.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-semibold text-zinc-300 truncate max-w-[120px]">{idx + 1}. {item.name}</span>
                    <span className="font-mono font-bold text-amber-400">{item.score} pt</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}