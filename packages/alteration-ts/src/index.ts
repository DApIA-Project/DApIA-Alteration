export * from "./message"
export * from "./types"
export * from "./actions"
export * from "./scope"
export * from "./engine"
export * from "./aircraftTrajectory"
export * from "./template"

import { Message } from './types'

export function clone(arr: readonly Message[]) {
	return arr.map((x: Message) => {return {...x}});
}

// Formula from https://geophydog.cool/post/geometry_on_a_sphere/
export function earth_distance(lat1: number, lon1: number, lat2: number, lon2: number){
	const R = 6371e3;
	// Values are in radians
	const phi1 = lat1 * Math.PI/180; 
	const phi2 = lat2 * Math.PI/180;
	const delta_phi = (lat2 - lat1) * Math.PI/180;
	const delta_lambda = (lon2-lon1) * Math.PI/180;

	const a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
						Math.cos(phi1) * Math.cos(phi2) * 
						Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
	
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return R * c;
}

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
