// app/data.ts

export interface AlbumItem {
  id: string;
  year: '1st' | '2nd' | '3rd' | '4th';
  yearLabel: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export const albumData: AlbumItem[] = [
  // 1年生
  {
    id: '1',
    year: '1st',
    yearLabel: '1年生',
    title: 'はもねぴあ新歓＆初バンド結成',
    date: '2023.04',
    description: 'すべてはここから始まった！ドキドキのサークル入隊と最初のバンド。',
  },
  {
    id: '2',
    year: '1st',
    yearLabel: '1年生',
    title: '14期はじめての夏合宿',
    date: '2023.08',
    description: '夜遅くまでコーラスを合わせた、熱くて楽しい最高の夏の思い出。',
  },

  // 2年生
  {
    id: '3',
    year: '2nd',
    yearLabel: '2年生',
    title: '秋の学園祭ステージ',
    date: '2024.11',
    description: '先輩たちの背中を追いかけながら、みんなで作り上げた大舞台。',
  },

  // 3年生
  {
    id: '4',
    year: '3rd',
    yearLabel: '3年生',
    title: 'はもねぴあ春合宿イン小浜温泉',
    date: '2025.03',
    description: '温泉街の空気を震わせた夜通しの語り合いと、笑い合った春の合宿。',
  },

  // 4年生
  {
    id: '5',
    year: '4th',
    yearLabel: '4年生',
    title: '卒業ライブ直前！深夜の熱血スタジオ練習',
    date: '2026.02',
    description: 'ラストステージに向けて、16人の絆と低音が最高潮に達した瞬間。',
  },
  {
    id: '6',
    year: '4th',
    yearLabel: '4年生',
    title: '14期生 Memorial Photo',
    date: '2026.03',
    description: '4年間いつも支え合ってきた最高の仲間たちと迎える最後の日。',
  },
];