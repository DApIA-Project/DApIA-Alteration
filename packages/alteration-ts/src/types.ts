

/** Utils and **/
export type Icao = string;

export function notEmpty<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

// Source : https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/** Message **/

export type Message = {
	[index: string] : string | number | boolean | undefined, 

	messageType: 				string, 
	transmissionType: 	number, 
	sessionID: 					number,
	aircraftID: 				number,
	hexIdent: 					string,
	flightID: 					number
	timestampGenerated:	number, 
	timestampLogged: 		number,
	callsign?: 					string,
	altitude?: 					number,
	groundSpeed?: 			number,
	track?: 						number,
	latitude?: 					number,
	longitude?: 				number,
	verticalRate?: 			number,
	squawk?: 						number,
	alert?: 						boolean, 
	emergency?: 				boolean, 
	spi?: 							boolean,
	onGround?: 					boolean,


}


export type Scope = (msg: Message) => boolean;


export type Action = {
	processing: (recording: Message[]) => Message[]
}
