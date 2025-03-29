"use client"

import { SectionType1 } from "@/components/SectionType1"
import { motion } from "motion/react"

export const ServicesSection = () => {

    return (
        <>
      <SectionType1 className=' bg-paper2' innerClassName="!flex-col">


            <div className="z-10">


                <h2 className={`text-3xl font-light mb-12 tracking-wider`}>
                    <span className="block text-title1 mt-1">作品集</span>
                </h2>

                <p className="max-w-2xl leading-relaxed ">
                    余白と質素さを大切にした作品の数々。
                    自然との調和を意識した制作プロセスから生まれる、
                    非対称の美しさをご覧ください。
                </p>


                <div className="w-full flex flex-col items-start">
                    <div className="p-8 flex flex-wrap">

                        <div className="ml-auto mt-4 pl-4 border-l-2 border-akane p-6 bg-kinari">
                            <p className="text-[#707C80] font-light leading-relaxed">
                                余白と質素さを大切にした作品の数々。
                                自然との調和を意識した制作プロセスから生まれる、
                                美学を感じるデザインを心掛けています。
                            </p>

                            <p className="text-[#1A1A1A] font-serif text-lg">
                                「形あるものは全て崩れ去る」<br />
                                <span className="text-sm text-[#707C80] mt-2 block">- 無常の美学 -</span>
                            </p>
                        </div>
                    </div>

                    {/* Works section with kanso (simplicity) */}
                    <section className="mb-32">
                        <div className="flex items-center mb-12">
                            <h2 className="text-3xl font-light text-sumi">WORKS</h2>
                            <div className="ml-4 flex-1 h-px bg-sumi/20"></div>
                            <p className="ml-4 text-sm text-nezumi">作品集</p>
                        </div>

                        <div className="mb-8 max-w-2xl">
                            <p className="leading-relaxed text-nezumi">
                                余白と質素さを大切にした作品の数々。
                                自然との調和を意識した制作プロセスから生まれる、
                                非対称の美しさをご覧ください。
                            </p>
                        </div>

                        {/* Work items with asymmetry (fukinsei) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                            {/* First work item */}
                            <motion.div
                                className="group"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="h-64 mb-4 overflow-hidden bg-ai/90">
                                    <div className="h-full w-full flex items-center justify-center">
                                        <p className="text-kinari text-2xl font-light">作品 1</p>
                                    </div>
                                </div>
                                <h3 className="text-xl mb-2 text-sumi">ウェブ開発</h3>
                                <p className="text-sm text-nezumi">
                                    響きあう技術と美学。モダンな要素と日本の伝統美を融合させたウェブサイト制作。
                                </p>
                            </motion.div>

                            {/* Second work item (offset for asymmetry) */}
                            <motion.div
                                className="group md:mt-16"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="h-64 mb-4 overflow-hidden bg-akane/90">
                                    <div className="h-full w-full flex items-center justify-center">
                                        <p className="text-kinari text-2xl font-light">作品 2</p>
                                    </div>
                                </div>
                                <h3 className="text-xl mb-2 text-sumi">アプリケーション開発</h3>
                                <p className="text-sm text-nezumi">
                                    使う人の心に寄り添う。シンプルで直感的なインターフェイスのアプリケーション開発。
                                </p>
                            </motion.div>

                            {/* Third work item */}
                            <motion.div
                                className="group"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="h-64 mb-4 overflow-hidden bg-nezumi/90">
                                    <div className="h-full w-full flex items-center justify-center">
                                        <p className="text-kinari text-2xl font-light">作品 3</p>
                                    </div>
                                </div>
                                <h3 className="text-xl mb-2 text-sumi">コンサルティング</h3>
                                <p className="text-sm text-nezumi">
                                    未来を見据えた戦略。技術選定から実装まで、プロジェクト全体をサポート。
                                </p>
                            </motion.div>

                            {/* Second work item (offset for asymmetry) */}
                            <motion.div
                                className="group md:mt-16"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="h-64 mb-4 overflow-hidden bg-akane/90">
                                    <div className="h-full w-full flex items-center justify-center">
                                        <p className="text-kinari text-2xl font-light">作品 2</p>
                                    </div>
                                </div>
                                <h3 className="text-xl mb-2 text-sumi">アプリケーション開発</h3>
                                <p className="text-sm text-nezumi">
                                    使う人の心に寄り添う。シンプルで直感的なインターフェイスのアプリケーション開発。
                                </p>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </SectionType1>
  

        </>
    )
}