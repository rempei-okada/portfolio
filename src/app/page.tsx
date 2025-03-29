import type { Metadata } from 'next';
import { fetchWorks } from '@/models/client';
import { TopSection } from "@/pages-components/top/TopSection";

export const metadata: Metadata = {
  title: '岡田 恋平 | ポートフォリオ',
  description: '広島県尾道市出身のエンジニア、岡田恋平のポートフォリオサイトです。フロントエンド、バックエンド、デスクトップアプリ、スマホアプリの開発を得意としています。',
  keywords: ['エンジニア', 'ポートフォリオ', 'フロントエンド', 'バックエンド', 'TypeScript', 'C#', 'React', 'Next.js'],
};

// ビルド時にデータを取得
async function getData() {
  const newsItems = await fetchWorks();
  return {
    newsItems
  };
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="min-h-screen font-sans bg-paper1">
      <TopSection initialNews={data.newsItems} />
    </div>
  );
}