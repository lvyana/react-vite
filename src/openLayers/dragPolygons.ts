import { Feature } from 'ol';
import { Polygon } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Text, Circle } from 'ol/style';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Snap from 'ol/interaction/Snap';
import { MapInit } from './map';
import { MapConfig } from './mapManager';

// 绘制区域类型
export type DrawType = 'Polygon' | 'Circle' | 'Point' | 'LineString';

// 绘制样式配置
export interface DrawStyleConfig {
	fillColor?: string;
	strokeColor?: string;
	strokeWidth?: number;
	strokeDash?: number[];
	textLabel?: string;
	textFont?: string;
	textFillColor?: string;
	textStrokeColor?: string;
}

export class DragPolygons extends MapInit {
	// 绘制相关属性
	private drawSource: VectorSource | null = null;
	private drawLayer: VectorLayer<VectorSource> | null = null;
	private drawInteraction: Draw | null = null;
	private modifyInteraction: Modify | null = null;
	private snapInteraction: Snap | null = null;
	private isDrawing = false;
	private currentDrawType: DrawType = 'Polygon';
	private drawStyleConfig: DrawStyleConfig = {};

	constructor(config: MapConfig) {
		super(config);
		this.initDrawingLayers();
	}

	// 初始化绘制图层
	private initDrawingLayers(): void {
		// 创建绘制数据源
		this.drawSource = new VectorSource();

		// 创建绘制图层
		this.drawLayer = new VectorLayer({
			source: this.drawSource,
			style: this.getDefaultDrawStyle(),
			zIndex: 5
		});

		// 添加到地图
		this.getMap().addLayer(this.drawLayer);
	}

	// 获取默认绘制样式
	private getDefaultDrawStyle(): Style {
		return new Style({
			fill: new Fill({
				color: this.drawStyleConfig.fillColor || 'rgba(255, 0, 0, 0.2)'
			}),
			stroke: new Stroke({
				color: this.drawStyleConfig.strokeColor || 'rgba(255, 0, 0, 0.8)',
				width: this.drawStyleConfig.strokeWidth || 2,
				lineDash: this.drawStyleConfig.strokeDash
			}),
			text: this.drawStyleConfig.textLabel
				? new Text({
						text: this.drawStyleConfig.textLabel,
						font: this.drawStyleConfig.textFont || 'bold 14px Arial',
						fill: new Fill({
							color: this.drawStyleConfig.textFillColor || '#d32f2f'
						}),
						stroke: new Stroke({
							color: this.drawStyleConfig.textStrokeColor || '#ffffff',
							width: 2
						})
				  })
				: undefined
		});
	}

	// 设置绘制样式
	public setDrawStyle(config: DrawStyleConfig): void {
		this.drawStyleConfig = { ...this.drawStyleConfig, ...config };
		this.drawLayer?.setStyle(this.getDefaultDrawStyle());
	}

	// 设置绘制类型
	public setDrawType(type: DrawType): void {
		this.currentDrawType = type;
		if (this.isDrawing) {
			this.stopDrawing();
			this.startDrawing();
		}
	}

	// 开始绘制
	public startDrawing(type?: DrawType): void {
		if (type) {
			this.currentDrawType = type;
		}

		this.stopDrawing(); // 先停止之前的绘制

		// 创建绘制交互
		this.drawInteraction = new Draw({
			source: this.drawSource as VectorSource,
			type: this.currentDrawType,
			style: new Style({
				fill: new Fill({
					color: 'rgba(255, 0, 0, 0.3)'
				}),
				stroke: new Stroke({
					color: 'rgba(255, 0, 0, 1)',
					width: 2,
					lineDash: [5, 5]
				}),
				image: new Circle({
					radius: 8,
					fill: new Fill({
						color: 'rgba(255, 0, 0, 0.8)'
					}),
					stroke: new Stroke({
						color: 'rgba(255, 255, 255, 1)',
						width: 2
					})
				})
			})
		});

		// 创建修改交互
		this.modifyInteraction = new Modify({
			source: this.drawSource as VectorSource,
			style: new Style({
				image: new Circle({
					radius: 8,
					fill: new Fill({
						color: 'rgba(255, 0, 0, 0.8)'
					}),
					stroke: new Stroke({
						color: 'rgba(255, 255, 255, 1)',
						width: 2
					})
				})
			})
		});

		// 创建捕捉交互
		this.snapInteraction = new Snap({
			source: this.drawSource as VectorSource
		});

		// 添加交互到地图
		const map = this.getMap();
		map.addInteraction(this.drawInteraction);
		map.addInteraction(this.modifyInteraction);
		map.addInteraction(this.snapInteraction);

		// 绘制完成事件
		this.drawInteraction.on('drawend', (event) => {
			const feature = event.feature;
			this.onDrawEnd(feature);
		});

		this.isDrawing = true;
	}

	// 绘制完成回调
	private onDrawEnd(feature: Feature): void {
		// 设置最终样式
		feature.setStyle(this.getFeatureStyle(feature));

		// 获取几何信息
		const geometry = feature.getGeometry();
		if (geometry) {
			console.log('绘制完成:', {
				type: this.currentDrawType,
				coordinates: geometry.getType() === 'Polygon' ? (geometry as Polygon).getCoordinates() : geometry
			});
		}

		// 触发自定义事件（如果需要）
		this.dispatchDrawEvent('drawend', feature);
	}

	// 获取要素样式
	private getFeatureStyle(feature: Feature): Style {
		const geometry = feature.getGeometry();
		let textLabel = this.drawStyleConfig.textLabel;

		// 根据几何类型设置默认标签
		if (!textLabel) {
			switch (geometry?.getType()) {
				case 'Polygon':
					textLabel = '绘制区域';
					break;
				case 'Circle':
					textLabel = '圆形区域';
					break;
				case 'Point':
					textLabel = '标记点';
					break;
				case 'LineString':
					textLabel = '线条';
					break;
				default:
					textLabel = '绘制对象';
			}
		}

		return new Style({
			fill: new Fill({
				color: this.drawStyleConfig.fillColor || 'rgba(255, 0, 0, 0.2)'
			}),
			stroke: new Stroke({
				color: this.drawStyleConfig.strokeColor || 'rgba(255, 0, 0, 0.8)',
				width: this.drawStyleConfig.strokeWidth || 2,
				lineDash: this.drawStyleConfig.strokeDash
			}),
			text: new Text({
				text: textLabel,
				font: this.drawStyleConfig.textFont || 'bold 14px Arial',
				fill: new Fill({
					color: this.drawStyleConfig.textFillColor || '#d32f2f'
				}),
				stroke: new Stroke({
					color: this.drawStyleConfig.textStrokeColor || '#ffffff',
					width: 2
				})
			}),
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: this.drawStyleConfig.fillColor || 'rgba(255, 0, 0, 0.8)'
				}),
				stroke: new Stroke({
					color: this.drawStyleConfig.strokeColor || 'rgba(255, 255, 255, 1)',
					width: 2
				})
			})
		});
	}

	// 停止绘制
	public stopDrawing(): void {
		const map = this.getMap();

		if (this.drawInteraction) {
			map.removeInteraction(this.drawInteraction);
			this.drawInteraction = null;
		}
		if (this.modifyInteraction) {
			map.removeInteraction(this.modifyInteraction);
			this.modifyInteraction = null;
		}
		if (this.snapInteraction) {
			map.removeInteraction(this.snapInteraction);
			this.snapInteraction = null;
		}
		this.isDrawing = false;
	}

	// 清除所有绘制的区域
	public clearDrawnAreas(): void {
		this.drawSource?.clear();
	}

	// 清除指定的要素
	public removeFeature(feature: Feature): void {
		this.drawSource?.removeFeature(feature);
	}

	// 获取绘制状态
	public getIsDrawing(): boolean {
		return this.isDrawing;
	}

	// 获取当前绘制类型
	public getCurrentDrawType(): DrawType {
		return this.currentDrawType;
	}

	// 获取所有绘制的要素
	public getDrawnFeatures(): Feature[] {
		return this.drawSource?.getFeatures() || [];
	}

	// 获取绘制图层
	public getDrawLayer(): VectorLayer<VectorSource> {
		return this.drawLayer as VectorLayer<VectorSource>;
	}

	// 获取绘制数据源
	public getDrawSource(): VectorSource {
		return this.drawSource as VectorSource;
	}

	// 显示/隐藏绘制图层
	public toggleDrawLayer(visible?: boolean): void {
		if (visible !== undefined) {
			this.drawLayer?.setVisible(visible);
		} else {
			this.drawLayer?.setVisible(!this.drawLayer?.getVisible());
		}
	}

	// 导出绘制数据（GeoJSON格式）
	public exportDrawnFeatures(): any {
		const features = this.getDrawnFeatures();
		return {
			type: 'FeatureCollection',
			features: features.map((feature) => ({
				type: 'Feature',
				geometry: feature.getGeometry(),
				properties: {
					drawType: this.currentDrawType,
					timestamp: new Date().toISOString()
				}
			}))
		};
	}

	// 导入绘制数据
	public importDrawnFeatures(geojson: any): void {
		// 这里可以实现从GeoJSON导入功能
		console.log('导入功能待实现:', geojson);
	}

	// 分发绘制事件
	private dispatchDrawEvent(type: string, feature: Feature): void {
		const event = new CustomEvent(`draw:${type}`, {
			detail: { feature, drawType: this.currentDrawType }
		});
		window.dispatchEvent(event);
	}

	// 销毁时清理绘制相关资源
	public destroy(): void {
		this.stopDrawing();
		this.clearDrawnAreas();
		super.destroy();
	}
}
