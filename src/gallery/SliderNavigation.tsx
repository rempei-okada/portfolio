import { motion } from "motion/react";

export const SliderNavigation = ({ before, current, titles }: { current: number, before: number, titles: string[] }) => {
    return (
        <nav className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
            {titles.map((title, i) => (
                <div
                    key={title + i}
                    className={`slider-bullet ${current === i ? 'current' : 'not-current'} flex items-center px-1`}
                >
                    <motion.span
                        className="slider-bullet__text mr-1 text-white"
                        initial={{ opacity: 0.25 }}
                        animate={{
                            opacity: current === i ? 1 : 0.25
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "linear"
                        }}
                    >
                        {title}
                    </motion.span>
                    <motion.span
                        className="slider-bullet__line w-[1rem] h-px bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{
                            scaleX: current === i ? 1 : 0,
                            transformOrigin: current === i ? "left" : "right"
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1], // Expoのイージング近似値
                            delay: current === i ? 0.6 : 0
                        }}
                    />
                </div>
            ))}
        </nav>
    )
}