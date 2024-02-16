import { Message } from "."


export type TemplateMessage = Omit<Message, "timestampGenerated" | "timestampLogged"> | 
						  				 				Partial<Pick<Message, "timestampGenerated" | "timestampLogged">>
export class Template {
	static random(): TemplateMessage {
		return {
			messageType:					"MSG",
			transmissionType: 		3,
			sessionID: 						Math.floor(Math.random() * 1000),
			aircraftID: 					Math.floor(Math.random() * 1000),
			hexIdent:							("000000" + Math.floor(Math.random() * 0xFFFFF).toString(16)).substr(-6),
			flightID: 						Math.floor(Math.random() * 1000),
		}
	}
}
