import { Scope, Message, op } from "../index"

type Config = {
	start: number, 
	end: number, 
	scope: Scope,
}


type Delta = {
	ts: number,
	lat: number,
	lon: number, 
	alti: number,
}

export function cut(config: Config) {
	return {
		processing(recording: Message[]): Message[] {

			let new_recording: Message[] = [];
			// General case
			let deltas: any = {};
			let no_shift = { ts: 0, lat: 0, lon: 0, alti: 0 };

			for(let m of recording) {
				if(!config.scope(m)) {
					new_recording.push({...m}); //Clone msg
					continue;
				}
				if(m.timestampGenerated < config.start) {
					new_recording.push({...m}); // Clone msg
					continue;
				}

				if(m.timestampGenerated >= config.end) {
					if(deltas[m.hexIdent] == undefined) {
						// Get the last added element with the same ICAO
						let last = recording.find((m) => m.timestampGenerated > config.start);

						if(last == undefined) { deltas[m.hexIdent] = no_shift }
						else { 
							deltas[m.hexIdent] = {
								ts: config.end - config.start,
								lat: m.latitude! - last.latitude!,
								lon: m.longitude! - last.longitude!,
								alti : m.altitude! - last.altitude!,
							}

							console.log(deltas);
						}	
					}

					let new_msg = this.compute_delta(m, deltas[m.hexIdent]);
					new_recording.push(new_msg);
				}
			}

			return new_recording;
		},

		compute_delta(m: Message, d: Delta): Message {
			let new_msg = {...m} // Clone msg
			
			new_msg.timestampGenerated -= d.ts;
			if(m.latitude && d.lat && !isNaN(d.lat)) {
				new_msg.latitude = op("-", m.latitude!, d.lat!);
			}
			if(m.longitude && d.lon && !isNaN(d.lon)){
				new_msg.longitude = op("-", new_msg.longitude!, d.lon!);
			}
			if(m.altitude && d.alti && !isNaN(d.alti)){
				new_msg.altitude = 	op("-", new_msg.altitude!, d.alti!);
			}

			return new_msg;
		}
	}
}
