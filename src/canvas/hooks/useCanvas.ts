import React, { useRef, useState, useEffect } from 'react';
import type { DrawingMode, Point } from '../types';
import { CircleTool, PolygonTool, LineTool, WriteTool } from '../tools';
import { DEFAULT_CANVAS_CONFIG } from '../constants';

export const useCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [mode, setMode] = useState<DrawingMode>('circle');

	// 创建工具实例
	const tools = useRef({
		circle: new CircleTool(),
		polygon: new PolygonTool(),
		line: new LineTool(),
		write: new WriteTool()
	});

	// 获取当前工具
	const getCurrentTool = () => {
		return tools.current[mode];
	};

	// 初始化Canvas上下文
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			if (context) {
				canvas.width = DEFAULT_CANVAS_CONFIG.width;
				canvas.height = DEFAULT_CANVAS_CONFIG.height;
				context.strokeStyle = DEFAULT_CANVAS_CONFIG.strokeStyle;
				context.lineWidth = DEFAULT_CANVAS_CONFIG.lineWidth;
				setCtx(context);
			}
		}
	}, []);

	// 获取鼠标在Canvas中的坐标
	const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
		const canvas = canvasRef.current;
		if (!canvas) return { x: 0, y: 0 };
		const rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	};

	// 清除画布
	const clearCanvas = () => {
		if (ctx && canvasRef.current) {
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			getCurrentTool().reset();
		}
	};

	// 处理模式切换
	const handleModeChange = (newMode: DrawingMode) => {
		getCurrentTool().reset();
		setMode(newMode);
	};

	// 鼠标事件处理器
	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!ctx) return;
		const point = getMousePos(e);
		getCurrentTool().handleMouseDown(ctx, point);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!ctx) return;
		const point = getMousePos(e);
		getCurrentTool().handleMouseMove(ctx, point);
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!ctx) return;
		const point = getMousePos(e);
		getCurrentTool().handleMouseUp(ctx, point);
	};

	const handleMouseLeave = () => {
		if (!ctx) return;
		getCurrentTool().reset();
	};

	return {
		canvasRef,
		mode,
		handleModeChange,
		clearCanvas,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave
	};
};
