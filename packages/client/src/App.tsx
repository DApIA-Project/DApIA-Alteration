import React from 'react';
import './styles.css';
import Editor, { loader } from "@monaco-editor/react";
import FDITSCENARIO_FORMAT,{ KEYWORD, TYPE_KEYWORD}  from "./fditscenario";

loader.init().then((monaco) => {
    monaco.languages.register({ id: "fditscenario" });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider("fditscenario", FDITSCENARIO_FORMAT);
    monaco.languages.registerCompletionItemProvider("fditscenario", {
        provideCompletionItems: (model,position) => {
            const suggestions : any = [{
                label: "hideall",
                kind: monaco.languages.CompletionItemKind.Text,
                insertText: "hide all_planes"
            }];

            for(let i =0 ; i<KEYWORD.length;i++){
                suggestions.push({
                    label: KEYWORD[i],
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: KEYWORD[i]
                },)
            }
            for(let i =0 ; i<TYPE_KEYWORD.length;i++){
                suggestions.push({
                    label: TYPE_KEYWORD[i],
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: TYPE_KEYWORD[i]
                },)
            }


            return { suggestions: suggestions };

        }
    });





});

function App() {

  return (
      <div className="App">
      <h1>FDIT</h1>
      <div id="page-wrapper">
          <div className="half">
              <div className="wrapper">
                  <Editor
                      height="90vh"
                      theme="vs-dark"
                      language="fditscenario"
                      defaultValue='alter all_planes at 7 seconds with_values ICAO = "39AC47" and CALLSIGN = "SAMU25" '
                  />
              </div></div>
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
