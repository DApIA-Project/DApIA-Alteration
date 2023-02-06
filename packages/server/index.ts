"use strict";
import express from 'express';
import cors from 'cors';
import {parseAndGenerate} from '@smartesting/fdit-scenario/src/web';
import * as fs from 'fs';
import {exec} from 'child_process';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/data', async (req, res) => {
  const scenario = req.body.scenario;
  const nom_fichier = req.body.nom_fichier;
  const dslCmds = await generateAndDisplay(scenario,nom_fichier);
  console.log(JSON.stringify(dslCmds));
  res.json(dslCmds);




});

export const generateAndDisplay = (async (scenario : string, nom_fichier : string) : Promise<{} | undefined> => {
    console.info('generating & running current code...');
    // parse & generate commands for drawing an image
    // execute custom LSP command, and receive the response
    const dslCmds = await parseAndGenerate(scenario, "",nom_fichier,"");
    fs.writeFileSync("public/test.json",JSON.stringify(dslCmds));

    executeAlterationJar();

    return Promise.resolve(dslCmds);

    //updateDslCanvas(dslCmds);
});

function executeAlterationJar() : void {
  exec("java -jar C:\\Users\\morga\\Documents\\Programmation\\FDI-T-Web2\\packages\\alteration\\out\\artifacts\\alteration_atc_jar\\alteration-atc.jar C:\\Users\\morga\\Documents\\Programmation\\FDI-T-Web2\\packages\\server\\public\\test.json", (error, stdout, stderr) => {
    if (error) {
        console.error(`L'exécution a échoué : ${error}`);
        return;
    }
    console.log(`Sortie : ${stdout}`);
});
}



app.listen(3001, () => console.log('Server started on port 3001'));
