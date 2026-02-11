import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

interface WeatherControlsProps {
	onTogglePressure: () => void;
	onToggleWind: () => void;
	onToggleWave: () => void;
	onToggleTemperature: () => void;
	onStartWaveAnimation: () => void;
	onStopWaveAnimation: () => void;
	onLoadSampleData: () => void;
	onClearWeatherData: () => void;
	showPressure?: boolean;
	showWind?: boolean;
	showWave?: boolean;
	showTemperature?: boolean;
	isAnimating?: boolean;
}

const WeatherControls: React.FC<WeatherControlsProps> = ({
	onTogglePressure,
	onToggleWind,
	onToggleWave,
	onToggleTemperature,
	onStartWaveAnimation,
	onStopWaveAnimation,
	onLoadSampleData,
	onClearWeatherData,
	showPressure = false,
	showWind = false,
	showWave = false,
	showTemperature = false,
	isAnimating = false
}) => {
	return (
		<div className={`${styles.controlGroup} ${styles.weatherControls}`}>
			<h4 className={styles.controlGroupTitle}>🌤️ 气象可视化</h4>

			{/* 图层控制 */}
			<div>
				<h5 className={styles.weatherSectionTitle}>图层显示</h5>
				<div className={styles.controlButtons}>
					<Button type={showPressure ? 'primary' : 'default'} onClick={onTogglePressure} icon={<i className="fas fa-thermometer-half" />}>
						{showPressure ? '隐藏气压' : '显示气压'}
					</Button>

					<Button type={showWind ? 'primary' : 'default'} onClick={onToggleWind} icon={<i className="fas fa-wind" />}>
						{showWind ? '隐藏风场' : '显示风场'}
					</Button>

					<Button type={showWave ? 'primary' : 'default'} onClick={onToggleWave} icon={<i className="fas fa-water" />}>
						{showWave ? '隐藏波浪' : '显示波浪'}
					</Button>

					<Button
						type={showTemperature ? 'primary' : 'default'}
						onClick={onToggleTemperature}
						icon={<i className="fas fa-temperature-high" />}>
						{showTemperature ? '隐藏温度' : '显示温度'}
					</Button>
				</div>
			</div>

			{/* 动画控制 */}
			<div>
				<h5 className={styles.weatherSectionTitle}>动画效果</h5>
				<div className={styles.controlButtons}>
					<Button
						type={isAnimating ? 'primary' : 'default'}
						onClick={isAnimating ? onStopWaveAnimation : onStartWaveAnimation}
						icon={<i className={`fas ${isAnimating ? 'fa-pause' : 'fa-play'}`} />}>
						{isAnimating ? '停止波浪' : '波浪动画'}
					</Button>
				</div>
			</div>

			{/* 数据控制 */}
			<div>
				<h5 className={styles.weatherSectionTitle}>数据管理</h5>
				<div className={styles.controlButtons}>
					<Button type="primary" onClick={onLoadSampleData} icon={<i className="fas fa-cloud-download-alt" />}>
						加载示例数据
					</Button>

					<Button onClick={onClearWeatherData} icon={<i className="fas fa-broom" />}>
						清除气象数据
					</Button>
				</div>
			</div>

			{/* 气象图例 */}
			<div className={styles.weatherLegend}>
				<h5 className={styles.weatherSectionTitle}>气象图例</h5>

				{/* 气压图例 */}
				<div className={styles.legendGroup}>
					<h6 className={styles.legendGroupTitle}>气压 (hPa)</h6>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendPressureHigh}`}></div>
						<span className={styles.legendText}>&gt; 1020 (高压)</span>
					</div>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendPressureMediumHigh}`}></div>
						<span className={styles.legendText}>1015-1020 (偏高)</span>
					</div>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendPressureNormal}`}></div>
						<span className={styles.legendText}>1010-1015 (正常)</span>
					</div>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendPressureLow}`}></div>
						<span className={styles.legendText}>&lt; 1005 (低压)</span>
					</div>
				</div>

				{/* 风速图例 */}
				<div className={styles.legendGroup}>
					<h6 className={styles.legendGroupTitle}>风速 (m/s)</h6>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendWindStrong}`}></div>
						<span className={styles.legendText}>&gt; 20 (强风)</span>
					</div>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendWindHigh}`}></div>
						<span className={styles.legendText}>15-20 (大风)</span>
					</div>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendWindMedium}`}></div>
						<span className={styles.legendText}>10-15 (中风)</span>
					</div>
					<div className={styles.legendItem}>
						<div className={`${styles.legendColor} ${styles.legendWindLight}`}></div>
						<span className={styles.legendText}>&lt; 5 (微风)</span>
					</div>
				</div>

				{/* 温度图例 */}
				<div className={styles.legendGroup}>
					<h6 className={styles.legendGroupTitle}>温度热力图</h6>
					<div className={styles.legendGradient}>
						<div className={`${styles.gradientBar} ${styles.temperatureGradient}`}></div>
						<div className={styles.gradientLabels}>
							<span>-20°C</span>
							<span>0°C</span>
							<span>20°C</span>
							<span>50°C</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherControls;
