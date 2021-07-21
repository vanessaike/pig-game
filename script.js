"use strict";

// SELECTING ELEMENTS
//buttons and dice
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new-game");
const diceElement = document.querySelector(".dice-element");

// players container
const containerPlayer0 = document.getElementById("player--0");
const containerPlayer1 = document.getElementById("player--1");

// scores values
const scoreElement0 = document.getElementById("score-player--0");
const scoreElement1 = document.getElementById("score-player--1");

// current scores container
const containerCurrent0 = document.getElementById("current-container--0");
const containerCurrent1 = document.getElementById("current-container--1");

// current scores values
const currentElement0 = document.getElementById("current-score--0");
const currentElement1 = document.getElementById("current-score--1");

// INITIAL CONDITIONS
let playing = true;
let scoresTotal, activePlayer, currentScore;

const init = function () {
  scoresTotal = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  // UI elements
  diceElement.classList.add("hidden");
  containerCurrent0.classList.remove("hidden");
  containerCurrent1.classList.remove("hidden");

  containerPlayer0.classList.remove("winner");
  containerPlayer1.classList.remove("winner");

  containerPlayer0.classList.add("active");
  containerPlayer1.classList.remove("active");

  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;
};
init();

// PLAYER SWITCH
const switchPlayer = function () {
  // toggling active class
  containerPlayer0.classList.toggle("active");
  containerPlayer1.classList.toggle("active");
  // cleaning current score
  currentScore = 0;
  document.getElementById(`current-score--${activePlayer}`).textContent = currentScore;
  // switch
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// EVENTS
btnRoll.addEventListener("click", function () {
  if (playing) {
    // rolling dice
    diceElement.classList.remove("hidden");
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.src = `img/dice-${diceNumber}.png`;
    // changing score or switching
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current-score--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // accumulating the score for the current player
    scoresTotal[activePlayer] += currentScore;
    document.getElementById(`score-player--${activePlayer}`).textContent = scoresTotal[activePlayer];
    // cleaning current score
    currentScore = 0;
    document.getElementById(`current-score--${activePlayer}`).textContent = 0;
    // victory or player switch
    if (scoresTotal[activePlayer] >= 100) {
      playing = false;
      document.getElementById(`player--${activePlayer}`).classList.add("winner");
      document.getElementById(`current-container--${activePlayer}`).classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", function () {
  playing = true;
  init();
});
