const http = require("http");
const fs = require('fs').promises;
const path = require('path');

const requestListener = function (req, res) {
    let filePath;

    if (req.url === '/') {
        // Si l'URL se termine par '/', servez index.html
        filePath = path.join(__dirname, 'front', 'index.html');
    } else {
        // Sinon, construisez le chemin complet en fonction de l'URL demandée
        filePath = path.join(__dirname, 'front', req.url);
    }

    fs.readFile(filePath)
        .then(contents => {
            const contentType = getContentType(filePath);
            res.setHeader("Content-Type", contentType);
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            console.error(`Error reading file: ${err.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        });
};

const getContentType = (filePath) => {
    const ext = path.extname(filePath);
    switch (ext) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        // Ajoutez d'autres cas selon les types de fichiers que vous servez
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
