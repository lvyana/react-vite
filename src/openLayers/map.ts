import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point, Polygon, LineString } from 'ol/geom';
import { Icon, Style, Fill, Stroke, Text, Circle } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { MapManager, MapConfig } from './mapManager';

export class MapInit {
	protected map: Map;
	constructor(config: MapConfig) {
		// 获取单例Map实例
		this.map = MapManager.getInstance(config);
	}

	// 更新地图配置
	public updateMapConfig(config: Partial<MapConfig>): void {
		MapManager.updateView(config);
		if (config.target) {
			MapManager.updateTarget(config.target);
		}
	}

	public destroy(): void {
		this.map.dispose();
	}

	public getMap(): Map {
		return this.map;
	}

	public zoomIn(): void {
		const view = this.getMap().getView();
		view.setZoom((view.getZoom() || 0) + 1);
	}

	public zoomOut(): void {
		const view = this.getMap().getView();
		view.setZoom((view.getZoom() || 0) - 1);
	}
}
