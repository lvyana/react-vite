import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point, Polygon, LineString } from 'ol/geom';
import { Icon, Style, Fill, Stroke, Text, Circle } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { MapManager, MapConfig } from './mapManager';
import { MapInit } from './map';

export class Polygons extends MapInit {
	private polygonLayers: VectorLayer<VectorSource>[] = [];

	constructor(config: MapConfig) {
		super(config);
	}

	// 生成多边形
	public generatePolygons(config: { id: string; polygons: Array<Array<Coordinate>>; styles: Style }): void {
		this.polygonLayers = this.polygonLayers.filter((layer) => {
			if (layer.get('id') === config.id) {
				layer.getSource()?.clear();
				this.getMap().removeLayer(layer);
			}
			return layer.get('id') !== config.id;
		});

		// 创建多边形数据源和图层
		const polygonSource = new VectorSource();

		config.polygons.forEach((polygon) => {
			// 限制区域 - 红色
			const restrictedArea = new Feature({
				geometry: new Polygon([
					// [fromLonLat([115, 35]), fromLonLat([120, 35]), fromLonLat([120, 30]), fromLonLat([115, 30]), fromLonLat([115, 35])]
					polygon.map((point) => fromLonLat(point))
				]),
				type: '限制区域'
			});

			restrictedArea.setStyle(config.styles);
			polygonSource.addFeatures([restrictedArea]);
		});

		// // 安全区域 - 绿色
		// const safeArea = new Feature({
		// 	geometry: new Polygon([
		// 		[fromLonLat([125, 25]), fromLonLat([130, 25]), fromLonLat([130, 20]), fromLonLat([125, 20]), fromLonLat([125, 25])]
		// 	]),
		// 	type: '安全区域'
		// });

		// safeArea.setStyle(
		// 	new Style({
		// 		fill: new Fill({
		// 			color: 'rgba(0, 255, 0, 0.2)'
		// 		}),
		// 		stroke: new Stroke({
		// 			color: 'rgba(0, 150, 0, 0.8)',
		// 			width: 2
		// 		}),
		// 		text: new Text({
		// 			text: '安全区域',
		// 			fill: new Fill({ color: '#2e7d32' }),
		// 			stroke: new Stroke({
		// 				color: '#ffffff',
		// 				width: 2
		// 			})
		// 		})
		// 	})
		// );

		const vectorLayer = new VectorLayer({
			source: polygonSource,
			zIndex: 1
		});

		// 设置图层的id属性
		vectorLayer.set('id', config.id);

		this.polygonLayers.push(vectorLayer);
		this.getMap().addLayer(vectorLayer);
	}

	// 删除多边形
	public removePolygons(id: string): void {
		this.polygonLayers = this.polygonLayers.filter((layer) => {
			if (layer.get('id') === id) {
				layer.getSource()?.clear();
			}
			return layer.get('id') !== id;
		});
	}

	// public togglePolygons(): void {
	// 	this.polygonsVisible = !this.polygonsVisible;
	// 	this.polygonLayer.setVisible(this.polygonsVisible);
	// }
}
