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
    //let env : FditscenarioGenEnv = new Map<string,number>();
    return instr.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Object[];
    
}*/
function generateStatements(scenar) {
    //let env : FditscenarioGenEnv = new Map<string,number>();
    return evalScenario(scenar);
}
function evalScenario(scenar) {
    if (scenar.declarations != undefined) {
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
    ActionType["deletion"] = "deletion";
    ActionType["creation"] = "creation";
    ActionType["alteration"] = "alteration";
    ActionType["saturation"] = "saturation";
    ActionType["duplication"] = "duplication";
    ActionType["convergence"] = "convergence";
    ActionType["custom"] = "custom";
    ActionType["replay"] = "replay";
    ActionType["timestamp"] = "timestamp";
    ActionType["reductionDF"] = "reductionDF";
    ActionType["speedAltaration"] = "speedAltaration";
    ActionType["trajectory"] = "trajectory";
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
    else if ((0, ast_1.isASTRangeDeclaration)(decl)) {
        return [{
                constant: decl.constant,
                rangeDeclaration: evalRange(decl.range)
            }];
    }
    return [];
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
                /*frequency : evalFrequency(instr.frequency),
                assertions : evalAssertions(instr.assertions)*/
            }];
    }
    else if ((0, ast_1.isASTAlter)(instr)) {
        return [{
                ActionType: ActionType.alteration,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trigger: evalTrigger(instr.trigger),
                parameters: evalParameters(instr.parameters),
                /*assertions : evalAssertions(instr.assertions)*/
            }];
    }
    else if ((0, ast_1.isASTCreate)(instr)) {
        return [{
                ActionType: ActionType.creation,
                timescope: evalTimeScope(instr.timeScope),
                trajectory: evalTrajectory(instr.trajectory)
                /*parameters : evalCreationParameters(instr.parameters),
                assertions : evalAssertions(instr.assertions!)*/
            }];
    }
    else if ((0, ast_1.isASTTrajectory)(instr)) {
        return [{
                ActionType: ActionType.trajectory,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trajectory: evalTrajectory(instr.trajectory),
                trigger: evalTrigger(instr.trigger),
                //assertions : evalAssertions(instr.assertions!)
            }];
    }
    else if ((0, ast_1.isASTAlterSpeed)(instr)) {
        return [{
                ActionType: ActionType.speedAltaration,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                parameters: evalSpeedParameters(instr.parameters),
                trigger: evalTrigger(instr.trigger),
                //assertions : evalAssertions(instr.assertions!)
            }];
    }
    else if ((0, ast_1.isASTSaturate)(instr)) {
        return [{
                ActionType: ActionType.saturation,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                parameters: evalSaturationParameters(instr.parameters),
                trigger: evalTrigger(instr.trigger),
                //assertions : evalAssertions(instr.assertions)
            }];
    }
    else if ((0, ast_1.isASTReplay)(instr)) {
        return [{
                ActionType: ActionType.replay,
                target: evalReplayTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                /*parameters : evalParameters(instr.parameters),
                assertions : evalAssertions(instr.assertions!)*/
            }];
    }
    else if ((0, ast_1.isASTDelay)(instr)) {
        return [{
                ActionType: ActionType.timestamp,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                delay: evalDelayParameter(instr.delay),
                //assertions : evalAssertions(instr.assertions!)
            }];
    }
    else if ((0, ast_1.isASTRotate)(instr)) {
        return [{
                ActionType: ActionType.convergence,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                angle: evalRotateParameter(instr.angle),
                trigger: evalTrigger(instr.trigger),
                //assertions : evalAssertions(instr.assertions!)
            }];
    }
    else if ((0, ast_1.isASTCut)(instr)) {
        return [{
                ActionType: ActionType.reductionDF,
                target: evalTarget(instr.target),
                timescope: evalTimeScope(instr.timeScope),
                trigger: evalTrigger(instr.trigger),
                //assertions : evalAssertions(instr.assertions!)
            }];
    }
    return [];
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
    if (wp != undefined) {
        return evalWayPoint(wp.waypoints);
    }
    else {
        return [];
    }
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
            longitute: evalValue(wp.longitude),
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
/*
function evalAssertions(assers : ASTAssertions) : (Object|undefined)[]{
    if(assers != undefined){
        return evalAssertion(assers.items);
    }else{
        return [];
    }
    
}

function evalAssertion(asser : ASTAssertion[]) : (Object|undefined)[]{
    let assertions : (Object|undefined)[]=evalAssert(asser[0]);
    for(let i = 1 ; i<asser.length;i++){
        assertions.push(evalAssert(asser[i]));
    }
    return assertions;
    
}

function evalAssert(assert : ASTAssertion) : (Object|undefined)[]{
    return [{
        timescope : evalTimeScope(assert.timeScope),
        file : assert.file,
        filter : assert.filter
    }];
    
}*/
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
    else if ((0, ast_1.isASTParamDrift)(pm)) {
        return [{
                parameter: { name: evalParametreType(pm.name),
                    operation: pm.drift_op,
                    value: pm.value.content
                }
            }];
    }
    return [];
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
    else if (pm.TRACK != undefined) {
        return ParametreType.track;
    }
    return undefined;
}
function evalSpeedParameters(param) {
    if (param != undefined) {
        return evalSpeedParameter(param.items);
    }
    else {
        return [];
    }
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
    else if (pm.NORTH_SOUTH_VELOCITY != undefined) {
        return ParametreSpeedType.north_south_velocity;
    }
    return undefined;
}
function evalSaturationParameters(param) {
    if (param != undefined) {
        return evalSaturationParameter(param.items);
    }
    else {
        return [];
    }
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
    else if (pm.AIRCRAFT_NUMBER != undefined) {
        return ParametreSaturationType.aircraft_number;
    }
    return undefined;
}
function evalReplayTarget(rt) {
    if ((0, ast_1.isASTPlaneFrom)(rt)) {
        return [{
                filters: evalFilters(rt.filters),
                recording: rt.recording.content
            }];
    }
    else if ((0, ast_1.isASTAllPlaneFrom)(rt)) {
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
    return [];
}
function evalFilters(f) {
    if (f != undefined) {
        return evalValues(f.filters);
    }
    else {
        return [];
    }
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
//# sourceMappingURL=generator.js.map