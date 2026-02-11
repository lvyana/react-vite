import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { Map } from '@/openLayers/index';
import { Style, Fill, Stroke, Text } from 'ol/style';
import { LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import styles from './index.module.scss';
import { ShipData } from '@/openLayers/ship';
import PolygonDrawing from '@/views/plugin/openLayers/PolygonDrawing';
import LineDrawing from '@/views/plugin/openLayers/LineDrawing';
import WeatherControls from '@/views/plugin/openLayers/WeatherControls';

// 生成随机船舶数据
const generateShips = (count: number): ShipData[] => {
	const ships: ShipData[] = [];
	const types = ['货船', '渔船', '油轮', '客船', '军舰'];

	for (let i = 0; i < count; i++) {
		const lon = 118 + Math.random() * 4;
		const lat = 28 + Math.random() * 4;
		const heading = Math.random() * 360;
		const speed = 1 + Math.random() * 19;
		const type = types[Math.floor(Math.random() * types.length)];

		ships.push({
			id: `ship-${i + 1}`,
			lon,
			lat,
			heading,
			speed,
			type
		});
	}

	return ships;
};

// 生成航线数据
const generateRoutes = () => {
	const routes = [];

	// 主要航道 - 东西向
	routes.push([[fromLonLat([110, 30]), fromLonLat([135, 30])]]);

	// 主要航道 - 南北向
	routes.push([[fromLonLat([120, 25]), fromLonLat([120, 35])]]);

	// 沿海航线1
	routes.push([[fromLonLat([115, 32]), fromLonLat([118, 31]), fromLonLat([122, 30]), fromLonLat([125, 29])]]);

	// 沿海航线2
	routes.push([[fromLonLat([116, 28]), fromLonLat([119, 27]), fromLonLat([123, 26]), fromLonLat([127, 25])]]);

	// 港口连接线1
	routes.push([[fromLonLat([118, 33]), fromLonLat([120, 30]), fromLonLat([122, 27])]]);

	// 港口连接线2
	routes.push([[fromLonLat([112, 31]), fromLonLat([115, 30]), fromLonLat([118, 29])]]);

	// 渔船航线1
	routes.push([[fromLonLat([125, 32]), fromLonLat([128, 31]), fromLonLat([130, 30])]]);

	// 渔船航线2
	routes.push([[fromLonLat([114, 29]), fromLonLat([117, 28]), fromLonLat([119, 27])]]);

	// 货运航线
	routes.push([[fromLonLat([111, 33]), fromLonLat([115, 32]), fromLonLat([120, 31]), fromLonLat([125, 30]), fromLonLat([130, 29])]]);

	// 客运航线
	routes.push([[fromLonLat([117, 26]), fromLonLat([120, 28]), fromLonLat([123, 30]), fromLonLat([126, 32])]]);

	return routes;
};

// 生成示例气象数据
const generateSampleWeatherData = () => {
	const weatherData = [];
	for (let i = 0; i < 50; i++) {
		const lon = 115 + Math.random() * 15; // 115-130度经度
		const lat = 25 + Math.random() * 10; // 25-35度纬度

		weatherData.push({
			lon,
			lat,
			pressure: 1000 + Math.random() * 30, // 1000-1030 hPa
			temperature: -5 + Math.random() * 40, // -5到35度
			humidity: 30 + Math.random() * 70, // 30-100%
			windSpeed: Math.random() * 25, // 0-25 m/s
			windDirection: Math.random() * 360 // 0-360度
		});
	}
	return weatherData;
};

// 生成示例波浪数据
const generateSampleWaveData = () => {
	const waveData = [];
	for (let i = 0; i < 30; i++) {
		const lon = 115 + Math.random() * 15;
		const lat = 25 + Math.random() * 10;

		waveData.push({
			lon,
			lat,
			waveHeight: 0.5 + Math.random() * 4, // 0.5-4.5米
			waveDirection: Math.random() * 360, // 0-360度
			wavePeriod: 5 + Math.random() * 10 // 5-15秒
		});
	}
	return waveData;
};

// 地图控制逻辑 Hook
const useMapControls = (mapInstanceRef: React.RefObject<Map | null>) => {
	const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
	const [isDrawingLine, setIsDrawingLine] = useState(false);
	const [isEditingLine, setIsEditingLine] = useState(false);

	// 气象图层状态
	const [showPressure, setShowPressure] = useState(false);
	const [showWind, setShowWind] = useState(false);
	const [showWave, setShowWave] = useState(false);
	const [showTemperature, setShowTemperature] = useState(false);
	const [isWaveAnimating, setIsWaveAnimating] = useState(false);

	// 地图基础控制
	const handleZoomIn = () => {
		mapInstanceRef.current?.zoomIn();
	};

	const handleZoomOut = () => {
		mapInstanceRef.current?.zoomOut();
	};

	const handleToggleShips = () => {
		mapInstanceRef.current?.ship.toggleShips();
	};

	const handleTogglePolygons = () => {
		mapInstanceRef.current?.polygons.removePolygons('polygonLayer1');
		mapInstanceRef.current?.polygons.removePolygons('polygonLayer2');
		mapInstanceRef.current?.polygons.removePolygons('polygonLayer3');
		mapInstanceRef.current?.polygons.removePolygons('polygonLayer4');
	};

	// 多边形绘制控制
	const handleStartDrawing = () => {
		mapInstanceRef.current?.dragPolygons.startDrawing();
		setIsDrawingPolygon(true);
	};

	const handleStopDrawing = () => {
		mapInstanceRef.current?.dragPolygons.stopDrawing();
		setIsDrawingPolygon(false);
	};

	const handleClearDrawing = () => {
		mapInstanceRef.current?.dragPolygons.clearDrawnAreas();
		setIsDrawingPolygon(false);
	};

	// 航线编辑控制
	const handleStartDrawingLine = () => {
		mapInstanceRef.current?.dragLine.startDrawing();
		setIsDrawingLine(true);
		setIsEditingLine(false);
	};

	const handleStartEditingLine = () => {
		mapInstanceRef.current?.dragLine.startEditing();
		setIsEditingLine(true);
		setIsDrawingLine(false);
	};

	const handleStopLineModes = () => {
		mapInstanceRef.current?.dragLine.stopDrawing();
		mapInstanceRef.current?.dragLine.stopEditing();
		setIsDrawingLine(false);
		setIsEditingLine(false);
	};

	const handleDeleteSelectedLine = () => {
		const deleted = mapInstanceRef.current?.dragLine.deleteSelectedLine();
		if (deleted) {
			alert('航线已删除');
		} else {
			alert('请先选择要删除的航线');
		}
	};

	const handleClearAllLines = () => {
		if (confirm('确定要清除所有航线吗？')) {
			mapInstanceRef.current?.dragLine.clearAllLines();
		}
	};

	const handleExportLines = () => {
		const lines = mapInstanceRef.current?.dragLine.exportLines();
		if (lines && lines.length > 0) {
			console.warn('导出的航线数据:', lines);
			alert(`成功导出 ${lines.length} 条航线`);
		} else {
			alert('没有可导出的航线');
		}
	};

	// 气象控制函数
	const handleTogglePressure = () => {
		mapInstanceRef.current?.weather.toggleLayer('pressure');
		const newState = mapInstanceRef.current?.weather.getLayerVisible('pressure') ?? false;
		const featureCount = mapInstanceRef.current?.weather.getLayerFeatureCount('pressure') ?? 0;
		console.warn('气压图层状态:', { visible: newState, featureCount });
		setShowPressure(newState);
	};

	const handleToggleWind = () => {
		mapInstanceRef.current?.weather.toggleLayer('wind');
		const newState = mapInstanceRef.current?.weather.getLayerVisible('wind') ?? false;
		setShowWind(newState);
	};

	const handleToggleWave = () => {
		mapInstanceRef.current?.weather.toggleLayer('wave');
		const newState = mapInstanceRef.current?.weather.getLayerVisible('wave') ?? false;
		const featureCount = mapInstanceRef.current?.weather.getLayerFeatureCount('wave') ?? 0;
		console.warn('波浪图层状态:', { visible: newState, featureCount });
		setShowWave(newState);
	};

	const handleToggleTemperature = () => {
		mapInstanceRef.current?.weather.toggleLayer('temperature');
		const newState = mapInstanceRef.current?.weather.getLayerVisible('temperature') ?? false;
		setShowTemperature(newState);
	};

	const handleStartWaveAnimation = () => {
		mapInstanceRef.current?.weather.startWaveAnimation();
		setIsWaveAnimating(true);
	};

	const handleStopWaveAnimation = () => {
		mapInstanceRef.current?.weather.stopWaveAnimation();
		setIsWaveAnimating(false);
	};

	const handleLoadSampleWeatherData = () => {
		// 生成示例气象数据
		const sampleWeatherData = generateSampleWeatherData();
		const sampleWaveData = generateSampleWaveData();

		mapInstanceRef.current?.weather.addWeatherData(sampleWeatherData);
		mapInstanceRef.current?.weather.addWindData(sampleWeatherData);
		mapInstanceRef.current?.weather.addWaveData(sampleWaveData);

		console.warn('加载的气象数据:', {
			weatherPoints: sampleWeatherData.length,
			wavePoints: sampleWaveData.length
		});

		alert(
			`已加载示例气象数据：\n气象点: ${sampleWeatherData.length}个\n波浪点: ${sampleWaveData.length}个\n\n请点击对应的图层按钮来显示数据`
		);
	};

	const handleClearWeatherData = () => {
		mapInstanceRef.current?.weather.clearWeatherData();
		setShowPressure(false);
		setShowWind(false);
		setShowWave(false);
		setShowTemperature(false);
		setIsWaveAnimating(false);
		alert('已清除所有气象数据');
	};

	return {
		isDrawingPolygon,
		isDrawingLine,
		isEditingLine,
		showPressure,
		showWind,
		showWave,
		showTemperature,
		isWaveAnimating,
		handleZoomIn,
		handleZoomOut,
		handleToggleShips,
		handleTogglePolygons,
		handleStartDrawing,
		handleStopDrawing,
		handleClearDrawing,
		handleStartDrawingLine,
		handleStartEditingLine,
		handleStopLineModes,
		handleDeleteSelectedLine,
		handleClearAllLines,
		handleExportLines,
		handleTogglePressure,
		handleToggleWind,
		handleToggleWave,
		handleToggleTemperature,
		handleStartWaveAnimation,
		handleStopWaveAnimation,
		handleLoadSampleWeatherData,
		handleClearWeatherData
	};
};

const OpenLayers: React.FC = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<Map | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showPanels, setShowPanels] = useState(false);

	const mapControls = useMapControls(mapInstanceRef);

	useEffect(() => {
		if (mapRef.current && !mapInstanceRef.current) {
			try {
				// 创建地图实例（内部使用单例Map）
				mapInstanceRef.current = new Map({
					target: mapRef.current,
					center: [120, 30], // 杭州附近
					zoom: 8,
					maxZoom: 18,
					minZoom: 2
				});

				// 初始化地图数据
				initialize(20);
				initPolygons();
				setIsLoading(false);
			} catch (error) {
				console.error('地图初始化失败:', error);
				setIsLoading(false);
			}
		}

		// 清理函数
		return () => {
			// Map实例是单例，组件卸载时不销毁Map，只清理本组件的引用
			// Map实例会在MapManager中保持，可以被其他组件复用
			if (mapInstanceRef.current) {
				mapInstanceRef.current.destroy();
				mapInstanceRef.current = null;
			}
		};
	}, []);
	// 公共方法
	const initialize = (shipCount: number = 20): void => {
		const ships = generateShips(shipCount);
		mapInstanceRef.current?.ship.addShipsToMap(ships);
		// this.generatePolygons();
		// 生成多条航线
		const routes = generateRoutes();
		routes.forEach((route) => {
			// route是[[坐标数组]]，需要取出内部的坐标数组
			mapInstanceRef.current?.line.addLine(new LineString(route[0]));
		});
		mapInstanceRef.current?.ship.startAnimation();
	};
	const initPolygons = () => {
		// 限制区域
		mapInstanceRef.current?.polygons.generatePolygons({
			id: 'polygonLayer1',
			polygons: [
				[
					[115, 35],
					[120, 35],
					[120, 30],
					[115, 30],
					[115, 35]
				]
			],
			styles: new Style({
				fill: new Fill({
					color: 'rgba(255, 0, 0, 0.3)'
				}),
				stroke: new Stroke({
					color: 'rgba(255, 0, 0, 0.8)',
					width: 2
				}),
				text: new Text({
					text: '限制区域',
					font: '20px Arial',
					fill: new Fill({ color: '#d32f2f' }),
					stroke: new Stroke({
						color: '#ffffff',
						width: 2
					})
				})
			})
		});
		// 安全区域 - 绿色
		mapInstanceRef.current?.polygons.generatePolygons({
			id: 'polygonLayer2',
			polygons: [
				[
					[125, 25],
					[130, 25],
					[120, 30],
					[125, 20],
					[125, 25]
				]
			],
			styles: new Style({
				fill: new Fill({
					color: 'rgba(0, 255, 0, 0.3)'
				}),
				stroke: new Stroke({
					color: 'rgba(0, 255, 0, 0.8)',
					width: 2
				}),
				text: new Text({
					text: '安全区域',
					font: '20px Arial',
					fill: new Fill({ color: '#2e7d32' }),
					stroke: new Stroke({
						color: '#ffffff',
						width: 2
					})
				})
			})
		});
		// 航道 - 蓝色
		mapInstanceRef.current?.polygons.generatePolygons({
			id: 'polygonLayer3',
			polygons: [
				[
					[110, 28],
					[135, 28],
					[135, 26],
					[110, 26],
					[110, 28]
				]
			],
			styles: new Style({
				fill: new Fill({
					color: 'rgba(0, 0, 255, 0.3)'
				}),
				stroke: new Stroke({
					color: 'rgba(0, 0, 255, 0.8)',
					width: 2
				}),
				text: new Text({
					text: '航道',
					font: '20px Arial',
					fill: new Fill({ color: '#1565c0' }),
					stroke: new Stroke({
						color: '#ffffff',
						width: 2
					})
				})
			})
		});
		// 捕鱼区 - 黄色
		mapInstanceRef.current?.polygons.generatePolygons({
			id: 'polygonLayer4',
			polygons: [
				[
					[122, 32],
					[128, 34],
					[132, 31],
					[126, 29],
					[122, 32]
				]
			],
			styles: new Style({
				fill: new Fill({
					color: 'rgba(255, 255, 0, 0.3)'
				}),
				stroke: new Stroke({
					color: 'rgba(255, 152, 0, 0.8)',
					width: 2
				}),
				text: new Text({
					text: '捕鱼区',
					font: '20px Arial',
					fill: new Fill({ color: '#f57c00' }),
					stroke: new Stroke({
						color: '#ffffff',
						width: 2
					})
				})
			})
		});
	};

	return (
		<div className={styles.openlayersContainer}>
			<div ref={mapRef} className={styles.mapContainer} />

			{isLoading && (
				<div className={styles.loadingOverlay}>
					<div className={styles.loadingSpinner}>地图加载中...</div>
				</div>
			)}

			<Button
				className={styles.toggleButton}
				type="primary"
				icon={<i className={`fas ${showPanels ? 'fa-times' : 'fa-bars'}`} />}
				onClick={() => setShowPanels(!showPanels)}>
				{showPanels ? '收起面板' : '展开面板'}
			</Button>

			<div className={`${styles.mapControls} ${showPanels ? styles.show : ''}`}>
				{/* 地图操作 */}
				<div className={styles.controlGroup}>
					<h4 className={styles.controlGroupTitle}>🗺️ 地图操作</h4>
					<div className={styles.controlButtons}>
						<Button onClick={mapControls.handleZoomIn} icon={<i className="fas fa-search-plus" />}>
							放大
						</Button>
						<Button onClick={mapControls.handleZoomOut} icon={<i className="fas fa-search-minus" />}>
							缩小
						</Button>
					</div>
				</div>

				{/* 图层控制 */}
				<div className={styles.controlGroup}>
					<h4 className={styles.controlGroupTitle}>📋 图层控制</h4>
					<div className={styles.controlButtons}>
						<Button onClick={mapControls.handleToggleShips} icon={<i className="fas fa-ship" />}>
							显示/隐藏船舶
						</Button>
						<Button onClick={mapControls.handleTogglePolygons} icon={<i className="fas fa-shapes" />}>
							清理多边形
						</Button>
					</div>
				</div>

				{/* 多边形绘制组件 */}
				<PolygonDrawing
					onStartDrawing={mapControls.handleStartDrawing}
					onStopDrawing={mapControls.handleStopDrawing}
					onClearDrawing={mapControls.handleClearDrawing}
					isDrawing={mapControls.isDrawingPolygon}
				/>

				{/* 航线绘制组件 */}
				<LineDrawing
					onStartDrawingLine={mapControls.handleStartDrawingLine}
					onStartEditingLine={mapControls.handleStartEditingLine}
					onStopLineModes={mapControls.handleStopLineModes}
					onDeleteSelectedLine={mapControls.handleDeleteSelectedLine}
					onClearAllLines={mapControls.handleClearAllLines}
					onExportLines={mapControls.handleExportLines}
					isDrawing={mapControls.isDrawingLine}
					isEditing={mapControls.isEditingLine}
				/>

				{/* 气象控制组件 */}
				<WeatherControls
					onTogglePressure={mapControls.handleTogglePressure}
					onToggleWind={mapControls.handleToggleWind}
					onToggleWave={mapControls.handleToggleWave}
					onToggleTemperature={mapControls.handleToggleTemperature}
					onStartWaveAnimation={mapControls.handleStartWaveAnimation}
					onStopWaveAnimation={mapControls.handleStopWaveAnimation}
					onLoadSampleData={mapControls.handleLoadSampleWeatherData}
					onClearWeatherData={mapControls.handleClearWeatherData}
					showPressure={mapControls.showPressure}
					showWind={mapControls.showWind}
					showWave={mapControls.showWave}
					showTemperature={mapControls.showTemperature}
					isAnimating={mapControls.isWaveAnimating}
				/>
			</div>

			<div className={`${styles.infoPanel} ${showPanels ? styles.show : ''}`}>{tempelateDiv}</div>
		</div>
	);
};

const tempelateDiv = (
	<>
		<h3 className={styles.panelTitle}>地图说明</h3>
		<p className={styles.panelDescription}>此演示展示了船舶位置及其航行方向，以及不同类型的多边形区域。</p>
		<h4 className={styles.legendTitle}>图例：</h4>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendRestricted}`}></div>
			<span className={styles.legendText}>限制区域</span>
		</div>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendSafe}`}></div>
			<span className={styles.legendText}>安全区域</span>
		</div>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendShipping}`}></div>
			<span className={styles.legendText}>航道</span>
		</div>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendFishing}`}></div>
			<span className={styles.legendText}>捕鱼区</span>
		</div>
		<h4 className={styles.legendTitle}>航线图例：</h4>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendRoutePreset}`}></div>
			<span className={styles.legendText}>预设航线</span>
		</div>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendRouteEditable}`}></div>
			<span className={styles.legendText}>可编辑航线</span>
		</div>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendRouteSelected}`}></div>
			<span className={styles.legendText}>选中航线</span>
		</div>
		<div className={styles.legendItem}>
			<div className={`${styles.legendColor} ${styles.legendRouteDrawing}`}></div>
			<span className={styles.legendText}>绘制中航线</span>
		</div>
	</>
);
export default OpenLayers;
