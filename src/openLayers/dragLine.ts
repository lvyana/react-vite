import { MapInit } from './map';
import { MapConfig } from './mapManager';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { LineString, Point } from 'ol/geom';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Snap from 'ol/interaction/Snap';
import Select from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import { fromLonLat } from 'ol/proj';

export class DragLine extends MapInit {
	private lineSource: VectorSource | null = null;
	private lineLayer: VectorLayer<VectorSource> | null = null;
	private drawInteraction: Draw | null = null;
	private modifyInteraction: Modify | null = null;
	private snapInteraction: Snap | null = null;
	private selectInteraction: Select | null = null;
	private isDrawing = false;
	private isEditing = false;

	constructor(config: MapConfig) {
		super(config);
		this.initializeLayers();
		this.initializeInteractions();
	}

	// 初始化图层
	private initializeLayers(): void {
		this.lineSource = new VectorSource();
		this.lineLayer = new VectorLayer({
			source: this.lineSource,
			style: this.getLineStyle(),
			zIndex: 3
		});
		this.getMap().addLayer(this.lineLayer);
	}

	// 初始化交互
	private initializeInteractions(): void {
		// 选择交互
		this.selectInteraction = new Select({
			condition: click,
			style: this.getSelectedLineStyle(),
			layers: [this.lineLayer!]
		});

		// 修改交互
		this.modifyInteraction = new Modify({
			source: this.lineSource!,
			style: this.getModifyPointStyle()
		});

		// 捕捉交互
		this.snapInteraction = new Snap({
			source: this.lineSource!
		});

		// 绘制交互
		this.drawInteraction = new Draw({
			source: this.lineSource!,
			type: 'LineString',
			style: this.getDrawingStyle()
		});

		// 绘制完成事件
		this.drawInteraction.on('drawend', (event) => {
			const feature = event.feature;
			this.onLineDrawn(feature);
		});

		// 选择事件
		this.selectInteraction.on('select', (event) => {
			if (event.selected.length > 0) {
				console.log('航线已选中:', event.selected[0].getId());
			}
		});
	}

	// 获取线条样式
	private getLineStyle(): Style {
		return new Style({
			stroke: new Stroke({
				color: 'rgba(255, 165, 0, 0.8)', // 橙色
				width: 3,
				lineDash: [10, 5]
			})
		});
	}

	// 获取选中线条样式
	private getSelectedLineStyle(): Style {
		return new Style({
			stroke: new Stroke({
				color: 'rgba(255, 0, 0, 1)', // 红色高亮
				width: 4,
				lineDash: [5, 5]
			})
		});
	}

	// 获取修改点样式
	private getModifyPointStyle(): Style {
		return new Style({
			image: new Circle({
				radius: 8,
				fill: new Fill({
					color: 'rgba(255, 255, 0, 0.8)' // 黄色控制点
				}),
				stroke: new Stroke({
					color: 'rgba(255, 0, 0, 1)',
					width: 2
				})
			})
		});
	}

	// 获取绘制中样式
	private getDrawingStyle(): Style {
		return new Style({
			stroke: new Stroke({
				color: 'rgba(0, 255, 0, 0.8)', // 绿色绘制中
				width: 3,
				lineDash: [15, 10]
			}),
			image: new Circle({
				radius: 6,
				fill: new Fill({
					color: 'rgba(0, 255, 0, 0.8)'
				}),
				stroke: new Stroke({
					color: 'rgba(255, 255, 255, 1)',
					width: 2
				})
			})
		});
	}

	// 开始绘制航线
	public startDrawing(): void {
		this.stopEditing(); // 停止编辑模式

		if (!this.isDrawing) {
			this.getMap().addInteraction(this.drawInteraction!);
			this.getMap().addInteraction(this.snapInteraction!);
			this.isDrawing = true;
			console.log('开始绘制航线模式');
		}
	}

	// 停止绘制航线
	public stopDrawing(): void {
		if (this.isDrawing) {
			this.getMap().removeInteraction(this.drawInteraction!);
			this.getMap().removeInteraction(this.snapInteraction!);
			this.isDrawing = false;
			console.log('停止绘制航线模式');
		}
	}

	// 开始编辑航线
	public startEditing(): void {
		this.stopDrawing(); // 停止绘制模式

		if (!this.isEditing) {
			this.getMap().addInteraction(this.selectInteraction!);
			this.getMap().addInteraction(this.modifyInteraction!);
			this.getMap().addInteraction(this.snapInteraction!);
			this.isEditing = true;
			console.log('开始编辑航线模式');
		}
	}

	// 停止编辑航线
	public stopEditing(): void {
		if (this.isEditing) {
			this.getMap().removeInteraction(this.selectInteraction!);
			this.getMap().removeInteraction(this.modifyInteraction!);
			this.getMap().removeInteraction(this.snapInteraction!);
			this.isEditing = false;
			console.log('停止编辑航线模式');
		}
	}

	// 添加预定义航线
	public addPredefinedLine(coordinates: number[][]): Feature {
		const lineFeature = new Feature({
			geometry: new LineString(coordinates)
		});

		// 设置唯一ID
		const id = `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		lineFeature.setId(id);

		this.lineSource!.addFeature(lineFeature);
		console.log('添加航线:', id);

		return lineFeature;
	}

	// 删除选中的航线
	public deleteSelectedLine(): boolean {
		if (this.selectInteraction) {
			const selectedFeatures = this.selectInteraction.getFeatures();
			if (selectedFeatures.getLength() > 0) {
				const feature = selectedFeatures.item(0);
				this.lineSource!.removeFeature(feature);
				selectedFeatures.clear();
				console.log('删除航线:', feature.getId());
				return true;
			}
		}
		return false;
	}

	// 清除所有航线
	public clearAllLines(): void {
		this.lineSource!.clear();
		if (this.selectInteraction) {
			this.selectInteraction.getFeatures().clear();
		}
		console.log('清除所有航线');
	}

	// 获取所有航线
	public getAllLines(): Feature[] {
		return this.lineSource!.getFeatures();
	}

	// 航线绘制完成回调
	private onLineDrawn(feature: Feature): void {
		const geometry = feature.getGeometry() as LineString;
		const coordinates = geometry.getCoordinates();

		// 设置唯一ID
		const id = `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		feature.setId(id);

		console.log('航线绘制完成:', {
			id: id,
			coordinates: coordinates,
			length: coordinates.length
		});

		// 自动切换到编辑模式
		this.stopDrawing();
		this.startEditing();
	}

	// 导出航线数据
	public exportLines(): any[] {
		const lines = this.getAllLines();
		return lines.map((line) => ({
			id: line.getId(),
			coordinates: (line.getGeometry() as LineString).getCoordinates(),
			type: 'LineString'
		}));
	}

	// 导入航线数据
	public importLines(linesData: any[]): void {
		this.clearAllLines();
		linesData.forEach((lineData) => {
			const feature = new Feature({
				geometry: new LineString(lineData.coordinates)
			});
			if (lineData.id) {
				feature.setId(lineData.id);
			}
			this.lineSource!.addFeature(feature);
		});
		console.log(`导入了 ${linesData.length} 条航线`);
	}

	// 获取状态
	public getStatus(): { isDrawing: boolean; isEditing: boolean; lineCount: number } {
		return {
			isDrawing: this.isDrawing,
			isEditing: this.isEditing,
			lineCount: this.lineSource!.getFeatures().length
		};
	}
}
