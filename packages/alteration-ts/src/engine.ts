import { Action, Message } from './types'
import { clone } from './index'
import { stringify } from './message'

type Config = {
	actions: Action[],
}

export class Engine {
	actions: Action[]

	constructor(config : Config) {
		this.actions = config.actions;
	}

	run(recording: Message[]): EngineResult {
		let result = this.actions.reduce((msgs, action) => action.processing(msgs), clone(recording));

		return new EngineResult(result);
	}
}

export class EngineResult {
	recording: Message[]

	constructor(recording: Message[]) {
		this.recording = recording;
	}

	get_recording(): Message[] {
		return this.recording
	}

	to_string(): string {
		let result = this.recording.reduce((res, msg) => res += stringify(msg) + "\n", "");

		return result;
	}
}
