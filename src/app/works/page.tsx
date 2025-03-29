import { WorksSection } from "@/pages-components/works/WorksSection";
import { fetchWorksList } from "@/api/works";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '作品集 | 岡田 恋平',
  description: '岡田恋平のこれまでの制作実績や作品をご紹介するページです。',
  keywords: ['作品集', 'ポートフォリオ', 'プロジェクト', 'Web制作'],
};

// ビルド時にデータを取得
async function getData() {
  const works = await fetchWorksList();
  return {
    works
  };
}

export default async function WorksPage() {
  const data = await getData();
  
  return (
    <div className="min-h-screen font-sans bg-paper1">
      <WorksSection initialWorks={data.works} />
    </div>
  );
}