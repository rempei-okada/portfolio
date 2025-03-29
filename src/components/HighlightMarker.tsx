import clsx from "clsx";
import { delay, motion, useInView } from "motion/react"
import { useRef } from "react";

export const HighlightMarker = ({ children, className, markerClassName }: {
    children: React.ReactNode,
    className?: string,
    markerClassName?: string,
}) => {
    const view = useRef(null);
    const isInView = useInView(view);
    return (
        <div className={clsx(`relative inline-block overflow-hidden mx-1 -mb-1`, className)}
            ref={view}>
            <span className={`relative z-10 font-bold`}>{children}</span>
            <motion.span
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5}}
                initial={{ translateX: "-200px" }}
                animate={{ translateX: isInView ? "0px" : undefined }}
                className={clsx(`absolute left-0 bottom-0 w-full h-1/3 mb-[2px] opacity-70 -rotate-2 rounded-sm`, markerClassName)}
            >
            </motion.span>
        </div>
    );
};
