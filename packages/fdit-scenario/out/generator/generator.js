"use strict";
//import { CompositeGeneratorNode, NL, toString } from 'langium';
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const ast_1 = require("../language-server/generated/ast");
/*type FditscenarioGenEnv = Map<string,number>;

function evalExprWithEnv(e : ASTTimeScope, env: FditscenarioGenEnv) : number {
    return "";
}*/
/*export function generateCommands(scenario: ASTScenario, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.json`;

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    const result: (Object|undefined)[] = generateStatements(scenario);
    fs.writeFileSync(generatedFilePath, JSON.stringify(result, undefined, 2));
    return generatedFilePath;
}*/
function generateCommands(scenario) {
    return generateStatements(scenario);
}
exports.generateCommands = generateCommands;
/*function generateStatements2(instr: ASTInstruction[]): Object[] {
    //let env : DslGenEnv = new Map<string,number>();
    return instr.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Object[];
    
}*/
function generateStatements(scenar) {
    //let env : DslGenEnv = new Map<string,number>();
    return evalScenario(scenar);
}
function evalScenario(scenar) {
    if (scenar.declarations.length != 0) {
        return [{
                declarations: evalDeclarations(scenar.declarations),
                instructions: evalInstructions(scenar.instructions)
            }];
    }
    else {
        return [{
                instructions: evalInstructions(scenar.instructions)
            }];
    }
}
function evalDeclarations(decls) {
    return decls.flatMap(i => evalDecl(i)).filter(i => i !== undefined);
}
var ActionType;
(function (ActionType) {
    ActionType["deletion"] = "DELETION";
    ActionType["creation"] = "CREATION";
    ActionType["alteration"] = "ALTERATION";
    ActionType["saturation"] = "SATURATION";
    ActionType["duplication"] = "DUPLICATION";
    ActionType["rotation"] = "ROTATION";
    ActionType["custom"] = "CUSTOM";
    ActionType["replay"] = "REPLAY";
    ActionType["timestamp"] = "TIMESTAMP";
    ActionType["cut"] = "CUT";
    ActionType["speedAltaration"] = "SPEED_ALTERATION";
    ActionType["trajectory"] = "TRAJECTORY_MODIFICATION";
})(ActionType || (ActionType = {}));
var ParametreType;
(function (ParametreType) {
    ParametreType["altitude"] = "ALTITUDE";
    ParametreType["latitude"] = "LATITUDE";
    ParametreType["icao"] = "ICAO";
    ParametreType["track"] = "TRACK";
    ParametreType["callsign"] = "CALLSIGN";
    ParametreType["emergency"] = "EMERGENCY";
    ParametreType["groundspeed"] = "GROUNDSPEED";
    ParametreType["longitude"] = "LONGITUDE";
    ParametreType["spi"] = "SPI";
    ParametreType["squawk"] = "SQUAWK";
})(ParametreType || (ParametreType = {}));
var ParametreSpeedType;
(function (ParametreSpeedType) {
    ParametreSpeedType["east_west_velocity"] = "EAST_WEST_VELOCITY";
    ParametreSpeedType["north_south_velocity"] = "NORTH_SOUTH_VELOCITY";
})(ParametreSpeedType || (ParametreSpeedType = {}));
var ParametreSaturationType;
(function (ParametreSaturationType) {
    ParametreSaturationType["icao"] = "ICAO";
    ParametreSaturationType["aircraft_number"] = "NUMBER";
})(ParametreSaturationType || (ParametreSaturationType = {}));
var ParametreCreationType;
(function (ParametreCreationType) {
    ParametreCreationType["icao"] = "ICAO";
    ParametreCreationType["callsign"] = "CALLSIGN";
    ParametreCreationType["emergency"] = "EMERGENCY";
    ParametreCreationType["spi"] = "SPI";
    ParametreCreationType["squawk"] = "SQUAWK";
    ParametreCreationType["alert"] = "ALERT";
})(ParametreCreationType || (ParametreCreationType = {}));
/*type AlterationSpecification = {
    scenarios: Scenario[]
}

type Scenario {

}*/
function evalInstructions(instrs) {
    return instrs.flatMap(i => evalInstr(i)).filter(i => i !== undefined);
}
function evalDecl(decl) {
    if ((0, ast_1.isASTListDeclaration)(decl)) {
        return [{
                constant: decl.constant,
                listDeclaration: evalList(decl.list)
            }];
    }
    else {
        return [{
                constant: decl.constant,
                rangeDeclaration: evalRange(decl.range)
            }];
    }
}
function evalList(list) {
    return [{
            items: list.items
        }];
}
function evalRange(range) {
    return [{
            start: range.start,
            end: range.end
        }];
}
function evalInstr(instr) {
    if ((0, ast_1.isASTHide)(instr)) {
        return [{
                action: ActionType.deletion,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trigger: evalTrigger(instr.trigger),
                frequency: evalFrequency(instr.frequency),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTAlter)(instr)) {
        return [{
                action: ActionType.alteration,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trigger: evalTrigger(instr.trigger),
                parameters: evalParameters(instr.parameters),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTCreate)(instr)) {
        return [{
                action: ActionType.creation,
                timescope: evalTimeScope(instr.timeScope),
                trajectory: evalTrajectory(instr.trajectory),
                parameters: evalCreationParameters(instr.parameters),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTTrajectory)(instr)) {
        return [{
                action: ActionType.trajectory,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trajectory: evalTrajectory(instr.trajectory),
                trigger: evalTrigger(instr.trigger),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTAlterSpeed)(instr)) {
        return [{
                action: ActionType.speedAltaration,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                parameters: evalSpeedParameters(instr.parameters),
                trigger: evalTrigger(instr.trigger),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTSaturate)(instr)) {
        return [{
                action: ActionType.saturation,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                parameters: evalSaturationParameters(instr.parameters),
                trigger: evalTrigger(instr.trigger),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTReplay)(instr)) {
        return [{
                action: ActionType.replay,
                target: evalReplayTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                parameters: evalParameters(instr.parameters),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTDelay)(instr)) {
        return [{
                action: ActionType.timestamp,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                delay: evalDelayParameter(instr.delay),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTRotate)(instr)) {
        return [{
                action: ActionType.rotation,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                angle: evalRotateParameter(instr.angle),
                trigger: evalTrigger(instr.trigger),
                assertions: evalAssertions(instr.assertions)
            }];
    }
    else {
        return [{
                action: ActionType.cut,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trigger: evalTrigger(instr.trigger),
                assertions: evalAssertions(instr.assertions)
            }];
    }
}
function evalTimeScope(ts) {
    if ((0, ast_1.isASTAt)(ts)) {
        return [{
                type: "timeAt",
                time: evalTime(ts.time)
            }];
    }
    else if ((0, ast_1.isASTWindow)(ts)) {
        return [{
                type: "timeWindow",
                lowerBound: evalTime(ts.start),
                upperBound: evalTime(ts.end)
            }];
    }
    else {
        return [{
                type: "timeAtFor",
                time: evalTime(ts.time),
                for: evalTime(ts.for)
            }];
    }
}
function evalTrajectory(wp) {
    return evalWayPoint(wp.waypoints);
}
function evalWayPoint(wp) {
    let waypoints = evalOneWaypoint(wp[0]);
    for (let i = 1; i < wp.length; i++) {
        waypoints.push(evalOneWaypoint(wp[i]));
    }
    return waypoints;
}
function evalOneWaypoint(wp) {
    return [{
            latitude: evalValue(wp.latitude),
            longitude: evalValue(wp.longitude),
            altitude: evalValue(wp.altitude),
            time: evalTime(wp.time)
        }];
}
function evalTarget(t) {
    if ((0, ast_1.isASTAllPlanes)(t)) {
        return "all_planes";
    }
    else {
        return "plane";
    }
}
function evalTime(t) {
    return evalValue(t.realTime);
}
function evalValue(v) {
    return v.content;
}
function evalTrigger(trig) {
    if (trig != undefined) {
        return [evalValue(trig.triggername)];
    }
    else {
        return [];
    }
}
function evalAssertions(assers) {
    if (assers != undefined) {
        return evalAssertion(assers.items);
    }
    else {
        return [];
    }
}
function evalAssertion(asser) {
    let assertions = evalAssert(asser[0]);
    for (let i = 1; i < asser.length; i++) {
        assertions.push(evalAssert(asser[i]));
    }
    return assertions;
}
function evalAssert(assert) {
    return [{
            timescope: evalTimeScope(assert.timeScope),
            file: assert.file,
            filter: assert.filter
        }];
}
function evalParameters(param) {
    if (param != undefined) {
        return evalParameter(param.items);
    }
    else {
        return [];
    }
}
function evalParameter(pm) {
    let params = evalOneParameter(pm[0]);
    for (let i = 1; i < pm.length; i++) {
        params.push(evalOneParameter(pm[i]));
    }
    return params;
}
function evalOneParameter(pm) {
    if ((0, ast_1.isASTParamEdit)(pm)) {
        return [{
                parameter: { name: evalParametreType(pm.name),
                    value: pm.value.content
                }
            }];
    }
    else if ((0, ast_1.isASTParamOffset)(pm)) {
        return [{
                parameter: { name: evalParametreType(pm.name),
                    operation: pm.offset_op,
                    value: pm.value.content
                }
            }];
    }
    else if ((0, ast_1.isASTParamNoise)(pm)) {
        return [{
                parameter: { name: evalParametreType(pm.name),
                    value: pm.value.content
                }
            }];
    }
    else {
        return [{
                parameter: { name: evalParametreType(pm.name),
                    operation: pm.drift_op,
                    value: pm.value.content
                }
            }];
    }
}
function evalParametreType(pm) {
    if (pm.ALTITUDE != undefined) {
        return ParametreType.altitude;
    }
    else if (pm.CALLSIGN != undefined) {
        return ParametreType.callsign;
    }
    else if (pm.EMERGENCY != undefined) {
        return ParametreType.emergency;
    }
    else if (pm.GROUND_SPEED != undefined) {
        return ParametreType.groundspeed;
    }
    else if (pm.ICAO != undefined) {
        return ParametreType.icao;
    }
    else if (pm.LATITUDE != undefined) {
        return ParametreType.latitude;
    }
    else if (pm.LONGITUDE != undefined) {
        return ParametreType.longitude;
    }
    else if (pm.SPI != undefined) {
        return ParametreType.spi;
    }
    else if (pm.SQUAWK != undefined) {
        return ParametreType.squawk;
    }
    else {
        return ParametreType.track;
    }
}
function evalSpeedParameters(param) {
    return evalSpeedParameter(param.items);
}
function evalSpeedParameter(pm) {
    let params = evalOneSpeedParameter(pm[0]);
    for (let i = 1; i < pm.length; i++) {
        params.push(evalOneSpeedParameter(pm[i]));
    }
    return params;
}
function evalOneSpeedParameter(pm) {
    return [{
            parameter: { name: evalSpeedParametreType(pm.name),
                value: pm.value.content
            }
        }];
}
function evalSpeedParametreType(pm) {
    if (pm.EAST_WEST_VELOCITY != undefined) {
        return ParametreSpeedType.east_west_velocity;
    }
    else {
        return ParametreSpeedType.north_south_velocity;
    }
}
function evalSaturationParameters(param) {
    return evalSaturationParameter(param.items);
}
function evalSaturationParameter(pm) {
    let params = evalOneSaturationParameter(pm[0]);
    for (let i = 1; i < pm.length; i++) {
        params.push(evalOneSaturationParameter(pm[i]));
    }
    return params;
}
function evalOneSaturationParameter(pm) {
    return [{
            parameter: { name: evalSaturationParametreType(pm.name),
                value: pm.value.content
            }
        }];
}
function evalSaturationParametreType(pm) {
    if (pm.ICAO != undefined) {
        return ParametreSaturationType.icao;
    }
    else {
        return ParametreSaturationType.aircraft_number;
    }
}
function evalReplayTarget(rt) {
    if ((0, ast_1.isASTPlaneFrom)(rt)) {
        return [{
                filters: evalFilters(rt.filters),
                recording: rt.recording.content
            }];
    }
    else {
        if (rt.filters != undefined) {
            return [{
                    filters: evalFilters(rt.filters),
                    recording: rt.recording.content
                }];
        }
        else {
            return [{
                    recording: rt.recording.content
                }];
        }
    }
}
function evalFilters(f) {
    return evalValues(f.filters);
}
function evalValues(v) {
    let vals = [evalValue(v[0])];
    for (let i = 1; i < v.length; i++) {
        vals.push(evalValue(v[i]));
    }
    return vals;
}
function evalDelayParameter(dp) {
    return [{
            value: evalTime(dp.value)
        }];
}
function evalRotateParameter(rp) {
    return [{
            value: evalValue(rp.value)
        }];
}
function evalFrequency(hp) {
    if (hp != undefined) {
        return evalValue(hp.value);
    }
    else {
        return undefined;
    }
}
function evalCreationParameters(param) {
    if (param != undefined) {
        return evalCreationParameter(param.items);
    }
    else {
        return [];
    }
}
function evalCreationParameter(cp) {
    let params = evalCreationOneParameter(cp[0]);
    for (let i = 1; i < cp.length; i++) {
        params.push(evalCreationOneParameter(cp[i]));
    }
    return params;
}
function evalCreationOneParameter(cp) {
    return [{
            parameter: { name: evalCreationParametreType(cp.name),
                value: cp.value.content
            }
        }];
}
function evalCreationParametreType(cp) {
    if (cp.ICAO != undefined) {
        return ParametreCreationType.icao;
    }
    else if (cp.CALLSIGN != undefined) {
        return ParametreCreationType.callsign;
    }
    if (cp.SQUAWK != undefined) {
        return ParametreCreationType.squawk;
    }
    if (cp.EMERGENCY != undefined) {
        return ParametreCreationType.emergency;
    }
    if (cp.ALERT != undefined) {
        return ParametreCreationType.alert;
    }
    else {
        return ParametreCreationType.spi;
    }
}
//# sourceMappingURL=generator.js.map