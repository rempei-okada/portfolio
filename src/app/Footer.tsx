import Link from "next/link";

const sitemapItems = [
    { name: 'TOP', path: '/' },
    { name: 'サービス', path: '/services' },
    { name: 'お知らせ', path: '/news' },
    { name: 'イベント情報', path: '/events' },
    { name: 'Match Bondの想い', path: '/about' },
    { name: '会社概要', path: '/company' },
    { name: 'お問い合わせ', path: '/contact' },
];

export const Footer = () => {
    return (
        <footer className="pt-16 pb-8">
            <div className="container mx-auto px-4">

                {/* コピーライト */}
                <div className="border-t border-gray-500 mt-12 pt-8">
                    <p className="text-center text-gray-600">
                        © {new Date().getFullYear()} Renpei Okada. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );

}