import { LinkButton } from "@/components/LinkButton";
import { Section1Title } from "@/components/Section1Title";
import { SectionType1 } from "@/components/SectionType1";
import Link from "next/link";
import { WorkMeta } from "@/models/client";
import { AnimatedImage } from "@/components/AnimatedImage";
import { FadeAndSlideScrollTriggerAnimation } from "@/libs/ScrollTriggerAnimations/FadeAndSlideScrollTriggerAnimation";


export const NewsSection = ({ works }: { works: WorkMeta[] }) => {


    return (
        <SectionType1 className="bg-gray-50">
            <div className="justify-start flex flex-col items-start gap-1 sm:gap-2 md:gap-3 w-full">
                <Section1Title title="Works" subTitle="　　" />

                <div className="mx-auto w-full">
                    <FadeAndSlideScrollTriggerAnimation>
                        <h3 className="text-title4 mt-4 sm:mt-8">制作・開発実績</h3>
                    </FadeAndSlideScrollTriggerAnimation>

                    <section className="w-full grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 sm:gap-6 md:gap-8">
                        {works.map((item, index) => (
                                <NewsItem key={item.id} work={item} />
                        ))}
                    </section>


                </div>
                <div className="w-full flex justify-end mt-4 sm:mt-8">
                    <div className="flex-1" />

                    <FadeAndSlideScrollTriggerAnimation className="w-full sm:w-auto">
                        <LinkButton title="VIEW MORE" href=""></LinkButton>
                    </FadeAndSlideScrollTriggerAnimation>
                </div>
            </div>
        </SectionType1>
    )
}

export const NewsItem = (props: {
    work: WorkMeta
}) => {
    const { work } = props;


    return (
        <div className="size-full flex flex-col items-center p-4 cursor-pointer ">
            <div className="w-full max-w-[480px] h-[280px] overflow-hidden shadow-lg">
                {
                    work.thumbnail?.url
                        ? <AnimatedImage isDynamic src={work.thumbnail?.url} alt={work.title} className="size-full object-cover " />
                        : <div className="size-full bg-gray-300 rounded-sm"></div>
                }

            </div>
            <div className="mt-3">
                <Link href="" className="text-title4 font-bold hover:underline inline-block">
                    {work.title}
                </Link>
            </div>
        </div>
    )
}