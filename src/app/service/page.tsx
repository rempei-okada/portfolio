import { ServicesSection } from "@/pages-components/top/ServicesSection";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サービス | 岡田 恋平',
  description: '岡田恋平が提供するサービスの詳細ページです。フロントエンド、バックエンド開発などの技術サービスを提供します。',
  keywords: ['エンジニア', 'サービス', 'フロントエンド', 'バックエンド', '開発'],
};

export default function ServicePage() {
  return (
    <div className="min-h-screen font-sans bg-paper1">
      <ServicesSection />
    </div>
  );
}