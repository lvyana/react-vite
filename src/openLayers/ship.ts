import VectorSource from 'ol/source/Vector';
import { MapInit } from './map';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { LineString, Point } from 'ol/geom';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style';

// 船舶数据接口
export interface ShipData {
	id: string;
	lon: number;
	lat: number;
	heading: number;
	speed: number;
	type: string;
	animationPhase?: number; // 动画阶段 0-3
	lastAnimationTime?: number; // 上次动画时间
}

export class Ship extends MapInit {
	private shipSource: VectorSource;
	// private routeSource: VectorSource;
	private animationId: number | null = null;

	private shipLayer: VectorLayer<VectorSource>;
	private ships: ShipData[] = [];
	private shipsVisible = true;

	constructor(config: any) {
		super(config);
		// 创建船舶数据源和图层
		this.shipSource = new VectorSource();
		this.shipLayer = new VectorLayer({
			source: this.shipSource,
			zIndex: 10,
			updateWhileAnimating: true,
			updateWhileInteracting: true
		});

		this.getMap().addLayer(this.shipLayer);
	}

	public startAnimation(): void {
		if (!this.animationId) {
			this.animateShips();
		}
	}

	// 船舶动画
	private animateShips = (): void => {
		const features = this.shipSource.getFeatures();

		features.forEach((feature, index) => {
			const point = feature.getGeometry() as Point;
			const coordinates = point.getCoordinates();

			const heading = parseFloat(feature.get('heading'));
			const speed = parseFloat(feature.get('speed'));

			const radHeading = (heading * Math.PI) / 180;
			const moveDistance = speed / 50000;

			const newCoordinates = [coordinates[0] + moveDistance * Math.sin(radHeading), coordinates[1] + moveDistance * Math.cos(radHeading)];

			point.setCoordinates(newCoordinates);

			// 边界处理
			const extent = this.getMap().getView().calculateExtent(this.getMap().getSize());
			if (newCoordinates[0] < extent[0]) newCoordinates[0] = extent[2];
			if (newCoordinates[0] > extent[2]) newCoordinates[0] = extent[0];
			if (newCoordinates[1] < extent[1]) newCoordinates[1] = extent[3];
			if (newCoordinates[1] > extent[3]) newCoordinates[1] = extent[1];

			// 更新船舶样式（用于圈圈动画）
			if (this.ships[index]) {
				const shipData = this.ships[index];
				const newStyles = this.createShipStyles(shipData);
				feature.setStyle(newStyles);
			}
		});

		this.animationId = requestAnimationFrame(this.animateShips);
	};

	public stopAnimation(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}
	}

	// 添加船舶到地图
	public addShipsToMap(ships: ShipData[]): void {
		this.shipSource.clear();

		ships.forEach((ship) => {
			const coordinates = fromLonLat([ship.lon, ship.lat]);

			// 创建船舶点要素
			const shipFeature = new Feature({
				geometry: new Point(coordinates),
				id: ship.id,
				type: ship.type,
				speed: ship.speed.toFixed(1),
				heading: ship.heading.toFixed(0)
			});

			// 创建样式
			const styles = this.createShipStyles(ship);
			shipFeature.setStyle(styles);
			this.shipSource.addFeature(shipFeature);

			// 添加航行路线
			const distance = 0.5;
			const radHeading = (ship.heading * Math.PI) / 180;
			const endLon = ship.lon + distance * Math.sin(radHeading);
			const endLat = ship.lat + distance * Math.cos(radHeading);
		});
	}
	public toggleShips(): void {
		this.shipsVisible = !this.shipsVisible;
		this.shipLayer.setVisible(this.shipsVisible);
	}

	public getShipsVisible(): boolean {
		return this.shipsVisible;
	}

	// 创建船舶样式
	private createShipStyles(ship: ShipData): Style[] {
		// 更新动画阶段
		this.updateAnimationPhase(ship);

		const currentTime = Date.now();
		const animationPhase = ship.animationPhase || 0;

		// 根据动画阶段决定圈的可见性（从内到外）
		const circle3Opacity = animationPhase >= 1 ? 1.0 : 0; // 内圈（18px）
		const circle2Opacity = animationPhase >= 2 ? 0.95 : 0; // 中圈（30px）
		const circle1Opacity = animationPhase >= 3 ? 0.9 : 0; // 外圈（45px）

		const circle1Style = new Style({
			image: new Circle({
				radius: 45,
				stroke: new Stroke({
					color: `rgba(59, 130, 246, ${circle1Opacity})`,
					width: 2,
					lineDash: [5, 5]
				})
			})
		});

		const circle2Style = new Style({
			image: new Circle({
				radius: 30,
				stroke: new Stroke({
					color: `rgba(59, 130, 246, ${circle2Opacity})`,
					width: 2,
					lineDash: [4, 4]
				})
			})
		});

		const circle3Style = new Style({
			image: new Circle({
				radius: 18,
				stroke: new Stroke({
					color: `rgba(59, 130, 246, ${circle3Opacity})`,
					width: 2,
					lineDash: [3, 3]
				})
			})
		});

		const mainStyle = new Style({
			image: new Circle({
				radius: 12,
				fill: new Fill({
					color: '#3b82f6'
				}),
				stroke: new Stroke({
					color: '#ffffff',
					width: 3
				})
			}),
			text: new Text({
				text: ship.type + '\n' + ship.speed.toFixed(1) + '节',
				font: 'bold 16px Arial',
				offsetY: 30,
				fill: new Fill({
					color: '#000000'
				}),
				stroke: new Stroke({
					color: '#ffffff',
					width: 3
				})
			})
		});

		return [circle1Style, circle2Style, circle3Style, mainStyle];
	}

	// 更新动画阶段
	private updateAnimationPhase(ship: ShipData): void {
		const currentTime = Date.now();
		const animationDuration = 2000; // 2秒完成一次循环
		const phaseTime = animationDuration / 4; // 每个阶段500毫秒

		if (!ship.lastAnimationTime) {
			ship.lastAnimationTime = currentTime;
			ship.animationPhase = 0;
		}

		const elapsed = currentTime - ship.lastAnimationTime;
		ship.animationPhase = Math.floor((elapsed % animationDuration) / phaseTime);
	}
}
