import { Suspense, useEffect, useRef, useState } from "react";
import { SliderNavigation } from "./SliderNavigation";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

import "./page.scss";
import { siteName } from "@/constants";
import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Effect } from "./Effect";
import { GalleryBack } from "./GalleryBack";
import { ImagePlane } from "./ImagePlane";

interface SliderItem {
    background: string;
    leftImage: string;
    rightImage: string;
    texts: string[];
    title: string;
}

interface WaterDropSliderProps {
    slidesData: SliderItem[];
    selectedIndex: number;
    className?: string;
}

export const WaterDropSlider = (props: WaterDropSliderProps) => {
    const sliderElementRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [state, setState] = useState({
        current: 0,
        before: 0,
        next: 0
    });

    useEffect(() => {
        setState({
            current: 0,
            before: props.slidesData.length - 1,
            next: 1
        });
    }, [props.slidesData]);

    useEffect(() => setCursor(props.selectedIndex), [props.selectedIndex]);

    const slideVariants = {
        enter: (isUpToDown: boolean) => ({
            y: isUpToDown ? "200%" : "-200%",
            scaleY: 1.5,
        }),
        center: {
            y: 0,
            scaleY: 1,
        },
        exit: (isUpToDown: boolean) => ({
            y: isUpToDown ? "-250%" : "250%",
            scaleY: 1.5,
        }),
    };

    const textVariants = {
        enter: {
            y: "100%",
        },
        center: {
            y: 0,
        },
        exit: {
            y: "-100%",
        },
    };

    const setCursor = (i: number) => {
        const lastItemIndex = props.slidesData.length - 1;
        const before = state.current;
        const current = i > lastItemIndex ? lastItemIndex : i <= 0 ? 0 : i;
        const next = current === lastItemIndex ? 0 : current + 1;
        if (i > lastItemIndex || i < 0 || current === before) {
            return;
        }

        setState({
            ...state,
            before,
            current,
            next,
        });
    };

    const getStyle = (i: number) => state.current === i
        ? 'current'
        : state.before === i ? 'before' : 'idle';

    return (
        <div className={clsx("min-h-screen", props.className)}>
            <div className={"absolute inset-0"} ref={sliderElementRef}>
                <Canvas
                    orthographic
                    camera={{
                        position: [0, 0, 2],
                        near: 0.1,
                        far: 2000
                    }}
                    ref={canvasRef}
                    dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
                >
                    {/* canvas color */}
                    <color attach="background" args={['#000']} />
                    {/* camera controller */}
                    <OrbitControls attach="orbitControls" />
                    {/* helper */}
                    <Stats />
                    {/* object */}
                    <Suspense fallback={null}>
                        <GalleryBack state={state} images={props.slidesData.map(x => x.background)} />
                    </Suspense>
                    <Effect />
                </Canvas>

                <AnimatePresence mode="sync" initial={false}>
                    {props.slidesData.map((slide, i) => (
                        state.current === i || state.before === i ? (
                            <motion.div
                                key={i}
                                className={`absolute inset-0 overflow-hidden slide ${getStyle(i)}`}
                                initial="enter"
                                animate={state.current === i ? "center" : "exit"}
                            >
                                <div className="flex items-center justify-center absolute inset-0">
                                    <motion.figure
                                        transition={{ duration: 0.4 }}
                                        className="origin-top min-w-60 w-[40vw] max-w-[480px]"
                                        variants={slideVariants}
                                        custom={state.current > state.before}
                                    >
                                        <img src={slide.leftImage} />
                                    </motion.figure>
                                    <motion.figure
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                        className="origin-top min-w-60 w-[40vw] max-w-[480px]"
                                        variants={slideVariants}
                                        custom={state.current > state.before}
                                    >
                                        <img src={slide.rightImage} />
                                    </motion.figure>
                                </div>

                                {slide.texts.length > 0 && (
                                    <div className="absolute z-10 text-title1 origin-top font-bold text-white" style={{ bottom: "calc(2rem + 3vw)", left: "calc(2rem + 3vw)" }}>
                                        {slide.texts.map((line) => (
                                            <div className="text-line overflow-hidden" key={line}>
                                                <motion.div variants={textVariants}>
                                                    {line}
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : null
                    ))}
                </AnimatePresence>

                <SliderNavigation before={state.before} current={state.current} titles={props.slidesData.map(x => x.title)} />
            </div>

            <div className="absolute bottom-8 right-8 w-60 flex items-center z-10">
                <span className="block text-white -rotate-90 translate-x-60 origin-bottom-left text-title3">
                    Works  +  {siteName}<br />
                    Programing  {state.before} {state.current} {state.next}
                </span>
            </div>
        </div>
    );
};