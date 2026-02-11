export interface Point {
	x: number;
	y: number;
}

export type DrawingMode = 'circle' | 'polygon' | 'line' | 'write';

export interface DrawingTool {
	mode: DrawingMode;
	handleMouseDown: (ctx: CanvasRenderingContext2D, point: Point) => void;
	handleMouseMove: (ctx: CanvasRenderingContext2D, point: Point) => void;
	handleMouseUp: (ctx: CanvasRenderingContext2D, point: Point) => void;
	reset: () => void;
}

export interface CanvasConfig {
	width: number;
	height: number;
	strokeStyle: string;
	lineWidth: number;
}

export interface CanvasState {
	isDrawing: boolean;
	points: Point[];
}
