import { ContactSection } from "@/pages-components/top/ContactSection";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 岡田 恋平',
  description: '岡田恋平へのお問い合わせページです。ご質問やお仕事のご依頼などはこちらからお願いします。',
  keywords: ['お問い合わせ', '連絡先', 'コンタクト', '仕事依頼'],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen font-sans bg-paper1">
      <ContactSection />
    </div>
  );
}