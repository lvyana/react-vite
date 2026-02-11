import VectorSource from 'ol/source/Vector';
import { MapInit } from './map';
import VectorLayer from 'ol/layer/Vector';
import { LineString } from 'ol/geom';
import { Feature } from 'ol';
import { Stroke, Style } from 'ol/style';

export class Line extends MapInit {
	private lineSource: VectorSource;
	private lineLayer: VectorLayer<VectorSource>;

	constructor(config: any) {
		super(config);
		this.lineSource = new VectorSource();
		this.lineLayer = new VectorLayer({
			source: this.lineSource,
			style: new Style({
				stroke: new Stroke({
					color: 'rgba(59, 130, 246, 0.7)',
					width: 2,
					lineDash: [5, 10]
				})
			}),
			zIndex: 2
		});
		this.getMap().addLayer(this.lineLayer);
	}

	// 添加线要素
	public addLine(geometry: LineString): void {
		const feature = new Feature({
			geometry: geometry
		});
		this.lineSource.addFeature(feature);
	}

	// 清除所有线要素
	public clearLines(): void {
		this.getMap().removeLayer(this.lineLayer);
	}
}
