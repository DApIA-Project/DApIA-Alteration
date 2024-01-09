import {Scope, Icao, Action, Message, XOR} from "../types"


export enum AlterationMode {
	REPLACE,
	OFFSET,
	NOISE,
	DRIFT,
}

type Modification = {
	property: string, 
	value: string | number | boolean,
	mode: AlterationMode,
}

type Config_1 = {
	scope: Scope,
	property: string, 
	value: string | number | boolean,
	mode: AlterationMode,
}


type Config_2 = { scope: Scope, modifications: readonly Modification[] }

export function alteration(config: XOR<Config_1, Config_2>) {
	const mods: Modification[] = "modifications" in config ?
		[...config.modifications!] : 
		[{property: config.property, value: config.value, mode: config.mode}];

	return {
		processing: function(recording: Message[]): Message[] {
			return recording.map((msg, idx) => 
													 (config.scope(msg) ? this.apply(msg,idx) : msg));
		},

		apply: function(msg: Message, idx: number): Message {
			let new_msg = {...msg};

			for(let mod of mods) {
				const {property, value, mode} = mod;

				if(mode != AlterationMode.REPLACE && !msg[property]) {
					break;
				}

				switch (mode) {
					case AlterationMode.REPLACE : 
						new_msg[property] = value;
					break;
					case AlterationMode.OFFSET : 
						(new_msg[property] as number) += value as number;
					break;
					case AlterationMode.NOISE : 
						(new_msg[property] as number) += rand(0, value as number);
					break;
					case AlterationMode.DRIFT : 
						(new_msg[property] as number) += idx * (value as number);
					break;
				}
			}

			return new_msg;
		}
	};
}


function rand(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

