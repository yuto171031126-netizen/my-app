// app/data.ts

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export interface YearGroup {
  yearKey: '1st' | '2nd' | '3rd' | '4th';
  yearLabel: string;
  catchphrase: string;
  events: EventItem[];
}

export const albumByYears: YearGroup[] = [
  {
    yearKey: '1st',
    yearLabel: '1年生',
    catchphrase: '出会いと挑戦、すべてが新鮮だった1年目',
    events: [
      {
        id: '1-1',
        title: '新歓＆初バンド結成',
        date: '2023.04',
        description: 'ドキドキの入隊と、初めて合わせた記念すべきファーストハーモニー。',
      },
      {
        id: '1-2',
        title: '1年 夏合宿',
        date: '2023.08',
        description: '夜遅くまでロビーで練習した、熱くて楽しい最高の夏の思い出。',
      },
      {
        id: '1-3',
        title: '冬の定例ライブ',
        date: '2023.12',
        description: '先輩たちの前で緊張しながら披露した、初めての本格ステージ。',
      },
    ],
  },
  {
    yearKey: '2nd',
    yearLabel: '2年生',
    catchphrase: '後輩もできて、アカペラがもっと楽しくなった2年目',
    events: [
      {
        id: '2-1',
        title: '2年 新歓ライブサポート',
        date: '2024.04',
        description: '初めて迎える後輩たちにワクワクしながら歌ったステージ。',
      },
      {
        id: '2-2',
        title: '学園祭ステージ',
        date: '2024.11',
        description: '野外ステージの大歓声の中で響かせた、最高のグルーヴ。',
      },
    ],
  },
  {
    yearKey: '3rd',
    yearLabel: '3年生',
    catchphrase: 'サークルの中心として駆け抜けた情熱の3年目',
    events: [
      {
        id: '3-1',
        title: 'はもねぴあ春合宿イン小浜温泉',
        date: '2025.03',
        description: '温泉街で夜通し語り合い歌い明かした、かけがえのない時間。',
      },
      {
        id: '3-2',
        title: '幹部学年ラストライブ',
        date: '2025.12',
        description: 'サークルを引っ張ってきた集大成。涙と笑顔のステージ。',
      },
    ],
  },
  {
    yearKey: '4th',
    yearLabel: '4年生',
    catchphrase: '最高の16人で迎える、集大成のラストイヤー',
    events: [
      {
        id: '4-1',
        title: '卒ライ直前 深夜のスタジオ練習',
        date: '2026.02',
        description: 'ベースの重低音とコーラスが最高潮に仕上がった熱血練習。',
      },
      {
        id: '4-2',
        title: '卒業ライブ「DEAR」本番',
        date: '2026.03',
        description: '4年間の感謝と愛を込めて。16人で奏でる最後のステージ。',
      },
    ],
  },
];