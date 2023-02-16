import React from 'react';
import './styles.css';

function App() {
  return (
      <div className="App">
      <h1>FDIT</h1>
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
      </div>
  );
}

export default App;
