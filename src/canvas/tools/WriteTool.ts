import type { DrawingTool, Point } from '../types';

export class WriteTool implements DrawingTool {
	mode: 'write' = 'write';
	private isDrawing = false;
	private lastPoint: Point | null = null;

	private drawLine(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}

	handleMouseDown(ctx: CanvasRenderingContext2D, point: Point) {
		this.isDrawing = true;
		this.lastPoint = point;
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
	}

	handleMouseMove(ctx: CanvasRenderingContext2D, point: Point) {
		if (!this.isDrawing || !this.lastPoint) return;

		this.drawLine(ctx, this.lastPoint, point);
		this.lastPoint = point;
	}

	handleMouseUp(ctx: CanvasRenderingContext2D, point: Point) {
		if (this.isDrawing && this.lastPoint) {
			this.drawLine(ctx, this.lastPoint, point);
		}
		this.reset();
	}

	reset() {
		this.isDrawing = false;
		this.lastPoint = null;
	}
}
