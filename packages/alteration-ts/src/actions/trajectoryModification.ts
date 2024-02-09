import { Scope, Message } from "../index"
import { createInterpolatorWithFallback } from "commons-math-interpolation";

type Point = {
	latitude: number, 
	longitude: number,
	altitude: number,
	timestampGenerated: number,
}

type Config = {
	target: string, 
	scope: Scope,
	waypoints : Point[]
}

export function trajectoryModification(config: Config) {
	return {
		processing(recording: Message[]): Message[] {
			let [lat,lon,alt] = this.compute_interpolation(recording);
			
			let new_msg: Message[] = [];
			for(let m of recording) {
				if(config.scope(m)){
					let t = m.timestampGenerated
					new_msg.push({
						...m, 
						latitude: lat(t),
						longitude: lon(t),
						altitude:  alt(t),
					})
				} else { 
					new_msg.push({...m});
				}
			}

			return new_msg;
		},


		compute_interpolation(recording: Message[]) {
			let points: Partial<Point>[] = []; // Partial<Point> to be compatible with Message fields that's should be undefined
			let updated = false;
			for(let m of recording){
				if(m.hexIdent == config.target) {
					if(!config.scope(m)){
						points.push(m);
					}else if(!updated) {
						for(let w of config.waypoints){
							points.push(w);
						}
						updated = true;
					}
				}
			}

			let times = points.map((m) => m.timestampGenerated!);

			return [ 
				createInterpolatorWithFallback("akima", times, points.map((m) => m.latitude!)),
				createInterpolatorWithFallback("akima", times, points.map((m) => m.longitude!)),
				createInterpolatorWithFallback("akima", times, points.map((m) => m.altitude!)),
			];
		}
	}
}
