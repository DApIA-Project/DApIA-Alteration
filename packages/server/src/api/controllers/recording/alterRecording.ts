import {RequestHandler} from "express";
import {AlterRecordingError} from '@smartesting/shared/dist/responses'
import alterRecordingCore from '../../core/recording/alterRecording'

const alterRecording: RequestHandler = async (req, res) => {
    const {scenario, fileContent} = req.body

    if (isBlank(scenario) || isBlank(fileContent)) {
        return res.status(422).json({error: AlterRecordingError.invalidFormat})
    }
    const response = await alterRecordingCore(scenario, fileContent)

    res.status(200).json({});
}

function isBlank(str: string | undefined) {
    return !str || str.trim().length === 0
}

export default alterRecording;