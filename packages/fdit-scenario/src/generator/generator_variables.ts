import {
    ASTDeclaration,
    ASTInstruction,
    ASTLeftShift,
    ASTList,
    ASTListDeclaration,
    ASTNumber,
    ASTNumberOffset,
    ASTRange,
    ASTRangeDeclaration, ASTRecordingParameterType, ASTRightShift,
    ASTScenario,
    isASTDeclaration,
    isASTIntegerValue,
    isASTLeftShift,
    isASTListDeclaration,
    isASTNumber,
    isASTNumberOffset,
    isASTRangeDeclaration,
    isASTRecordingValue
} from "../language-server/generated/ast";
import {Declaration, Declarations} from "../types_variables";



enum RecordingParametreType {
    rec_duration = "REC_DURATION",
    alt_duration = "ALT_DURATION",
    rec_nbr_aircraft = "REC_NBR_AIRCRAFT"
}

export function generateVariables(scenario: ASTScenario): Declarations {

    return generateStatements(scenario);
}

function generateStatements(scenar: ASTScenario):  Declarations {
        return evalScenario(scenar);

}

function evalScenario(scenar : ASTScenario) : Declarations {
    return {declarations : evalDeclarations(scenar.declarations)};
}
function evalDeclarations(decls : ASTDeclaration[]) : Declaration[] {
    return (decls.flatMap(i => evalDecl(i)).filter(i => i !== undefined) as Declaration[]);
}

function evalDecl(decl : ASTDeclaration) : Declaration | undefined {

    if(isASTRangeDeclaration(decl)){
        return {
            variable : decl.constant,
            values_range : evalRangeDeclaration(decl),
        }
    }else if(isASTListDeclaration(decl)){
        return {
            variable : decl.constant,
            values_list : evalListDeclaration(decl)
        }
    }
    return undefined;
}

function evalRangeDeclaration(range : ASTRangeDeclaration) : number[] {
    return [range.range.range.start,range.range.range.end]
}

function evalListDeclaration(list : ASTListDeclaration) : (number | string)[] {
    let values : (number |string)[]=[];
    let items = list.list.list.items;
    for(let i = 0 ; i<items.length;i++){
        values.push(evalOneValue(items[i]));
    }
    return values;
}


function evalOneValue(val : ASTNumberOffset | string) : number | string {
    if(isASTNumberOffset(val)){
        return evalNumberOffset(val)
    }else{
        return (val.replace('"','')).replace('"','');
    }
}

function evalNumberOffset(n : ASTNumberOffset) : number | string {
    if(isASTNumber(n)){
        return evalNumber(n);
    } else if(isASTLeftShift(n)) {
        return evalLeftShift(n);
    } else {
        return evalRightShift(n);
    }

}

function evalNumber(n : ASTNumber) : number | string {
    if(isASTIntegerValue(n)){
        return n.content;
    }else {
        if (isASTRecordingValue(n.record)) {
            return evalRecordingParameterType(n.record.content);
        } else {
            return n.content;
        }
    }

}

function evalLeftShift(n : ASTLeftShift) : string | number {
    return evalNumber(n.content);
}

function evalRightShift(n : ASTRightShift) : string | number {
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