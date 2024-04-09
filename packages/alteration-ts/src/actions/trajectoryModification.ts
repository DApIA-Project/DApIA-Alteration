import { Scope, Message } from "../index"
import { createInterpolatorWithFallback } from "commons-math-interpolation";
import { Point, AircraftBuilder, AircraftInterpolation } from "../aircraftTrajectory"

type Config = {
	targets: string[], 
	scope: Scope,
	waypoints : Point[],
	allPlanes?: boolean
}

export function trajectoryModification(config: Config) {
	return {
		processing(recording: Message[]): Message[] {
			let interpolators = this.compute_interpolations(recording);
			
			let new_msg: Message[] = [];
			for(let m of recording) {
				if(config.scope(m)){
					let t = m.timestampGenerated;
					let p = interpolators[m.hexIdent].get_point(t);
					new_msg.push({
						...m, 
						...p,
					})
				} else { 
					new_msg.push({...m});
				}
			}

			return new_msg;
		},


		compute_interpolations(recording: Message[]) {
			let trajectory = new Map<string, AircraftBuilder>();
			let updated: Record<string, boolean> = {};

			for(let m of recording){
				if(config.allPlanes || config.targets.includes(m.hexIdent)) {
					if(!trajectory.has(m.hexIdent)) {
						trajectory.set(m.hexIdent, new AircraftBuilder());
					}

					if(!config.scope(m)){
						trajectory.get(m.hexIdent)!.add_point(m as Point);

					}else if(!updated[m.hexIdent]) {
						for(let w of config.waypoints){
							trajectory.get(m.hexIdent)!.add_point(w);
						}
						updated[m.hexIdent] = true;
					}
				}
			}

			let interpolators: Record<string, AircraftInterpolation> = {};
			trajectory.forEach((builder, icao) => interpolators[icao] = builder.interpolate());
			return interpolators;
		}
	}
}
