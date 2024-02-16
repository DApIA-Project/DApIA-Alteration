import { Scope, Message } from "../index"
import { createInterpolatorWithFallback } from "commons-math-interpolation";
import { Point, AircraftBuilder } from "../aircraftTrajectory"

type Config = {
	target: string, 
	scope: Scope,
	waypoints : Point[]
}

export function trajectoryModification(config: Config) {
	return {
		processing(recording: Message[]): Message[] {
			let interpolator = this.compute_interpolation(recording);
			
			let new_msg: Message[] = [];
			for(let m of recording) {
				if(config.scope(m)){
					console.log("Message is in scope : interpolation !");
					let t = m.timestampGenerated;
					let p = interpolator.get_point(t);
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


		compute_interpolation(recording: Message[]) {
			let trajectory = new AircraftBuilder();
			let updated = false;
			for(let m of recording){
				if(m.hexIdent == config.target) {
					if(!config.scope(m)){
						trajectory.add_point(m as Point);
					}else if(!updated) {
						for(let w of config.waypoints){
							trajectory.add_point(w);
						}
						updated = true;
					}
				}
			}

			return trajectory.interpolate();
		}
	}
}
