"use strict";

let fileName="";
let fileContent = "";

async function sendData() {
    const test = document.getElementsByClassName('view-lines monaco-mouse-cursor-text');
    const value = test[0].innerText;
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

