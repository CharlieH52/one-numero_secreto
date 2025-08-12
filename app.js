// CONFIG VARIABLES
let startedgame = false;
let capNumber = 10;
let userTrys = 6;
let tryCap = 3;
let secretNumber = set_random_number();

const winMessage = "Felicidades! Has ganado.";
const lossMessage = "Ya no quedan intentos.";
const defaultMessage = "Selecciona un número.";

// DEFAULT DOM ELEMENTS
const statusClass = ".game-status-text";

// GAME DATA
const inpNumber = document.getElementById("inpNumber");
const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");

// GAME STATUS
const gameTrys = document.querySelector("#tryTag");
const gameInst = document.querySelector(".game-instructions");
gameTrys.innerText = `${userTrys}`;
gameInst.innerText = "Encuentra el numero entre el 1 y el 10.";

// GAME LEVELS
const easyLevel = document.getElementById("easy");
const mediumLevel = document.getElementById("medium");
const hardLevel = document.getElementById("hard");

const levelList = [easyLevel, mediumLevel, hardLevel];

levelList.forEach(element => {
    element.addEventListener("click", function() {
        if (element == easyLevel) {
            easy_stage();
        }

        if (element == mediumLevel) {
            medium_stage();
        }

        if (element == hardLevel) {
            hard_stage();
        }
    });
});

function change_status(target, text) {
    document.querySelector(target).innerText = text;
}

function get_try_cap_number() {
    cap = inpNumber.value;
    return cap;
}

function check_input(input, cap) {
    return input > cap ? cap : input;
}

function plus(){
    let up = parseInt(inpNumber.value);
    if (up >= 10) {
        inpNumber.value = 10;
    } else {
        inpNumber.value = up + 1;
    }
}

function minus(){
    let down = parseInt(inpNumber.value);
    if (down <= 1) {
        inpNumber.value = 1;
    } else {
        inpNumber.value = down - 1;
    }
}

function reset_game() {
    if (resetButton.disabled == false) {
        resetButton.setAttribute("disabled", "");
        secretNumber = set_random_number();
        inpNumber.value = 1;
        gameTrys.innerText = userTrys;
        change_status(statusClass, defaultMessage);
        tryCap = userTrys;
    }
}

function set_random_number() {
    let randomNumber = Math.random() * capNumber;
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
}

function change_dificult(gameCap){
    console.log("clicked >> " + gameCap);
    userTrys = gameCap;
    tryCap = gameCap;
    gameTrys.innerText = gameCap;
    reset_game();
}

function easy_stage() {
    change_dificult(6);
}

function medium_stage() {
    change_dificult(4);
}

function hard_stage() {
    change_dificult(2);
}

// GAME SYSTEM
function user_try(secretNumber) {
    let incNumber = inpNumber.value;

    if (incNumber < secretNumber) {
        const higher = `El numero es mayor que ${incNumber}`; 
        change_status(statusClass, higher);
    }

    if (incNumber > secretNumber) {
        const lesser = `El numero es menor que ${incNumber}`;
        change_status(statusClass, lesser);
    }

    if (incNumber == secretNumber) {
        const meta = `${secretNumber}`;
        gameTrys.innerText = meta;
        change_status(statusClass, winMessage);
    }
}

// START THE GAME
playButton.addEventListener("click", function() {
    resetButton.removeAttribute("disabled");
    if (tryCap <= userTrys && tryCap > 0) {
        tryCap--;
        gameTrys.innerText = tryCap;
        user_try(secretNumber);
    } else {
        change_status(statusClass, lossMessage);
    }
    
});

resetButton.addEventListener("click", function() {
    reset_game();
});

document.addEventListener("DOMContentLoaded", function() {
    change_status(statusClass, defaultMessage);
});