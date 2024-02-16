import { Scope, Message, Action, clone} from "../index"
import { Point, AircraftBuilder } from "../aircraftTrajectory"

type Config = {
	start: number, 
	end: number,
	template: Partial<Message>,
	waypoints : Point[],
}

function rand(min: number, max: number) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


/**
 * Create a new aircraft and insert it in the given recording
 * The aircraft have the properties contained in `template` message
 * The trajectory of the aircraft is defined by the waypoins
 *
 * The template message SHOULD define mandatory field (messageType, flightID, ...)
 */
export function creation(config: Config): Action {
	// Create the interpolation function
	let trajectory = new AircraftBuilder()
											.add_all(config.waypoints)
											.interpolate();

	return {
		processing(recording: Message[]): Message[] {
			let new_recording = clone(recording);

			let time = config.start;
			while(time <= config.end) {
				let point = trajectory.get_point(time);
				let msg = {
					...config.template as Message,
					...point,
					messageType : "MSG"
				};
				new_recording.push(msg);

				time += rand(200, 400);
			}

			return new_recording.sort((a,b) => a.timestampGenerated - b.timestampGenerated);
		}
	}
}
