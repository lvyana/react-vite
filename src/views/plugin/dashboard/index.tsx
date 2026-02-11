import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import styles from './index.module.scss';

interface DashboardProps {
	value: number; // 当前值
	min?: number; // 最小值
	max?: number; // 最大值
	title?: string; // 仪表盘标题
	unit?: string; // 单位
}

const Dashboard: React.FC<DashboardProps> = ({ value, min = 0, max = 100, title = '仪表盘', unit = '%' }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number>();
	const currentValueRef = useRef<number>(0);

	// 绘制仪表盘
	const drawDashboard = (targetValue: number) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// 清空画布
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = Math.min(centerX, centerY) * 0.8;

		// 绘制外圈
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, Math.PI * 0.8, Math.PI * 2.2, false);
		ctx.strokeStyle = '#E0E0E0';
		ctx.lineWidth = 20;
		ctx.stroke();

		// 绘制进度
		const progress = (currentValueRef.current - min) / (max - min);
		const endAngle = Math.PI * 0.8 + Math.PI * 1.4 * progress;

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, Math.PI * 0.8, endAngle, false);
		ctx.strokeStyle = '#1890ff';
		ctx.stroke();

		// 绘制刻度
		for (let i = 0; i <= 10; i++) {
			const angle = Math.PI * 0.8 + (Math.PI * 1.4 * i) / 10;
			const startRadius = radius - 30;
			const endRadius = radius + 10;

			ctx.beginPath();
			ctx.moveTo(centerX + Math.cos(angle) * startRadius, centerY + Math.sin(angle) * startRadius);
			ctx.lineTo(centerX + Math.cos(angle) * endRadius, centerY + Math.sin(angle) * endRadius);
			ctx.strokeStyle = '#999';
			ctx.lineWidth = 2;
			ctx.stroke();

			// 绘制刻度值
			const value = min + ((max - min) * i) / 10;
			const textRadius = radius + 30;
			ctx.font = '14px Arial';
			ctx.fillStyle = '#666';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(value.toString(), centerX + Math.cos(angle) * textRadius, centerY + Math.sin(angle) * textRadius);
		}

		// 绘制指针
		const pointerLength = radius * 0.8;
		const pointerAngle = Math.PI * 0.8 + Math.PI * 1.4 * progress;

		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(centerX + Math.cos(pointerAngle) * pointerLength, centerY + Math.sin(pointerAngle) * pointerLength);
		ctx.strokeStyle = '#f5222d';
		ctx.lineWidth = 4;
		ctx.stroke();

		// 绘制中心点
		ctx.beginPath();
		ctx.arc(centerX, centerY, 10, 0, Math.PI * 2, false);
		ctx.fillStyle = '#1890ff';
		ctx.fill();

		// 绘制当前值
		ctx.font = 'bold 24px Arial';
		ctx.fillStyle = '#262626';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(`${Math.round(currentValueRef.current)}${unit}`, centerX, centerY + radius * 0.5);
	};

	// 动画效果
	const animate = (targetValue: number) => {
		const step = (targetValue - currentValueRef.current) / 30;

		if (Math.abs(targetValue - currentValueRef.current) < 0.1) {
			currentValueRef.current = targetValue;
			drawDashboard(targetValue);
			return;
		}

		currentValueRef.current += step;
		drawDashboard(targetValue);
		animationRef.current = requestAnimationFrame(() => animate(targetValue));
	};

	// 初始化和更新
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// 设置canvas尺寸
		canvas.width = 400;
		canvas.height = 300;

		// 开始动画
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}
		animate(value);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [value, min, max]);

	return (
		<Card title={title} className={styles.dashboardCard}>
			<canvas ref={canvasRef} className={styles.dashboard} />
		</Card>
	);
};

export default Dashboard;
