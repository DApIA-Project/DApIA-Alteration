import { Parameters, Action } from '@smartesting/alteration-scenario/dist/types'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import IAlterationManager from './IAlterationManager'
import { 
	parse, Engine, Message,
	Action as EngineAction,
	alteration, AlterationMode, 
	delay,
	deletion,
	replay,
	rotation,
	saturation,
	cut,
	trajectoryModification,
	Scope, and, target, timeWindow, always
} from "../../../alteration-ts/src"

export class TypescriptAlterationManager implements IAlterationManager {
	replayRecording?: Message[]

	runAlterations(
		parameters: Parameters[],
		recording: Recording,
		optionsAlteration: OptionsAlteration,
		recordingToReplay?: Recording,
	): Promise<Recording[]>
	{

		// Parse Recording 
		const source_recording = parse(recording.content);
		if(recordingToReplay) this.replayRecording = parse(recordingToReplay!.content)

		// Create Engines (only for the first sensor of the first param)
		return new Promise((resolve) => resolve(parameters.map((param,i) => {
			let sensor = param.sensors.sensor?.at(0) 
			let start_date = sensor?.firstDate ?? 0;

			let engine = new Engine({
				actions: sensor?.action?.map((a) => this.create_action(a, start_date, source_recording)) ?? []
			});

			let name = "modified__" + recording.name.split(".")[0] + "_"+i+".sbs"

			return {name: name, content: engine.run(source_recording).to_string()};
		})));
	}



	/**
	 * @param action: Action the information of action
	 * @param start_date: timestamp of the first message
	 * @param source : recording, when it's needed in preprocessing (like saturation engine)
	 * @return an Action for Engine, i.e a function with processing()
	 */ 
	create_action(action: Action, start_date: number, source_recording: Message[]) : EngineAction {
		// Create Scope 
		let scopes : Scope[] = [];

		// Add target only if not "ALL" is targeted
		if(action.parameters.target.value != "ALL"){
			scopes.push(target(action.parameters.target.value))
		}

		let start = start_date + parseInt(action.scope.lowerBound ?? "0");
		let end = start_date + parseInt(action.scope.upperBound ?? "0");

		// Add other scopes
		switch(action.scope.type) {
			case 'timeWindow' : 
				scopes.push(timeWindow(start,end));
				break;
			case 'trigger' : 
				throw new Error("Trigger Scope was not implemented yet");
				break;
		}
		let scope = and(...scopes);

		// Create action processor
		switch(action.alterationType) {
			case 'ALTERATION' :  {
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
			}

			case 'DELETION' :  {
				let frequency_parameter = action.parameters.parameter?.find((arg) => arg.frequency != undefined);
				let frequency = 0;
				if(frequency_parameter) {
					frequency = parseInt(frequency_parameter!.frequency!)
				}

				return deletion({
					scope: scope,
					frequency: frequency,
				});
			}

			case 'ROTATION' : {
				let angle_parameter = action.parameters.parameter?.find((arg) => arg.angle != undefined);

				let angle = 0;
				if(angle_parameter != undefined){
					angle = parseInt(angle_parameter!.angle!);
				}

				return rotation({
					scope: scope,
					angle: angle,
				});
			}

			case 'REPLAY' : {
				if(!action.parameters.recordPath) throw new Error("Invalid parameters for DELETION engine");
				let source = this.replayRecording!;
				let first_ts = source[0].timestampGenerated;
				//let time_scope = timeWindow(first_ts + start - start_date, first_ts + end - start_date);
				let time_scope = timeWindow(start, end);

				// In old java code, lowerbound of the time windows is used as offset
				//let offset  = parseInt(action.scope.lowerBound ?? "0") ;
				let offset = start - first_ts;

				// Add Alterations 
				let alterations = action.parameters.parameter?.map((arg) => {
					if(!arg.key || !arg.value || !arg.mode) return null;
					let value = (arg.mode != "simple" ? parseFloat(arg.value) : arg.value);

					return {
						property: arg.key,
						value: value,
						mode: <AlterationMode> (arg.mode == "simple" ? "replace" : arg.mode)
					}}).filter((alt) => alt != null)
						 .map((alt) => alt!); // Remove null from type

				return replay({
					scope: and(time_scope, ...scopes.slice(1)),
					source: source,
					offset: offset,
					alterations: alterations
				});
			}

			case 'SATURATION' :  {
				let aircraft_number = action.parameters.parameter?.find((p) => p.key == "AIRCRAFT_NUMBER")?.number;

			 	if(!aircraft_number) {
					throw new Error("Saturation Engine Error : \"AIRCRAFT_NUMBER\" parameter is not defined"); 
				}

				let icao = action.parameters.parameter?.find((p) => p.key == "ICAO")?.value?.toLowerCase();



				return saturation({
					scope: scope,
					aircrafts: parseInt(aircraft_number!),
					angleMax: 30,
				});
			}

			case 'TRAJECTORY' : {
				let target = action.parameters.target.value;

				if(!action.parameters.trajectory) throw new Error("Trajectory modification requires waypoints parameters");

				let waypoints = action.parameters.trajectory!.waypoint.map((p) => {
					return {
						latitude: parseFloat(p.vertex.lat.value), 
						longitude: parseFloat(p.vertex.lon.value),
						altitude: p.altitude.value, 
						timestampGenerated: p.time + start_date,
					};
				});

				return trajectoryModification({
					targets: [target], 
					scope: scope, 
					waypoints: waypoints,
					allPlanes: target == "ALL",
				});
			}

			case 'CUT' : {
				let icao = action.parameters.target.value;

				// Cut use timeWindow to know the time to remove,
				// Not to target planes
				return cut({
					start: start,
					end: end, 
					scope: (icao == "ALL" ? always : target(icao))
				});
			}

			case 'ALTERATIONTIMESTAMP' :  {
				let time = action.parameters.parameter?.find((p) => p.key == "timestamp")?.value!;
				return delay({
					scope: scope,
					time: parseInt(time),
				});
			}
				
//			case 'CREATION' :  {
//
//			}
//
			default: 
				throw new Error("This alteration mode isn't supported yet");
		}
	}

}
