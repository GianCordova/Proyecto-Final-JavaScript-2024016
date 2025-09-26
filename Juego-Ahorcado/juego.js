//Varibales

let palabrasDisponibles = [
    "giancarlo", "pizza", "pantalla", "javascript", "computadora",
  "internet", "ahorcado", "casa", "juego", "codigo",
  "perro", "funcion", "objeto", "vector", "clase",
  "metodo", "navegador", "desarrollo", "mario", "pollo"
];

let palabraSecreta ="";
let palabraMostrada =[];
let intentos = 0;
let letrasUsadas =[];

const divPalabra = document.getElementById("palabra");
const divLetras = document.getElementById("letras");
const divMensaje = document.getElementById("mensaje");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


//Funciones
function iniciarJuego() {
    palabraSecreta = obtenerPalabraAlAzar();
    palabraMostrada = Array(palabraSecreta.length).fill("_");
    let intentos = 0;
    let letrasUsadas = [];
    divMensaje.textContent = "";
    dibujarBase();
    mostrarPalabra();
    generarBotones();
}

function obtenerPalabraAlAzar() {
    let indice = Math.floor(Math.random() * palabrasDisponibles.length);
    return palabrasDisponibles[indice];
}

function mostrarPalabra() {
    divPalabra.textContent = palabraMostrada.join(" ");
}

function generarBotones() {
    divLetras.innerHTML = "";
    const letras ="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    letras.forEach(letra => {
    let boton = document.createElement("button");
    boton.textContent = letra;
    boton.onclick = () => manejarIntento(letra.toLowerCase(), boton);
    divLetras.appendChild(boton);
  });
}

function manejarIntento(letra, boton) {
    if (letrasUsadas.includes(letra))
        return;
    letrasUsadas.push(letra);
    boton.disabled = true;

    if (palabraSecreta.includes(letra)) {
        actualizarPalabra(letra);
    } else {
        intentos++;
        dibujarParte(intentos);
    }

    verificarFinJuego();
}

function actualizarPalabra(letra) {
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            palabraMostrada[i] = letra;
        }
    }
    mostrarPalabra;
}

function verificarFinJuego() {
    if (!palabraMostrada.includes("_")) {
        divMensaje.textContent = `Ganaste, adivinaste la palabra "${palabraSecreta}" en ${intentos} intentos`;
        deshabilitarBotones();
    } else if (intentos === 7) {
        divMensaje.textContent = `Perdiste, la palabra era "${palabraSecreta}".`;
    }
}

function deshabilitarBotones() {
    let botones = divLetras.querySelectorAll("button");
    botones.forEach(boton => boton.disabled = true);
}



