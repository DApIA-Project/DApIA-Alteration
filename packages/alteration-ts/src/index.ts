export * from "./message"
export * from "./types"
export * from "./actions"
export * from "./scope"
export * from "./engine"
export * from "./aircraftTrajectory"
export * from "./utils"
export * from "./template"

import { Message } from './types'

export function clone(arr: readonly Message[]) {
	return arr.map((x: Message) => {return {...x}});
}

/**
 * Compute earth distance between two point in meter
 * to have meters we should multiply the angle distance by the radius of the globe
 * see : 
 * https://worldwind.arc.nasa.gov/java/v2.1.0/javadoc/gov/nasa/worldwind/geom/LatLon.html#greatCircleDistance-gov.nasa.worldwind.geom.LatLon-gov.nasa.worldwind.geom.LatLon-
 */ 
export function earth_distance(lat1: number, lon1: number, lat2: number, lon2: number){
	const R = 6371e3;
	return R * earth_distance_angle(lat1,lon1,lat2,lon2);
}

/**
 * Compute the arc distance (radian) between two points
 */
// Formula from https://geophydog.cool/post/geometry_on_a_sphere/
export function earth_distance_angle(lat1: number, lon1: number, lat2: number, lon2: number) {
	// Values are in radians
	const phi1 = lat1 * Math.PI/180; 
	const phi2 = lat2 * Math.PI/180;
	const delta_phi = (lat2 - lat1) * Math.PI/180;
	const delta_lambda = (lon2-lon1) * Math.PI/180;

	const a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
						Math.cos(phi1) * Math.cos(phi2) * 
						Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
	
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return c;
}

/**
 * Compute the angle (degree) between two point
 */ 
// Formula from https://geophydog.cool/post/geometry_on_a_sphere/
export function earth_azimuth(lat1: number, lon1: number, lat2: number, lon2: number) {
	const phi1 = lat1 * Math.PI/180;
	const phi2 = lat2 * Math.PI/180;
	const delta_lambda = (lon2 - lon1) * Math.PI/180;

	const y = Math.sin(delta_lambda) * Math.cos(phi2);
	const x = Math.cos(phi1) * Math.sin(phi2) - 
						Math.sin(phi1) * Math.cos(phi2) * Math.cos(delta_lambda);
	const alpha = Math.atan2(y, x);

	return (((alpha * 180 ) / Math.PI) + 360) % 360;
}

/**
 * Computes the location on a great circle arc with the given starting location, azimuth, and arc distance.
 * Function from : https://github.com/nasa/World-Wind-Java/blob/master/WorldWind/src/gov/nasa/worldwind/geom/LatLon.java
 * Equation from : "Map Projections - A Working Manual", page 31, equation 5-5 and 5-6. [ https://pubs.usgs.gov/pp/1395/report.pdf ]
 *
 * @param lat1,lon1 : start position (degree)
 * @param az: azimuth angle (clockwise from North) (radian)
 * @param c, arc distance to travel (radian)
 * @return [lat,lon] : end position in degree
 */ 

export function earth_end_position(lat1: number, lon1: number, az: number, c: number) {
	// Convert degree to radians
	const phi1 = lat1 * Math.PI/180;
	const lambda1 = lon1 * Math.PI/180;

	// Equation 5-5 p.31
	const phi = Math.asin(Math.sin(phi1) * Math.cos(c) + 
												Math.cos(phi1) * Math.sin(c) * Math.cos(az));
	
	// Equation 5-6, p.31
	const lambda = lambda1 + Math.atan2(Math.sin(c) * Math.sin(az),
																			Math.cos(phi1) * Math.cos(c) - Math.sin(phi1) * Math.sin(c) * Math.cos(az));

	return [
		(phi * 180) / Math.PI,
		(lambda * 180) / Math.PI
	]
}


/**
 * Operation with a fixed floating point number precission 
 * Default precision is 2 (3.1234567890001 => 0 3.12)
 */ 
type Op = "-" | "+" | "*" | "/" 
export function op(op: Op, lhs: number, rhs: number, n = 2) {
	let result: number;
	switch(op) {
		case "-": result = lhs - rhs; break;
		case "+": result = lhs + rhs; break;
		case "*": result = lhs * rhs; break;
		case "/": result = lhs / rhs; break;
	}

	return parseFloat(result.toPrecision(n));
}
