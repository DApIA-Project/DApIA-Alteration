import React from 'react'
import {Alert, AlertTitle} from "@mui/material";
import {AlterRecordingResponse} from "@smartesting/shared/dist/responses"

type ScenarioOutputProps = {
    response: AlterRecordingResponse
}

const ScenarioOutput: React.FunctionComponent<ScenarioOutputProps> = ({response}) => {

    const {alteredRecording, newfileName, filesToRemove, error} = response;



    if (error) return (
        <Alert severity="error">
            <AlertTitle>Error while generating alteration</AlertTitle>
            {error}
        </Alert>
    )

    return (
        <div>

        </div>

    )
}

export default ScenarioOutput