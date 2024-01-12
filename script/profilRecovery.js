const querystring = require("querystring");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

// Configuration du chemin de la base de données SQLite
const dbPath = path.join(__dirname, "../", "ylover.db");

// Création de la connexion à la base de données
const db = new sqlite3.Database(dbPath);

const dataSend = function (req, res, formData) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const formData = querystring.parse(body);
    const { last_name, first_name, age, city, branch, level, bio } = formData;

    const idUser = localStorage.getItem("idUser");
    console.log(idUser);

    // Requête pour récupérer les informations de l'utilisateur depuis la base de données SQLite
    const query = "SELECT * FROM user WHERE id = ?";
    db.get(query, [idUser], (err, row) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      // Vérifier si l'utilisateur existe
      if (row) {
        // Vérifier les informations d'identification
        if (row.id == idUser) {
          // Requête SQL pour mettre à jour les données dans la base de données
          const request = `UPDATE user SET first_name = ?, last_name = ?, age = ?, city = ?, branch = ?, level = ?, bio = ? WHERE id = ?`;

          console.log(1);

          const values = [
            first_name,
            last_name,
            age,
            city,
            branch,
            level,
            bio,
            idUser,
          ];

          // Remplacer les valeurs vides par les valeurs existantes
          for (let i = 0; i < values.length; i++) {
            if (values[i] === "") {
              switch (i) {
                case 0:
                  values[i] = row.first_name;
                  break;
                case 1:
                  values[i] = row.last_name;
                  break;
                case 2:
                  values[i] = row.age;
                  break;
                case 3:
                  values[i] = row.city;
                  break;
                case 4:
                  values[i] = row.branch;
                  break;
                case 5:
                  values[i] = row.level;
                  break;
                case 6:
                  values[i] = row.bio;
                  break;
              }
            }
          }
          console.log(2);
          // Exécuter la requête SQL
          console.log(values);
          db.run(request, values, function (err) {
            if (err) {
              console.error("Erreur lors de la mise à jour des données :", err);
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
              return;
            }
            console.log(`Enregistrement mis à jour avec l'ID ${idUser}`);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Enregistrement réussi dans la base de données.");
            return;
          });
        } else {
          res.writeHead(302, { Location: "/myProfil" });
          res.end();
          return;
        }
      } else {
        // Utilisateur non trouvé
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.end("User not found");
        return;
      }
    });
  });
};

module.exports = { dataSend };
