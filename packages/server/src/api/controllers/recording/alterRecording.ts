import { RequestHandler } from "express";
const alterRecording : RequestHandler = async (req, res) => {
    const scenario = req.body.scenario;
    const nom_fichier = req.body.nom_fichier;

    /*const dslCmds = await generateAndDisplay(scenario,nom_fichier);
    console.log(JSON.stringify(dslCmds));*/
    res.json({});
  }