import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

interface PolygonDrawingProps {
	onStartDrawing: () => void;
	onStopDrawing: () => void;
	onClearDrawing: () => void;
	isDrawing?: boolean;
}

const PolygonDrawing: React.FC<PolygonDrawingProps> = ({ onStartDrawing, onStopDrawing, onClearDrawing, isDrawing = false }) => {
	return (
		<div className={styles.controlGroup}>
			<h4 className={styles.controlGroupTitle}>🔷 多边形绘制</h4>
			<div className={styles.controlButtons}>
				<Button
					type={isDrawing ? 'primary' : 'default'}
					onClick={isDrawing ? onStopDrawing : onStartDrawing}
					icon={<i className={`fas ${isDrawing ? 'fa-stop' : 'fa-draw-polygon'}`} />}>
					{isDrawing ? '停止绘制' : '开始绘制'}
				</Button>
				<Button onClick={onClearDrawing} icon={<i className="fas fa-trash" />}>
					清除绘制
				</Button>
			</div>
		</div>
	);
};

export default PolygonDrawing;
