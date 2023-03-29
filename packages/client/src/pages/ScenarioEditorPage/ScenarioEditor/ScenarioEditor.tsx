import React, {useState} from 'react'
import Button from "../../../components/Button";
import {Alert, AlertTitle} from "@mui/material";
import MonacoEditor from "../CodeArea/MonacoEditor";
import InputFile from "../../../components/InputFile";

export enum ScenarioEditorTestIds {
    COMPONENT = 'ScenarioEditor',
    GENERATE_BUTTON = 'ScenarioEditor.action.generateButton'
}

type OnGenerateOptions = {
    scenario: string,
    recording: string,
    recordingName: string,
    recordingToReplay?: string,
    recordingToReplayName?: string
}

type ScenarioEditorProps = {
    onGenerate: (options: OnGenerateOptions) => void
}

const ScenarioEditor: React.FunctionComponent<ScenarioEditorProps> = ({onGenerate}) => {

    const [error, setError] = useState<string | null>(null)
    const [recording, setRecording] = useState<string>("")
    const [recordingToReplay, setRecordingToReplay] = useState<string>("")
    const [recordingName, setRecordingName] = useState<string>("")
    const [recordingToReplayName, setRecordingToReplayName] = useState<string>("")

    function onGenerateClicked() {
        const elements = document.getElementsByClassName('view-lines monaco-mouse-cursor-text') as HTMLCollectionOf<HTMLElement>
        if (!elements[0]) return setError("Unable to initialize Monaco Editor");
        const scenario = elements[0]?.textContent
        if (scenario !== null) {
            onGenerate({
                scenario,
                recording,
                recordingName,
                recordingToReplay: recordingToReplay ? recordingToReplay : undefined,
                recordingToReplayName: recordingToReplayName ? recordingToReplayName : undefined
            })
            setError(null);
        }
    }

    function onRecordingSelected(files: FileList) {
        readFiles(files, setRecording, setRecordingName)
    }

    function onRecordingToReplaySelected(files: FileList) {
        readFiles(files, setRecordingToReplay, setRecordingToReplayName)
    }

    function readFiles(files: FileList, setContent: React.Dispatch<string>, setName: React.Dispatch<string>) {
        const file = files.item(0);
        if (!file) {
            return
        } else {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = function () {
                setName(file.name)
                setContent(String(reader.result))
            }
        }
    }

    if (error) return (
        <Alert severity="error">
            <AlertTitle>Unable to initialize Monaco editor</AlertTitle>
            {error}
        </Alert>
    )

    return (
        <div>
            <MonacoEditor/>
            <Button data-testid={ScenarioEditorTestIds.GENERATE_BUTTON}
                    text="Generate alteration"
                    onClick={onGenerateClicked}/>
            <InputFile name={"recording"} onChange={onRecordingSelected}/>
            <InputFile name={"recordingToReplay"} onChange={onRecordingToReplaySelected}/>
        </div>

    )
}

export default ScenarioEditor