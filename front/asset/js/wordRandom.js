const button = document.getElementById("randomWord");

button.addEventListener("click", () => {
  /* Aide pour la requête fetch par Tom Saillard */
  fetch("https://trouve-mot.fr/api/random/1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].name);
      button.innerHTML = `Le mot : ${data[0].name}`;
    });
});
