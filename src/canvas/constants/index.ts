import type { CanvasConfig } from '../types';

export const DEFAULT_CANVAS_CONFIG: CanvasConfig = {
	width: 800,
	height: 600,
	strokeStyle: '#000',
	lineWidth: 2
};

export const MINIMUM_POINTS = {
	CIRCLE: 2,
	POLYGON: 3,
	LINE: 2
};
