let inputPalabra = document.getElementById("inputPalabra");
let buttonPalabra = document.getElementById("buttonPalabra");
let palabraDisplay = document.getElementById("palabraDisplay");
let alert = document.getElementById("alert");
let text = document.getElementById("text");
let img = document.getElementById("img");
let icon = document.getElementById("icon");

let palabraPasswd; // palabra correcta
let palabraFormat; // palabra con barras bajas
let intentos = 0; // numero de intentos

// metodo principal de jugar
function jugar() {
  // se revisa si no se introduce una palabra vacia
  if (inputPalabra.value === "") {
    alertacion();
  } else {
    if (revisarNum(inputPalabra.value)) {
      // cuando se introduzca una palabra correctamente
      intentos = 0;
      palabraPasswd = inputPalabra.value; // se establece la palabra
      format(palabraPasswd); // se formatea la palabra a barras bajas

      // esto no le hagas mucho caso son estilos y cosas visuales
      img.setAttribute("src", "img/stag" + intentos + ".jpg");
      inputPalabra.disabled = "true";
      inputPalabra.value = "";
      inputPalabra.setAttribute("placeholder", "Adivina la palabra");
      buttonPalabra.setAttribute("disabled", true);
      inputPalabra.classList.remove("is-warning");
      hide();
      activarBtn();
      showIcon();
    }
  }
}

// funcion para revisar si existe numeros en la palabra introducida
function revisarNum(palabra) {
  let patt = /[0-9]/g;
  if(palabra.search(patt) == -1){
    return true;
  }else{
    alertacion();
    return false;
  }
}

function format(palabra) {
  // se encuentra todas las letras y se reemplazan por barras bajas
  patt = /[A-z]/gim;
  palabraFormat = palabra.replace(patt, "_");
  palabraDisplay.value = palabraFormat; // se actualiza la variable
}

// coge la letra que ha pulsado el jugador y se comprueba con la siguiente funcion si
// es correcta, ademas de poner el botoncito verde o rojo

function letra(letra, id) {
  let letraPrueba = String(letra);
  if (adivinar(letraPrueba)) {
    document.getElementById(id).classList.add("is-success");
    document.getElementById(id).disabled = "true";
  } else {
    document.getElementById(id).classList.add("is-danger");
    document.getElementById(id).disabled = "true";
  }
}

// pilla la letra introducida por parametro y se comprueba
function adivinar(input) {
  // se pone tanto la letra como la palabra secreta en minusculas
  let inputMin = input.toLowerCase();
  let palabraPasswdMin = palabraPasswd.toLowerCase();

  let pattLetra = new RegExp(inputMin, "g"); // con una expresion regular se busca
  if (palabraPasswdMin.search(pattLetra) === -1) {
    // si search devuelve -1 significa que no se encontró
    intentos++; //aumenta los intentos
    revisarIntentos();
    return false;
  } else {
    reformat(palabraPasswdMin, inputMin); // si se encuentra se reformatea la palabra en barras bajas mostrando cual se adivino
    revisarPalabra();
    return true;
  }
}

// este metodo es para revisar los intentos, actualizar la imagen mostrada y si se llega a 6 se pierde
function revisarIntentos() {
  img.setAttribute("src", "img/stag" + intentos + ".jpg");
  if (intentos === 6) {
    desactivarBtn();
    perdicion();
  }
}

// esta funcion comprueba si la palabra formateada le quedan barras bajas
function revisarPalabra() {
  palabraFormatArray = palabraFormat.split("");
  let index = 0;
  for (let i = 0; i < palabraFormatArray.length; i++) {
    if (palabraFormatArray[i] === "_") {
      index = 1; // si encuentra una se añade 1 a la variable auxiliar
    }
  }
  // si no encuentra barras bajas es que se ha adivinado la palabra
  if (index === 0) {
    ganacion();
    desactivarBtn();
  }
}

// esta funcion es un poco liosa de entender pero
// se le pasa la palabra  a adivinar y una letra
function reformat(palabra, letra) {
  // la palabra secreta y la de barras bajas se convierten en arrays
  let palabraArray = palabra.split("");
  palabraFormatArray = palabraFormat.split("");

  // para luego compararse y actualizar la palabra en barrasbajas
  // con la letra en la posicion en la que va la letra en la palabra secreta
  for (let i = 0; i < palabraArray.length; i++) {
    if (palabraArray[i] === letra) {
      palabraFormatArray[i] = letra;
    }
  }
  // y luego se convierte en string
  palabraFormat = palabraFormatArray.join("");
  // y se muestra la palabra en barras bajas actualizada
  palabraDisplay.value = palabraFormat;
}

// de aqui para abajo son funciones para estilos, animaciones etc etc

function alertacion() {
  alert.classList.remove("is-success");
  alert.classList.remove("is-danger");
  alert.classList.add("is-warning");
  alert.style.visibility = "visible";
  alert.style.height = "auto";
  inputPalabra.classList.add("is-warning");
  text.innerHTML =
    "¿Tas bobo? Mirave si la palabra que pusiste no tiene números o esta vacía.";
}

function ganacion() {
  alert.classList.remove("is-warning");
  alert.classList.remove("is-danger");
  alert.classList.add("is-success");
  alert.style.visibility = "visible";
  alert.style.height = "auto";
  palabraDisplay.classList.add("is-success");
  text.innerHTML =
    "Olee... Has adivinado la palabra. Pulsa en 'Reiniciar' para comenzar una nueva partida.";
}

function perdicion() {
  alert.classList.remove("is-success");
  alert.classList.remove("is-warning");
  alert.classList.add("is-danger");
  alert.style.visibility = "visible";
  alert.style.height = "auto";
  palabraDisplay.classList.add("is-danger");
  palabraDisplay.value = palabraPasswd;
  text.innerHTML =
    "Los aliens se llevan a Willy ¿Estarás contento no? Pulsa en 'Reiniciar' para comenzar una nueva partida anda...";
}

function hide() {
  alert.style.visibility = "hidden";
  alert.style.height = "0px";
}

function hideIcon() {
  icon.style.visibility = "hidden";
  icon.style.height = "0px";
  icon.style.width = "0px";
}

function showIcon() {
  icon.style.visibility = "visible";
  icon.style.height = "auto";
  icon.style.width = "auto";
}

function reset() {
  intentos = 0;
  img.setAttribute("src", "img/stag" + intentos + ".jpg");
  palabraPasswd = "";
  palabraFormat = "";
  palabraDisplay.value = "";
  palabraDisplay.classList.remove("is-success");
  palabraDisplay.classList.remove("is-danger");
  palabraDisplay.classList.remove("is-success");
  inputPalabra.removeAttribute("disabled");
  inputPalabra.setAttribute("placeholder", "Introduce una palabra");
  inputPalabra.classList.remove("is-warning");
  buttonPalabra.removeAttribute("disabled");

  hide();
  desactivarBtn();
  hideIcon();
}

function desactivarBtn() {
  for (let i = 1; i <= 27; i++) {
    document.getElementById("btn" + i).setAttribute("disabled", true);
    document.getElementById("btn" + i).classList.remove("is-danger");
    document.getElementById("btn" + i).classList.remove("is-success");
  }
}

function activarBtn() {
  for (let i = 1; i <= 27; i++) {
    document.getElementById("btn" + i).removeAttribute("disabled");
    document.getElementById("btn" + i).classList.remove("is-danger");
    document.getElementById("btn" + i).classList.remove("is-success");
  }
}
