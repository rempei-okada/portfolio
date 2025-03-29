import "./globals.scss";
import { Footer } from "./Footer";
import type { Metadata } from 'next';
import { GlobalNavigation } from "@/components/GlobalNavigation";
import { ScrollIndicator } from "@/components/ScrollIndicatior";

export const metadata: Metadata = {
  title: {
    template: '%s | 岡田 恋平',
    default: '岡田 恋平 | ポートフォリオ',
  },
  description: '広島県尾道市出身のエンジニア、岡田恋平のポートフォリオサイトです。',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <ScrollIndicator />
                <GlobalNavigation />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
