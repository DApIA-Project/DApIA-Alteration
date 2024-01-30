import { Parameters, Action } from '@smartesting/alteration-scenario/dist/types'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import IAlterationManager from './IAlterationManager'
import { 
	parse, Engine,
	Action as EngineAction,
	alteration, AlterationMode,
	deletion,
	replay,
	Scope, and, target, timeWindow,
} from "../../../alteration-ts/src"

export class TypescriptAlterationManager implements IAlterationManager {

	runAlterations(
		parameters: Parameters[],
		recording: Recording,
		optionsAlteration: OptionsAlteration,
		recordingToReplay?: Recording,
	): Promise<Recording[]>
	{

		// Parse Recording 
		const source_recording = parse(recording.content);

		// Create Engines (only for the first sensor of the first param)
		let sensor = parameters[0].sensors.sensor?.at(0) 
		let start_date = sensor?.firstDate ?? 0;

		let engine = new Engine({
			actions: sensor?.action?.map((a) => this.create_action(a, start_date)) ?? []
		});
	
		let name = "modified__" + recording.name.split(".")[0] + "_0.sbs"

		return new Promise((resolve) => resolve([{ 
			name: name,
			content: engine.run(source_recording).to_string() 
		}]));
	}



	/**
	 * @param action: Action the information of action
	 * @param start_date: timestamp of the first message
	 * @return an Action for Engine, i.e a function with processing()
	 */ 
	create_action(action: Action, start_date: number) : EngineAction {
		// Create Scope 
		let scopes : Scope[] = [];

		// Add target only if not "ALL" is targeted
		if(action.parameters.target.value != "ALL"){
			scopes.push(target(action.parameters.target.value))
		}

		// Add other scopes
		switch(action.scope.type) {
			case 'timeWindow' : 
				scopes.push(timeWindow(start_date + parseInt(action.scope.lowerBound ?? "0"),
													     start_date + parseInt(action.scope.upperBound ?? "0")));
				break;
			case 'trigger' : 
				throw new Error("Trigger Scope was not implemented yet");
				break;
		}
		let scope = and(...scopes);

		// Create action processor
		switch(action.alterationType) {
			case 'ALTERATION' : 
				let modifications = action.parameters.parameter?.map((arg) => {
					if(!arg.key || !arg.value || !arg.mode) throw new Error("Invalid parameters");
					let value = (arg.mode != "simple" ? parseInt(arg.value) : arg.value);

					return {
						property: arg.key,
						value: value,
						mode: <AlterationMode> (arg.mode == "simple" ? "replace" : arg.mode)
					}});

				return alteration({
					scope: scope, 
					modifications: modifications ?? [], // Could be undefined
				});

			case 'DELETION' : 
				let frequency = action.parameters.parameter?.find((arg) => arg.frequency != undefined);
				return deletion({
					scope: scope,
					frequency: frequency,
				});

			case 'REPLAY' : 
				if(!action.parameters.recordPath) throw new Error("Invalid parameters for DELETION engine");
				let source = action.parameters.recordPath! // Couldn't be undefined
				
				// In old java code, lowerbound of the time windows is used as offset
				let offset  = action.scope.lowerBound ?? 0;

				// Add Alterations 
				let alterations = action.parameters.parameter?.map((arg) => {
					if(!arg.key || !arg.value || !arg.mode) return null;
					let value = (arg.mode != "simple" ? parseInt(arg.value) : arg.value);

					return {
						property: arg.key,
						value: value,
						mode: <AlterationMode> (arg.mode == "simple" ? "replace" : arg.mode)
					}}).filter((alt) => alt != null);

				return replay({
					scope: scope,
					source: source,
					offset: offset,
					alterations: alterations,
				});

			default: 
				throw new Error("This alteration mode isn't supported yet");
		}
	}

}
