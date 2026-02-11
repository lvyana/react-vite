import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Vector as VectorLayer, Heatmap } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Point, Polygon, LineString } from 'ol/geom';
import { Style, Fill, Stroke, Text, Icon, Circle } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { MapInit } from './map';
import { MapConfig } from './mapManager';

// 气象数据接口
interface WeatherData {
	lon: number;
	lat: number;
	pressure: number; // 气压 (hPa)
	temperature: number; // 温度 (°C)
	humidity: number; // 湿度 (%)
	windSpeed: number; // 风速 (m/s)
	windDirection: number; // 风向 (度)
}

interface WaveData {
	lon: number;
	lat: number;
	waveHeight: number; // 浪高 (m)
	waveDirection: number; // 浪向 (度)
	wavePeriod: number; // 周期 (s)
}

export class WeatherVisualization extends MapInit {
	private pressureLayer!: VectorLayer<VectorSource>;
	private windLayer!: VectorLayer<VectorSource>;
	private waveLayer!: VectorLayer<VectorSource>;
	private heatmapLayer!: Heatmap;
	private animationFrame: number | null = null;
	private wavePhase: number = 0;

	constructor(config: MapConfig) {
		super(config);
		this.initWeatherLayers();
	}

	private initWeatherLayers(): void {
		// 气压图层
		this.pressureLayer = new VectorLayer({
			source: new VectorSource(),
			style: (feature: FeatureLike) => this.createPressureStyle(feature as Feature),
			zIndex: 10,
			visible: false // 默认隐藏
		});

		// 风场图层
		this.windLayer = new VectorLayer({
			source: new VectorSource(),
			style: (feature: FeatureLike) => this.createWindStyle(feature as Feature),
			zIndex: 11,
			visible: false // 默认隐藏
		});

		// 波浪图层
		this.waveLayer = new VectorLayer({
			source: new VectorSource(),
			style: (feature: FeatureLike) => this.createWaveStyle(feature as Feature),
			zIndex: 9,
			visible: false // 默认隐藏
		});

		// 温度热力图
		this.heatmapLayer = new Heatmap({
			source: new VectorSource(),
			blur: 15,
			radius: 25,
			gradient: ['#000080', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'],
			zIndex: 8,
			visible: false // 默认隐藏
		});

		// 添加到地图
		this.map.addLayer(this.heatmapLayer);
		this.map.addLayer(this.waveLayer);
		this.map.addLayer(this.pressureLayer);
		this.map.addLayer(this.windLayer);
	}

	// 添加气象数据
	public addWeatherData(data: WeatherData[]): void {
		const pressureFeatures: Feature[] = [];
		const heatmapFeatures: Feature[] = [];

		data.forEach((weather) => {
			const position = fromLonLat([weather.lon, weather.lat]);

			// 气压等值线特征
			const pressureFeature = new Feature({
				geometry: new Point(position),
				pressure: weather.pressure,
				temperature: weather.temperature
			});
			pressureFeatures.push(pressureFeature);

			// 温度热力图特征
			const heatFeature = new Feature({
				geometry: new Point(position),
				weight: this.normalizeTemperature(weather.temperature)
			});
			heatmapFeatures.push(heatFeature);
		});

		this.pressureLayer.getSource()?.addFeatures(pressureFeatures);
		this.heatmapLayer.getSource()?.addFeatures(heatmapFeatures);
	}

	// 添加风场数据
	public addWindData(data: WeatherData[]): void {
		const windFeatures: Feature[] = [];

		data.forEach((weather) => {
			if (weather.windSpeed > 0) {
				const start = fromLonLat([weather.lon, weather.lat]);
				const end = this.calculateWindArrowEnd(start, weather.windDirection, weather.windSpeed);

				const windFeature = new Feature({
					geometry: new LineString([start, end]),
					speed: weather.windSpeed,
					direction: weather.windDirection
				});
				windFeatures.push(windFeature);
			}
		});

		this.windLayer.getSource()?.addFeatures(windFeatures);
	}

	// 添加波浪数据
	public addWaveData(data: WaveData[]): void {
		const waveFeatures: Feature[] = [];

		data.forEach((wave) => {
			const center = fromLonLat([wave.lon, wave.lat]);

			// 创建波浪圆形区域
			const waveFeature = new Feature({
				geometry: new Point(center),
				waveHeight: wave.waveHeight,
				waveDirection: wave.waveDirection,
				wavePeriod: wave.wavePeriod
			});
			waveFeatures.push(waveFeature);
		});

		this.waveLayer.getSource()?.addFeatures(waveFeatures);
	}

	// 气压样式
	private createPressureStyle(feature: Feature): Style {
		const pressure = feature.get('pressure');
		const color = this.getPressureColor(pressure);

		// 使用简单的圆形样式替代SVG图标
		return new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({ color: color }),
				stroke: new Stroke({ color: '#000', width: 1 })
			}),
			text: new Text({
				text: `${pressure.toFixed(0)} hPa`,
				font: '12px Arial',
				fill: new Fill({ color: '#000' }),
				stroke: new Stroke({ color: '#fff', width: 2 }),
				offsetY: -25
			})
		});
	}

	// 风场样式
	private createWindStyle(feature: Feature): Style {
		const speed = feature.get('speed');
		const direction = feature.get('direction');
		const color = this.getWindSpeedColor(speed);

		return new Style({
			stroke: new Stroke({
				color: color,
				width: Math.max(2, speed / 5),
				lineCap: 'round'
			}),
			image: new Icon({
				src: this.createWindArrow(direction, color),
				scale: 0.6,
				rotation: (direction * Math.PI) / 180
			})
		});
	}

	// 波浪样式
	private createWaveStyle(feature: Feature): Style {
		const waveHeight = feature.get('waveHeight');
		const radius = Math.max(10, waveHeight * 5);
		const alpha = 0.3 + 0.4 * Math.sin(this.wavePhase + feature.get('wavePeriod'));

		// 确保alpha值在有效范围内 (0-1)
		const normalizedAlpha = Math.max(0.1, Math.min(0.8, alpha));

		// 使用简单的圆形样式
		return new Style({
			image: new Circle({
				radius: radius,
				fill: new Fill({ color: `rgba(0, 102, 204, ${normalizedAlpha * 0.5})` }),
				stroke: new Stroke({ color: '#0066CC', width: 2 })
			}),
			text: new Text({
				text: `${waveHeight.toFixed(1)}m`,
				font: '10px Arial',
				fill: new Fill({ color: '#0066CC' }),
				stroke: new Stroke({ color: '#fff', width: 1 })
			})
		});
	}

	// 开始波浪动画
	public startWaveAnimation(): void {
		const animate = () => {
			this.wavePhase += 0.1;

			// 更新波浪图层样式
			this.waveLayer
				.getSource()
				?.getFeatures()
				.forEach((feature) => {
					feature.changed();
				});

			this.animationFrame = requestAnimationFrame(animate);
		};
		animate();
	}

	// 停止动画
	public stopWaveAnimation(): void {
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);
			this.animationFrame = null;
		}
	}

	// 工具方法
	private getPressureColor(pressure: number): string {
		// 标准大气压 1013.25 hPa
		if (pressure > 1020) return '#FF0000'; // 高压 - 红色
		if (pressure > 1015) return '#FF8800'; // 偏高 - 橙色
		if (pressure > 1010) return '#FFFF00'; // 正常 - 黄色
		if (pressure > 1005) return '#88FF00'; // 偏低 - 浅绿
		return '#0088FF'; // 低压 - 蓝色
	}

	private getWindSpeedColor(speed: number): string {
		if (speed > 20) return '#8B0000'; // 强风 - 深红
		if (speed > 15) return '#FF0000'; // 大风 - 红色
		if (speed > 10) return '#FF8800'; // 中风 - 橙色
		if (speed > 5) return '#FFFF00'; // 轻风 - 黄色
		return '#88FF88'; // 微风 - 浅绿
	}

	private normalizeTemperature(temp: number): number {
		// 将温度归一化到 0-1 范围 (假设温度范围 -20°C 到 50°C)
		return Math.max(0, Math.min(1, (temp + 20) / 70));
	}

	private calculateWindArrowEnd(start: number[], direction: number, speed: number): number[] {
		const scale = speed * 1000; // 缩放因子
		const radians = (direction * Math.PI) / 180;

		return [start[0] + Math.sin(radians) * scale, start[1] + Math.cos(radians) * scale];
	}

	private createPressureIcon(pressure: number, color: string): string {
		const svg = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10" cy="10" r="8" fill="${color}" stroke="#000" stroke-width="1" opacity="0.8"/>
			<text x="10" y="13" font-family="Arial" font-size="8" text-anchor="middle" fill="#000">P</text>
		</svg>`;
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
	}

	private createWindArrow(direction: number, color: string): string {
		const svg = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 2 L16 10 L12 8 L8 10 Z" fill="${color}" stroke="#000" stroke-width="1"/>
		</svg>`;
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
	}

	private createWaveCircle(radius: number, alpha: number): string {
		const svg = `<svg width="${radius * 2}" height="${radius * 2}" xmlns="http://www.w3.org/2000/svg">
			<circle cx="${radius}" cy="${radius}" r="${radius - 2}" fill="none" stroke="#0066CC" stroke-width="2" opacity="${alpha}"/>
			<circle cx="${radius}" cy="${radius}" r="${radius * 0.7}" fill="none" stroke="#0088FF" stroke-width="1" opacity="${alpha * 0.7}"/>
		</svg>`;
		return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
	}

	// 清除所有气象数据
	public clearWeatherData(): void {
		this.pressureLayer.getSource()?.clear();
		this.windLayer.getSource()?.clear();
		this.waveLayer.getSource()?.clear();
		this.heatmapLayer.getSource()?.clear();
	}

	// 切换图层显示
	public toggleLayer(layerType: 'pressure' | 'wind' | 'wave' | 'temperature'): void {
		switch (layerType) {
			case 'pressure':
				this.pressureLayer.setVisible(!this.pressureLayer.getVisible());
				break;
			case 'wind':
				this.windLayer.setVisible(!this.windLayer.getVisible());
				break;
			case 'wave':
				this.waveLayer.setVisible(!this.waveLayer.getVisible());
				break;
			case 'temperature':
				this.heatmapLayer.setVisible(!this.heatmapLayer.getVisible());
				break;
		}
	}

	// 获取图层可见性状态
	public getLayerVisible(layerType: 'pressure' | 'wind' | 'wave' | 'temperature'): boolean {
		switch (layerType) {
			case 'pressure':
				return this.pressureLayer.getVisible();
			case 'wind':
				return this.windLayer.getVisible();
			case 'wave':
				return this.waveLayer.getVisible();
			case 'temperature':
				return this.heatmapLayer.getVisible();
			default:
				return false;
		}
	}

	// 调试方法：获取图层特征数量
	public getLayerFeatureCount(layerType: 'pressure' | 'wind' | 'wave' | 'temperature'): number {
		switch (layerType) {
			case 'pressure':
				return this.pressureLayer.getSource()?.getFeatures().length || 0;
			case 'wind':
				return this.windLayer.getSource()?.getFeatures().length || 0;
			case 'wave':
				return this.waveLayer.getSource()?.getFeatures().length || 0;
			case 'temperature':
				return this.heatmapLayer.getSource()?.getFeatures().length || 0;
			default:
				return 0;
		}
	}
}
