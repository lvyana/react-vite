import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

interface LineDrawingProps {
	onStartDrawingLine: () => void;
	onStartEditingLine: () => void;
	onStopLineModes: () => void;
	onDeleteSelectedLine: () => void;
	onClearAllLines: () => void;
	onExportLines: () => void;
	isDrawing?: boolean;
	isEditing?: boolean;
}

const LineDrawing: React.FC<LineDrawingProps> = ({
	onStartDrawingLine,
	onStartEditingLine,
	onStopLineModes,
	onDeleteSelectedLine,
	onClearAllLines,
	onExportLines,
	isDrawing = false,
	isEditing = false
}) => {
	const isActive = isDrawing || isEditing;

	return (
		<>
			{/* 航线编辑 */}
			<div className={styles.controlGroup}>
				<h4 className={styles.controlGroupTitle}>🛣️ 航线编辑</h4>
				<div className={styles.controlButtons}>
					<Button
						type={isDrawing ? 'primary' : 'default'}
						onClick={isDrawing ? onStopLineModes : onStartDrawingLine}
						disabled={isEditing}
						icon={<i className={`fas ${isDrawing ? 'fa-stop' : 'fa-route'}`} />}>
						{isDrawing ? '停止绘制' : '绘制航线'}
					</Button>
					<Button
						type={isEditing ? 'primary' : 'default'}
						onClick={isEditing ? onStopLineModes : onStartEditingLine}
						disabled={isDrawing}
						icon={<i className={`fas ${isEditing ? 'fa-stop' : 'fa-edit'}`} />}>
						{isEditing ? '停止编辑' : '编辑航线'}
					</Button>
					{isActive && (
						<Button danger onClick={onStopLineModes} icon={<i className="fas fa-stop" />}>
							停止操作
						</Button>
					)}
				</div>
			</div>

			{/* 航线管理 */}
			<div className={styles.controlGroup}>
				<h4 className={styles.controlGroupTitle}>🗂️ 航线管理</h4>
				<div className={styles.controlButtons}>
					<Button danger onClick={onDeleteSelectedLine} disabled={isActive} icon={<i className="fas fa-minus-circle" />}>
						删除选中
					</Button>
					<Button type="primary" onClick={onClearAllLines} disabled={isActive} icon={<i className="fas fa-broom" />}>
						清除航线
					</Button>
					<Button type="primary" onClick={onExportLines} disabled={isActive} icon={<i className="fas fa-download" />}>
						导出航线
					</Button>
				</div>
			</div>
		</>
	);
};

export default LineDrawing;
