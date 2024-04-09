import { Scope, Message } from "../types"
import { AlterationMode, alteration } from "./alteration"
import { target, always } from "../scope"
import { clone } from "../index"

type AlterationConfig = {
	property: string, 
	value: string | number | boolean,
	mode: AlterationMode,	
}

/**
 * Config for a replay alteration
 * @param scope : a Scope function, to know if source message are marked to replay
 * @param source a recording to replay, a message of the recording is replayed iff the scope target it
 * @param alterations : a list of modifications to compute on each replayed message (see 'actions/alteration.ts')
 * @param offset : a number in millisecond to add to timestamp of replayed messages
 */ 
type Config = {
	scope: Scope,
	source: readonly Message[],
	alterations? : readonly AlterationConfig[],
	offset?: number,
}
export function replay(config: Config) {
	const offset = config.offset ?? 0;

	/* Pre-processing */
	let marked = config.source.filter(config.scope);

	return {
		processing: function(recording: readonly Message[]): Message[] {
			let new_recording = clone(recording);
			let extracted = clone(marked);

			if(extracted.length == 0) return new_recording;

			// Adjust timestamp
			const first = recording[0];
			const first_rep = config.source[0];
			extracted.forEach((msg : Message) => {
			 	msg.timestampGenerated = first.timestampGenerated + msg.timestampGenerated - first_rep.timestampGenerated + offset;
				msg.timestampLogged = first.timestampLogged + msg.timestampLogged - first_rep.timestampLogged + offset;
			});


			// Apply alteration 
			if(config.alterations) {
				extracted = alteration({
					scope: always,
					modifications: config.alterations
				}).processing(extracted);
			}

			new_recording.push(...extracted);
			new_recording.sort((a: Message, b: Message) => Math.sign(a.timestampGenerated - b.timestampGenerated));

			return new_recording;
		}
	}
}
