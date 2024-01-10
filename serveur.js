const http = require("http");
const fs = require('fs').promises;
const path = require('path');
const querystring = require('querystring');
const sqlite3 = require('sqlite3').verbose();

// Configuration du chemin de la base de données SQLite
const dbPath = path.join(__dirname, 'ylover.db');

// Création de la connexion à la base de données
const db = new sqlite3.Database(dbPath);

const requestListener = function (req, res) {
    let filePath;

    if (req.url === '/') {
        // Si l'URL se termine par '/', servez index.html
        filePath = path.join(__dirname, 'front', 'index.html');
    } else {
        // Sinon, construisez le chemin complet en fonction de l'URL demandée
        filePath = path.join(__dirname, 'front', req.url);
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

const handleLogin = async function (req, res) {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = querystring.parse(body);

            const { email, password_hash } = formData;

            // Requête pour récupérer les informations de l'utilisateur depuis la base de données SQLite
            const query = 'SELECT password_hash FROM user WHERE email = ?';
            db.get(query, [email], (err, row) => {
                if (err) {
                    console.error('Erreur lors de la requête à la base de données:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                // Vérifier si l'utilisateur existe
                if (row) {
                    console.log(row.password_hash);

                    // Vérifier les informations d'identification
                    if (row.password_hash === formData.password) {
                        // Connexion réussie
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Login successful');
                    } else {
                        // Échec de la connexion
                        res.writeHead(401, { 'Content-Type': 'text/plain' });
                        res.end('Invalid credentials');
                    }
                } else {
                    // Utilisateur non trouvé
                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    res.end('User not found');
                }
            });
        });
    } catch (err) {
        console.error(`Error handling login: ${err.message}`);
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

const host = 'localhost';
const port = 8000;
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
