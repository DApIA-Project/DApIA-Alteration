"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*import express from 'express';
var path = require('path');


  const app = express();
app.listen(8080, () => {
    console.log('Le serveur écoute sur le port 8080');
  });


  //Configuration d'express pour utiliser le repertoire public
  app.use(express.static('./public'));

  app.use(express.static('./static'));
  

  app.get('/', (req, res) => {
    res.sendFile(path.resolve('./static/index.html'));
  });*/
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 8080;
// Configuration d'express pour utiliser le répertoire public
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Définition d'une route par défaut qui renvoie un fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', '../client/static/index.html'));
});
// Démarrage du serveur sur le port 8080
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
