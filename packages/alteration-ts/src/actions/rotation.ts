import { Scope, Message, Template } from "../index"
import { AircraftBuilder, Point, AircraftInterpolation } from "../aircraftTrajectory"
import { lat, lon, Angle, Earth, Position } from "../utils/earth"

type Config = {
	scope: Scope, 
	angle: number,
}

export function rotation(config: Config) {
	const angle = Angle.degree(config.angle);

	return {
		processing(recording: Message[]): Message[] {
			// Pre-processing
			let trajs: Record<string, AircraftBuilder> = {};
			let starts: Record<string, Message> = {};

			let positions = recording.filter((msg) => msg.latitude != undefined && msg.longitude != undefined);
			for(let m of positions) {
				if(trajs[m.hexIdent] == undefined)  trajs[m.hexIdent] = new AircraftBuilder();
				if(config.scope(m)) {
					if(starts[m.hexIdent] == undefined) starts[m.hexIdent] = m;

					let start = starts[m.hexIdent];
					let new_pos = this.compute_rotation(start, m, angle);
					//console.error(new_pos);
					let new_msg = { ...m, latitude: lat(new_pos).deg, longitude: lon(new_pos).deg };
					trajs[m.hexIdent].add_point(AircraftBuilder.to_waypoint(new_msg));

				} else { 
					trajs[m.hexIdent].add_point({...m as Point});
				}
			}


			let func : Record<string, AircraftInterpolation> = {};
			for(let k in trajs) {
				func[k] = trajs[k].interpolate();
			}

			// Processing : compute trajectory
			let new_recording: Message[] = [];
			for(let m of recording) {
				let p = func[m.hexIdent].get_point(m.timestampGenerated);
				//console.log("(" + m.latitude + "," +  m.longitude + ") : " +( m.latitude != undefined && m.longitude != undefined ? "true" : "false"));
				if(m.latitude != undefined && m.longitude != undefined) {
					//console.error("Message rotaté ("+m.latitude+","+m.longitude+")");
					let new_msg = Template.replace(m,p);
					//console.error(new_msg);
					//console.error(p);
					new_recording.push(new_msg);
				} else { 
					new_recording.push(m);
				}
			}
			return new_recording;
		},

		compute_rotation(start: Message, current: Message, angle: Angle): Position {
			let p: Position = [Angle.degree(start.latitude!), Angle.degree(start.longitude!)];
			let q: Position = [Angle.degree(current.latitude!), Angle.degree(current.longitude!)];

			let d = Earth.distance_arc(p, q);		
			let alpha = Angle.radian(angle.rad + Earth.azimuth(p,q).rad);
			return Earth.end_position(p, alpha, d);
		}
	}
}
