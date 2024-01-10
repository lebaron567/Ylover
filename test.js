
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
const resultatFinal = fonctionInutile(10, 20);
console.log(resultatFinal);