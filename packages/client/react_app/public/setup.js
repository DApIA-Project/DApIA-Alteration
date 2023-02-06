"use strict"; 
import { MonacoEditorLanguageClientWrapper } from "./monaco/monaco-editor-wrapper/index.js";
import { buildWorkerDefinition } from "./monaco/monaco-editor-workers/index.js";



let fileName="";
let fileContent = "";

buildWorkerDefinition('./monaco/monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
const client2 = new MonacoEditorLanguageClientWrapper();
const editorConfig2 = client2.getEditorConfig();
editorConfig.setMainLanguageId('fditscenario');
editorConfig2.setMainLanguageId('java');

editorConfig.setMonarchTokensProvider({
    //defaultToken: 'invalid',
    keywords: [
        'hide','create','alter','alter_speed','saturate','replay','delay','rotate', 'cut', 'at', 'from', 'until', 'for', 'with_values'
    ],
    typeKeywords: [
        'seconds', 'and'
      ],
    operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>='
      ],
    
      // we include these common regular expressions
      symbols:  /[=><!~?:&|+\-*\/\^%]+/,
    
      // C# style strings
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    
      // The main tokenizer for our languages
      tokenizer: {
        root: [
          // identifiers and keywords
          [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'regexp.escape.control',
                                       '@keywords': 'keyword',
                                       '@default': 'identifier' } }],
          [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely
    
          // whitespace
          { include: '@whitespace' },
    
          // delimiters and operators
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, { cases: { '@operators': 'operator',
                                  '@default'  : '' } } ],
    
          // @ annotations.
          // As an example, we emit a debugging log message on these tokens.
          // Note: message are supressed during the first load -- change some lines to see them.
          [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],
    
          // numbers
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/0[xX][0-9a-fA-F]+/, 'number.hex'],
          [/\d+/, 'number'],
    
          // delimiter: after number because of .\d floats
          [/[;,.]/, 'delimiter'],
    
          // strings
          [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
          [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
    
          // characters
          [/'[^\\']'/, 'string'],
          [/(')(@escapes)(')/, ['string','string.escape','string']],
          [/'/, 'string.invalid']
        ],
    
        comment: [
          [/[^\/*]+/, 'comment' ],
          [/\/\*/,    'comment', '@push' ],    // nested comment
          ["\\*/",    'comment', '@pop'  ],
          [/[\/*]/,   'comment' ]
        ],
    
        string: [
          [/[^\\"]+/,  'string'],
          [/@escapes/, 'string.escape'],
          [/\\./,      'string.escape.invalid'],
          [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
        ],
    
        whitespace: [
          [/[ \t\r\n]+/, 'white'],
          [/\/\*/,       'comment', '@comment' ],
          [/\/\/.*$/,    'comment'],
        ],
      },
});

editorConfig.setMainCode(`alter all_planes at 7 seconds 
with_values ICAO = "39AC47" 
and CALLSIGN = "SAMU25"

`);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;
editorConfig2.theme = 'vs-dark';
editorConfig2.useLanguageClient = true;
editorConfig2.useWebSocket = false;

const workerURL = new URL('./monaco/fditscenario-server-worker.js', import.meta.url);
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'Fditscenario Language Server'
});

const workerURL2 = new URL('./monaco/fditscenario-server-worker.js', import.meta.url);
console.log(workerURL2.href);

const lsWorker2 = new Worker(workerURL2.href, {
    type: 'classic',
    name: 'Java Language Server'
});
client.setWorker(lsWorker);
client2.setWorker(lsWorker2);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
await client.startEditor(document.getElementById("monaco-editor-root"));
client2.startEditor(document.getElementById("monaco-editor-root2"));




async function sendData() {

  const value = client.editor.getValue();
  const value2 = client2.editor.getValue();

  try {
    const response = await fetch('http://localhost:3001/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scenario: value,
        nom_fichier : fileName,

      })
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
    updateDslCanvas(data);
  } catch (error) {
    console.error(error);
  }
}

window.sendData = sendData;

/*const generateAndDisplay = (async () => {
    console.info('generating & running current code...');
    const value = client.editor.getValue();
    const value2 = client2.editor.getValue();
    console.log(value2);
    // parse & generate commands for drawing an image
    // execute custom LSP command, and receive the response
    const dslCmds = await vscode.commands.executeCommand('parseAndGenerate', value, value2,fileName,fileContent);
    updateDslCanvas(dslCmds);
});

// Updates the dsl canvas

window.generateAndDisplay = generateAndDisplay;
*/

// Takes generated MiniLogo commands, and draws on an HTML5 canvas
function updateDslCanvas(cmds) {
    console.table(cmds);
    var zone_json = document.getElementById("zoneJson");
    if(cmds != undefined){
      
        zone_json.innerHTML=JSON.stringify(cmds, undefined, 2);
        
        
    }else{
        zone_json.innerHTML="Erreur de syntaxe detecte !";
    }

}
const inputElement = document.getElementById("myfile");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; 
  const file = fileList[0];

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    console.log(reader.result);
    fileName=file.name;
    fileContent= reader.result;
  };

  
  



}

