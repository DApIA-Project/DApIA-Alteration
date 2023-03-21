import {AlterRecordingError, AlterRecordingResponse} from '@smartesting/shared/dist/responses'
import {
    countScenarioNumber,
    createAllScenario,
    get_variables,
    parseAndGenerate
} from '@smartesting/fdit-scenario/dist/web'
import {Declarations} from "@smartesting/fdit-scenario/dist/types_variables";
import fs from "fs";
import {execSync} from "child_process";

export default async function alterRecording(scenario: string, fileContent: string, fileName: string, fileContent2: string, fileName2: string): Promise<AlterRecordingResponse> {
    const alteredScenario = await generateJsonAndAlterate(scenario, fileContent, fileName, fileContent2, fileName2);
    if (alteredScenario == undefined) {
        return {
            alteredRecording: null,
            newfileName: undefined,
            filesToRemove : undefined,
            error: AlterRecordingError.invalidSyntax
        }
    }
    return {
        alteredRecording: JSON.stringify(alteredScenario.scenario),
        newfileName : alteredScenario.newfileName,
        filesToRemove : alteredScenario.filesToRemove,
        error: null
    }
}

/**
 * Generation of Json scenario and creation of altered recording
 * @param scenario scenario program to parse
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param fileContent2 Content of file 2 will be use for alteration (OPTIONAL)
 * @param fileName2 Name of file 2 will be use for alteration (OPTIONAL)
 * @returns Generated output from this FDIT program
 */
export const generateJsonAndAlterate = (async (scenario: string, fileContent: string, fileName: string, fileContent2: string, fileName2: string): Promise<{ scenario?: {}, newfileName? : string, filesToRemove? : string[],error?: string } | undefined> => {
    /** Recuperation de variables sous format JSON **/
    const variablesJson : Declarations | undefined = await get_variables(scenario);
    let file_to_remove : string[] = [];
    console.log(variablesJson?.declarations);
    /** Si variableJson est defini alors existence de variable **/
    if(variablesJson!.declarations.length != 0 && variablesJson != undefined){
        /** Compte le nombre de scénario possibles **/
        let nb_scenario : number = 1;
        for(let i=0; i< variablesJson.declarations.length;i++){
            nb_scenario = nb_scenario * await countScenarioNumber(scenario, variablesJson.declarations[i]);
        }
        /** Creation de tous les scenarios possibles (format scenario) **/
        const liste_scenario : string[] = createAllScenario(scenario,variablesJson,nb_scenario);
        let scenarioOne = undefined;
        let fileNameToReturn = "";
        /** Pour chaque scenario, parse du scenario, creation de fichier et alteration **/
        for(let i=0; i< liste_scenario.length;i++){
            let index_filename = fileName.indexOf(".");
            let newfileName = fileName.substring(0,index_filename)+"_"+i+fileName.substring(index_filename);
            const scenarioJson = await parseAndGenerate(liste_scenario[i], newfileName, fileContent);
            /** Créé un fichier JSON du scenario envoyé **/
            if (scenarioJson == undefined) {
                await fs.promises.writeFile("temp/scenario_"+i+".json", JSON.stringify({}, null, 2));
                file_to_remove.push("scenario_"+i+".json");
                return scenarioJson;
            } else {
                if(i==0){
                    scenarioOne=scenarioJson;
                    fileNameToReturn=newfileName;
                }
                file_to_remove.push("modified__"+newfileName);
                file_to_remove.push("scenario_"+i+".json");
                await fs.promises.writeFile("temp/scenario_"+i+".json", JSON.stringify(scenarioJson, null, 2));
            }

            await fs.promises.writeFile("temp/"+newfileName,fileContent);
            if(fileName2 != ''){
                let index_filename2 = fileName2.indexOf(".");
                let newfileName2 = fileName2.substring(0,index_filename2)+"_"+i+fileName2.substring(index_filename2);
                await fs.promises.writeFile("temp/"+newfileName2,fileContent2);
                file_to_remove.push(newfileName2);
            }

            executeAlterationJar(fileContent, newfileName,"temp/scenario_"+i+".json");

            fs.unlink("temp/"+newfileName,(err) =>{
                if(err){
                    console.error(err);
                }else{
                    console.log("Le fichier "+newfileName+" a été supprimé.");
                }
            })
        }

        return { scenario : scenarioOne, newfileName : fileNameToReturn, filesToRemove : file_to_remove};
    }else{
        /** Pas de variables donc parse du scenario, creation des fichiers et altération **/
        const scenarioJson = await parseAndGenerate(scenario, fileName, fileContent);
        /** Créé un fichier JSON du scenario envoyé **/
        if (scenarioJson == undefined) {
            await fs.promises.writeFile("temp/scenario.json", JSON.stringify({}, null, 2));
            file_to_remove.push("scenario.json");
            return scenarioJson;
        } else {
            await fs.promises.writeFile("temp/scenario.json", JSON.stringify(scenarioJson, null, 2));
            file_to_remove.push("scenario.json");
        }

        await fs.promises.writeFile("temp/"+fileName,fileContent);
        if(fileName2 != ''){
            await fs.promises.writeFile("temp/"+fileName2,fileContent2);
            file_to_remove.push(fileName2);
        }

        file_to_remove.push("modified__"+fileName);

        executeAlterationJar(fileContent, fileName,"temp/scenario.json");

        fs.unlink("temp/"+fileName,(err) =>{
            if(err){
                console.error(err);
            }else{
                console.log("Le fichier "+fileName+" a été supprimé.");
            }
        })
        return {scenario : scenarioJson,newfileName : fileName, filesToRemove : file_to_remove};
    }
});

/**
 * Execution of Java Alteration program
 * @param fileContent Content of file will be altered
 * @param fileName Name of file will be altered
 * @param path_scenario Path of scenario which will be applied on recording
 * @returns void
 */
function executeAlterationJar(fileContent: string, fileName: string, path_scenario : string): void {
    execSync("java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar " +path_scenario+ " " + fileName);
}