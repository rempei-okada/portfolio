import React, { CSSProperties, ElementType, ReactNode, useRef } from "react";
import { DOMMotionComponents, motion, useInView } from "motion/react"

interface FadeAndSlideScrollTriggerAnimationProps {
    children: ReactNode;
    delay?: number;
    style?: CSSProperties;
    className?: string;
}

export const FadeAndSlideScrollTriggerAnimation = ({
    children,
    delay,
    style,
    className,
}: FadeAndSlideScrollTriggerAnimationProps) => {
    return (
        <motion.div
            viewport={{ once: true }}
            style={style}
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: (delay ?? 0.2) }}
        >
            {children}
        </motion.div>
    );
};