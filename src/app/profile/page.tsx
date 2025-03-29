import { TopSection } from "@/pages-components/top/TopSection";
import { fetchWorks } from "@/models/client";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プロフィール | 岡田 恋平',
  description: '広島県尾道市出身のエンジニア、岡田恋平のプロフィールページです。',
  keywords: ['エンジニア', 'プロフィール', '岡田恋平'],
};

// ビルド時にデータを取得
async function getData() {
  const newsItems = await fetchWorks();
  return {
    newsItems
  };
}

export default async function ProfilePage() {
  const data = await getData();
  
  return (
    <div className="min-h-screen font-sans bg-paper1">
      <TopSection initialNews={data.newsItems} />
    </div>
  );
}