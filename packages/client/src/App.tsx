import React from 'react';
import './styles.css';
import monImage from './assets/aircraft_white.png';
function App() {

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
      </div>
  );
}

export default App;
