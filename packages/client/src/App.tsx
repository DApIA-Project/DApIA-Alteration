import React, {useState} from 'react';
import './styles.css';
import Button from "./components/Button";
import InputFile from "./components/InputFile";
import monImage from './assets/aircraft_white.png';
import Client from "./Client";
import {AlterRecordingResponse} from '@smartesting/shared/dist/responses/alterRecordingResponse'

function App() {
    let fileName2: string;
    let fileContent2: string | null | ArrayBuffer;

    const [alteredRecording, setAlteredRecording] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [fileName, setFileName] = useState("")
    const [fileContent, setFileContent] = useState("")

    async function onSendData() {
        const test = document.getElementsByClassName('view-lines monaco-mouse-cursor-text') as HTMLCollectionOf<HTMLElement>;
        console.log(test)
        const value = test[0].innerText
        const data = await Client.alteration(value, fileName, fileContent, fileName2, fileContent2);

        updateCanvas(data);
    }

    function handleFiles(files: FileList) {
        const file = files.item(0);
        if (!file) {
            setError("No file selected")
        } else {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = function () {
                setFileName(file.name)
                setFileContent(String(reader.result))
            }
        }
    }

    function handleFiles2(files: FileList) {
        const file = files.item(0);
        if (!file) {
            setError("No file selected")
        } else {
            const reader = new FileReader();
            reader.readAsText(file!);
            reader.onload = function () {
                console.log(reader.result);
                fileName2 = file!.name;
                fileContent2 = reader.result;
            }
        }
    }

    function updateCanvas(response: AlterRecordingResponse) {
        if (!response.alteredRecording || !response.filesToRemove || !response.newfileName) {
            console.log("ERRRROR")
            setError(response.error)
        } else {
            console.log("WORKING")
            const alteredRecordingJson = JSON.parse(response.alteredRecording)
            setAlteredRecording(JSON.stringify(alteredRecordingJson, null, 2))
        }
        /*for (let i = 0; i < data.filesToRemove.length; i++) {
            const {figure, link, url} = createImageDownloadMany(data.name_file[i], data.altered_content[i]);

            //Ecouteur bouton téléchargement recording
            figure.addEventListener('click', async () => {
                link.click();
            })
        }*/
    }

    function createImageDownloadMany(fileName: string, fileContent: string) {
        const download_zone = document.getElementById("download_zone");
        const downloadImage = document.createElement('img');
        downloadImage.className = 'imageDownload';
        downloadImage.src = './assets/logo_file.png';
        const figcaption = document.createElement('figcaption');
        figcaption.innerText = fileName;

        const figure = document.createElement('figure');
        figure.appendChild(downloadImage);
        figure.appendChild(figcaption);

        console.log(fileContent);
        const fileAlteredContent = fileContent;
        const fileBlob = new Blob([fileAlteredContent], {type: "text/plain"});
        const fileUrl = URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        download_zone!.appendChild(figure);
        return {figure: figure, link: link, url: fileUrl};
    }

    return (
        <div className="App">
            <div className={"header"}>
                <img src={monImage} alt={"aircraft"}/>
                <h1 className={"title"}>FDIT-Web</h1>
            </div>
            <div id="page-wrapper">
                <div className="half">
                    <div className="wrapper">
                        <div id="monaco-editor-root"></div>
                    </div>
                </div>
                <div className="half">
                    <div className="wrapper">
                        {error ?
                            <pre>{error}</pre> :
                            <pre>{alteredRecording}</pre>
                        }
                    </div>
                </div>
            </div>
            <div>
                <Button text="Show JSON" onClick={onSendData}/>
            </div>
            <div id="input_files_record">
                <div>
                    Recording 1 :
                </div>
                <InputFile className="myfile" name="myfile" onChange={handleFiles}/>
            </div>
            <div id="input_files_record">
                <div>
                    Recording 2 :
                </div>
                <InputFile className="myfile" name="myfile2" onChange={handleFiles2}/>
            </div>
        </div>

    );
}

export default App;
