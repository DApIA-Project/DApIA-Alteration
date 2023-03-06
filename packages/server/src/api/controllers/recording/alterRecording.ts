import {RequestHandler} from "express";
import {AlterRecordingError} from '@smartesting/shared/dist/responses'
import alterRecordingCore from '../../core/recording/alterRecording'
import * as fs from 'fs'

const alterRecording: RequestHandler = async (req, res) => {
    const {scenario, fileContent, fileName} = req.body;
    console.log(fileContent);
    if (isBlank(scenario) || isBlank(fileContent) || isBlank(fileName)) {
        return res.status(422).json({error: AlterRecordingError.invalidFormat})
    }
    if(!isValidExtension(fileName)){
        return res.status(422).json({error: AlterRecordingError.invalidFormat})
    }
    const response = await alterRecordingCore(scenario, fileContent, fileName)
    if(response.error != null){
        return res.status(422).json({error: AlterRecordingError.invalidSyntax})
    }

    const data = await fs.promises.readFile('./temp/modified__'+fileName);

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

