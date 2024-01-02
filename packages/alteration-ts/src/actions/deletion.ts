
import { Scope, Message } from "../types"

type Config = {
	scope: Scope,
	frequency?: number
}

export function deletion(config: Config) {
	if(!config.frequency || config.frequency < 0) config.frequency = 0;

	return {
		processing: function(recording: Message[]): Message[] {
			if(config.frequency! == 0) {
				// Delete all targeted messgae = keep not targeted message
				return recording.filter((msg) => !config.scope(msg));
			}

			let result: Message[] = [];
			let counter = 0;

			for(let msg of recording) {
				if(config.scope(msg)) {
					if(counter % (config.frequency! + 1) == 0) {
						result.push(msg);
					}
					counter++;
				}
			}

			return result;
		}
	}
}
