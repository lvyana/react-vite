import { DragPolygons } from './dragPolygons';
import { MapInit } from './map';
import { Polygons } from './polygons';
import { MapConfig } from './mapManager';
import { Ship } from './ship';
import { Line } from './line';
import { DragLine } from './dragLine';
import { WeatherVisualization } from './weather';

export class Map extends MapInit {
	public dragPolygons: DragPolygons;
	public polygons: Polygons;
	public ship: Ship;
	public line: Line;
	public dragLine: DragLine;
	public weather: WeatherVisualization;

	constructor(config: MapConfig) {
		super(config);
		this.dragPolygons = new DragPolygons(config);
		this.polygons = new Polygons(config);
		this.ship = new Ship(config);
		this.line = new Line(config);
		this.dragLine = new DragLine(config);
		this.weather = new WeatherVisualization(config);
	}
}
