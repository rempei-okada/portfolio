import { SkewScrollTriggerAnimation } from "@/libs/ScrollTriggerAnimations/SkewScrollTriggerAnimation";
import { StaticImageData } from "next/image";
import { AnimatedImage } from "./AnimatedImage";


export const ChildPageHead = ({ src, title, subTitle }: { src: StaticImageData, title: string, subTitle: string }) => (
    <section className="w-full h-[70vh] relative">
        <AnimatedImage src={src} parallaxSlideLength={80} alt="About" className="w-full h-full object-cover rounded" />
        <div className="w-full max-w-screen-lg absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <SkewScrollTriggerAnimation delay={0.06} className="flex items-center w-fit">
                <h3 className="text-white text-title3 mt-2 [writing-mode:vertical-rl]" >{subTitle}</h3>
                <h2 className="text-font2 text-title1 ml-3 font-jost" style={{ fontSize: "min(12vw,4rem)" }}>{title}</h2>
            </SkewScrollTriggerAnimation>
        </div>
    </section>
)