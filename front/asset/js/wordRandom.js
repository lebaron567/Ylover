// const button = document.getElementById("randomWord");

async function getRandomWord() {
  try {
    // Description: Get a random word from the API
    const response = await fetch("https://trouve-mot.fr/api/random/1");
    const data = await response.json();
    console.log(data[0].name);
  } catch (error) {
    console.error(error);
  }
}

getRandomWord();

// button.addEventListener("click", () => {
//   button.innerHTML = `Nombre de clics : ${getRandomWord()}`;
// });

/*const word = fetch("https://trouve-mot.fr/api/random/1")
    .then((response) => response.json())
    .then((data) => {
      data = data[0].name;
      return data;
    });
  return word;*/
