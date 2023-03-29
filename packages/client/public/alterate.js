"use strict";

let fileName = "";
let fileContent = "";
let fileName2 = "";
let fileContent2 = "";
let textSendData = 'Show JSON';

async function sendData() {
    removeButtonDownload();
    removeImageDownload()


    const test = document.getElementsByClassName('view-lines monaco-mouse-cursor-text');
    const value = test[0].innerText;
    const response = await fetch('http://localhost:3001/recording/alteration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            scenario: value,
            fileContent: fileContent,
            fileName: fileName,
            fileContent2: fileContent2,
            fileName2: fileName2,
        })
    });
    const data = await response.json();
    if (data.error !== undefined) {
        updateCanvasError(data.error);
    } else {
        updateCanvas(data);
    }
}

window.sendData = sendData;

function updateCanvas(data) {
    const str_to_json = JSON.parse(data.reponse);
    const zone_json = document.getElementById("zoneJson");

    if (data.reponse !== undefined) {
        //Zone json
        zone_json.innerHTML = JSON.stringify(str_to_json, null, 2);
        for (let i = 0; i < data.name_file.length; i++) {
            const {figure, link, url} = createImageDownloadMany(data.name_file[i], data.altered_content[i]);

            //Ecouteur bouton téléchargement recording
            figure.addEventListener('click', async () => {
                link.click();
            })
        }
    } else {
        zone_json.innerHTML = "Erreur de syntaxe detecte !";
    }
}

function updateCanvasError(error) {
    const zone_json = document.getElementById("zoneJson");
    switch (error) {
        case "invalid_syntax":
            zone_json.innerHTML = "La syntaxe est invalide";
            break;
        case "invalid_format":
            zone_json.innerHTML = "Le format est invalide";
            break;
        default :
            zone_json.innerHTML = "Une erreur est survenue!";
            break;
    }
}

const inputElement = document.getElementsByClassName("myfile");
inputElement[0].addEventListener("change", handleFiles, false);

inputElement[1].addEventListener("change", handleFiles2, false);

function handleFiles() {
    const fileList = this.files;
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        console.log(reader.result);
        fileName = file.name;
        fileContent = reader.result;
    };
}

function handleFiles2() {
    const fileList = this.files;
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        console.log(reader.result);
        fileName2 = file.name;
        fileContent2 = reader.result;
    };
}

function removeButtonDownload() {
    const buttons = document.querySelectorAll('button');

    // Parcourt la liste des boutons
    buttons.forEach(button => {

        // Vérifie si le texte du bouton correspond à celui souhaité
        if (button.innerText !== textSendData) {
            // Supprime le bouton de la page
            button.remove();
        }
    });
}

function removeImageDownload() {
    const figures = document.querySelectorAll('figure');

    // Parcourt la liste des figures
    figures.forEach(figure => {
        figure.remove();
    });

    const as = document.querySelectorAll('a');
    as.forEach(a => {
        a.remove();
    });

}

function createButtonDownload(data) {
    const buttons_zone = document.getElementById("buttons_zone");
    const downloadButton = document.createElement('button');
    downloadButton.innerText = data.name_file[0];
    downloadButton.className = 'build';
    console.log(data.altered_content[0]);
    const fileAlteredContent = data.altered_content[0];
    const fileBlob = new Blob([fileAlteredContent], {type: "text/plain"});
    const fileUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = data.name_file[0];
    document.body.appendChild(link);
    buttons_zone.appendChild(downloadButton);
    return {downloadButton: downloadButton, link: link, url: fileUrl};
}

function createImageDownloadMany(fileName, fileContent) {
    const download_zone = document.getElementById("download_zone");
    const downloadImage = document.createElement('img');
    downloadImage.className = 'imageDownload';
    downloadImage.src = './assets/logo_file.png';
    const figcaption = document.createElement('figcaption');
    figcaption.innerText = fileName;

    const figure = document.createElement('figure');
    figure.appendChild(downloadImage);
    figure.appendChild(figcaption);

    console.log(fileContent);
    const fileAlteredContent = fileContent;
    const fileBlob = new Blob([fileAlteredContent], {type: "text/plain"});
    const fileUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    download_zone.appendChild(figure);
    return {figure: figure, link: link, url: fileUrl};
}

