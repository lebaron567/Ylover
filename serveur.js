//const { addLike } = require("./script/like");
const { handleLogin } = require("./script/conection ");
const { dataSend } = require("./script/profilRecovery");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const querystring = require("querystring");
const sqlite3 = require("sqlite3").verbose();

// Configuration du chemin de la base de données SQLite
const dbPath = path.join(__dirname, "ylover.db");

// Création de la connexion à la base de données
const db = new sqlite3.Database(dbPath);

function getUsers() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user";
    db.all(query, (err, rows) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        reject(err);
        return;
      }

      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
}

const requestListener = async function (req, res) {
  let filePath;
  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "front", "html", "index.html");
      break;
    case "/discover":
      filePath = path.join(__dirname, "front", "html", "discover.html");
      await donner(req, res, filePath);
      break;
    case "/matchs":
      filePath = path.join(__dirname, "front", "html", "matchs.html");
      await donner(req, res, filePath);
      break;
    case "/likes":
      filePath = path.join(__dirname, "front", "html", "likes.html");
      break;
    case "/profil":
      filePath = path.join(__dirname, "front", "html", "profil.html");
      break;
    case "/register":
      filePath = path.join(__dirname, "front", "html", "index.html");
      break;
    case "/myProfil":
      filePath = path.join(__dirname, "front", "html", "myProfil.html");
      if (req.method === "POST") {
        dataSend(req, res, filePath);
        return;
      }
      break;
    default:
      filePath = path.join(__dirname, "front", req.url);
  }

  if (req.method === "POST" && req.url === "/login") {
    // Si c'est une requête POST à /login, traitez-la ici
    await handleLogin(req, res);
  } else {
    // Sinon, servez le fichier statique comme d'habitude
    serveStaticFile(filePath, res);
  }
};

async function donner(req, res, filePath) {
  try {
    const cardsData = await getUsers();
    let fileContent = await fs.readFile(filePath, "utf-8");
    cardsData;
    fileContent = fileContent.replace(
      "const cardsData = [];",
      `const cardsData = ${cardsData};`
    );

    // Vérifier si la réponse n'a pas déjà été envoyée
    if (!res.headersSent) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fileContent);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);

    // Vérifier si la réponse n'a pas déjà été envoyée
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
}

const serveStaticFile = async function (filePath, res) {
  try {
    const contents = await fs.readFile(filePath);
    const contentType = getContentType(filePath);
    if (!res.headersSent) {
      res.setHeader("Content-Type", contentType);
      res.writeHead(200);
      res.end(contents);
    }
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
};

const getContentType = function (filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    default:
      return "application/octet-stream";
  }
};

const host = "localhost";
const port = 8000;
const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

function handleClick(event) {
  // Empêcher le comportement par défaut du lien pour éviter une redirection
  event.preventDefault();

  // Récupérer l'élément sur lequel le clic a été effectué
  const clickedElement = event.target;

  // Récupérer les classes de l'élément
  const elementClasses = clickedElement.classList;

  // Convertir les classes en tableau (si nécessaire) pour un traitement ultérieur
  const classesArray = Array.from(elementClasses);

  // Faire quelque chose avec les classes (par exemple, afficher dans la console)
  console.log("Classes de l'élément cliqué:", classesArray);
}
