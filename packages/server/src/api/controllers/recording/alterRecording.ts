import {RequestHandler} from "express";
import {AlterRecordingError} from '@smartesting/shared/dist/responses'
import alterRecordingCore from '../../core/recording/alterRecording'
import * as fs from 'fs'

const alterRecording: RequestHandler = async (req, res) => {

    const {scenario, fileContent, fileName, fileContent2, fileName2} = req.body;
    console.log(req.body);
    if (isBlank(scenario) || isBlank(fileContent) || isBlank(fileName)) {
        return res.status(422).json({error: AlterRecordingError.invalidFormat})
    }
    if(!isValidExtension(fileName)){
        return res.status(422).json({error: AlterRecordingError.invalidFormat})
    }

    if(fileContent2 != '' && fileName2 != ''){

        if(isBlank(fileName2) || isBlank(fileContent2)){
            return res.status(422).json({error: AlterRecordingError.invalidFormat});
        }
        if(!isValidExtension(fileName2)){
            return res.status(422).json({error: AlterRecordingError.invalidFormat})
        }
    }
    const response = await alterRecordingCore(scenario, fileContent, fileName, fileContent2, fileName2)
    if(response.error != null){
        return res.status(422).json({error: AlterRecordingError.invalidSyntax})
    }

    const data = await fs.promises.readFile('./temp/modified__'+fileName);

    fs.unlink("temp/modified__"+fileName,(err) =>{
        if(err){
            console.error(err);
        }else{
            console.log("Le fichier modified__"+fileName+" a été supprimé.");
        }
    })
    fs.unlink("temp/scenario.json",(err) =>{
        if(err){
            console.error(err);
        }else{
            console.log("Le fichier scenario.json a été supprimé.");
        }
    })

    if(fileName2 != ''){
        fs.unlink("temp/"+fileName2,(err) =>{
            if(err){
                console.error(err);
            }else{
                console.log("Le fichier "+ fileName2 +" a été supprimé.");
            }
        })
    }

    res.status(200).json({reponse: response.alteredRecording, name_file: fileName, altered_content : data.toString()});
}

function isBlank(str: string | undefined) {
    return !str || str.trim().length === 0
}

function isValidExtension(str: string) {
    const regex = /.(sbs|csv|bst)$/i;
    return regex.test(str);
}


export default alterRecording;

