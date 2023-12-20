import {Scope, Icao, Action, Message} from "../types"


export enum AlterationMode {
	REPLACE,
	OFFSET,
	NOISE,
	DRIFT,
}


export function alteration(config : {
	scope: Scope,
	property: string, 
	value: string | number | boolean,
	mode: AlterationMode
}) {
	return {
		processing: function(recording: Message[]): Message[] {
			return recording.map((msg, idx) => 
													 (config.scope(msg) ? this.apply(msg,idx) : msg));
		},

		//TODO: as number ne permet pas de crash si le type n'est pas bon :C 
		apply: function(msg: Message, idx: number): Message {
			let new_msg = msg;

			switch (config.mode) {
				case AlterationMode.REPLACE : 
					new_msg[config.property] = config.value;
					break;
				case AlterationMode.OFFSET : 
					(new_msg[config.property] as number) += config.value as number;
					break;
				case AlterationMode.NOISE : 
					(new_msg[config.property] as number) += rand(0, config.value as number);
					break;
				case AlterationMode.DRIFT : 
					(new_msg[config.property] as number) += idx * (config.value as number);
					break;
			}

			return new_msg;
		}
	};
}


function rand(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

