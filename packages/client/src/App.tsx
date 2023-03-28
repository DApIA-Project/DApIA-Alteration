import React from 'react';
import './styles.css';
import Button from "./components/Button";
import InputFile from "./components/InputFile";
import monImage from './assets/aircraft_white.png';

function App() {

    /*function onSendData() {
        const test = document.getElementsByClassName('view-lines monaco-mouse-cursor-text');
        const value = test[0].textContent;
        const response = client.alteration(value)

    }*/

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
                        <pre id="zoneJson"></pre>

                    </div>
                </div>
            </div>
            <div>
                <Button text="Show JSON"/>
            </div>
            <div id="input_files_record">
                <div>
                    Recording 1 :
                </div>
                <InputFile className="myfile" name="myfile"/>
            </div>
            <div id="input_files_record">
                <div>
                    Recording 2 :
                </div>
                <InputFile className="myfile" name="myfile2"/>
            </div>
        </div>

    );
}

export default App;
