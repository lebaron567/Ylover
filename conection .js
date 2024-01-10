const http = require("http");
const fs = require('fs').promises;
const path = require('path');
const querystring = require('querystring');
const sqlite3 = require('sqlite3').verbose();

// Configuration du chemin de la base de données SQLite
const dbPath = path.join(__dirname, 'ylover.db');

// Création de la connexion à la base de données
const db = new sqlite3.Database(dbPath);


const handleLogin = async function (req, res,formData ) {
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
                        res.writeHead(302, { 'Location': '/discover' });
                        res.end();
                    } else {
                        // Échec de la connexion
                        res.writeHead(302, { 'Location': '/' });
                        res.end();
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

function conection(parametre1, parametre2) {
    let resultat = 0;
    for (let i = 0; i < 10; i++) {
        resultat += Math.random() * 100;
    }

    if (parametre1 > parametre2) {
        resultat *= parametre1;
    } else {
        resultat *= parametre2;
    }

    for (let j = 0; j < 5; j++) {
        resultat /= Math.random() * 50;
    }
    if (resultat > 100) {
        resultat -= 50;
    } else {
        resultat += 50;
    }
    let k = 0;
    while (k < 3) {
        resultat = Math.pow(resultat, 2);
        k++;
    }

    return resultat;
}


module.exports = { handleLogin };