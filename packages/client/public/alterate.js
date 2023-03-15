"use strict";

let fileName="";
let fileContent = "";
let fileName2="";
let fileContent2 = "";
let textButtonDownload = 'Download Recording';
async function sendData() {
    removeButtonDownload();


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
        fileContent2 : fileContent2,
        fileName2 : fileName2,
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
function updateCanvas(data) {
    const str_to_json = JSON.parse(data.reponse);
    const zone_json = document.getElementById("zoneJson");

    if(data.reponse !== undefined){
        //Zone json
        zone_json.innerHTML=JSON.stringify(str_to_json, null, 2);
        //Bouton téléchargement recording
        const {downloadButton, link, url} = createButtonDownload(data);

        //Ecouteur bouton téléchargement recording
        downloadButton.addEventListener('click', async () => {
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
            removeButtonDownload();
        })
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

const inputElement2 = document.getElementById("myfile2");
inputElement2.addEventListener("change", handleFiles2, false);
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

function handleFiles2() {
    const fileList = this.files;
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        console.log(reader.result);
        fileName2=file.name;
        fileContent2= reader.result;
    };
}

function removeButtonDownload(){
    const buttons = document.querySelectorAll('button');

    // Parcourt la liste des boutons
    buttons.forEach(button => {

        // Vérifie si le texte du bouton correspond à celui souhaité
        if (button.innerText === textButtonDownload) {
            // Supprime le bouton de la page
            button.remove();
        }
    });
}

function createButtonDownload(data){
    const buttons_zone = document.getElementById("buttons_zone");
    const downloadButton = document.createElement('button');
    downloadButton.innerText = textButtonDownload;
    downloadButton.className = 'build';
    const fileAlteredContent = data.altered_content;
    const fileBlob = new Blob([fileAlteredContent], {type : "text/plain"});
    const fileUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "modified__"+data.name_file;
    document.body.appendChild(link);
    buttons_zone.appendChild(downloadButton);
    return {downloadButton: downloadButton, link: link, url: fileUrl};
}
