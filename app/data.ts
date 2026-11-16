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
];// app/data.ts

export interface PhotoDetail {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;          // イベントの表紙画像
  detailPhotos?: PhotoDetail[]; // 🌟 ここをクリックした先で見られる写真・思い出リスト
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
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        detailPhotos: [
          { id: 'p1', title: '初めてのサークル説明会', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', caption: '緊張しながらパンフレットを受け取った日' },
          { id: 'p2', title: '記念すべき初スタジオ', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', caption: '音合わせのあとにみんなで食べたアイスの味' },
        ]
      },
      {
        id: '1-2',
        title: '1年 夏合宿',
        date: '2023.08',
        description: '夜遅くまでロビーで練習した、熱くて楽しい最高の夏の思い出。',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        detailPhotos: [
          { id: 'p3', title: 'ロビーでの深夜練習', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', caption: '眠気をこらえて音程を確認し合ったロビー' },
          { id: 'p4', title: '大自然の中での集合写真', imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=80', caption: '緑に囲まれて最高の笑顔！' },
        ]
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
        title: '学園祭ステージ',
        date: '2024.11',
        description: '野外ステージの大歓声の中で響かせた、最高のグルーヴ。',
        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        detailPhotos: [
          { id: 'p5', title: 'ステージ袖での円陣', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', caption: '「行くぞー！」と気合を入れた瞬間' },
        ]
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
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        detailPhotos: [
          { id: 'p6', title: '小浜温泉の夕暮れ', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', caption: '温泉街をみんなでお散歩したときの風景' },
        ]
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
        title: '卒業ライブ「DEAR」本番',
        date: '2026.03',
        description: '4年間の感謝と愛を込めて。16人で奏でる最後のステージ。',
        imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        detailPhotos: [
          { id: 'p7', title: '16人全員でのラストポーズ', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', caption: '鳴りやまない拍手の中、涙があふれたフィナーレ' },
        ]
      },
    ],
  },
];