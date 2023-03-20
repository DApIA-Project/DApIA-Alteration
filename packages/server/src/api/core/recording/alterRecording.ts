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
            error: AlterRecordingError.invalidSyntax
        }
    }

    return {
        alteredRecording: JSON.stringify(alteredScenario),
        error: null
    }
}


export const generateJsonAndAlterate = (async (scenario: string, fileContent: string, fileName: string, fileContent2: string, fileName2: string): Promise<{ error?: string } | undefined> => {

    const variablesJson : Declarations | undefined = await get_variables(scenario);
    if(variablesJson != undefined){
        //Nombre scenario depend du nombre d'utilisation de variable et des valeurs possibles voir fichier
        //C:\Users\morga\Documents\Programmation\fdit-atc\test-application\src\test\java\fdit\gui\scenarioEditor\ScenarioCombinationInterpreterTest.java
        let nb_scenario : number = 1;
        for(let i=0; i< variablesJson.declarations.length;i++){
            nb_scenario = nb_scenario * await countScenarioNumber(scenario, variablesJson.declarations[i]);
        }
        console.log("NOMBRE DE SCENARIO : "+ nb_scenario);
        const liste_scenario : string[] = createAllScenario(scenario,variablesJson,nb_scenario);
        console.log(liste_scenario);

        for(let i=0; i< liste_scenario.length;i++){
            let index_filename = fileName.indexOf(".");
            let newfileName = fileName.substring(0,index_filename)+"_"+i+fileName.substring(index_filename);
            const scenarioJson = await parseAndGenerate(liste_scenario[i], newfileName, fileContent);
            /** Créé un fichier JSON du scenario envoyé **/
            if (scenarioJson == undefined) {
                await fs.promises.writeFile("temp/scenario_"+i+".json", JSON.stringify({}, null, 2));
                return scenarioJson;
            } else {
                await fs.promises.writeFile("temp/scenario_"+i+".json", JSON.stringify(scenarioJson, null, 2));
            }

            await fs.promises.writeFile("temp/"+newfileName,fileContent);
            if(fileName2 != ''){
                let index_filename2 = fileName2.indexOf(".");
                let newfileName2 = fileName2.substring(0,index_filename2)+"_"+i+fileName2.substring(index_filename2);
                await fs.promises.writeFile("temp/"+newfileName2,fileContent2);
            }
            console.log(scenarioJson);

            executeAlterationJar(fileContent, newfileName,"temp/scenario_"+i+".json");

            /*fs.unlink("temp/"+fileName+"_"+i,(err) =>{
                if(err){
                    console.error(err);
                }else{
                    console.log("Le fichier "+fileName+"_"+i+" a été supprimé.");
                }
            })*/
        }

        return undefined;
    }


    const scenarioJson = await parseAndGenerate(scenario, fileName, fileContent);
    /** Créé un fichier JSON du scenario envoyé **/
    if (scenarioJson == undefined) {
        await fs.promises.writeFile("temp/scenario.json", JSON.stringify({}, null, 2));
        return scenarioJson;
    } else {
        await fs.promises.writeFile("temp/scenario.json", JSON.stringify(scenarioJson, null, 2));
    }

    await fs.promises.writeFile("temp/"+fileName,fileContent);
    if(fileName2 != ''){
        await fs.promises.writeFile("temp/"+fileName2,fileContent2);
    }

    executeAlterationJar(fileContent, fileName,"temp/scenario.json");

    fs.unlink("temp/"+fileName,(err) =>{
        if(err){
            console.error(err);
        }else{
            console.log("Le fichier "+fileName+" a été supprimé.");
        }
    })
    return scenarioJson;

});


function executeAlterationJar(fileContent: string, fileName: string, path_scenario : string): void {

    execSync("java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar " +path_scenario+ " " + fileName);

}