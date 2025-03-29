'use client'

import React from 'react';
import { FadeAndSlideScrollTriggerAnimation } from '@/libs/ScrollTriggerAnimations/FadeAndSlideScrollTriggerAnimation';

const ServicesPage = () => {
    return (
        <div className="min-h-screen">

            <section className="bg-slate-300 py-16 px-4 w-full relative">
                <FadeAndSlideScrollTriggerAnimation>
                    <div className="container mx-auto text-center">
                        <p className="text-title3 mt-8 mb-8">
                            代表の言葉
                        </p>
                        <p className="text-xl text-gray-700 mb-8 leading-relaxed text-center">
                            <span className="block">テキストテキストテキストテキスト</span>
                            <span className="block">テキストテキストテキストテキストテキストテキスト</span>
                            <span className="block">テキストテキストテキストテキストテキスト</span>
                            <span className="block">テキストテキストテキストテキストテキストテキストテキスト</span>
                            <span className="block">テキストテキストテキストテキスト</span>
                        </p>
                    </div>
                </FadeAndSlideScrollTriggerAnimation>
            </section>

        </div>
    );
};

const serviceItems = [
    {
        image: "/img2.jpg",
        title: "マッチング・コンサルティング",
        description: "年齢が近い参加者同士の合コンをセッティング。司会進行、席替え、ゲームなどで和やかな雰囲気を演出し、特に女性が安心できる環境づくりに注力しています。"
    },
    {
        image: "/img.jpg",
        title: "Match婚・イベント開催",
        description: "婚活イベントから地域貢献活動まで、多様な出会いの機会を提供。新しい経験、学び、地域社会との繋がりを深める場として機能します。"
    },
    {
        image: "/option-photo.jpg",
        title: "撮影",
        description: "プロのカメラマンがあなたのお気に入りの場所でプロフィールを撮影します。福山市内(内海以外）は無料で出張。お気に入りの場所を教えてください。"
    },
    {
        image: "/option-makeup.jpg",
        title: "メイク講座",
        description: "メイク初心者向けの個別講座を提供。自信を持ってお洒落を楽しめるよう、丁寧にサポートします。"
    },
    {
        image: "/option-fashion.jpg",
        title: "メンズコーディネーター",
        description: "Match-Bond専属のコーディネーターが、ファッション、ヘアセット、メンズメイク、スキンケアなど、男性の総合的な魅力向上をサポートします。"
    },
    {
        image: "/option-uranai.jpg",
        title: "占いサービス",
        description: "高評価の占い師COCOさんによる占いサービス。10分1,000円からご利用いただけます。"
    }
];

const features = [
    "多様な出会いの機会を提供",
    "安心・安全なサービス提供",
    "総合的な魅力向上サポート"
];

export default ServicesPage;