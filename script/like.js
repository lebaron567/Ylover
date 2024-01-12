const path = require("path");
const querystring = require("querystring");
const sqlite3 = require("sqlite3").verbose();

// Configuration du chemin de la base de données SQLite
const dbPath = path.join(__dirname, "../", "ylover.db");

// Création de la connexion à la base de données
const db = new sqlite3.Database(dbPath);

const addLike = async function (req, res, formData) {
  try {
    let body = "";
    console.log("data")

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const formData = querystring.parse(body);

      const { data } = formData;

     // Requête pour récupérer les informations de l'utilisateur depuis la base de données SQLite
      const query = "SELECT password_hash FROM user WHERE email = ?";
      db .get(query, [email], (err, row) => {
        if (err) {
          console.error("Erreur lors de la requête à la base de données:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        // Vérifier si l'utilisateur existe
        if (row) {
          console.log(row.password_hash);

          // Vérifier les informations d'identification
          if (row.password_hash === formData.password) {
            // Connexion réussie
            res.writeHead(302, { Location: "/discover" });
            res.end();
          } else {
            // Échec de la connexion
            res.writeHead(302, { Location: "/" });
            res.end();
          }
        } else {
          // Utilisateur non trouvé
          res.writeHead(401, { "Content-Type": "text/plain" });
          res.end("User not found");
        }
      });
    });
  } catch (err) {
    console.error(`Error handling login: ${err.message}`);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

module.exports = { addLike };