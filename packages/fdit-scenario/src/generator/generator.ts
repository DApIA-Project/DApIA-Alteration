
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
    ASTRotateParameter,
    isASTWindow,
    isASTParameter,
    isASTHideParameter,
    isASTParameters,
    isASTCreationParameters,
    isASTStringValue,
    isASTVariableValue,
    ASTStringValue,
    ASTVariableValue,
    ASTConstantValue,
    isASTLeftShift,
    ASTLeftShift,
    ASTRightShift,
    isASTDoubleValue,
    ASTRecordingParameterType,
    isASTAtFor,
    isASTParamDrift,
    isASTRecordingValue, isASTAlterAndTrajectory, isASTInstruction, isASTReplayTarget
} from "../language-server/generated/ast";
import {Action, Altitude, Parameter, Parameters, Scope, Sensors, Target, Trajectory, Vertex, Waypoint} from "../types";

export function generateCommands(scenario: ASTScenario, fileName : string, fileContent : string): Parameters | undefined {
    return generateStatements(scenario, fileName, fileContent);
}


function generateStatements(scenar: ASTScenario, fileName : string, fileContent : string):  Parameters | undefined {
    //let env : DslGenEnv = new Map<string,number>();
    
    return {sensors : evalScenario(scenar, fileName, fileContent)};
    
}

function evalScenario(scenar : ASTScenario, fileName : string, fileContent : string) : Sensors{
        
        return {
            sensor: [{
                sensorType: "SBS",
                sID: '',
                record: fileName,
                firstDate : evalFirstDate(fileContent),
                filter: '',
                action: evalInstructions(scenar.instructions, fileContent),
                
                
                
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
    icao = 'hexIdent',
    track = 'track',
    callsign = 'callsign',
    emergency = 'emergency',
    groundspeed = 'groundSpeed',
    longitude = 'longitude',
    spi = 'SPI',
    squawk = 'squawk'

}
enum CreationParametreType {
    icao = 'hexIdent',
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

enum RecordingParametreType {
    rec_duration = "REC_DURATION",
    alt_duration = "ALT_DURATION",
    rec_nbr_aircraft = "REC_NBR_AIRCRAFT"
}

function evalInstructions(instrs : ASTInstruction[], fileContent : string) : Action[]{
    return (instrs.flatMap(i => evalInstr(i, fileContent)).filter(i => i !== undefined) as Action[]);
}

function evalInstr(instr : ASTInstruction, fileContent : string) : Action | undefined{



        if (isASTHide(instr)) {
            if (!isASTHideParameter(instr.frequency)) {
                return {
                    alterationType: ActionType.deletion,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: evalTarget(instr.target)
                    },
                }
            } else {
                return {
                    alterationType: ActionType.deletion,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: evalTarget(instr.target),
                        parameter: [
                            {
                                mode: "simple",
                                frequency: evalFrequency(instr.frequency)
                            }
                        ]
                    },
                }
            }
        } else if (isASTAlterAndTrajectory(instr)) {
            if (isASTAlter(instr.mode)) {
                return {
                    alterationType: ActionType.alteration,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: evalTarget(instr.target),
                        parameter: evalParameters(instr.mode.parameters)
                    },
                }
            } else {
                return {
                    alterationType: ActionType.trajectory,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: evalTarget(instr.target),
                        trajectory: evalTrajectory(instr.mode.trajectory),
                    }
                }
            }

        } else if (isASTCreate(instr)) {
            if (!isASTCreationParameters(instr.parameters)) {
                return {
                    alterationType: ActionType.creation,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: {
                            identifier: "hexIdent",
                            value: "ALL"
                        },
                        trajectory: evalTrajectory(instr.trajectory),
                    }
                }
            } else {
                return {
                    alterationType: ActionType.creation,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: {
                            identifier: "hexIdent",
                            value: "ALL"
                        },
                        trajectory: evalTrajectory(instr.trajectory),
                        parameter: evalCreationParameters(instr.parameters)
                    }
                }
            }
        } else if (isASTAlterSpeed(instr)) {
            return {
                alterationType: ActionType.speedAltaration,
                scope: evalTimeScope(instr.timeScope, fileContent),
                parameters: {
                    target: evalTarget(instr.target),
                    parameter: evalSpeedParameters(instr.parameters)
                }
            }
        } else if (isASTSaturate(instr)) {
            return {
                alterationType: ActionType.saturation,
                scope: evalTimeScope(instr.timeScope, fileContent),
                parameters: {
                    target: evalTarget(instr.target),
                    parameter: evalSaturationParameters(instr.parameters)
                }
            }
        } else if (isASTReplay(instr)) {
            if (!isASTParameters(instr.parameters)) {
                    return {
                        alterationType: ActionType.replay,
                        scope: evalTimeScope(instr.timeScope, fileContent),
                        parameters: {
                            target: evalReplayTarget(instr.target),
                            recordPath: "temp/" + evalValue(instr.target.recording)
                        }
                    }




            } else {
                return {
                    alterationType: ActionType.replay,
                    scope: evalTimeScope(instr.timeScope, fileContent),
                    parameters: {
                        target: evalReplayTarget(instr.target),
                        recordPath: "temp/" + evalValue(instr.target.recording),
                        parameter: evalParameters(instr.parameters)
                    }
                }


            }
        } else if (isASTDelay(instr)) {
            return {
                alterationType: ActionType.timestamp,
                scope: evalTimeScope(instr.timeScope, fileContent),
                parameters: {
                    target: evalTarget(instr.target),
                    parameter: evalDelayParameter(instr.delay)
                }
            }
        } else if (isASTRotate(instr)) {
            return {
                alterationType: ActionType.rotation,
                scope: evalTimeScope(instr.timeScope, fileContent),
                parameters: {
                    target: evalTarget(instr.target),
                    parameter: evalRotateParameter(instr.angle)
                }
            }
        } else {
            return {
                alterationType: ActionType.cut,
                scope: evalTimeScope(instr.timeScope, fileContent),
                parameters: {
                    target: evalTarget(instr.target)
                }
            }
        }

}

function evalTimeScope(ts : ASTTimeScope,fileContent : string) : Scope{
    if(isASTAt(ts)) {
        if(isASTAtFor(ts.for)){
            return {
                type : "timeWindow",
                lowerBound : (parseInt(evalTime(ts.time))*1000).toString(),
                upperBound : ((parseInt(evalTime(ts.time)) + parseInt(evalTime(ts.for.for))) * 1000).toString()
            }
        }else{
            return {
                type: "timeWindow",
                lowerBound: (parseInt(evalTime(ts.time) )* 1000).toString(),
                upperBound: (evalLastDate(parseInt(evalTime(ts.time)),fileContent)).toString()
            }
        }

    }else{
        return {
            type : "timeWindow",
            lowerBound : (parseInt(evalTime(ts.start))*1000).toString(),
            upperBound : (parseInt(evalTime(ts.end))*1000).toString()
        }

    }
    
        
    
}

function evalTime(t : ASTTime) : string {
    return evalValue(t.realTime);
}

function evalValue(v : ASTValue) : string {
    if(isASTNumberOffset(v)){
        return (evalNumberOffset(v).replace('"','')).replace('"','');
    }else if(isASTStringValue(v)){
        return (evalStringValue(v).replace('"','')).replace('"','');
    }else if(isASTVariableValue(v)){
        return (evalVariableValue(v).replace('"','')).replace('"','');
    }else{
        return (evalConstantValue(v).replace('"','')).replace('"','');
    }
    
        
    
}

function evalNumberOffset(n : ASTNumberOffset) : string {
    if(isASTNumber(n)){
        return evalNumber(n);
    } else if(isASTLeftShift(n)) {
        return evalLeftShift(n);
    } else {
        return evalRightShift(n);
    }

}

function evalStringValue(n : ASTStringValue) : string {
    return n.content;

}

function evalVariableValue(n : ASTVariableValue) : string {
    return n.content;

}
function evalConstantValue(n : ASTConstantValue) : string {
    return n.content;

}


function evalNumber(n : ASTNumber) : string {
    if(isASTIntegerValue(n)){
        return (n.content).toString();
    }else {
        if (isASTRecordingValue(n.record)) {
            return n.content.toString()+evalRecordingParameterType(n.record.content);
        } else {
            return (n.content).toString();
        }
    }

}

function evalLeftShift(n : ASTLeftShift) : string {
    return evalNumber(n.content);
}

function evalRightShift(n : ASTRightShift) : string {
    return evalNumber(n.content);
}

function evalRecordingParameterType(n : ASTRecordingParameterType) : string{
    if(n.REC_DURATION != undefined){
        return RecordingParametreType.rec_duration;
    }else if(n.ALT_DURATION != undefined){
        return RecordingParametreType.alt_duration;
    }else {
        return RecordingParametreType.rec_nbr_aircraft;
    }
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
                    value : "random"
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
            value : "random"
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
        time : parseInt(evalTime(wp.time))*1000
    }
}

function evalVertex(lat : ASTValue, long : ASTValue) : Vertex {
    return {
        lat :{
            value: evalValue(lat),
            offset : false
        },
        lon :{
            value: evalValue(long),
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
        key : evalCreationParameterType(pm.name),
        value : evalValue(pm.value)
    }
}

function evalCreationParameterType(pm : ASTCreationParameterType) : string | undefined{
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
        value : evalValue(pm.value)
    }
}

function evalSpeedParametreType(pm : ASTSpeedParameterType) : string | undefined{
    if(pm.EAST_WEST_VELOCITY != undefined){
        return SpeedParametreType.east_west_velocity;
    }else {
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
    if(evalSaturationParametreType(pm.name)=="ICAO"){
        return {
            mode : "simple",
            key: evalSaturationParametreType(pm.name),
            value : evalValue(pm.value)
        }
    }else{
        return {
            mode : "simple",
            key: evalSaturationParametreType(pm.name),
            number : evalValue(pm.value)
        }
    }

}

function evalSaturationParametreType(pm : ASTSaturationParameterType) : string | undefined{
    if(pm.ICAO != undefined){
        return SaturationParametreType.icao;
    }else {
        return SaturationParametreType.aircraft_number;
    }


}

function evalDelayParameter(pm : ASTDelayParameter) : Parameter[]{
    return [{
        mode : "simple",
        key : "timestamp",
        value : (parseInt(evalTime(pm.value))*1000).toString()

    }]
}

function evalRotateParameter(pm : ASTRotateParameter) : Parameter[]{
    return [{
        mode : "simple",
        key : "angle",
        angle : evalValue(pm.value)

    }]
}
function evalParameters(param : ASTParameters) : Parameter[]{

    return evalParameter(param.items);


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
            value : evalValue(pm.value),
            
        }
    }else if(isASTParamOffset(pm)){
        if(pm.offset_op=="+="){
            return {
                mode : "offset",
                key : evalParametreType(pm.name),
                value : "+"+evalValue(pm.value),

            }
        }else{
            return {
                mode : "offset",
                key : evalParametreType(pm.name),
                value : "-"+evalValue(pm.value),

            }
        }


    }else if(isASTParamNoise(pm)){
        return {
            mode : "noise",
            key : evalParametreType(pm.name),
            value : evalValue(pm.value),
            
        }
    }else {
        if(isASTParamDrift(pm)){
            if(pm.drift_op=="++="){
                return {
                    mode : "drift",
                    key : evalParametreType(pm.name),
                    value : "+"+evalValue(pm.value),

                }
            }
        }
        return {
            mode : "drift",
            key : evalParametreType(pm.name),
            value : "-"+evalValue(pm.value),

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
function evalFrequency(hp : ASTHideParameter) : string {
    return evalValue(hp.value);
}

function evalFirstDate(fileContent : string){
    // Lire le fichier .sbs
    const lines = fileContent.split('\n');

// Extraire la ligne contenant la date et l'heure
    const firstLine = lines[0];
    const parts = firstLine.split(',');

// Convertir la date et l'heure en objet Date TypeScript

    const date = new Date(parts[6].replaceAll('/','-')+"T"+parts[7]);
    const timestamp = Date.parse(parts[6]+','+parts[7]+ ' GMT');
    /*
    const dateParts = parts[6].split('/');
    const timeParts = parts[7].split(':');
    const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]), parseFloat(timeParts[2]));
    */
// Obtenir le timestamp à partir de l'objet Date
  //  const timestamp = date.getTime();
    return timestamp;
}

function evalLastDate(atSeconds : number, fileContent : string){
    // Lire le fichier .sbs
    const lines = fileContent.split('\n');

// Extraire la ligne contenant la date et l'heure
    let lastLine = lines[lines.length - 1];

    const parts = lastLine.split(',');

// Convertir la date et l'heure en objet Date TypeScript

    const timestamp = Date.parse(parts[6]+','+parts[7]+ ' GMT');

    const timeRecording = timestamp - evalFirstDate(fileContent);

    return timeRecording - (atSeconds*1000)
}

