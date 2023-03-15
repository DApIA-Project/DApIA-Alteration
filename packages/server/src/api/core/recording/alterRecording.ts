import {AlterRecordingError, AlterRecordingResponse} from '@smartesting/shared/dist/responses'
import {parseAndGenerate} from '@smartesting/fdit-scenario/dist/web'
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
    console.log("here")
    const scenarioJson = await parseAndGenerate(scenario, fileName, fileContent);
    console.log("here2")
    /** Créé un fichier JSON du scenario envoyé **/
    if (scenarioJson == undefined) {
        await fs.promises.writeFile("temp/scenario.json", JSON.stringify({}, null, 2));
        return scenarioJson;
    } else {
        await fs.promises.writeFile("temp/scenario.json", JSON.stringify(scenarioJson, null, 2));
    }
    console.log("here3")

    await fs.promises.writeFile("temp/"+fileName,fileContent);
    console.log("here4")
    if(fileName2 != ''){
        await fs.promises.writeFile("temp/"+fileName2,fileContent2);
    }

    console.log("here5")
    executeAlterationJar(fileContent, fileName);
    console.log("here6")

    fs.unlink("temp/"+fileName,(err) =>{
        if(err){
            console.error(err);
        }else{
            console.log("Le fichier "+fileName+" a été supprimé.");
        }
    })
    console.log("here7")
    return scenarioJson;

});


function executeAlterationJar(fileContent: string, fileName: string): void {

    execSync("java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar temp/scenario.json " + fileName);

}