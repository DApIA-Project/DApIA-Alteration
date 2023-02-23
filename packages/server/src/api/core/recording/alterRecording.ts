import {AlterRecordingError, AlterRecordingResponse} from '@smartesting/shared/dist/responses'
import {parseAndGenerate} from '@smartesting/fdit-scenario/dist/web'
import fs from "fs";
import {exec} from "child_process";

export default async function alterRecording(scenario: string, fileContent: string, fileName : string): Promise<AlterRecordingResponse> {

    const alteredScenario = await generateJsonAndAlterate(scenario,fileContent, fileName);
    if(alteredScenario == undefined){
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


export const generateJsonAndAlterate = (async (scenario : string, fileContent : string, fileName : string) : Promise<{} | undefined> => {
    console.info('generating & running current code...');
    const scenarioJson = await parseAndGenerate(scenario,fileName);

    /** Créé un fichier JSON du scenario envoyé **/
    if(scenarioJson == undefined){
        fs.writeFileSync("temp/scenario.json",JSON.stringify({}, null, 2));
    }else{
        fs.writeFileSync("temp/scenario.json",JSON.stringify(scenarioJson, null, 2));
    }

    fs.writeFileSync("temp/"+fileName,fileContent);
    executeAlterationJar(fileContent,fileName);
    return Promise.resolve(scenarioJson);

});



function executeAlterationJar(fileContent : string, fileName : string) : void {
    exec("java -version");
    exec("java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar temp/scenario.json " + fileName, (error, stdout, stderr) => {
    if (error) {
        console.error(`L'exécution a échoué : ${error}`);
        return;
    }
    console.log(`Sortie : ${stdout}`);
});
}