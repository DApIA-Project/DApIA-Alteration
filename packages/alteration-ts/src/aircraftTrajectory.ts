import { createInterpolatorWithFallback, UniFunction } from "commons-math-interpolation";
import { earth_distance, earth_azimuth } from "./index"

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

	add_point(point: Point): AircraftBuilder {
		this.waypoint.push(point);
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

		return earth_azimuth(lat1,lon1, lat2,lon2);
	}

	get_verticalRate(time: number): number {
		let delta = 30000; // ms
		let alt1 = this.get_altitude(time - delta);
		let alt2 = this.get_altitude(time + delta);


		let seconds = (delta * 2) / 1000;
		let value = ((alt2 - alt1) / seconds) * 60;
		console.log([alt1, alt2, seconds ]);

		return 64 * Math.round(value / 64);
	}

	get_groundSpeed(time: number): number {
		let delta = 500; // ms
		let [lat1, lon1] = [this.latitude(time - delta), this.longitude(time - delta)];
		let [lat2, lon2] = [this.latitude(time + delta), this.longitude(time + delta)];

		const distance = earth_distance(lat1,lon1, lat2,lon2);
		const speed = distance / ((delta * 2) / 1.0e3); // m/s
		return speed * MPS_TO_KNOTS;

	}
}
