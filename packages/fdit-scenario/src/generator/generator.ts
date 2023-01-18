
//import { CompositeGeneratorNode, NL, toString } from 'langium';


import { ASTDeclaration, ASTDelayParameter, ASTFilters, ASTInstruction, ASTList, ASTNumber, ASTParameter, ASTParameters, ASTParameterType, ASTRange, ASTRecordingParameterType, ASTReplayTarget, ASTRotateParameter, ASTSaturationParameter, ASTSaturationParameters, ASTSaturationParameterType, ASTScenario, ASTSpeedParameter, ASTSpeedParameters, ASTSpeedParameterType, ASTTarget, ASTTime, ASTTimeScope, ASTTrigger, ASTValue, ASTWayPoint, ASTWayPoints, isASTAllPlaneFrom, isASTAllPlanes, isASTAlter, isASTAlterSpeed, isASTAt, isASTCreate, isASTCut, isASTDelay, isASTHide, isASTListDeclaration, isASTParamDrift, isASTParamEdit, isASTParamNoise, isASTParamOffset, isASTPlaneFrom, isASTRangeDeclaration, isASTReplay, isASTRotate, isASTSaturate, isASTTrajectory, isASTWindow } from "../language-server/generated/ast";

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

export function generateCommands(scenario: ASTScenario): (Object|undefined)[] {
    return generateStatements(scenario);
}

/*function generateStatements2(instr: ASTInstruction[]): Object[] {
    //let env : FditscenarioGenEnv = new Map<string,number>();
    return instr.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Object[];
    
}*/

function generateStatements(scenar: ASTScenario): (Object|undefined)[] {
    //let env : FditscenarioGenEnv = new Map<string,number>();
    return evalScenario(scenar);
    
}

function evalScenario(scenar : ASTScenario) : (Object | undefined)[]{
        
    if(scenar.declarations != undefined){
        return [{
            
            declarations : evalDeclarations(scenar.declarations),
            instructions : evalInstructions(scenar.instructions)
            
        }];
    }else{
        return [{
            instructions : evalInstructions(scenar.instructions)
            
        }];
    }
    
    
    
}

function evalDeclarations(decls : ASTDeclaration[]) : (Object | undefined)[]{
    return (decls.flatMap(i => evalDecl(i)).filter(i => i !== undefined) as Object[])

    
}

enum ActionType {
    deletion = 'deletion',
    creation = 'creation',
    alteration = 'alteration',
    saturation = 'saturation',
    duplication = 'duplication',
    convergence = 'convergence',
    custom = 'custom',
    replay = 'replay',
    timestamp = 'timestamp',
    reductionDF = 'reductionDF',
    speedAltaration = 'speedAltaration',
    trajectory = 'trajectory'
    
}


enum ParametreType {
    altitude = 'ALTITUDE',
    latitude = 'LATITUDE',
    icao = 'ICAO',
    track = 'TRACK',
    callsign = 'CALLSIGN',
    emergency = 'EMERGENCY',
    groundspeed = 'GROUNDSPEED',
    longitude = 'LONGITUDE',
    spi = 'SPI',
    squawk = 'SQUAWK'

}

enum ParametreSpeedType {
    east_west_velocity = 'EAST_WEST_VELOCITY',
    north_south_velocity = 'NORTH_SOUTH_VELOCITY'
}

enum ParametreSaturationType {
    icao = "ICAO",
    aircraft_number = 'NUMBER'
}

/*type AlterationSpecification = {
    scenarios: Scenario[]
}

type Scenario {

}*/

function evalInstructions(instrs : ASTInstruction[]) : (Object | undefined)[]{
    
    return (instrs.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Object[])

    
    

}

function evalDecl(decl : ASTDeclaration) : (Object | undefined)[]{
    if(isASTListDeclaration(decl)){
        return [{
            constant : decl.constant,
            listDeclaration : evalList(decl.list)
        }];
    }else if(isASTRangeDeclaration(decl)){
        return [{
            constant : decl.constant,
            rangeDeclaration : evalRange(decl.range)
        }];
    }
    
    return [];
}

function evalList(list : ASTList) : (Object | undefined)[]{
    return [{
        items : list.items
    }];
}

function evalRange(range : ASTRange) : (Object | undefined)[]{
    return [{
        start : range.start,
        end : range.end
    }];
}

function evalInstr(instr : ASTInstruction) : (Object | undefined)[]{
    if(isASTHide(instr)){
        return [{
            action : ActionType.deletion,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            trigger : evalTrigger(instr.trigger!),
            /*frequency : evalFrequency(instr.frequency),
            assertions : evalAssertions(instr.assertions)*/

        }];

    }else if(isASTAlter(instr)){
        return [{
            ActionType : ActionType.alteration,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            trigger : evalTrigger(instr.trigger!),
            parameters : evalParameters(instr.parameters),
            /*assertions : evalAssertions(instr.assertions)*/
            

        }];
    }else if(isASTCreate(instr)){
        return [{
            ActionType : ActionType.creation,
            timescope : evalTimeScope(instr.timeScope),
            trajectory : evalTrajectory(instr.trajectory)
            /*parameters : evalCreationParameters(instr.parameters),
            assertions : evalAssertions(instr.assertions!)*/

            

        }];
    }else if(isASTTrajectory(instr)){
        return [{
            ActionType : ActionType.trajectory,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            trajectory : evalTrajectory(instr.trajectory),
            trigger : evalTrigger(instr.trigger!),
            //assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTAlterSpeed(instr)){
        return [{
            ActionType : ActionType.speedAltaration,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            parameters : evalSpeedParameters(instr.parameters),
            trigger : evalTrigger(instr.trigger!),
            //assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTSaturate(instr)){
        return [{
            ActionType : ActionType.saturation,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            parameters : evalSaturationParameters(instr.parameters),
            trigger : evalTrigger(instr.trigger!),
            //assertions : evalAssertions(instr.assertions)
            

        }];
    }else if(isASTReplay(instr)){
        return [{
            ActionType : ActionType.replay,
            target : evalReplayTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            /*parameters : evalParameters(instr.parameters),
            assertions : evalAssertions(instr.assertions!)*/
            

        }];
    }else if(isASTDelay(instr)){
        return [{
            ActionType : ActionType.timestamp,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            delay : evalDelayParameter(instr.delay),
            //assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTRotate(instr)){
        return [{
            ActionType : ActionType.convergence,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            angle : evalRotateParameter(instr.angle),
            trigger : evalTrigger(instr.trigger!),
            //assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTCut(instr)){
        return [{
            ActionType : ActionType.reductionDF,
            target : evalTarget(instr.target),
            timescope : evalTimeScope(instr.timeScope),
            trigger : evalTrigger(instr.trigger!),
            //assertions : evalAssertions(instr.assertions!)
            

        }];
    }
    
    return [];
}





function evalTimeScope(ts : ASTTimeScope) : (Object|undefined)[]{

        if(isASTAt(ts)){
            return [{
                type : "timeAt",
                time : evalTime(ts.time)
            }];
        }else if(isASTWindow(ts)){
            return [{
                type : "timeWindow",
                lowerBound : evalTime(ts.start),
                upperBound : evalTime(ts.end)
            
            }];
        }else{
            return [{
                type : "timeAtFor",
                time : evalTime(ts.time),
                for : evalTime(ts.for)
            
            }];
        }

        
    
}

function evalTrajectory(wp : ASTWayPoints) : (Object|undefined)[]{
    if(wp != undefined){
        return evalWayPoint(wp.waypoints);
    }else{
        return [];
    }
   
}

function evalWayPoint(wp : ASTWayPoint[]) : (Object|undefined)[]{
    let waypoints : (Object|undefined)[]=evalOneWaypoint(wp[0]);
    for(let i = 1 ; i<wp.length;i++){
        waypoints.push(evalOneWaypoint(wp[i]));
    }
    return waypoints;
}

function evalOneWaypoint(wp : ASTWayPoint) : (Object|undefined)[]{
    return [{
        latitude : evalValue(wp.latitude),
        longitute : evalValue(wp.longitude),
        altitude : evalValue(wp.altitude),
        time : evalTime(wp.time)
    }];
}

function evalTarget(t : ASTTarget) : string{
    
    if(isASTAllPlanes(t)){
        return "all_planes";
    }else{
        return "plane";
    }

}

function evalTime(t : ASTTime) : (number|string|ASTNumber|ASTRecordingParameterType){
    
    return evalValue(t.realTime);

}

function evalValue(v : ASTValue) : (number|string|ASTNumber|ASTRecordingParameterType){
    return v.content;
    

}

function evalTrigger(trig : ASTTrigger) : (Object|undefined)[]{
        if(trig != undefined){
          return [evalValue(trig.triggername)];  
        }else{
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

function evalParameters(param : ASTParameters) : (Object|undefined)[]{
    if(param != undefined){
        return evalParameter(param.items);
    }else{
        return [];
    }

}

function evalParameter(pm : ASTParameter[]) : (Object|undefined)[]{
    let params : (Object|undefined)[]=evalOneParameter(pm[0]);
    for(let i = 1 ; i<pm.length;i++){
        params.push(evalOneParameter(pm[i]));
    }
    return params;
}

function evalOneParameter(pm : ASTParameter) : (Object|undefined)[]{
    if(isASTParamEdit(pm)){
        return [{
            parameter : 
                {   name : evalParametreType(pm.name),
                    value : pm.value.content
                }
        }];
    }else if(isASTParamOffset(pm)){
        return [{
            parameter : 
                {   name : evalParametreType(pm.name),
                    operation : pm.offset_op,
                    value : pm.value.content
                }
        }];
    }else if(isASTParamNoise(pm)){
        return [{
            parameter : 
                {   name : evalParametreType(pm.name),
                    value : pm.value.content
                }
        }];
    }else if(isASTParamDrift(pm)){
        return [{
            parameter : 
                {   name : evalParametreType(pm.name),
                    operation : pm.drift_op,
                    value : pm.value.content
                }
        }];
    }
    return [];
}

function evalParametreType(pm : ASTParameterType) : string | undefined{
    if(pm.ALTITUDE != undefined){
        return ParametreType.altitude;
    }else if(pm.CALLSIGN != undefined){
        return ParametreType.callsign;
    }else if(pm.EMERGENCY != undefined){
        return ParametreType.emergency;
    }else if(pm.GROUND_SPEED != undefined){
        return ParametreType.groundspeed;
    }else if(pm.ICAO != undefined){
        return ParametreType.icao;
    }else if(pm.LATITUDE != undefined){
        return ParametreType.latitude;
    }else if(pm.LONGITUDE != undefined){
        return ParametreType.longitude;
    }else if(pm.SPI != undefined){
        return ParametreType.spi;
    }else if(pm.SQUAWK != undefined){
        return ParametreType.squawk;
    }else if(pm.TRACK != undefined){
        return ParametreType.track;
    }

    return undefined;
    
}

function evalSpeedParameters(param : ASTSpeedParameters) : (Object|undefined)[]{
    if(param != undefined){
        return evalSpeedParameter(param.items);
    }else{
        return [];
    }

}

function evalSpeedParameter(pm : ASTSpeedParameter[]) : (Object|undefined)[]{
    let params : (Object|undefined)[]=evalOneSpeedParameter(pm[0]);
    for(let i = 1 ; i<pm.length;i++){
        params.push(evalOneSpeedParameter(pm[i]));
    }
    return params;
}

function evalOneSpeedParameter(pm : ASTSpeedParameter) : (Object|undefined)[]{
    
    return [{
        parameter : 
            {   name : evalSpeedParametreType(pm.name),
                value : pm.value.content
            }
    }];
    
}

function evalSpeedParametreType(pm : ASTSpeedParameterType) : string | undefined{
    if(pm.EAST_WEST_VELOCITY != undefined){
        return ParametreSpeedType.east_west_velocity;
    }else if(pm.NORTH_SOUTH_VELOCITY != undefined){
        return ParametreSpeedType.north_south_velocity;
    }

    return undefined;
    
}

function evalSaturationParameters(param : ASTSaturationParameters) : (Object|undefined)[]{
    if(param != undefined){
        return evalSaturationParameter(param.items);
    }else{
        return [];
    }

}

function evalSaturationParameter(pm : ASTSaturationParameter[]) : (Object|undefined)[]{
    let params : (Object|undefined)[]=evalOneSaturationParameter(pm[0]);
    for(let i = 1 ; i<pm.length;i++){
        params.push(evalOneSaturationParameter(pm[i]));
    }
    return params;
}

function evalOneSaturationParameter(pm : ASTSaturationParameter) : (Object|undefined)[]{
    
    return [{
        parameter : 
            {   name : evalSaturationParametreType(pm.name),
                value : pm.value.content
            }
    }];
    
}

function evalSaturationParametreType(pm : ASTSaturationParameterType) : string | undefined{
    if(pm.ICAO != undefined){
        return ParametreSaturationType.icao;
    }else if(pm.AIRCRAFT_NUMBER != undefined){
        return ParametreSaturationType.aircraft_number;
    }

    return undefined;
    
}

function evalReplayTarget(rt : ASTReplayTarget) : (Object|undefined)[]{
    if(isASTPlaneFrom(rt)){
        return [{
            filters : evalFilters(rt.filters),
            recording : rt.recording.content
        }];
    }else if(isASTAllPlaneFrom(rt)){
        if(rt.filters != undefined){
            return [{
                filters : evalFilters(rt.filters),
                recording : rt.recording.content
            }];
        }else{
            return [{
                recording : rt.recording.content
            }];
        }
        
    }

    return [];
    
}

function evalFilters(f : ASTFilters) : (Object|undefined)[]{
    
    if(f != undefined){
        return evalValues(f.filters);
    }else{
        return [];
    }
    
}

function evalValues(v : ASTValue[]) : (Object|undefined)[]{
    
    let vals : (Object|undefined)[]=[evalValue(v[0])];
    for(let i = 1 ; i<v.length;i++){
        vals.push(evalValue(v[i]));
    }
    return vals;
    
}

function evalDelayParameter(dp : ASTDelayParameter) : (Object|undefined)[]{
    
    return [{
        value : evalTime(dp.value)
    }];
    
}

function evalRotateParameter(rp : ASTRotateParameter) : (Object|undefined)[]{
    
    return [{
        value : evalValue(rp.value)
    }];
    
}