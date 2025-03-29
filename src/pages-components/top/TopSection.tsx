'use client';

import Image from "next-export-optimize-images/picture";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import TopImage from "@/assets/images/onomichi.jpg";
import { siteName, TopProfile1, TopProfile2, TopProfile3 } from "@/constants";
import { useEffect, useState } from "react";
import { fetchWorks, type WorkMeta } from "@/models/client";
import { FadeAndSlideScrollTriggerAnimation } from "@/libs/ScrollTriggerAnimations/FadeAndSlideScrollTriggerAnimation";
import clsx from "clsx";
import { TransitionImage } from "@/libs/ScrollTriggerAnimations/TransitionImage";
import { AnimatedImage } from "@/components/AnimatedImage";
import { SkewScrollTriggerAnimation } from "@/libs/ScrollTriggerAnimations/SkewScrollTriggerAnimation";
import { CircularText } from "@/components/CircularText";
import { BrushStroke, DiagonalLine, JapanesePatterns } from "@/components/decorations";

const BrushStroke2 = ({ className }: { className?: string }) => (
    <div className={`${className}`}>
        <svg width="200" height="30"
            className="w-full"
            viewBox="0 0 200 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10,15 Q50,5 100,15 Q150,25 190,15"
                stroke="#B34D4D" strokeWidth="2" strokeLinecap="round" />
        </svg>
    </div>
);

export const TopSection = ({ initialNews = [] }: { initialNews?: WorkMeta[] }) => {
    const [isNewsLoading, setIsNewsLoading] = useState(initialNews.length === 0);
    const [error, setError] = useState(null);
    const [newses, setNewses] = useState<WorkMeta[]>(initialNews);

    useEffect(() => {
        // 初期データがない場合のみクライアントサイドでフェッチする
        if (initialNews.length === 0) {
            const fetchNews = async () => {
                try {
                    setIsNewsLoading(true)
                    const result = await fetchWorks();
                    setNewses(result);
                }
                catch (err: any) {
                    setError(err.message);
                }
                finally {
                    setIsNewsLoading(false);
                }
            };

            fetchNews();
        }
    }, [initialNews]);

    return (
        <div className="w-full mx-auto flex flex-col px-4 pt-8 sm:pt-24" style={{}}>

            <div className="absolute top-[40%] right-0 w-40 h-80 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 200" fill="none">
                    <path d="M80,30 Q50,60 30,50 Q10,30 30,10 Q50,30 80,30 Z" fill="#B34D4D" opacity="0.6" />
                    <path d="M40,120 Q10,150 30,180 Q50,150 40,120 Z" fill="#B34D4D" opacity="0.6" />
                </svg>
            </div>
            <div className="absolute top-[40%] right-0 w-40 h-80 opacity-10 pointer-events-none">
                <JapanesePatterns />
            </div>

            <div className={clsx(
                "m-auto flex justify-center items-center max-w-[680px] relative",
                "md:px-24 md:max-w-[1880px]"
            )}>
                {/* Decorative asymmetrical element - washi paper texture */}
                <div className="absolute top-10 right-10 w-24 h-24 md:w-48 md:h-48 opacity-10 bg-[#707C80] rounded-tr-3xl transform rotate-12"></div>

                {/* Asymmetrical decorative element */}
                <DiagonalLine className="top-20 right-20" />
                <DiagonalLine className="bottom-40 left-20" />

                <div className={clsx(
                    "w-full gap-12 justify-center flex relative",
                    "flex-col-reverse flex-wrap",
                    "md:gap-16 lg:gap-24 md:flex-row md:relative md:flex-nowrap md:mb-48"
                )}>
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <div className="h-0 md:h-36 md:mt-24 md:relative lg:h-44">
                            {/* <h1 className={clsx(
                                "absolute left-0 text-2xl font-asterdam -rotate-[6deg] whitespace-nowrap font-normal z-10 text-[#1A1A1A]",
                                "top-24 left-4",
                                "sm:text-4xl",
                                "md:ml-12 md:-top-2 md:text-5xl lg:text-7xl"
                            )}>
                                <FadeAndSlideScrollTriggerAnimation> {siteName}'s　　Portfolio</FadeAndSlideScrollTriggerAnimation>
                            </h1>
                            <BrushStroke className="absolute bottom-0 left-4 w-3/4 md:w-2/3 h-6 text-akane -rotate-3 opacity-80" /> */}
                            <div className="mb-8 md:mb-0 -rotate-1">
                                <SkewScrollTriggerAnimation tag="h1" className="text-4xl md:text-5xl font-light mb-2" >
                                    Renpei Okada
                                    <span className="block text-sm tracking-widest mt-2 text-nezumi">
                                        ポートフォリオ
                                    </span>
                                </SkewScrollTriggerAnimation>
                            </div>

                        </div>

                        <div className="flex flex-col px-4 mx-auto mt-24 md:mt-12 relative">
                            <div className="mt-8 text-[#1A1A1A] border-l-2 border-b-2 border-[#224C5B] pl-6 overflow-hidden">
                                <SkewScrollTriggerAnimation tag="p" skewPanelClass="!bg-paper1" className="text-size2 mb-6">
                                    <TopProfile1 />
                                </SkewScrollTriggerAnimation>
                                <SkewScrollTriggerAnimation tag="p" className="text-size-p mt-10 opacity-90">
                                    <TopProfile2 />
                                </SkewScrollTriggerAnimation>
                                <SkewScrollTriggerAnimation tag="p" className="text-size-p mt-10 opacity-90">
                                    <TopProfile3 />
                                </SkewScrollTriggerAnimation>
                            </div>

                            {/* Vertical text decoration */}
                            <aside className="absolute left-0 right-0 transform top-24 rotate-90 origin-left">
                                <FadeAndSlideScrollTriggerAnimation className="text-xl tracking-[0.25em] text-[#707C80] font-light">
                                    エンジニア
                                </FadeAndSlideScrollTriggerAnimation>
                            </aside>

                        </div>

                    </div>
                    <div className="pl-16 sm:pl-36 md:pl-0 w-full md:w-3/5 mx-auto relative">
                        {/* Image frame with Japanese aesthetic */}
                        <div className="relative mr-6">
                            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-font1 bg-red transform -rotate-1"></div>
                            {/* image border frame */}
                            <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 border-r-2 border-b-2 border-[#B34D4D] bg-transparent transform rotate-3"></div>
                            <AnimatedImage src={TopImage} alt="尾道" parallaxSlideLength={100} className="border border-font1" />
                        </div>

                        <CircularText
                            className="absolute bottom-[50px] left-[10px] md:bottom-[0px] md:-left-[100px] text-[#224C5B]"
                            words={[
                                "C#", "　",
                                "JS/TS", "　",
                                "Kotlin", "　",
                                "React", "　",
                                "Azure", "　",
                                "Blazor", "　",
                                ".NET", "　",
                                "Next.js", "　",
                                "Shopify", "　",
                                "Remix", "　",
                            ]} />
                    </div>
                </div>

                {/* Asymmetrical decorative element - bottom right */}
                <div className="absolute bottom-10 right-20 w-32 h-32 border-r border-b border-[#707C80] opacity-30"></div>
            </div>
        </div>
    )
}

