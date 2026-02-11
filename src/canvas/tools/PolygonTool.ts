import type { DrawingTool, Point } from '../types';
import { MINIMUM_POINTS } from '../constants';

export class PolygonTool implements DrawingTool {
	mode: 'polygon' = 'polygon';
	private points: Point[] = [];
	private tempCanvas: HTMLCanvasElement | null = null;
	private lastClickTime: number = 0;
	private readonly DOUBLE_CLICK_DELAY = 300; // 双击判定时间（毫秒）

	constructor() {
		this.tempCanvas = document.createElement('canvas');
	}

	private drawPolygon(ctx: CanvasRenderingContext2D, points: Point[], close = false) {
		if (points.length < 2) return;

		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);

		for (let i = 1; i < points.length; i++) {
			ctx.lineTo(points[i].x, points[i].y);
		}

		if (close && points.length >= MINIMUM_POINTS.POLYGON) {
			ctx.closePath();
		}

		ctx.stroke();
	}

	private isDoubleClick(): boolean {
		const currentTime = Date.now();
		const isDouble = currentTime - this.lastClickTime < this.DOUBLE_CLICK_DELAY;
		this.lastClickTime = currentTime;
		return isDouble;
	}

	private finishDrawing(ctx: CanvasRenderingContext2D) {
		if (this.points.length >= MINIMUM_POINTS.POLYGON) {
			this.drawPolygon(ctx, this.points, true);
		}
		this.reset();
	}

	handleMouseDown(ctx: CanvasRenderingContext2D, point: Point) {
		// 检查是否双击
		if (this.isDoubleClick()) {
			this.finishDrawing(ctx);
			return;
		}

		// 第一个点时初始化临时画布
		if (this.points.length === 0 && this.tempCanvas) {
			this.tempCanvas.width = ctx.canvas.width;
			this.tempCanvas.height = ctx.canvas.height;
			const tempCtx = this.tempCanvas.getContext('2d');
			if (tempCtx) {
				tempCtx.drawImage(ctx.canvas, 0, 0);
			}
		}

		this.points.push(point);

		// 绘制当前状态
		if (this.points.length > 1) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (this.tempCanvas) {
				ctx.drawImage(this.tempCanvas, 0, 0);
			}
			this.drawPolygon(ctx, this.points, false);
		}
	}

	handleMouseMove(ctx: CanvasRenderingContext2D, point: Point) {
		if (this.points.length > 0) {
			// 清除画布并恢复之前的状态
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			if (this.tempCanvas) {
				ctx.drawImage(this.tempCanvas, 0, 0);
			}

			// 绘制当前多边形预览
			const previewPoints = [...this.points, point];
			this.drawPolygon(ctx, previewPoints, false);
		}
	}

	handleMouseUp(ctx: CanvasRenderingContext2D, point: Point) {
		// 多边形工具在 handleMouseDown 中处理绘制逻辑
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
