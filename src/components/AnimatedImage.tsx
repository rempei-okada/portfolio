import clsx from "clsx";
import Image from "next-export-optimize-images/picture";
import { StaticImageData } from "next/image";
import { CSSProperties } from "react";
import React, { ReactNode } from "react";
import css from "./AnimatedImage.module.scss";
import { motion, useInView, useMotionValueEvent, useScroll } from "motion/react";

export const lerp = (x: number, y: number, t: number) => {
    return (1 - t) * x + t * y;
};

const defaultBaseScale = 1.2;

interface TransitionImageProps {
    isDynamic?: boolean;
    src: string | StaticImageData;
    alt: string;
    parallaxSlideLength?: number;
    scale?: {
        from?: number;
        to?: number;
    }
    style?: CSSProperties;
    className?: string;
    imgClassName?: string;
    baseScale?: number;
}

export const AnimatedImage = (props: TransitionImageProps) => {
    const { scale } = props;
    const range = Math.abs(props.parallaxSlideLength ?? 40);
    const half = range * 0.5;
    const getPosition = (t: number) => lerp(-half, half, t);
    const getScale = (t: number) => lerp(
        scale?.from ?? 1.1,
        scale?.to ?? 1.05,
        t
    );

    const element = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: element, offset: ["start end", "end start"] });
    const [position, setPosition] = React.useState(0)
    const [domScale, setScale] = React.useState(props.baseScale ?? defaultBaseScale)
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        setPosition(getPosition(progress))
        setScale(getScale(progress))
    })

    const isInView = useInView(element, { once: true })

    return (
        <motion.div
            ref={element}
            style={props.style}
            className={clsx("overflow-hidden relative", props.className)}

        >
            <motion.div

                initial={{
                    opacity: 0,
                    translateY: 0,
                    scale: props.baseScale ?? defaultBaseScale
                }}
                animate={{
                    translateY: position + "px",
                    scale: domScale
                }}
                style={{
                    height: `calc(100% + ${range}px)`,
                    width: "100%",
                }}

                viewport={{ once: true }}
                transition={{ duration: 0.5, opacity: { duration: 1, delay: 1 } }}
                whileInView={{ opacity: 1 }}
            >
                {props.isDynamic ?
                    <img
                        src={props.src as string}
                        alt={props.alt}
                        className={props.imgClassName}
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            transition: "all 2.4s cubic-bezier(0.51, 0.15, 0.25, 0.97)",
                        }}
                    />
                    : <Image
                        src={props.src}
                        alt={props.alt}
                        className={props.imgClassName}
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            transition: "all 2.4s cubic-bezier(0.51, 0.15, 0.25, 0.97)",
                        }}
                    />
                }

            </motion.div>
            {<div className={clsx(css.shutter2, isInView ? css.animate2 : "")} />}
            {<div className={clsx(css.shutter, isInView ? css.animate : "")} />}
        </motion.div>
    );
};
