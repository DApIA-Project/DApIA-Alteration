"use strict"; 
import { MonacoEditorLanguageClientWrapper } from "/monaco-editor-wrapper/index.js";
import { buildWorkerDefinition } from "/monaco-editor-workers/index.js";
import { vscode } from './monaco-editor-wrapper/index.js';


buildWorkerDefinition('./monaco-editor-workers/workers', new URL('', window.location.href).href, false);

MonacoEditorLanguageClientWrapper.addMonacoStyles('monaco-editor-styles');

const client = new MonacoEditorLanguageClientWrapper();
const editorConfig = client.getEditorConfig();
editorConfig.setMainLanguageId('fditscenario');

editorConfig.theme = 'vs-dark';
editorConfig.useLanguageClient = true;
editorConfig.useWebSocket = false;

const workerURL = new URL('./fditscenario-server-worker.js', import.meta.url);
console.log(workerURL.href);

const lsWorker = new Worker(workerURL.href, {
    type: 'classic',
    name: 'fditscenario Language Server'
});
client.setWorker(lsWorker);

// keep a reference to a promise for when the editor is finished starting, we'll use this to setup the canvas on load
await client.startEditor(document.getElementById("monaco-editor-root"));

const generateAndDisplay = (async () => {
    console.info('generating & running current code...');
    const value = client.editor.getValue();
    // parse & generate commands for drawing an image
    // execute custom LSP command, and receive the response
    const dslCmds = await vscode.commands.executeCommand('parseAndGenerate', value);
    updateDslCanvas(dslCmds);
});

// Updates the dsl canvas

window.generateAndDisplay = generateAndDisplay;


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
