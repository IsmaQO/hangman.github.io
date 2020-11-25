let inputPalabra = document.getElementById("inputPalabra");
let buttonPalabra = document.getElementById("buttonPalabra");
let palabraDisplay = document.getElementById("palabraDisplay");
let alert = document.getElementById("alert");
let text = document.getElementById("text");
let img = document.getElementById("img");
let icon = document.getElementById("icon");

let palabraPasswd;
let palabraFormat;
let intentos = 0;

function jugar() {
  if (inputPalabra.value === "") {
    alertacion();
  } else {
    intentos = 0;
    img.setAttribute("src", "img/stag" + intentos + ".jpg");
    palabraPasswd = inputPalabra.value;
    format(palabraPasswd);
    inputPalabra.disabled = "true";
    inputPalabra.value = ""
    inputPalabra.setAttribute("placeholder", "Adivina la palabra");
    buttonPalabra.setAttribute("disabled", true);
    inputPalabra.classList.remove("is-warning");
    hide();
    activarBtn();
    showIcon();
  }
}

function format(palabra) {
  patt = /[A-z]/gim;
  palabraFormat = palabra.replace(patt, "_");
  palabraDisplay.value = palabraFormat;
}

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

function adivinar(input) {
  let inputMin = input.toLowerCase();
  let palabraPasswdMin = palabraPasswd.toLowerCase();

  let pattLetra = new RegExp(inputMin, "g");
  if (palabraPasswdMin.search(pattLetra) === -1) {
    intentos++;
    revisarIntentos();
    return false;
  } else {
    reformat(palabraPasswdMin, inputMin);
    revisarPalabra();
    return true;
  }
}

function revisarIntentos() {
  img.setAttribute("src", "img/stag" + intentos + ".jpg");
  if (intentos === 6) {
    desactivarBtn();
    perdicion();
  }
}

function revisarPalabra() {
  palabraFormatArray = palabraFormat.split("");
  let index = 0;
  for (let i = 0; i < palabraFormatArray.length; i++) {
    if (palabraFormatArray[i] === "_") {
      index = 1;
    }
  }
  if (index === 0) {
    ganacion();
    desactivarBtn();
  }
}

function reformat(palabra, letra) {
  let palabraArray = palabra.split("");
  palabraFormatArray = palabraFormat.split("");
  for (let i = 0; i < palabraArray.length; i++) {
    if (palabraArray[i] === letra) {
      palabraFormatArray[i] = letra;
    }
  }
  palabraFormat = palabraFormatArray.join("");
  palabraDisplay.value = palabraFormat;
}

function alertacion() {
  alert.classList.remove("is-success");
  alert.classList.remove("is-danger");
  alert.classList.add("is-warning");
  alert.style.visibility = "visible";
  alert.style.height = "auto";
  inputPalabra.classList.add("is-warning");
  text.innerHTML = "¿Tas bobo? Tienes que introducir una palabra que hay que adivinar para comenzar a jugar.";
}

function ganacion() {
  alert.classList.remove("is-warning");
  alert.classList.remove("is-danger");
  alert.classList.add("is-success");
  alert.style.visibility = "visible";
  alert.style.height = "auto";
  palabraDisplay.classList.add("is-success");
  text.innerHTML = "Has adivinado la palabra. Pulsa en 'Reiniciar' para comenzar una nueva partida.";

}

function perdicion() {
  alert.classList.remove("is-success");
  alert.classList.remove("is-warning");
  alert.classList.add("is-danger");
  alert.style.visibility = "visible";
  alert.style.height = "auto";
  palabraDisplay.classList.add("is-danger");
  palabraDisplay.value = palabraPasswd;
  text.innerHTML = "Has perdido... Haber estudiao. Pulsa en 'Reiniciar' para comenzar una nueva partida.";
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