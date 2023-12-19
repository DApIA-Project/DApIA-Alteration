

/** Utils and **/
export type Icao = string;

export function notEmpty<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

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
