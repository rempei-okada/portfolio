export class Bubble {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20 + 10;
        this.size = Math.random() * 2 + 2;
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 150 + 50;
    }

    update(height: number): void {
        this.y -= this.speed;

        // 泡が水面に達したら再利用
        if (this.y < 0) {
            this.x = Math.random() * window.innerWidth;
            this.y = height + Math.random() * 20 + 10;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity / 255})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
