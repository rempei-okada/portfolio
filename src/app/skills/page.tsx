import { TechStacks } from "@/pages-components/top/TechStacks";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'スキル | 岡田 恋平',
  description: '岡田恋平のプログラミングスキルや技術スタックを紹介するページです。',
  keywords: ['スキル', '技術スタック', 'プログラミング', 'エンジニア'],
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen font-sans bg-paper1">
      <TechStacks />
    </div>
  );
}