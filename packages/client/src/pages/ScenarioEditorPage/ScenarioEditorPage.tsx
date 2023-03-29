import React from 'react'
import ScenarioEditor from "./ScenarioEditor/ScenarioEditor";

const ScenarioEditorPage: React.FunctionComponent = () => {
    return <div>
        <p>Hello world!</p>
        <ScenarioEditor onGenerate={(scenario, recording, recordingToReplay) => {

        }
        }/>
    </div>
}

export default ScenarioEditorPage