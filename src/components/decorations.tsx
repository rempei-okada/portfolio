import clsx from "clsx";

export const BrushStroke = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10C50 2 150 18 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

export const DiagonalLine = ({ className }: { className?: string }) => (
    <div className={clsx("absolute w-px h-96 bg-[#707C80]/30 transform rotate-45", className)}></div>
);

export const JapanesePatterns = () => (
    <svg >
        <defs>
            <pattern id="asanoha" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.5)">
                <path fill="none" stroke="#224C5B" strokeWidth="1" d="M20,0 L40,20 L20,40 L0,20 Z M10,20 L20,30 L30,20 L20,10 Z" />
            </pattern>
            <pattern id="seigaiha" patternUnits="userSpaceOnUse" width="60" height="30" patternTransform="scale(0.4)">
                <path fill="none" stroke="#B34D4D" strokeWidth="1" opacity="0.3" d="M0,15 C0,6.7 6.7,0 15,0 C23.3,0 30,6.7 30,15 M15,0 C23.3,0 30,6.7 30,15 C30,23.3 23.3,30 15,30 C6.7,30 0,23.3 0,15 C0,6.7 6.7,0 15,0 Z M30,15 C30,6.7 36.7,0 45,0 C53.3,0 60,6.7 60,15 M45,0 C53.3,0 60,6.7 60,15 C60,23.3 53.3,30 45,30 C36.7,30 30,23.3 30,15 C30,6.7 36.7,0 45,0 Z" />
            </pattern>
        </defs>
    </svg>
);
