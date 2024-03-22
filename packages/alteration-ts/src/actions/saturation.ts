import { Message, Scope, AircraftBuilder, AircraftInterpolation, Template } from "../index"
import { Point as Waypoint } from "../aircraftTrajectory"

type Config = {
	source: Message[],
	aircrafts : number, // number of ghost aircrafts
	start : number,
	end: number,
	distanceMax?: [number, number] // max divergence distance
	angleMax?: [number, number], // max divergence angle
}


export function saturation(dir: Config) {
	if(dir.distanceMax == undefined) dir.distanceMax = [0,2];
	if(dir.angleMax == undefined) dir.angleMax = [0,360];

	// Pre processing => build ghost trajectory 
	let builders: AircraftBuilder [] = [];
	let start_date = dir.source[0].timestampGenerated;

	for(let i=0; i < dir.aircrafts; i++) {
		builders[i] = new AircraftBuilder();
		let angle = (Math.random() * (dir.angleMax![1] - dir.angleMax![0])) + dir.angleMax![0];
		let distance = (Math.random() * (dir.distanceMax![1] - dir.distanceMax![0])) + dir.distanceMax![0];

		for(let m of dir.source){
			if(!(m.latitude && m.longitude && m.altitude)) continue;

			if(m.timestampGenerated <= dir.end && m.timestampGenerated >= dir.start){
				// Position updated 
				let ts = m.timestampGenerated - start_date;
				let start_ts = dir.start - start_date;
				let pCoef = Math.min((ts - start_ts) / (dir.end - dir.start), 1)
				let step = pCoef * distance;
				
				builders[i].add_point({
					latitude : m.latitude! + step * Math.cos(angle),
					longitude: m.longitude! + step * Math.sin(angle),
					altitude : m.altitude!,
					timestampGenerated: m.timestampGenerated,
				});
			} else {
				// Position not updated
				builders[i].add_point(m as Waypoint);
			}
		}

		// Create interpolations functions for each ghost aircrafts
	}
	let trajs = builders.map((b) => b.interpolate());

	return {
		processing(recording: Message[]): Message[] {
			let new_recording = [];
			
			for(let m of recording){
				new_recording.push(m);
				trajs.map((ghost) => ghost.get_point(m.timestampGenerated))
						 .map((point) => new_recording.push(Template.replace(m, point)));
			}
			
			return new_recording;
		}
	}
}
