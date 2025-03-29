
import clsx from "clsx";
import React, { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { DOMMotionComponents, motion, useInView } from "motion/react"

interface SkewAnimationProp {
    bgcolor?: string;
    speed?: number;
    skewPanelClass?: string;
    className?: string;
    tag?: ElementType;
    children?: ReactNode;
    delay?: number;
}

export const SkewScrollTriggerAnimation = (props: SkewAnimationProp) => {
    const [el, setEl] = useState<HTMLElement | null>(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const width = el?.getBoundingClientRect().width;
        if (width) {
            // width / 100px
            const w = width / 100;
            const t = Math.floor(300 * w * (props.speed ?? 0.5));
            if (t !== time) {
                setTime(t * 0.001);
            }
        }
    }, [el, time, props.speed]);

    const Tag = (props.tag ?? "div") as any;

    return <Tag
        style={{
            position: "relative",
            width: "fit-content",
        }}
        className={props.className}
        ref={(el: any) => {
            if (el) {
                setEl(el as any);
            }
        }}
    >
        <motion.span
            viewport={{ once: true }}
            transition={{ duration: time, delay: props.delay ?? 0.2 }}
            className={clsx("bg-paper1 absolute inset-0 origin-right", props.skewPanelClass)}
            initial={{ transform: "scaleX(1.25) translateX(12%) skewX(-20deg)" }}
            whileInView={{ transform: "scaleX(0) skewX(-10deg)" }}
        />
        {props.children as any}
    </Tag>;
};
