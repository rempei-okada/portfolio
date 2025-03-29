import React, { type JSX } from 'react';
import { SectionType1 } from '@/components/SectionType1';
import { BrushStroke } from '@/components/decorations';
import { sections } from '@/constants';

// Tech stack data structure
export interface Category {
    name: string;
    items: string[];
}

export interface Section {
    title: string;
    icon: React.ReactElement;
    categories: Category[];
}

export const TechStacks: React.FC = () => {
    return (
        <SectionType1 className='bg-paper1' >
            <div className="relative justify-start flex flex-col items-start gap-1 sm:gap-2 md:gap-3 w-full">
                {/* Decorative asymmetrical element */}

                <>
                    <div className='text-ai/15 text-[65px] absolute top-[15%] left-[5%]'>C#</div>
                    <div className='text-akane/15 text-[48px] absolute bottom-[30%] right-[12%]'>Vue</div>
                    <div className='text-nezumi/15 text-[82px] absolute top-[8%] right-[25%]'>F#</div>
                    <div className='text-akane/15 text-[52px] absolute bottom-[10%] left-[15%]'>TypeScript</div>
                    <div className='text-nezumi/15 text-[78px] absolute top-[35%] right-[8%]'>.NET</div>
                    <div className='text-ai/15 text-[43px] absolute bottom-[25%] left-[40%]'>EFCore</div>
                    <div className='text-akane/15 text-[90px] absolute top-[22%] right-[5%]'>Kotlin</div>
                    <div className='text-nezumi/15 text-[57px] absolute top-[45%] left-[7%]'>Maui</div>
                    <div className='text-ai/15 text-[36px] absolute bottom-[15%] right-[35%]'>PHP</div>
                    <div className='text-akane/15 text-[75px] absolute top-[25%] left-[28%]'>Next.js</div>
                    <div className='text-nezumi/15 text-[62px] absolute bottom-[40%] left-[10%]'>Unity</div>
                    <div className='text-ai/15 text-[50px] absolute top-[12%] left-[45%]'>OpenCV</div>
                    <div className='text-akane/15 text-[85px] absolute bottom-[5%] right-[20%]'>Python</div>
                    <div className='text-nezumi/15 text-[68px] absolute top-[40%] left-[20%]'>Blazor</div>
                </>


                <div className="container mx-auto p-6 md:p-12">
                    <div className="relative mb-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif text-font1 mb-2">技術スタック</h2>
                        <p className="text-sm text-nezumi uppercase tracking-widest">TECH STACK</p>
                        <BrushStroke className="mx-auto mt-4 w-32 h-4 text-akane opacity-40" />
                    </div>

                    {/* Tech Stack section */}
                    <div className="px-8 max-w-6xl">
                        {/* Tech items display */}
                        <div className="mb-4 space-y-8">
                            {sections.map(c =>
                                <div className='space-y-4' key={c.title}>   
                                    <h2 className='text-title2 text-ai'>{c.title}</h2>
                                    <div>
                                        {c.description}
                                    </div>
                                    <div>
                                        {c.categories.map((category, catIndex) => (
                                            <div key={catIndex} className="mb-4">
                                                <h2 className="text-title-3 mb-1 text-ai">{category.name}</h2>
                                                <div className="flex flex-wrap">
                                                    {category.items.map((item, itemIndex) => (
                                                        <span
                                                            key={itemIndex}
                                                            className="mr-2 px-3 py-1 bg-akane/50 backdrop-blur-md text-xs font-bold rounded-lg border border-nezumi/30"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom decorative element - Japanese pattern inspired */}
                <div className="w-full h-12 mt-12 opacity-10 bg-nezumi"
                    style={{ maskImage: "repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 6px)" }}></div>
            </div>
        </SectionType1>
    );
};