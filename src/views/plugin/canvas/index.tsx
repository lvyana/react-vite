import React from 'react';
import { Radio, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useCanvas } from '../../../canvas/hooks/useCanvas';
import type { DrawingMode } from '../../../canvas/types';
import styles from './index.module.scss';

const Canvas: React.FC = () => {
	const {
		canvasRef,
		mode,
		handleModeChange: onModeChange,
		clearCanvas,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave
	} = useCanvas();

	const handleModeChange = (e: RadioChangeEvent) => {
		onModeChange(e.target.value as DrawingMode);
	};

	return (
		<div className={styles.canvasContainer}>
			<div className={styles.toolbar}>
				<Radio.Group value={mode} onChange={handleModeChange}>
					<Radio.Button value="circle">圆形</Radio.Button>
					<Radio.Button value="polygon">多边形</Radio.Button>
					<Radio.Button value="line">折线</Radio.Button>
					<Radio.Button value="write">手写</Radio.Button>
				</Radio.Group>
				<Button onClick={clearCanvas}>清除</Button>
			</div>
			<canvas
				ref={canvasRef}
				className={styles.canvas}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
			/>
		</div>
	);
};

export default Canvas;
