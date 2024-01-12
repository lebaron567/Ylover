function recupererDonnees() {
  // Récupérer les valeurs des champs du formulaire
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  var filière = document.getElementById("filière").value;
  var niveau = document.getElementById("niveau").value;
  var ville = document.getElementById("ville").value;
  var age = document.getElementById("age").value;

  // Faire quelque chose avec les données récupérées
  console.log("Nom: " + nom);
  console.log("Prénom: " + prenom);
  console.log("Filière: " + filière);
  console.log("Niveau: " + niveau);
  console.log("Ville: " + ville);
  console.log("Age: " + age);
}
