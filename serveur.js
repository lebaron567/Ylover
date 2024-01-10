const { handleLogin } = require('./conection ');
const express = require('express');
const http = require("http");
const fs = require('fs').promises;
const path = require('path');
const querystring = require('querystring');
const sqlite3 = require('sqlite3').verbose();

// Configuration du chemin de la base de données SQLite
const dbPath = path.join(__dirname, 'ylover.db');

// Création de la connexion à la base de données
const db = new sqlite3.Database(dbPath);

const app = express();

// Configuration pour utiliser EJS comme moteur de modèle
app.set('view engine', 'ejs');


// Route pour afficher les données dans une autre page HTML
app.get('/cards', (req, res) => {
    // Exemple de requête SQL pour récupérer des données
    const query = 'SELECT * FROM user';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des données :', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Rendre le modèle EJS avec les données
        res.render('cards', { cards: rows });
    });
});

const requestListener = function (req, res) {
  let filePath;

  if (req.url === "/") {
    // Si l'URL se termine par '/', servez index.html
    filePath = path.join(__dirname, "front", "index.html");
  } else if (req.url === "/discover") {
    // Si l'URL se termine par '/discover', servez discover.html
    filePath = path.join(__dirname, "front", "discover.html");
  } else if (req.url === "/matchs") {
    // Si l'URL se termine par '/matchs', servez matchs.html
    filePath = path.join(__dirname, "front", "matchs.html");
  } else if (req.url === "/likes") {
    // Si l'URL se termine par '/likes', servez likes.html
    filePath = path.join(__dirname, "front", "likes.html");
  } else if (req.url === "/profil") {
    // Si l'URL se termine par '/profil', servez profil.html
    filePath = path.join(__dirname, "front", "profil.html");
  } else if (req.url === "/register") {
    // Si l'URL se termine par '/register', servez register.html
    filePath = path.join(__dirname, "front", "index.html");
  } else if (req.url === "/myProfil") {
    // Si l'URL se termine par '/myProfil', servez myProfil.html
    filePath = path.join(__dirname, "front", "myProfil.html");
  } else {
    // Sinon, construisez le chemin complet en fonction de l'URL demandée
    filePath = path.join(__dirname, "front", req.url);
  }

    if (req.method === 'POST' && req.url === '/login') {
        // Si c'est une requête POST à /login, traitez-la ici
        handleLogin(req, res);
    } else {
        // Sinon, servez le fichier statique comme d'habitude
        serveStaticFile(filePath, res);
    }
};

const serveStaticFile = async function (filePath, res) {
    try {
        const contents = await fs.readFile(filePath);
        const contentType = getContentType(filePath);
        res.setHeader("Content-Type", contentType);
        res.writeHead(200);
        res.end(contents);
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
};





const getContentType = function (filePath) {
    const ext = path.extname(filePath);
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        default:
            return 'application/octet-stream';
    }
};

const host = "localhost";
const port = 8000;
const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
