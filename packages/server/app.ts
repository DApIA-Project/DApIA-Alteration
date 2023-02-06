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
import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

// Configuration d'express pour utiliser le répertoire public
app.use(express.static(path.join(__dirname, 'public')));

// Définition d'une route par défaut qui renvoie un fichier HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '../client/static/index.html'));
});

// Démarrage du serveur sur le port 8080
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});