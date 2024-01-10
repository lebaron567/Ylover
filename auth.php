<?php

// Connexion à la base de données
$conn = new SQLite3('ylover.db');

// Récupérez les informations du formulaire
$email = $_POST['email'];
$password = $_POST['password'];

// Utilisation de requêtes préparées pour éviter les injections SQL
$stmt = $conn->prepare("SELECT id, password_hash FROM users WHERE email = :email");
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$result = $stmt->execute();

// Vérification de l'existence de l'utilisateur et correspondance du mot de passe
$user = $result->fetchArray(SQLITE3_ASSOC);
if ($user && password_verify($password, $user['password_hash'])) {
    // Authentification réussie
    echo json_encode(['message' => 'Connexion réussie']);
} else {
    // Échec de l'authentification
    echo json_encode(['message' => 'Échec de la connexion. Veuillez vérifier vos identifiants.']);
}


// Fermeture de la connexion à la base de données
$stmt->close();
$conn->close();
?>
