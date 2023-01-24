import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>FDIT Scenario</h1>

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
                <button className="build" id="btnShowJson">Show Json</button>
            </div>
            <script type="module" src="setup.js"></script>
        </div>
    );
}

export default App;
