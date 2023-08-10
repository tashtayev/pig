'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0')
const player1Element = document.querySelector('.player--1')
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceElement = document.querySelector('.dice');

let totalScores, currentScore, activePlayer, isPlaying

const initGame = function () {

  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
}

const switchActivePlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchActivePlayer();
    }
  }

})

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];
    if (totalScores[activePlayer] >= 100) {
      diceElement.classList.add('hidden')
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchActivePlayer();
    }
  }
})

btnNew.addEventListener('click', initGame);