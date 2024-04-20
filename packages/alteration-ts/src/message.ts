
import  { Message, notEmpty } from './types'

export function parse(recording: string): Message[] {
	return recording.split("\n")
									.filter((str) => str.length > 0) // remove blank lines
									.map(parseOne)
									.filter(notEmpty);
}

export function stringify(msg: Message): string {
	let result: string = "";

	for(let field in msg) {
		if(field == "timestampLogged" || field == "timestampGenerated") {
			let date = new Date(msg[field]);
			result += date.toISOString().split("T")[0].replaceAll("-", "/") + ",";
			result += date.toISOString().split("T")[1].slice(0, -1) + ",";
			continue;
		}

		if(typeof msg[field] == "boolean") {
			result += (msg[field] ? "1" : "0") + ",";
			continue;
		}

		if(msg[field] == undefined || msg[field] == null) {
			result += ',';
			continue;
		}

		if(field == "latitude" || field == "longitude"){
			result += msg[field]!.toFixed(5) + ","	;
			continue;
		}

		result += msg[field] + ",";
	}

	// Remove trailling coma
	return result.slice(0, -1);
}


function parseOne(msg: string) : Message | null {
	let fields = msg.split(',');
	let extra_fields = fields.length > 22 ? JSON.parse(fields.slice(22).join(",")) : {};

	return validate({
		messageType:					fields[0],
		transmissionType: 		parseInt(fields[1]),
		sessionID: 						parseInt(fields[2]),
		aircraftID: 					parseInt(fields[3]),
		hexIdent:							fields[4],
		flightID: 						parseInt(fields[5]),
		timestampGenerated:		Date.parse(fields[6]+','+fields[7]+"Z"),
		timestampLogged: 			Date.parse(fields[8]+','+fields[9]+"Z"),
		callsign: 						(fields[10] != '' ? fields[10] : undefined),
		altitude: 						parseOrNull(fields[11]),
		groundSpeed: 					parseOrNull(fields[12]),
		track: 								parseOrNull(fields[13]),
		latitude: 						parseOrNull(fields[14]),
		longitude: 						parseOrNull(fields[15]),
		verticalRate: 				parseOrNull(fields[16]),
		squawk: 							parseOrNull(fields[17]),
		alert: 								(fields[18] ? fields[18] == '1' : undefined),
		emergency: 						(fields[19] ? fields[19] == '1' : undefined),
		spi: 									(fields[20] ? fields[20] == '1' : undefined),
		onGround: 						(fields[21] ? fields[21] == '1' : undefined),

		...extra_fields,
	});
}

function validate(msg: Message): Message | null {
	if( isNaN(msg.transmissionType)
	 || isNaN(msg.sessionID)
	 || isNaN(msg.aircraftID)
	 || msg.hexIdent.match(/[A-F0-9]{6}/i) == null
	 || isNaN(msg.flightID)
	 || isNaN(msg.timestampGenerated)
	 || isNaN(msg.timestampLogged)
	)
	{ return null; }

	return msg;
}

function parseOrNull(str : string) : number | undefined {
	let n = parseFloat(str);
	return isNaN(n) ? undefined : n;
}
