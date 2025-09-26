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
    intentos = 0;
    letrasUsadas = [];
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
    mostrarPalabra();
}

function verificarFinJuego() {
    if (!palabraMostrada.includes("_")) {
        divMensaje.textContent = `Ganaste, adivinaste la palabra "${palabraSecreta}" en ${intentos} intentos`;
        deshabilitarBotones();
    } else if (intentos === 7) {
        divMensaje.textContent = `Perdiste, la palabra era "${palabraSecreta}"`;
        deshabilitarBotones();
    }
}

function deshabilitarBotones() {
    let botones = divLetras.querySelectorAll("button");
    botones.forEach(boton => boton.disabled = true);
}


//Dibujo del muñeco de ahorcado
function dibujarBase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 240);
  ctx.lineTo(190, 240); // base
  ctx.moveTo(50, 240);
  ctx.lineTo(50, 20);   // poste
  ctx.lineTo(130, 20);  // barra superior
  ctx.lineTo(130, 40);  // cuerda
  ctx.stroke();
}

function dibujarParte(intento) {
  ctx.beginPath();
  switch (intento) {
    case 1: // cabeza
      ctx.arc(130, 60, 20, 0, Math.PI * 2);
      break;
    case 2: // torso
      ctx.moveTo(130, 80);
      ctx.lineTo(130, 140);
      break;
    case 3: // pierna izquierda
      ctx.moveTo(130, 140);
      ctx.lineTo(110, 180);
      break;
    case 4: // pierna derecha
      ctx.moveTo(130, 140);
      ctx.lineTo(150, 180);
      break;
    case 5: // brazo izquierdo
      ctx.moveTo(130, 100);
      ctx.lineTo(110, 120);
      break;
    case 6: // brazo derecho
      ctx.moveTo(130, 100);
      ctx.lineTo(150, 120);
      break;
    case 7: // ahorcado (cuerda al cuello)
      ctx.moveTo(130, 40);
      ctx.lineTo(130, 60);
      break;
  }
  ctx.stroke();
}

iniciarJuego();

const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", iniciarJuego);

window.onload = iniciarJuego;




