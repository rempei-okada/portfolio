import { FishColor, Vector } from "./utils";

// 共通化版 - テンプレート関数を使用
function createFishSVG(color: string) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 400 200">
        <path fill="${color}" d="M300,100c-40,40-80,50-150,50s-90-30-90-50,40-50,90-50,110,10,150,50Z"/>
        <circle  cx="110.5" cy="90.6" r="22.3" fill="#ffffff"/>
        <circle cx="107.8" cy="90.6" r="14.1" fill="#000000"/>
        <path  d="M180,50c20-30,40-40,60-30-20,20-40,25-60,30Z" fill="${color}"/>
        <path  d="M180,150c20,30,40,40,60,30-20-20-40-25-60-30Z" fill="${color}"/>
        <path  d="M300,100c30-30,60-50,80-40q-20,40,0,80c-20,10-50-10-80-40Z" fill="${color}"/>
        </svg>
      `;
}

// 共通化した配列の生成
const fishImagesOptimized = [
    createFishSVG("rgb(26, 26, 26)"),     // 墨-黒 (Sumi-Black)
    createFishSVG("rgb(112, 124, 128)"),  // 鼠-グレー (Nezumi-Grey)
    createFishSVG("rgb(243,232,218)"),  // 生成り-オフホワイト (Kinari-Off White)
    createFishSVG("rgb(179, 77, 77)"),    // 茜-レッド (Akane-Red)
    createFishSVG("rgb(34, 76, 91)")      // 藍-ブルー (Ai-Blue)
];

export class Fish {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxSpeed: number;
    maxForce: number;
    size: number;
    image: HTMLImageElement;

    constructor(width: number, height: number) {
        this.position = { x: Math.random() * width, y: Math.random() * height };
        const angle = Math.random() * Math.PI * 2;
        this.velocity = {
            x: Math.cos(angle) * (Math.random() * 2 + 1),
            y: Math.sin(angle) * (Math.random() * 2 + 1)
        };
        this.acceleration = { x: 0, y: 0 };
        this.maxSpeed = Math.random() * 2 + 2;
        this.maxForce = 0.1;
        this.size = Math.random()  + 7;


        // Create SVG image
        this.image = new Image();
        const blob = new Blob([fishImagesOptimized[Math.floor(Math.random() * fishImagesOptimized.length)]], { type: 'image/svg+xml' });
        this.image.src = URL.createObjectURL(blob);
    }

    // ベクトルの距離を計算
    static dist(v1: Vector, v2: Vector): number {
        return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
    }

    // ベクトルの引き算
    static sub(v1: Vector, v2: Vector): Vector {
        return { x: v1.x - v2.x, y: v1.y - v2.y };
    }

    // ベクトルの正規化
    static normalize(v: Vector): Vector {
        const mag = Math.sqrt(v.x ** 2 + v.y ** 2);
        if (mag === 0) return { x: 0, y: 0 };
        return { x: v.x / mag, y: v.y / mag };
    }

    // ベクトルの大きさを制限
    static limit(v: Vector, max: number): Vector {
        const mag = Math.sqrt(v.x ** 2 + v.y ** 2);
        if (mag > max) {
            return { x: v.x / mag * max, y: v.y / mag * max };
        }
        return { ...v };
    }

    // ベクトルの向き（角度）を取得
    static heading(v: Vector): number {
        return Math.atan2(v.y, v.x);
    }

    // 壁から避ける行動
    avoidWalls(width: number, height: number): Vector {
        let desired: Vector | null = null;
        const margin = 50;

        if (this.position.x < margin) {
            desired = { x: this.maxSpeed, y: this.velocity.y };
        } else if (this.position.x > width - margin) {
            desired = { x: -this.maxSpeed, y: this.velocity.y };
        }

        if (this.position.y < margin) {
            desired = desired || { x: this.velocity.x, y: this.maxSpeed };
        } else if (this.position.y > height - margin) {
            desired = desired || { x: this.velocity.x, y: -this.maxSpeed };
        }

        if (desired !== null) {
            let normalizedDesired = Fish.normalize(desired);
            let scaledDesired = { x: normalizedDesired.x * this.maxSpeed, y: normalizedDesired.y * this.maxSpeed };
            const steer = Fish.sub(scaledDesired, this.velocity);
            return Fish.limit(steer, this.maxForce * 2);
        }
        return { x: 0, y: 0 };
    }

    // 整列行動 - 近くの魚と同じ方向に泳ぐ
    align(fishes: Fish[]): Vector {
        const perceptionRadius = 50;
        let sum: Vector = { x: 0, y: 0 };
        let count = 0;

        for (let other of fishes) {
            const d = Fish.dist(this.position, other.position);
            if (other !== this && d < perceptionRadius) {
                sum = { x: sum.x + other.velocity.x, y: sum.y + other.velocity.y };
                count++;
            }
        }

        if (count > 0) {
            let avgVelocity: Vector = { x: sum.x / count, y: sum.y / count };
            let normalizedVelocity = Fish.normalize(avgVelocity);
            let scaledVelocity = { x: normalizedVelocity.x * this.maxSpeed, y: normalizedVelocity.y * this.maxSpeed };
            const steer = Fish.sub(scaledVelocity, this.velocity);
            return Fish.limit(steer, this.maxForce);
        }
        return { x: 0, y: 0 };
    }

    // 結合行動 - 群れの中心に向かう
    cohesion(fishes: Fish[]): Vector {
        const perceptionRadius = 50;
        let sum: Vector = { x: 0, y: 0 };
        let count = 0;

        for (let other of fishes) {
            const d = Fish.dist(this.position, other.position);
            if (other !== this && d < perceptionRadius) {
                sum = { x: sum.x + other.position.x, y: sum.y + other.position.y };
                count++;
            }
        }

        if (count > 0) {
            let center: Vector = { x: sum.x / count, y: sum.y / count };
            let desired = Fish.sub(center, this.position);
            let normalizedDesired = Fish.normalize(desired);
            let scaledDesired = { x: normalizedDesired.x * this.maxSpeed, y: normalizedDesired.y * this.maxSpeed };
            const steer = Fish.sub(scaledDesired, this.velocity);
            return Fish.limit(steer, this.maxForce);
        }
        return { x: 0, y: 0 };
    }

    // 分離行動 - 他の魚と衝突を避ける
    separate(fishes: Fish[]): Vector {
        const perceptionRadius = 25;
        let sum: Vector = { x: 0, y: 0 };
        let count = 0;

        for (let other of fishes) {
            const d = Fish.dist(this.position, other.position);
            if (other !== this && d < perceptionRadius) {
                let diff = Fish.sub(this.position, other.position);
                let normalizedDiff = Fish.normalize(diff);
                // 距離が近いほど強く避ける
                normalizedDiff = { x: normalizedDiff.x / d, y: normalizedDiff.y / d };
                sum = { x: sum.x + normalizedDiff.x, y: sum.y + normalizedDiff.y };
                count++;
            }
        }

        if (count > 0) {
            let avgDiff: Vector = { x: sum.x / count, y: sum.y / count };
            let normalizedDiff = Fish.normalize(avgDiff);
            let scaledDiff = { x: normalizedDiff.x * this.maxSpeed, y: normalizedDiff.y * this.maxSpeed };
            const steer = Fish.sub(scaledDiff, this.velocity);
            return Fish.limit(steer, this.maxForce);
        }
        return { x: 0, y: 0 };
    }

    // 魚の行動を更新
    update(fishes: Fish[], width: number, height: number): void {
        // 各行動の力を計算
        const alignment = this.align(fishes);
        const cohesion = this.cohesion(fishes);
        const separation = this.separate(fishes);
        const avoidWalls = this.avoidWalls(width, height);

        // 各力に重みをつける
        const weightedAlignment = { x: alignment.x * 1.0, y: alignment.y * 1.0 };
        const weightedCohesion = { x: cohesion.x * 1.0, y: cohesion.y * 1.0 };
        const weightedSeparation = { x: separation.x * 1.5, y: separation.y * 1.5 };
        const weightedAvoidWalls = { x: avoidWalls.x * 2.0, y: avoidWalls.y * 2.0 };

        // 力を適用
        this.acceleration.x += weightedAlignment.x + weightedCohesion.x + weightedSeparation.x + weightedAvoidWalls.x;
        this.acceleration.y += weightedAlignment.y + weightedCohesion.y + weightedSeparation.y + weightedAvoidWalls.y;

        // 位置と速度を更新
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        // 速度制限
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (speed > this.maxSpeed) {
            this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
            this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // 加速度をリセット
        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }

    // 魚を描画
    draw(ctx: CanvasRenderingContext2D): void {
        const angle = Fish.heading(this.velocity) + Math.PI / 2;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle + ((90 * Math.PI) / 180));

        // スケールを調整 - SVGのサイズに合わせる
        const scale = this.size / 20; // サイズを適切に調整
        ctx.scale(scale, scale);

        // SVGの中心を原点に
        const svgWidth = 60;
        const svgHeight = 30;

        // SVGを描画
        if (this.image.complete) {

            ctx.drawImage(this.image, -svgWidth / 2, -svgHeight / 2, svgWidth, svgHeight);

        }

        ctx.restore();
    }
}

