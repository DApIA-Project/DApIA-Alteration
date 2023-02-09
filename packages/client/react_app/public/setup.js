"use strict"; 
import { MonacoEditorLanguageClientWrapper } from "./monaco/monaco-editor-wrapper/index.js";
import { buildWorkerDefinition } from "./monaco/monaco-editor-workers/index.js";

let fileName="";
let fileContent = "";

buildWorkerDefinition('./monaco/monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('fditscenario');

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
and CALLSIGN = "SAMU25"`);

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const workerURL = new URL('./monaco/fditscenario-server-worker.js', import.meta.url);
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'Fditscenario Language Server'
});

client.setWorker(lsWorker);
await client.startEditor(document.getElementById("monaco-editor-root"));
async function sendData() {

    const value = client.editor.getValue();
    const response = await fetch('http://localhost:3001/recording/alteration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scenario: value,
        fileContent : fileContent,
        fileName : fileName,
      })
    });
    const data = await response.json();
    if(data.error != undefined){
        updateCanvasError(data.error);
    }else{
        updateCanvas(data);
    }
}

window.sendData = sendData;
function updateCanvas(cmds) {
    const str_to_json = JSON.parse(cmds);
    const zone_json = document.getElementById("zoneJson");
    if(cmds !== undefined){
        zone_json.innerHTML=JSON.stringify(str_to_json, null, 2);
    }else{
        zone_json.innerHTML="Erreur de syntaxe detecte !";
    }
}
function updateCanvasError(error) {
    const zone_json = document.getElementById("zoneJson");
    switch (error) {
        case "invalid_syntax":
            zone_json.innerHTML="La syntaxe est invalide";
            break;
        case "invalid_format":
            zone_json.innerHTML="Le format est invalide";
            break;
        default :
            zone_json.innerHTML="Une erreur est survenue!";
            break;
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

