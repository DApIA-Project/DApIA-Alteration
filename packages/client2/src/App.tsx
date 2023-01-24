import React from 'react';
import logo from './logo.svg';
import './App.css';
import './setup'

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
            <button className="build" id="btnShowJson">Show Json </button>
        </div>
    </div>
  );
}

export default App;
