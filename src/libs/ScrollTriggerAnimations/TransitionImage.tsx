import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import React from "react";
import css from "./AnimatedImage.module.scss";
import { motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next-export-optimize-images/picture";
import { StaticImageData } from "next/image";

export const lerp = (x: number, y: number, t: number) => {
    return (1 - t) * x + t * y;
};

interface TransitionImageProps {
    src?: string;

    imageData?: StaticImageData
    alt: string;
    parallaxSlideLength?: number;
    scale?: {
        from?: number;
        to?: number;
    }
    baseScale?: number;
    style?: CSSProperties;
    className?: string;
    imgClassName?: string;
}

const defaultBaseScale = 1.2;

export const TransitionImage = (props: TransitionImageProps) => {
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

    return (
        <motion.div
            ref={element}
            style={props.style}
            className={clsx("overflow-hidden relative", props.className)}
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <motion.div
                transition={{ duration: 0.3 }}
                initial={{ translateY: 0, scale: props.baseScale ?? defaultBaseScale }}
                animate={{
                    translateY: position + "px",
                    scale: domScale
                }}
                style={{
                    height: `calc(100% + ${range}px)`,
                    width: "100%",
                }}>
                {
                    props.imageData
                        ? <Image
                            alt={props.alt}
                            src={props.imageData}
                            loading={'eager'}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                            }}
                        />
                        : <img
                            src={props.src}
                            alt={props.alt}
                            className={props.imgClassName}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                            }}
                        />

                }
            </motion.div>

            {/* {<div className={clsx(css.shutter2, info.triggered ? css.animate2 : "")} />}
                        {<div className={clsx(css.shutter, info.triggered ? css.animate : "")} />} */}

        </motion.div>
    );
};
