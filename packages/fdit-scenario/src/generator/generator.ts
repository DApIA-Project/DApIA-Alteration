
//import { CompositeGeneratorNode, NL, toString } from 'langium';


import {
    ASTCreationParameter,
    ASTCreationParameters,
    ASTCreationParameterType,
    ASTHideParameter,
    ASTInstruction,
    ASTNumber,
    ASTNumberOffset,
    ASTParameter,
    ASTParameters,
    ASTParameterType,
    ASTReplayTarget,
    ASTSaturationParameter,
    ASTSaturationParameters,
    ASTSaturationParameterType,
    ASTScenario,
    ASTSpeedParameter,
    ASTSpeedParameters,
    ASTSpeedParameterType,
    ASTTarget,
    ASTTime,
    ASTTimeScope,
    ASTTrajectory,
    ASTValue,
    ASTWayPoint,
    ASTWayPoints,
    isASTAllPlanes,
    isASTAlter,
    isASTAlterSpeed,
    isASTAt,
    isASTCreate,
    isASTHide,
    isASTIntegerValue,
    isASTNumber,
    isASTNumberOffset,
    isASTParamEdit,
    isASTParamNoise,
    isASTParamOffset,
    isASTReplay,
    isASTSaturate,
    isASTTime,
    isASTTrajectory,
    isASTAllPlaneFrom,
    isASTDelay,
    ASTDelayParameter,
    isASTRotate,
    ASTRotateParameter
} from "../language-server/generated/ast";
import {Action, Altitude, Parameter, Parameters, Scope, Sensors, Target, Trajectory, Vertex, Waypoint} from "../types";



const VALEUR_TIME_DEFAULT = 22000;
const CHEMIN_TEMP_DIRECTORY_SERVER = "temp/";


export function generateCommands(scenario: ASTScenario, fileName : string): Parameters | undefined {
    return generateStatements(scenario, fileName);
}


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
}


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
    speedAltaration = 'ALTERATIONSPEED',
    trajectory = 'TRAJECTORY'
    
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

enum SpeedParametreType{
    east_west_velocity = 'EAST_WEST_VELOCITY',
    north_south_velocity = 'NORTH_SOUTH_VELOCITY'
}

enum SaturationParametreType {
    icao = "ICAO",
    aircraft_number = 'AIRCRAFT_NUMBER'
}

function evalInstructions(instrs : ASTInstruction[]) : Action[]{
    
    return (instrs.flatMap(i => evalInstr(i)).filter(i => i !== undefined) as Action[])

    
    

}

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
    }else if(isASTTrajectory(instr)){
        return {
            alterationType : ActionType.trajectory,
            scope : evalTimeScope(instr.timeScope),
            parameters : {
                target : evalTarget(instr.target),
                trajectory : evalTrajectory(instr.trajectory),

            }
        }
    }else if(isASTAlterSpeed(instr)){
        return {
            alterationType : ActionType.speedAltaration,
            scope : evalTimeScope(instr.timeScope),
            parameters : {
                target : evalTarget(instr.target),
                parameter : evalSpeedParameters(instr.parameters)
            }
        }
    }else if(isASTSaturate(instr)) {
        return {
            alterationType: ActionType.saturation,
            scope: evalTimeScope(instr.timeScope),
            parameters: {
                target: evalTarget(instr.target),
                parameter: evalSaturationParameters(instr.parameters)
            }
        }
    }else if(isASTReplay(instr)){
            return {
                alterationType : ActionType.replay,
                scope : evalTimeScope(instr.timeScope),
                parameters : {
                    target : evalReplayTarget(instr.target),
                }
            }
    }else if(isASTDelay(instr)){
        return {
            alterationType : ActionType.timestamp,
            scope : evalTimeScope(instr.timeScope),
            parameters : {
                target : evalTarget(instr.target),
                parameter : [ evalDelayParameter(instr.delay) ]
            }
        }
    }else if(isASTRotate(instr)){
        return {
            alterationType : ActionType.rotation,
            scope : evalTimeScope(instr.timeScope),
            parameters : {
                target : evalTarget(instr.target),
                parameter : [ evalRotateParameter(instr.angle) ]
            }
        }
    }else {
        return {
            alterationType : ActionType.cut,
            scope : evalTimeScope(instr.timeScope),
            parameters : {
                target : evalTarget(instr.target)
            }
        }
    }
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

function evalReplayTarget(t : ASTReplayTarget) : Target{

    if(isASTAllPlaneFrom(t)){
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
        mode : "simple",
        key : evalCreationParametreType(pm.name),
        value : (pm.value.content.toString().replace('"','')).replace('"','')
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

function evalSpeedParameters(param : ASTSpeedParameters) : Parameter[]{
    return evalSpeedParameter(param.items);
}

function evalSpeedParameter(pm : ASTSpeedParameter[]) : Parameter[]{
    let params : Parameter[]=[];
    for(let i = 0 ; i<pm.length;i++){
        params.push(evalOneSpeedParameter(pm[i]));
    }
    return params;
}

function evalOneSpeedParameter(pm : ASTSpeedParameter) : Parameter{
    return {
        mode : "simple",
        key : evalSpeedParametreType(pm.name),
        value : (pm.value.content.toString().replace('"','')).replace('"','')
    }
}

function evalSpeedParametreType(pm : ASTSpeedParameterType) : string | undefined{
    if(pm.EAST_WEST_VELOCITY != undefined){
        return SpeedParametreType.east_west_velocity;
    }else if(pm.NORTH_SOUTH_VELOCITY != undefined){
        return SpeedParametreType.north_south_velocity;
    }


}


function evalSaturationParameters(param : ASTSaturationParameters) : Parameter[]{
    return evalSaturationParameter(param.items);
}

function evalSaturationParameter(pm : ASTSaturationParameter[]) : Parameter[]{
    let params : Parameter[]=[];
    for(let i = 0 ; i<pm.length;i++){
        params.push(evalOneSaturationParameter(pm[i]));
    }
    return params;
}

function evalOneSaturationParameter(pm : ASTSaturationParameter) : Parameter{
    return {
        mode : "simple",
        number : evalSaturationParametreType(pm.name),
        value : (pm.value.content.toString().replace('"','')).replace('"','')
    }
}

function evalSaturationParametreType(pm : ASTSaturationParameterType) : string | undefined{
    if(pm.ICAO != undefined){
        return SaturationParametreType.icao;
    }else if(pm.AIRCRAFT_NUMBER != undefined){
        return SaturationParametreType.aircraft_number;
    }


}

function evalDelayParameter(pm : ASTDelayParameter) : Parameter{
    return {
        mode : "simple",
        value : evalTime(pm.value)

    }
}

function evalRotateParameter(pm : ASTRotateParameter) : Parameter{
    return {
        mode : "simple",
        angle : "angle",
        value : evalValue(pm.value)

    }
}
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
function evalFrequency(hp : ASTHideParameter | undefined) : string {
    if (hp != undefined) {
        return hp.value.content.toString();
    } else {
        return "";
    }
}