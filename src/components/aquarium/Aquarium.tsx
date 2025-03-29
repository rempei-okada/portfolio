import React, { useEffect, useRef } from 'react';
import { Fish } from './Fish';
import { Bubble } from './Bubble';

interface FishProps {
    fishCount?: number;
    bubbleCount?: number;
}

export const FishSimulation: React.FC<FishProps> = ({ fishCount = 100, bubbleCount = 50 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // キャンバスサイズを設定 - ピクセル比を考慮
        const resizeCanvas = (): void => {
            if (canvas && container) {
                // コンテナのサイズを取得
                const { width, height } = container.getBoundingClientRect();

                // デバイスのピクセル比を取得
                const dpr = window.devicePixelRatio || 1;

                // キャンバスの論理サイズを設定
                canvas.width = width * dpr;
                canvas.height = height * dpr;

                // キャンバスの表示サイズを CSS で設定
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;

                // コンテキストのスケールを調整
                ctx.scale(dpr, dpr);
            }
        };

        // リサイズ時にキャンバスのサイズを調整
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // 魚と泡を作成
        const fishes: Fish[] = [];
        for (let i = 0; i < fishCount; i++) {
            // コンテナのサイズを使用
            const { width, height } = container.getBoundingClientRect();
            fishes.push(new Fish(width, height));
        }

        const bubbles: Bubble[] = [];
        for (let i = 0; i < bubbleCount; i++) {
            const { width, height } = container.getBoundingClientRect();
            bubbles.push(new Bubble(width, height));
        }

        // アニメーションループ
        const animate = (): void => {
            if (!canvas || !ctx || !container) return;

            const { width, height } = container.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            for (let bubble of bubbles) {
                bubble.update(height);

                if (bubble.y < 0) {
                    bubble.x = Math.random() * width;
                    bubble.y = height + Math.random() * 20 + 10;
                }

                bubble.draw(ctx);
            }

            // 魚を更新して描画 - 実際の表示サイズを使用
            for (let fish of fishes) {
                fish.update(fishes, width, height);
                fish.draw(ctx);
            }

            requestAnimationFrame(animate);
        };

        animate();

        // クリーンアップ
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [fishCount, bubbleCount]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}
        >
            <canvas
                ref={canvasRef}
                style={{ display: 'block' }}
            />
        </div>
    );
};
