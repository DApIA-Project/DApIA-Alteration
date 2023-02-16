
//import { CompositeGeneratorNode, NL, toString } from 'langium';


import {
    ASTCreationParameter, ASTCreationParameters, ASTCreationParameterType,
    ASTHideParameter,
    ASTInstruction,
    ASTNumber,
    ASTNumberOffset,
    ASTParameter,
    ASTParameters,
    ASTParameterType,
    ASTScenario,
    ASTTarget,
    ASTTime,
    ASTTimeScope, ASTTrajectory,
    ASTValue, ASTWayPoint, ASTWayPoints,
    isASTAllPlanes,
    isASTAlter,
    isASTAt,
    isASTCreate,
    isASTHide,
    isASTIntegerValue,
    isASTNumber,
    isASTNumberOffset,
    isASTParamEdit,
    isASTParamNoise,
    isASTParamOffset,
    isASTTime
} from "../language-server/generated/ast";
import {Action, Altitude, Parameter, Parameters, Scope, Sensors, Target, Trajectory, Vertex, Waypoint} from "../types";



const VALEUR_TIME_DEFAULT = 22000;
const CHEMIN_TEMP_DIRECTORY_SERVER = "temp/";
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

export function generateCommands(scenario: ASTScenario, fileName : string): Parameters | undefined {
    return generateStatements(scenario, fileName);
}

/*function generateStatements2(instr: ASTInstruction[]): Object[] {
    //let env : DslGenEnv = new Map<string,number>();
    return instr.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Object[];
    
}*/

function generateStatements(scenar: ASTScenario, fileName : string):  Parameters | undefined {
    //let env : DslGenEnv = new Map<string,number>();
    
    return {sensors : evalScenario(scenar, fileName)};
    
}

function evalScenario(scenar : ASTScenario, fileName : string) : Sensors{
        
        return {
            sensor: [{
                sensorType: "SBS",
                sID: '',
                record: fileName,
                filter: '',
                action: evalInstructions(scenar.instructions),
                
                
                
            }]
        }
        /*if(scenar.declarations.length != 0){
            return [{
                
                declarations : evalDeclarations(scenar.declarations),
                instructions : evalInstructions(scenar.instructions)
                
            }];
        }else{
            return [{
                instructions : 
                
            }];
        }*/
    
    
    
}

/*
function evalDeclarations(decls : ASTDeclaration[]) : (Object | undefined)[]{
    return (decls.flatMap(i => evalDecl(i)).filter(i => i !== undefined) as Object[])

    
}*/

enum ActionType {
    deletion = 'DELETION',
    creation = 'CREATION',
    alteration = 'ALTERATION',
    saturation = 'SATURATION',
    duplication = 'DUPLICATION',
    rotation = 'ROTATION',
    custom = 'CUSTOM',
    replay = 'REPLAY',
    timestamp = 'ALTERATIONTIMESTAMP',
    cut = 'CUT',
    speedAltaration = 'SPEED_ALTERATION',
    trajectory = 'TRAJECTORY_MODIFICATION'
    
}


enum ParametreType {
    altitude = 'altitude',
    latitude = 'latitude',
    icao = 'icao',
    track = 'track',
    callsign = 'callsign',
    emergency = 'emergency',
    groundspeed = 'groundSpeed',
    longitude = 'longitude',
    spi = 'SPI',
    squawk = 'squawk'

}
enum CreationParametreType {
    icao = 'icao',
    callsign = 'callsign',
    emergency = 'emergency',
    spi = 'SPI',
    squawk = 'squawk',
    alert = 'alert'

}
/*
enum ParametreSpeedType {
    east_west_velocity = 'EAST_WEST_VELOCITY',
    north_south_velocity = 'NORTH_SOUTH_VELOCITY'
}

enum ParametreSaturationType {
    icao = "ICAO",
    aircraft_number = 'NUMBER'
}

enum ParametreCreationType {
    icao = "ICAO",
    callsign = 'CALLSIGN',
    emergency = 'EMERGENCY',
    spi = 'SPI',
    squawk = 'SQUAWK',
    alert = 'ALERT'

}*/

/*type AlterationSpecification = {
    scenarios: Scenario[]
}

type Scenario {

}*/

function evalInstructions(instrs : ASTInstruction[]) : Action[]{
    
    return (instrs.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Action[])

    
    

}
/*
function evalDecl(decl : ASTDeclaration) : (Object | undefined)[]{
    if(isASTListDeclaration(decl)){
        return [{
            constant : decl.constant,
            listDeclaration : evalList(decl.list)
        }];
    }else {
        return [{
            constant : decl.constant,
            rangeDeclaration : evalRange(decl.range)
        }];
    }
    
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
}*/

function evalInstr(instr : ASTInstruction) : Action{
    if(isASTHide(instr)){
        return {
            alterationType : ActionType.deletion,
            scope : evalTimeScope(instr.timeScope),
            parameters: {
                target : evalTarget(instr.target),
                parameter : [
                    {
                        mode : "simple",
                        frequency : evalFrequency(instr.frequency)
                    }
                ]
            },
            
        }
    } else if(isASTAlter(instr)) {
        return {
            alterationType : ActionType.alteration,
            scope : evalTimeScope(instr.timeScope),
            parameters: {
                target : evalTarget(instr.target),
                parameter : evalParameters(instr.parameters)

            },
            
        }
    }else if(isASTCreate(instr)){
        return {
            alterationType : ActionType.creation,
            scope : evalTimeScope(instr.timeScope),
            parameters: {
                target : {
                    identifier : "hexIdent",
                    value : ""
                },
                trajectory : evalTrajectory(instr.trajectory),
                parameter : evalCreationParameters(instr.parameters!)
            }
        }
    /*}else if(isASTTrajectory(instr)){
    }else if(isASTAlterSpeed(instr)){*/
    }else{
        return {
            alterationType : ActionType.cut,
            scope : evalTimeScope(instr.timeScope),
            parameters: {
                target : {identifier : "SPI",value : ""}

            },
            
        }
    }

    /*
    if(isASTHide(instr)){
        return [{
            action : ActionType.deletion,
            target : evalTarget(instr.target),
            scope: evalTimeScope(instr.timeScope),
            trigger : evalTrigger(instr.trigger!),
            frequency : evalFrequency(instr.frequency!),
            assertions : evalAssertions(instr.assertions!)

        }];

    }else if(isASTAlter(instr)){
        return [{
            action : ActionType.alteration,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            trigger : evalTrigger(instr.trigger!),
            parameters : evalParameters(instr.parameters),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTCreate(instr)){
        return [{
            action : ActionType.creation,
            scope : evalTimeScope(instr.timeScope),
            trajectory : evalTrajectory(instr.trajectory),
            parameters : evalCreationParameters(instr.parameters!),
            assertions : evalAssertions(instr.assertions!)

            

        }];
    }else if(isASTTrajectory(instr)){
        return [{
            action : ActionType.trajectory,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            trajectory : evalTrajectory(instr.trajectory),
            trigger : evalTrigger(instr.trigger!),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTAlterSpeed(instr)){
        return [{
            action : ActionType.speedAltaration,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            parameters : evalSpeedParameters(instr.parameters),
            trigger : evalTrigger(instr.trigger!),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTSaturate(instr)){
        return [{
            action : ActionType.saturation,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            parameters : evalSaturationParameters(instr.parameters),
            trigger : evalTrigger(instr.trigger!),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTReplay(instr)){
        return [{
            action : ActionType.replay,
            target : evalReplayTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            parameters : evalParameters(instr.parameters!),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTDelay(instr)){
        return [{
            action : ActionType.timestamp,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            delay : evalDelayParameter(instr.delay),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else if(isASTRotate(instr)){
        return [{
            action : ActionType.rotation,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            angle : evalRotateParameter(instr.angle),
            trigger : evalTrigger(instr.trigger!),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }else{
        return [{
            action : ActionType.cut,
            target : evalTarget(instr.target),
            scope : evalTimeScope(instr.timeScope),
            trigger : evalTrigger(instr.trigger!),
            assertions : evalAssertions(instr.assertions!)
            

        }];
    }
    */
    
}





function evalTimeScope(ts : ASTTimeScope) : Scope{
    if(isASTAt(ts)){
        return {
            type: "timeWindow",
            lowerBound : evalTime(ts.time),
            upperBound : (parseInt(evalTime(ts.time))+VALEUR_TIME_DEFAULT).toString()
            
        }
    }else{
        return {
            type : "timeWindow"
        }
    }
    
        
    
}

function evalTime(t : ASTTime) : string {
    if(isASTTime(t)){
        return evalValue(t.realTime);
    }
    
    return "0";
    
        
    
}

function evalValue(v : ASTValue) : string {
    if(isASTNumberOffset(v)){
        return evalNumberOffset(v);
    }
    return "0";
    
        
    
}

function evalNumberOffset(n : ASTNumberOffset) : string {
    if(isASTNumber(n)){
        return evalNumber(n);
    }
    return "0";
    
        
    
}

function evalNumber(n : ASTNumber) : string {
    if(isASTIntegerValue(n)){
        return (n.content*1000).toString();
    }
    return "0";
    
        
    
}

/*
function evalTrajectory(wp : ASTWayPoints) : (Object)[]{
   
        return evalWayPoint(wp.waypoints);
    
   
}

function evalWayPoint(wp : ASTWayPoint[]) : (Object)[]{
    let waypoints : (Object)[]=evalOneWaypoint(wp[0]);
    for(let i = 1 ; i<wp.length;i++){
        waypoints.push(evalOneWaypoint(wp[i]));
    }
    return waypoints;
}

function evalOneWaypoint(wp : ASTWayPoint) : (Object)[]{
    return [{
        latitude : evalValue(wp.latitude),
        longitude : evalValue(wp.longitude),
        altitude : evalValue(wp.altitude),
        time : evalTime(wp.time)
    }];
}
*/

function evalTarget(t : ASTTarget) : Target{
    
    if(isASTAllPlanes(t)){
        return {
                    identifier : "hexIdent",
                    value : "ALL"
                }
        ;
    }else{
        return {
                    identifier : "hexIdent",
                    value : "TEST"
                }
        ;
    }

}

function evalTrajectory(tr : ASTWayPoints) : Trajectory{

    return {
        waypoint : evalWaypoint(tr.waypoints)
    };
}
function evalWaypoint(wp : ASTWayPoint[]) : Waypoint[]{

    let waypoint : Waypoint[]=[];
    for(let i = 0 ; i<wp.length;i++){
        waypoint.push(evalOneWaypoint(wp[i]));
    }
    return waypoint;
}

function evalOneWaypoint(wp : ASTWayPoint) : Waypoint{

    return {
        vertex : evalVertex(wp.latitude,wp.longitude),
        altitude : evalAltitude(wp.altitude),
        time :( (wp.time.realTime.content) as number)*1000
    }
}

function evalVertex(lat : ASTValue, long : ASTValue) : Vertex {
    return {
        lat :{
            value: lat.content as string,
            offset : false
        },
        lon :{
            value: long.content as string,
            offset : false
        }
    }
}

function evalAltitude(alt : ASTValue) : Altitude {
    return {
            value: alt.content as number,
            offset : false
    }
}

function evalCreationParameters(param : ASTCreationParameters) : Parameter[]{
        return evalCreationParameter(param.items);
}

function evalCreationParameter(pm : ASTCreationParameter[]) : Parameter[]{
    let params : Parameter[]=[];
    for(let i = 0 ; i<pm.length;i++){
        params.push(evalOneCreationParameter(pm[i]));
    }
    return params;
}

function evalOneCreationParameter(pm : ASTCreationParameter) : Parameter{
    return {
        key : evalCreationParametreType(pm.name),
        value : (pm.value.content.toString().replace('"','')).replace('"',''),
        mode : "offset"
    }
}

function evalCreationParametreType(pm : ASTCreationParameterType) : string | undefined{
    if(pm.ICAO != undefined){
        return CreationParametreType.icao;
    }else if(pm.CALLSIGN != undefined){
        return CreationParametreType.callsign;
    }else if(pm.EMERGENCY != undefined){
        return CreationParametreType.emergency;
    }else if(pm.ALERT != undefined){
        return CreationParametreType.alert;
    }else if(pm.SPI != undefined){
        return CreationParametreType.spi;
    }else{
        return CreationParametreType.squawk;
    }


}
/*
function evalTime(t : ASTTime) : (number|string|ASTNumber|ASTRecordingParameterType){
    
    return evalValue(t.realTime);

}

function evalValue(v : ASTValue) : (number|string|ASTNumber|ASTRecordingParameterType){
    return v.content;
    

}*/
/*
function evalTrigger(trig : ASTTrigger) : (Object|undefined)[]{
        if(trig != undefined){
          return [evalValue(trig.triggername)];  
        }else{
            return [];
        }
        
  
}

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
        scope : evalTimeScope(assert.timeScope),
        file : assert.file,
        filter : assert.filter
    }];
    
}*/

function evalParameters(param : ASTParameters) : Parameter[]{
  
    
    if(param != undefined){
        return evalParameter(param.items);
      }else{
          return [];
      }

}

function evalParameter(pm : ASTParameter[]) : Parameter[]{
    let params : Parameter[]=[];
    for(let i = 0 ; i<pm.length;i++){
        params.push(evalOneParameter(pm[i]));
    }
    return params;
}

function evalOneParameter(pm : ASTParameter) : Parameter{
    if(isASTParamEdit(pm)){
        return {
            mode : "simple",
            key : evalParametreType(pm.name),
            value : (pm.value.content.toString().replace('"','')).replace('"',''),
            
        }
    }else if(isASTParamOffset(pm)){
        return {
            mode : "offset",
            key : evalParametreType(pm.name),
            value : (pm.value.content.toString().replace('"','')).replace('"',''),
            
        }
    }else if(isASTParamNoise(pm)){
        return {
            mode : "noise",
            key : evalParametreType(pm.name),
            value : (pm.value.content.toString().replace('"','')).replace('"',''),
            
        }
    }else {
        return {
            mode : "drift",
            key : evalParametreType(pm.name),
            value : (pm.value.content.toString().replace('"','')).replace('"',''),
            
        }
    }
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
    }else{
        return ParametreType.track;
    }

    
}

/*function evalSpeedParameters(param : ASTSpeedParameters) : (Object|undefined)[]{
  
    return evalSpeedParameter(param.items);
    

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
    }else {
        return ParametreSpeedType.north_south_velocity;
    }

    
}

function evalSaturationParameters(param : ASTSaturationParameters) : (Object|undefined)[]{
    
    return evalSaturationParameter(param.items);
    

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
    }else{
        return ParametreSaturationType.aircraft_number;
    }

    
}

function evalReplayTarget(rt : ASTReplayTarget) : (Object|undefined)[]{
    if(isASTPlaneFrom(rt)){
        return [{
            filters : evalFilters(rt.filters),
            recording : rt.recording.content
        }];
    }else {
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
    
}*/

function evalFrequency(hp : ASTHideParameter | undefined) : string {
    if(hp != undefined){
        return hp.value.content.toString();
    }else{
        return "";
    }
    
    
    
}

/*
function evalCreationParameters(param : ASTCreationParameters) : (Object|undefined)[]{
  
    if(param != undefined){
        return evalCreationParameter(param.items);  
    }else{
        return [];
    }
    

}

function evalCreationParameter(cp : ASTCreationParameter[]) : (Object|undefined)[]{
    let params : (Object|undefined)[]=evalCreationOneParameter(cp[0]);
    for(let i = 1 ; i<cp.length;i++){
        params.push(evalCreationOneParameter(cp[i]));
    }
    return params;
}

function evalCreationOneParameter(cp : ASTCreationParameter) : (Object|undefined)[]{
    return [{
        parameter : 
            {   name : evalCreationParametreType(cp.name),
                value : cp.value.content
            }
    }];
}

function evalCreationParametreType(cp : ASTCreationParameterType) : string | undefined{
    if(cp.ICAO != undefined){
        return ParametreCreationType.icao;
    }else if(cp.CALLSIGN != undefined){
        return ParametreCreationType.callsign;
    }if(cp.SQUAWK != undefined){
        return ParametreCreationType.squawk;
    }if(cp.EMERGENCY != undefined){
        return ParametreCreationType.emergency;
    }if(cp.ALERT != undefined){
        return ParametreCreationType.alert;
    }else{
        return ParametreCreationType.spi;
    }
}*/