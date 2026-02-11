import type { DrawingTool, Point } from '../types';
import { MINIMUM_POINTS } from '../constants';

export class CircleTool implements DrawingTool {
	mode: 'circle' = 'circle';
	private points: Point[] = [];
	private tempCanvas: HTMLCanvasElement | null = null;

	constructor() {
		this.tempCanvas = document.createElement('canvas');
	}

	private calculateRadius(center: Point, point: Point): number {
		return Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2));
	}

	private drawCircle(ctx: CanvasRenderingContext2D, center: Point, radius: number) {
		ctx.beginPath();
		ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	handleMouseDown(ctx: CanvasRenderingContext2D, point: Point) {
		this.points = [point];

		// 初始化临时画布
		if (this.tempCanvas) {
			this.tempCanvas.width = ctx.canvas.width;
			this.tempCanvas.height = ctx.canvas.height;
			const tempCtx = this.tempCanvas.getContext('2d');
			if (tempCtx) {
				tempCtx.drawImage(ctx.canvas, 0, 0);
			}
		}
	}

	handleMouseMove(ctx: CanvasRenderingContext2D, point: Point) {
		if (this.points.length === 1) {
			const center = this.points[0];
			const radius = this.calculateRadius(center, point);

			// 清除画布并恢复之前的状态
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (this.tempCanvas) {
				ctx.drawImage(this.tempCanvas, 0, 0);
			}

			// 绘制预览圆
			this.drawCircle(ctx, center, radius);
		}
	}

	handleMouseUp(ctx: CanvasRenderingContext2D, point: Point) {
		if (this.points.length === 1) {
			const center = this.points[0];
			const radius = this.calculateRadius(center, point);
			this.drawCircle(ctx, center, radius);
			this.reset();
		}
	}

	reset() {
		this.points = [];
		if (this.tempCanvas) {
			const tempCtx = this.tempCanvas.getContext('2d');
			if (tempCtx) {
				tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
			}
		}
	}
}
