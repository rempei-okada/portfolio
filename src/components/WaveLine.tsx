export const WaveLine = ({ className }: any) => (
    <div className={`${className} absolute`}>
        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,10 Q15,0 30,10 Q45,20 60,10 Q75,0 90,10 Q105,20 120,10"
                stroke="#B34D4D" strokeWidth="1" strokeLinecap="round" />
        </svg>
    </div>
);