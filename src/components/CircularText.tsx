"use client";
import clsx from 'clsx';
import { FC } from 'react';

interface CircularTextProps {
    words: string[];
    className?: string;
}

export const CircularText: FC<CircularTextProps> = ({
    className,
    words ,
}) => {
    return (
        <div className={clsx("w-[100px] h-[100px] text-[8px]",className)}>
            <svg viewBox="0 0 50 50" className="overflow-visible">
                <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" className="fill-none" />
                <text className="">
                    <textPath href="#circle">
                        {words}
                    </textPath>
                </text>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="15s"
                    repeatCount="indefinite"
                />
            </svg>
        </div>
    );
};
