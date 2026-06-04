"use client";

import { useState, useEffect, useRef } from "react";
// Firebase用のインポートを追加
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp 
} from "firebase/firestore";

// ==========================================
// ⚠️ 【重要】ご自身のFirebase設定に書き換えてください
// ==========================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebaseの初期化（二重初期化を防ぐ）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// ==========================================
// 型定義 (画像でエラーになっていた type を追加)
// ==========================================
interface Note { 
  id: number; 
  lane: number; 
  y: number; 
  type: "bomb" | "heal" | "debrief" | "normal"; // 画像の判定(debrief等)に対応
}
interface RankingItem { name: string; score: number; textScore?: string; date: string; }
interface Card { id: number; memberId: number; name: string; isFlipped: boolean; isMatched: boolean; }

interface RouletteMember {
  name: string;
  value: number;       
  effectText: string;  
  abilityLabel?: string;
}

// 14期メンバーリスト ＆ 特殊能力
const ROULETTE_MEMBERS: RouletteMember[] = [
  { name: "メンバーA", value: 3, effectText: "標準的な頼れる同期。フツーに+3される。", abilityLabel: "通常ドロー" },
  { name: "メンバーB", value: 5, effectText: "破壊神。一気に【+5】される重戦車。", abilityLabel: "高火力注意" },
  { name: "メンバーC", value: -3, effectText: "癒やし系。なんと合計値を【-3】してくれる！", abilityLabel: "回復" },
  { name: "メンバーD", value: 1, effectText: "影が薄い（？）。手堅く【+1】だけで耐える。", abilityLabel: "微増" },
  { name: "メンバーE", value: 0, effectText: "遅遅刻魔。何もしてこない。まさかの【±0】！", abilityLabel: "無害" },
  { name: "メンバーF", value: 2, effectText: "【特殊】次の人が引くカードの数値を2倍にする呪い！", abilityLabel: "⚠️次2倍呪い" },
  { name: "メンバーG", value: 4, effectText: "熱血漢。じわじわ追い詰める【+4】。", abilityLabel: "高火力" },
  { name: "メンバーH", value: -2, effectText: "空気清浄機。場の数値を【-2】に下げる。", abilityLabel: "回復" },
  { name: "メンバーI", value: 6, effectText: "地雷。引いた瞬間【+6】。14を超えさせる天才。", abilityLabel: "🚨即死級地雷" },
  { name: "メンバーJ", value: 1, effectText: "【特殊】合計値を無理やり【13】にする戦犯ムーブ。", abilityLabel: "💣一撃リーチ" },
  { name: "メンバーK", value: 2, effectText: "お調子者。コソッと【+2】。", abilityLabel: "小火力" },
  { name: "メンバーL", value: -5, effectText: "大天使。大ピンチを救う奇跡の【-5】！", abilityLabel: "🌟大回復" },
  { name: "メンバーM", value: 0, effectText: "【特殊】奇跡！場の合計値を【0】に完全リセット！", abilityLabel: "🔄完全リセット" },
  { name: "メンバーN", value: 3, effectText: "ドS。手堅く【+3】を押し付けてくる。", abilityLabel: "通常ドロー" },
];

const MEMORY_MEMBER_NAMES = ROULETTE_MEMBERS.map(m => m.name);

export default function GamePage() {
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [activeGame, setActiveGame] = useState<"none" | "beat" | "memory" | "roulette">("none");

  // ランキングデータ（リアルタイム同期用）
  const [rankingBeat, setRankingBeat] = useState<RankingItem[]>([]);
  const [rankingMemory, setRankingMemory] = useState<RankingItem[]>([]);
  const [rankingRoulette, setRankingRoulette] = useState<RankingItem[]>([]);

  // GAME 01: 音ゲー用
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
  
  // 💡 4レーン仕様
  const lanes = [0, 1, 2, 3];
  
  // 状態参照用のref
  const stateRef = useRef({ notes, combo, maxCombo, score, health });
  useEffect(() => {
    stateRef.current = { notes, combo, maxCombo, score, health };
  }, [notes, combo, maxCombo, score, health]);

  // GAME 02: 神経衰弱用
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [memoryTime, setMemoryTime] = useState(0); 
  const [memoryStarted, setMemoryStarted] = useState(false);
  const [memoryOver, setMemoryOver] = useState(false);
  const [isLock, setIsLock] = useState(false); 
  const memoryTimerRef = useRef<number | null>(null);

  // GAME 03: デス・ローレット用
  const [rouletteTotal, setRouletteTotal] = useState(0); 
  const [rouletteCount, setRouletteCount] = useState(0); 
  const [currentMember, setCurrentMember] = useState<RouletteMember | null>(null);
  const [rouletteDeck, setRouletteDeck] = useState<RouletteMember[]>([]);
  const [isDoubleIcon, setIsDoubleIcon] = useState(false); 
  const [rouletteOver, setRouletteOver] = useState(false);
  const [showRouletteRuleModal, setShowRouletteRuleModal] = useState(false);

  // ==========================================
  // 🔥 Firebase Firestore リアルタイムリスナー設定 (エラーを修正して安全に)
  // ==========================================
  useEffect(() => {
    const qRoulette = query(collection(db, "ranking_roulette"), orderBy("score", "desc"), limit(10));
    const unsubscribeRoulette = onSnapshot(qRoulette, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          name: d.name,
          score: d.score,
          textScore: `${d.score}枚生存`,
          date: d.createdAt?.toDate() ? d.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()
        };
      });
      setRankingRoulette(data);
    });

    const qBeat = query(collection(db, "ranking_beat"), orderBy("score", "desc"), limit(5));
    const unsubscribeBeat = onSnapshot(qBeat, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          name: d.name,
          score: d.score,
          date: d.createdAt?.toDate() ? d.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()
        };
      });
      setRankingBeat(data);
    });

    const qMemory = query(collection(db, "ranking_memory"), orderBy("score", "asc"), limit(5));
    const unsubscribeMemory = onSnapshot(qMemory, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          name: d.name,
          score: d.score,
          textScore: `${d.score}秒`,
          date: d.createdAt?.toDate() ? d.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()
        };
      });
      setRankingMemory(data);
    });

    return () => {
      unsubscribeRoulette();
      unsubscribeBeat();
      unsubscribeMemory();
    };
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

  const endBeatGame = async () => {
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    
    try {
      await addDoc(collection(db, "ranking_beat"), {
        name: playerName,
        score: stateRef.current.score,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setActiveGame("none");
    alert(`ゲームオーバー！ スコア: ${stateRef.current.score} pt`);
  };

  useEffect(() => {
    if (activeGame !== "beat") return;
    let lastNoteTime = Date.now();
    const updateGame = () => {
      setNotes((prev) =>
        prev.map((n) => ({ ...n, y: n.y + speed })).filter((n) => {
          if (n.y > 95) {
            setCombo(0);
            if (n.type !== "heal") setHealth((h) => Math.max(0, h - 10));
            return false;
          }
          return true;
        })
      );
      const now = Date.now();
      const interval = Math.max(250, 700 - (level - 1) * 45);
      if (now - lastNoteTime > interval) {
        // ランダムにタイプを割り当て (bomb, heal, debrief, normal)
        const rand = Math.random();
        let type: "bomb" | "heal" | "debrief" | "normal" = "normal";
        if (rand < 0.1) type = "bomb";
        else if (rand < 0.2) type = "heal";
        else if (rand < 0.3) type = "debrief";

        setNotes((prev) => [...prev, { id: nextNoteId.current++, lane: Math.floor(Math.random() * 4), y: 0, type }]);
        lastNoteTime = now;
      }
      gameLoopRef.current = requestAnimationFrame(updateGame);
    };
    gameLoopRef.current = requestAnimationFrame(updateGame);
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, [activeGame, speed, level]);

  // 画像にあった handleLaneTap の処理を実装
  const handleLaneTap = (lane: number) => {
    const currentNotes = stateRef.current.notes;
    const currentCombo = stateRef.current.combo;
    const currentMaxCombo = stateRef.current.maxCombo;

    const target = currentNotes.find((n) => n.lane === lane && n.y > 65 && n.y < 92);
    if (target) {
      setNotes((prev) => prev.filter((n) => n.id !== target.id));
      if (target.type === "heal") {
        setHealth((h) => Math.min(100, h + 10));
        setEffect("HEAL +10!");
      } else if (target.type === "bomb") {
        setHealth((h) => Math.max(0, h - 20));
        setCombo(0);
        setEffect("BOMB! -20");
      } else if (target.type === "debrief") {
        setScore((s) => Math.max(0, s - 50));
        setEffect("DEBRIEF -50pt");
      } else {
        const newCombo = currentCombo + 1;
        setCombo(newCombo);
        if (newCombo > currentMaxCombo) setMaxCombo(newCombo);
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

  // PCキーボード操作 (D, F, J, Kキー)
  useEffect(() => {
    if (activeGame !== "beat") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "d") handleLaneTap(0);
      if (key === "f") handleLaneTap(1);
      if (key === "j") handleLaneTap(2);
      if (key === "k") handleLaneTap(3);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGame]);

  // ==========================================
  // GAME 02: 神経衰弱 ロジック
  // ==========================================
  const startMemoryGame = () => {
    let deck: Card[] = [];
    MEMORY_MEMBER_NAMES.forEach((name, id) => {
      deck.push({ id: id * 2, memberId: id, name, isFlipped: false, isMatched: false });
      deck.push({ id: id * 2 + 1, memberId: id, name, isFlipped: false, isMatched: false });
    });
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setSelectedIndices([]);
    setMemoryTime(0);
    setMemoryOver(false);
    setIsLock(false);
    setMemoryStarted(true);
    setActiveGame("memory");

    if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
    memoryTimerRef.current = window.setInterval(() => {
      setMemoryTime((t) => t + 1);
    }, 1000);
  };

  const handleCardClick = (index: number) => {
    if (isLock || cards[index].isFlipped || cards[index].isMatched) return;
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);
    const nextSelect = [...selectedIndices, index];
    setSelectedIndices(nextSelect);

    if (nextSelect.length === 2) {
      setIsLock(true);
      const [firstIdx, secondIdx] = nextSelect;
      if (cards[firstIdx].memberId === cards[secondIdx].memberId) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIdx].isMatched = true;
          matchedCards[secondIdx].isMatched = true;
          setCards(matchedCards);
          setSelectedIndices([]);
          setIsLock(false);
          if (matchedCards.every((c) => c.isMatched)) endMemoryGame(true);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIdx].isFlipped = false;
          resetCards[secondIdx].isFlipped = false;
          setCards(resetCards);
          setSelectedIndices([]);
          setIsLock(false);
        }, 1000);
      }
    }
  };

  const endMemoryGame = async (isClear: boolean) => {
    if (memoryTimerRef.current) clearInterval(memoryTimerRef.current);
    setMemoryStarted(false);
    setMemoryOver(true);
    
    if (isClear) {
      try {
        await addDoc(collection(db, "ranking_memory"), {
          name: playerName,
          score: memoryTime,
          createdAt: serverTimestamp()
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // ==========================================
  // GAME 03: デス・ローレット ロジック
  // ==========================================
  const startRouletteGame = () => {
    const deck = [...ROULETTE_MEMBERS].sort(() => Math.random() - 0.5);
    setRouletteDeck(deck);
    setRouletteTotal(0);
    setRouletteCount(0);
    setCurrentMember(null);
    setIsDoubleIcon(false);
    setRouletteOver(false);
    setActiveGame("roulette");
    setShowRouletteRuleModal(true);
  };

  const drawCard = () => {
    if (rouletteOver || rouletteDeck.length === 0) return;

    let deck = [...rouletteDeck];
    const picked = deck.pop()!; 
    
    if (deck.length === 0) {
      deck = [...ROULETTE_MEMBERS].sort(() => Math.random() - 0.5);
    }
    setRouletteDeck(deck);
    setCurrentMember(picked);

    let nextValue = picked.value;
    if (isDoubleIcon) {
      nextValue = nextValue * 2;
      setIsDoubleIcon(false);
    }

    let nextTotal = rouletteTotal;
    if (picked.name === "メンバーF") {
      setIsDoubleIcon(true);
      nextTotal += nextValue;
    } else if (picked.name === "メンバーJ") {
      nextTotal = 13;
    } else if (picked.name === "メンバーM") {
      nextTotal = 0;
    } else {
      nextTotal += nextValue;
    }

    if (nextTotal < 0) nextTotal = 0;
    setRouletteTotal(nextTotal);

    if (nextTotal > 14) {
      setTimeout(() => {
        endRouletteGame();
      }, 800);
    } else {
      setRouletteCount((c) => c + 1);
    }
  };

  const endRouletteGame = async () => {
    setRouletteOver(true);
    
    try {
      await addDoc(collection(db, "ranking_roulette"), {
        name: playerName,
        score: rouletteCount,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.error("Error sending score to Firebase: ", e);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans relative overflow-hidden flex flex-col justify-between select-none">
      
      {/* ヘッダー */}
      <header className="p-6 text-center relative z-10 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-md">
        {activeGame !== "none" ? (
          <button onClick={() => { setActiveGame("none"); setRouletteOver(false); if(memoryTimerRef.current) clearInterval(memoryTimerRef.current); }} className="text-zinc-500 hover:text-purple-400 text-xs absolute left-6 top-7">◁ 終了</button>
        ) : (
          <a href="/" className="text-zinc-500 hover:text-purple-400 text-xs absolute left-6 top-7">◁ 戻る</a>
        )}
        <h1 className="text-lg font-bold tracking-widest text-purple-400">14th ARCADE CENTER</h1>
      </header>

      {/* メインスペース */}
      <div className="flex-1 max-w-xl w-full mx-auto relative px-4 flex flex-col justify-center py-6 overflow-y-auto">
        
        {/* 名前入力 */}
        {!isNameEntered && (
          <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-md max-w-md mx-auto w-full">
            <h2 className="text-xl font-black mb-2">エントリーネーム</h2>
            <p className="text-zinc-400 text-xs mb-6">全国リアルタイムランキングに刻まれる名前を入力してください</p>
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

        {/* 総合ゲームメニュー */}
        {isNameEntered && activeGame === "none" && !memoryOver && !rouletteOver && (
          <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="p-6 bg-zinc-900/40 border border-white/10 rounded-3xl backdrop-blur-md text-center">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Player</p>
              <h2 className="text-lg font-bold text-purple-300 mb-6">🔥 {playerName} 🔥</h2>
              
              <p className="text-left text-zinc-400 text-xs font-bold mb-3 uppercase tracking-wider">Select Mini Game</p>
              
              <button onClick={startBeatGame} className="w-full p-4 bg-gradient-to-r from-purple-900/20 to-zinc-900/40 border border-purple-500/20 rounded-2xl text-left hover:border-purple-500/50 mb-3 block">
                <div className="font-bold text-white text-sm">GAME 01: 14th SURVIVAL TAP</div>
                <div className="text-zinc-400 text-xs mt-1">レベルアップする高速サバイバル4レーン音ゲー！</div>
              </button>

              <button onClick={startMemoryGame} className="w-full p-4 bg-gradient-to-r from-blue-900/20 to-zinc-900/40 border border-blue-500/20 rounded-2xl text-left hover:border-blue-500/50 mb-3 block">
                <div className="font-bold text-white text-sm">GAME 02: 14期生 真剣衰弱 🃏</div>
                <div className="text-zinc-400 text-xs mt-1">全28枚のカードを最速でめくり切れ！</div>
              </button>

              <button onClick={startRouletteGame} className="w-full p-4 bg-gradient-to-r from-red-900/20 to-zinc-900/40 border border-red-500/30 rounded-2xl text-left hover:border-red-400 block active:scale-[0.98] transition-all">
                <div className="font-bold text-red-400 text-sm">GAME 03: 14th デス・ローレット 💀</div>
                <div className="text-zinc-400 text-xs mt-1">合計が【14】を超えたら即爆発！リアルタイム同期ランキング</div>
              </button>
            </div>

            {/* オンラインランキング */}
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-zinc-900/30 border border-red-500/20 rounded-xl shadow-xl">
                <h3 className="text-[11px] font-black text-red-400 uppercase mb-2 text-center tracking-widest flex items-center justify-center gap-1">
                  <span>🌍</span> リアルタイム・デスローレット全国TOP10
                </h3>
                <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
                  {rankingRoulette.length === 0 ? (
                    <div className="text-center text-zinc-600 font-mono py-2">NO RECORDS YET</div>
                  ) : (
                    rankingRoulette.map((item, i) => (
                      <div key={i} className={`flex justify-between font-mono p-2 rounded items-center ${
                        i === 0 ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-bold" :
                        i === 1 ? "bg-slate-300/10 border border-slate-300/30 text-slate-300" :
                        i === 2 ? "bg-amber-700/10 border border-amber-700/30 text-amber-500" : "bg-zinc-950/40 border border-zinc-900/50"
                      }`}>
                        <span className="truncate max-w-[180px]">
                          <span className="inline-block w-5 text-zinc-500">{i+1}.</span>{item.name}
                        </span>
                        <div className="text-right shrink-0">
                          <span className="font-black text-red-400 mr-2">{item.textScore}</span>
                          <span className="text-[9px] text-zinc-600 font-sans">{item.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-900/20 border border-zinc-900 rounded-xl">
                  <h3 className="text-[9px] font-bold text-purple-400 uppercase mb-2 text-center">🏆 TAP RANK</h3>
                  {rankingBeat.map((item, i) => (
                    <div key={i} className="flex justify-between font-mono bg-zinc-950/40 p-1.5 rounded mb-1 text-[10px]">
                      <span className="truncate max-w-[70px]">{i+1}. {item.name}</span>
                      <span className="text-purple-400 font-bold">{item.score}pt</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-zinc-900/20 border border-zinc-900 rounded-xl">
                  <h3 className="text-[9px] font-bold text-blue-400 uppercase mb-2 text-center">🏆 MEMORY TIME</h3>
                  {rankingMemory.map((item, i) => (
                    <div key={i} className="flex justify-between font-mono bg-zinc-950/40 p-1.5 rounded mb-1 text-[10px]">
                      <span className="truncate max-w-[70px]">{i+1}. {item.name}</span>
                      <span className="text-blue-400 font-bold">{item.textScore}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* GAME 01 画面 (image_30dadf.jpg の完全再現版) */}
        {activeGame === "beat" && (
          <div className="w-full max-w-md mx-auto flex flex-col justify-center">
            
            {/* 上部ステータス表示 */}
            <div className="mb-2 space-y-1 font-mono text-xs">
              <div className="text-sm font-bold text-zinc-400">SCORE: <span className="text-purple-400 text-lg font-black">{score}</span></div>
              <div className="text-sm font-bold text-zinc-400">COMBO: <span className="text-pink-400 text-lg font-black">{combo}</span></div>
              <div className="text-sm font-bold text-zinc-400">LIFE: <span className="text-emerald-400 text-lg font-black">{health}</span></div>
            </div>

            {/* プレイエリア（4レーン） */}
            <div className="w-full max-w-md h-8 bg-zinc-950 rounded-xl relative border border-zinc-800 overflow-hidden flex">
              {lanes.map((lane) => (
                <div key={lane} className="flex-1 border-r border-zinc-900/50 last:border-0 relative h-full">
                  {notes.filter((n) => n.lane === lane).map((note) => (
                    <div 
                      key={note.id}
                      style={{ top: `${note.y}%` }}
                      className={`absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-black ${
                        note.type === "bomb" ? "bg-red-600 text-white" :
                        note.type === "heal" ? "bg-emerald-500 text-white" :
                        note.type === "debrief" ? "bg-purple-600 text-white" : "bg-zinc-200 text-black"
                      }`}
                    >
                      {note.type.toUpperCase()}
                    </div>
                  ))}
                  <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-purple-500/30" />
                </div>
              ))}
            </div>

            {/* 操作用フットボタン */}
            <div className="w-full max-w-md grid grid-cols-4 gap-2 mt-4">
              {lanes.map((lane) => (
                <button 
                  key={lane} 
                  onMouseDown={() => handleLaneTap(lane)} 
                  className="bg-zinc-800 active:bg-purple-600 py-6 font-bold rounded-xl text-sm"
                >
                  {["D", "F", "J", "K"][lane]}
                </button>
              ))}
            </div>

            {/* エフェクト表示用 */}
            {effect && (
              <div className="text-center font-mono font-black text-yellow-400 text-lg mt-4 animate-bounce">
                {effect}
              </div>
            )}
          </div>
        )}

        {/* GAME 02 画面（神経衰弱） */}
        {activeGame === "memory" && (
          <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
            <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5 mb-4">
              <span className="text-xs text-zinc-400 font-bold font-mono">⏱ TIME ATTACK</span>
              <span className="text-2xl font-black font-mono text-blue-400">{memoryTime} <span className="text-xs text-zinc-400">秒</span></span>
            </div>
            <div className="grid grid-cols-4 gap-2 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-900">
              {cards.map((card, index) => (
                <div key={card.id} onClick={() => handleCardClick(index)} className={`aspect-[3/4] relative rounded-xl border transition-all transform duration-300 ${card.isMatched ? "opacity-20 pointer-events-none scale-90 border-transparent" : ""}`}>
                  <div className={`w-full h-full relative transition-transform duration-500 style-3d ${card.isFlipped || card.isMatched ? "rotate-y-180" : ""}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 rounded-xl flex items-center justify-center backface-hidden shadow-lg"><span className="text-xs font-black text-blue-400">14</span></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-slate-900 border border-blue-400/40 rounded-xl flex flex-col items-center justify-center rotate-y-180 backface-hidden p-1">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 mb-1 flex items-center justify-center text-[10px]">👤</div>
                      <span className="text-[9px] md:text-xs font-black text-center text-white truncate w-full">{card.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GAME 03 プレイ画面（デス・ローレット） */}
        {activeGame === "roulette" && !rouletteOver && (
          <div className="w-full max-w-md mx-auto text-center space-y-4">
            <div className="bg-zinc-900/80 p-5 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-zinc-400 font-mono font-bold tracking-widest">🃏 SURVIVED COUNTER</span>
                <button onClick={() => setShowRouletteRuleModal(true)} className="text-[10px] text-blue-400 bg-blue-950/40 border border-blue-900/50 px-2 py-0.5 rounded-full font-bold">❓ ルール表示</button>
              </div>
              <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">現在の合計値</p>
              <h2 className={`text-6xl font-black font-mono my-1 tracking-tighter transition-all ${
                rouletteTotal >= 11 ? "text-red-500 animate-pulse scale-105" : rouletteTotal >= 7 ? "text-amber-400" : "text-emerald-400"
              }`}>
                {rouletteTotal} <span className="text-xs text-zinc-500 font-normal">/ 14</span>
              </h2>
              <p className="text-zinc-400 text-xs font-mono">現在までに <span className="text-white font-black text-sm">{rouletteCount}</span> 枚安全にドロー成功</p>
              {isDoubleIcon && (
                <div className="mt-3 p-1.5 bg-red-950/60 border border-red-500 text-red-400 text-[10px] font-black rounded-lg uppercase tracking-widest animate-bounce">
                  ⚠️ WARNING: 次の数値が【2倍】になる呪い発動中！ ⚠️
                </div>
              )}
            </div>

            <div className="min-h-[160px] flex items-center justify-center">
              {currentMember ? (
                <div className="w-full max-w-[220px] aspect-[2/3] bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-red-500/50 rounded-2xl p-4 flex flex-col justify-between items-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg border border-white/10">👤</div>
                  <div className="text-center my-1">
                    <h3 className="text-base font-black text-white">{currentMember.name}</h3>
                    <p className={`text-xl font-mono font-black mt-0.5 ${currentMember.value < 0 ? "text-emerald-400" : currentMember.value === 0 ? "text-zinc-400" : "text-red-400"}`}>
                      {currentMember.value > 0 ? `+${currentMember.value}` : currentMember.value}
                    </p>
                  </div>
                  <p className="text-[10px] text-zinc-300 bg-black/40 p-2 rounded-xl w-full text-center leading-relaxed border border-white/5">
                    {currentMember.effectText}
                  </p>
                </div>
              ) : (
                <div className="w-full max-w-[220px] aspect-[2/3] bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 text-xs font-bold">
                  ボタンを押してドローしてください
                </div>
              )}
            </div>

            <button onClick={drawCard} className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black rounded-2xl shadow-[0_4px_20px_rgba(239,68,68,0.4)] tracking-widest text-sm">
              カードを1枚ドローする 💥
            </button>
          </div>
        )}

        {/* ルール説明モーダル */}
        {showRouletteRuleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-red-950 border border-red-500/30 flex items-center justify-center mx-auto text-xl">💀</div>
              <h3 className="text-lg font-black text-red-400 tracking-wide">14th デス・ローレット ルール</h3>
              <div className="text-left text-xs text-zinc-300 space-y-2.5 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-white/5">
                <p>① 山札から順番にカードを引いていきます。</p>
                <p>② カードの数値が場の合計値に蓄積されます。</p>
                <p>③ 合計が<span className="text-red-400 font-bold">【14】を超えた瞬間に爆発</span>して即ゲームオーバー！</p>
              </div>
              <button onClick={() => setShowRouletteRuleModal(false)} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg text-xs tracking-widest">
                了解、デスゲームを開始する ▷
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}