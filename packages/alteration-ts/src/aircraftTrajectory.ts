import { createInterpolatorWithFallback, UniFunction } from "commons-math-interpolation";
import { Message } from "./index"
import { Angle, Earth, Position } from "./utils/earth";

const NAUTICAL_MILE_METER = 1852.0;
const  MPS_TO_KNOTS = (3600.0 / NAUTICAL_MILE_METER);

export type Point = {
	latitude: number,
	longitude: number,
	altitude: number,
	timestampGenerated: number,
}

type Delta = {
	track: number,
	groundSpeed: number, 
	verticalRate: number,
}

export class AircraftBuilder {
	waypoint: Point[];
	sorted: boolean;

	constructor(){
		this.waypoint = [];
		this.sorted = true;
	}

	add_point(point?: Point): AircraftBuilder {
		if(point) this.waypoint.push(point);
		return this;
	}

	add_all(points: Point[]): AircraftBuilder {
		for(let p of points) {
			this.add_point(p);
		}
		return this;
	}

	interpolate(): AircraftInterpolation {
		this.waypoint.sort((a, b) => a.timestampGenerated - b.timestampGenerated);
		let times = this.waypoint.map((point) => point.timestampGenerated);

		return new AircraftInterpolation(
			createInterpolatorWithFallback("akima", times, this.waypoint.map((p) => p.latitude)),
			createInterpolatorWithFallback("akima", times, this.waypoint.map((p) => p.longitude)),
			createInterpolatorWithFallback("akima", times, this.waypoint.map((p) => p.altitude))
		)
	}

	static to_waypoint(msg: Message): Point | undefined {
		if(!(msg.latitude && msg.longitude && msg.altitude)) {
			return undefined;
		}
		return msg as Point;
	}
}


export class AircraftInterpolation {
	latitude: UniFunction
	longitude: UniFunction 
	altitude: UniFunction


	constructor(latitude: UniFunction, longitude: UniFunction, altitude: UniFunction) {
		this.latitude = latitude;
		this.longitude = longitude;
		this.altitude = altitude;
	}

	get_point(time: number) {

		return { 
			latitude: this.latitude(time),
			longitude: this.longitude(time),
			altitude: this.get_altitude(time),
			track: this.get_track(time),
			groundSpeed: this.get_groundSpeed(time),
			verticalRate: this.get_verticalRate(time),
			timestampGenerated: time,
			timestampLogged: time,
		}	
	}

	get_altitude(time: number): number {
		return 25 * Math.round(this.altitude(time) / 25);
	}

	get_track(time: number): number {
		let delta = 500; // ms
		let [lat1, lon1] = [this.latitude(time - delta), this.longitude(time - delta)];
		let [lat2, lon2] = [this.latitude(time + delta), this.longitude(time + delta)];

		let p: Position = [Angle.degree(lat1), Angle.degree(lon1)];
		let q: Position = [Angle.degree(lat2), Angle.degree(lon2)];

		return (Earth.azimuth(p,q).deg + 360) % 360;
	}

	get_verticalRate(time: number): number {
		let delta = 30000; // ms
		let alt1 = this.get_altitude(time - delta);
		let alt2 = this.get_altitude(time + delta);

		let seconds = (delta * 2) / 1000;
		let value = ((alt2 - alt1) / seconds) * 60;

		return 64 * Math.round(value / 64);
	}

	get_groundSpeed(time: number): number {
		const delta = 500; // ms
		const [lat1, lon1] = [this.latitude(time - delta), this.longitude(time - delta)];
		const [lat2, lon2] = [this.latitude(time + delta), this.longitude(time + delta)];

		const p: Position = [Angle.degree(lat1), Angle.degree(lon1)];
		const q: Position = [Angle.degree(lat2), Angle.degree(lon2)];

		const distance = Earth.distance_meters(p,q);
		const speed = distance / ((delta * 2) / 1.0e3); // m/s
		return speed * MPS_TO_KNOTS;

	}
}
