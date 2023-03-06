import {AlterRecordingError, AlterRecordingResponse} from '@smartesting/shared/dist/responses'
import {parseAndGenerate} from '@smartesting/fdit-scenario/dist/web'
import fs from "fs";
import {execSync} from "child_process";

export default async function alterRecording(scenario: string, fileContent: string, fileName: string): Promise<AlterRecordingResponse> {

    const alteredScenario = await generateJsonAndAlterate(scenario, fileContent, fileName);
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


export const generateJsonAndAlterate = (async (scenario: string, fileContent: string, fileName: string): Promise<{ error?: string } | undefined> => {

    const scenarioJson = await parseAndGenerate(scenario, fileName, fileContent);
    /** Créé un fichier JSON du scenario envoyé **/
    if (scenarioJson == undefined) {
        await fs.promises.writeFile("temp/scenario.json", JSON.stringify({}, null, 2));
        return scenarioJson;
    } else {
        await fs.promises.writeFile("temp/scenario.json", JSON.stringify(scenarioJson, null, 2));
    }
    executeAlterationJar(fileContent, fileName);
    return scenarioJson;

});


function executeAlterationJar(fileContent: string, fileName: string): void {

    execSync("java -jar ../alteration/out/artifacts/alteration_atc_jar/alteration-atc.jar temp/scenario.json " + fileName);
}