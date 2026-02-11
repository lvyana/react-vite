import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { EventTypes } from 'ol/Observable';

// 地图配置接口
export interface MapConfig {
	target: HTMLElement | string;
	center?: [number, number];
	zoom?: number;
	maxZoom?: number;
	minZoom?: number;
}

/**
 * 地图管理器 - 管理OpenLayers Map的单例实例
 */
export class MapManager {
	private static mapInstance: Map | null = null;
	private static isInitialized = false;

	/**
	 * 获取Map单例实例
	 */
	public static getInstance(config?: MapConfig): Map {
		if (!MapManager.mapInstance) {
			if (!config) {
				throw new Error('首次创建Map实例时必须提供配置参数');
			}
			MapManager.mapInstance = MapManager.createMap(config);
			MapManager.isInitialized = true;
		}
		return MapManager.mapInstance;
	}

	/**
	 * 创建Map实例
	 */
	private static createMap(config: MapConfig): Map {
		// 创建底图图层
		const rasterLayer = new TileLayer({
			source: new OSM(),
			preload: Infinity
		});

		// 创建地图实例
		const map = new Map({
			layers: [rasterLayer],
			target: config.target,
			view: new View({
				center: fromLonLat(config.center || [120, 30]),
				zoom: config.zoom || 8,
				maxZoom: config.maxZoom || 18,
				minZoom: config.minZoom || 2,
				constrainResolution: true
			})
		});

		return map;
	}

	/**
	 * 检查Map是否已初始化
	 */
	public static isInstanceInitialized(): boolean {
		return MapManager.isInitialized && MapManager.mapInstance !== null;
	}

	/**
	 * 更新地图目标容器
	 */
	public static updateTarget(target: HTMLElement | string): void {
		if (MapManager.mapInstance) {
			MapManager.mapInstance.setTarget(target);
		}
	}

	/**
	 * 更新地图视图配置
	 */
	public static updateView(config: Partial<Pick<MapConfig, 'center' | 'zoom' | 'maxZoom' | 'minZoom'>>): void {
		if (!MapManager.mapInstance) return;

		const view = MapManager.mapInstance.getView();

		if (config.center) {
			view.setCenter(fromLonLat(config.center));
		}
		if (config.zoom !== undefined) {
			view.setZoom(config.zoom);
		}
		if (config.maxZoom !== undefined) {
			view.setMaxZoom(config.maxZoom);
		}
		if (config.minZoom !== undefined) {
			view.setMinZoom(config.minZoom);
		}
	}

	/**
	 * 重新配置Map实例
	 */
	public static reconfigure(config: MapConfig): Map {
		MapManager.destroyInstance();
		return MapManager.getInstance(config);
	}

	/**
	 * 销毁Map实例
	 */
	public static destroyInstance(): void {
		if (MapManager.mapInstance) {
			MapManager.mapInstance.dispose();
			MapManager.mapInstance = null;
			MapManager.isInitialized = false;
		}
	}

	/**
	 * 获取当前地图视图信息
	 */
	public static getViewInfo(): { center: number[]; zoom: number } | null {
		if (!MapManager.mapInstance) return null;

		const view = MapManager.mapInstance.getView();
		return {
			center: view.getCenter() || [0, 0],
			zoom: view.getZoom() || 0
		};
	}

	/**
	 * 添加地图事件监听
	 */
	public static addEventListener(type: string, listener: (event: any) => void): void {
		if (MapManager.mapInstance) {
			MapManager.mapInstance.on(type as EventTypes, listener);
		}
	}

	/**
	 * 移除地图事件监听
	 */
	public static removeEventListener(type: string, listener: (event: any) => void): void {
		if (MapManager.mapInstance) {
			MapManager.mapInstance.un(type as EventTypes, listener);
		}
	}
}
