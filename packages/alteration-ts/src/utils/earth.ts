
/**
 * Geographical function, inspired by WorldWind : 
 * https://github.com/nasa/World-Wind-Java/tree/master/WorldWind/test/gov/nasa/worldwind/geom
 */ 

export let to_degree = (r: number) => (r * 180) / Math.PI;
export let to_radian = (d: number) => (d * Math.PI) / 180;

export class Angle {
	deg: number
	rad: number

	private constructor(){
		this.deg = this.rad = 0;
	}

	static degree(d: number): Angle {
		let a = new Angle();
		a.deg = d;
		a.rad = to_radian(d);

		return a;
	}

	static radian(r: number): Angle { 
		let a = new Angle();
		a.deg = to_degree(r);
		a.rad = r;

		return a;
	}
}

export type Position = [Angle, Angle];

/**
 * Return latitude (in degree) of a position (between -90° and 90°)
 */ 
export function lat(p: Position) {
	let lat = p[0].deg % 180;
	if(lat > 90) 	return Angle.degree(180 - lat);
	if(lat < -90) return Angle.degree(-180 - lat);
								return Angle.degree(lat);
}

/**
 * Return longitude (in degree) of a position (between -180° and 180)
 */ 
export function lon(p: Position) {
	let lon = p[1].deg % 180;
	if(lon > 180) 	return Angle.degree(lon - 360);
	if(lon < -180) 	return Angle.degree(360 + lon);
									return Angle.degree(lon);
}

export class Earth {
	static radius = 6371e3;

	/**
	 * Compute the arc distance (angle) from 'p' to 'q'
	 * Formula from https://geophydog.cool/post/geometry_on_a_sphere/
	 */ 
	static distance_arc(p: Position, q: Position): Angle {
		const phi1 = lat(p).rad;
		const phi2 = lat(q).rad;
		const delta_phi = phi2 - phi1;
		const delta_lambda = (lon(q).rad - lon(p).rad);

		const a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
			Math.cos(phi1) * Math.cos(phi2) * 
			Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		return Angle.radian(c);
	}

	/**
	 * Compute the distance between 'p' and 'q' in meters
	 */  
	static distance_meters(p: Position, q: Position): number {
		return this.radius * this.distance_arc(p,q).rad;
	}

	/**
	 * Compute the angle between 'p' and 'q'
	 * Formula from https://geophydog.cool/post/geometry_on_a_sphere/
	 */ 
	static azimuth(p: Position, q: Position): Angle {
		const phi1 = lat(p).rad;
		const phi2 = lat(q).rad;
		const delta_lambda = lon(q).rad - lon(p).rad

		const y = Math.sin(delta_lambda) * Math.cos(phi2);
		const x = Math.cos(phi1) * Math.sin(phi2) - 
			Math.sin(phi1) * Math.cos(phi2) * Math.cos(delta_lambda);
		const alpha = Math.atan2(y, x);

		return Angle.radian(alpha);
	}

	/**
	 * Compute the position after a travel of 'arc' distance from 'start' heading at 'azimuth' angle
	 * Equation from : "Map Projections - A Working Manual", page 31, equation 5-5 and 5-6. [ https://pubs.usgs.gov/pp/1395/report.pdf ]
	 */  
	static end_position(p: Position, azimuth: Angle, arc: Angle): Position {
		// Convert degree to radians
		const phi1 = lat(p).rad;
		const lambda1 = lon(p).rad;
		const az = azimuth.rad;
		const c = arc.rad;

		// Equation 5-5 p.31
		const phi = Math.asin(Math.sin(phi1) * Math.cos(c) + 
													Math.cos(phi1) * Math.sin(c) * Math.cos(az));

		// Equation 5-6, p.31
		const lambda = lambda1 + Math.atan2(Math.sin(c) * Math.sin(az),
																				Math.cos(phi1) * Math.cos(c) - Math.sin(phi1) * Math.sin(c) * Math.cos(az));


		return [Angle.radian(phi), Angle.radian(lambda)];
	}


}
