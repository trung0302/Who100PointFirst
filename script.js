'use strict';

// Selecting Elements
var score0Element = document.getElementById('score--0');   
var score1Element = document.getElementById('score--1');  
var current0Element = document.querySelector('#current--0');
var current1Element = document.querySelector('#current--1');

var player0Element = document.querySelector('.player--0')
var player1Element = document.querySelector('.player--1');;

var diceElement = document.querySelector('.dice');
var btnNew = document.querySelector('.btn--new');
var btnRoll = document.querySelector('.btn--roll');
var btnHold = document.querySelector('.btn--hold');

var scores, playing, currentScore, activePlayer;

// Starting conditions
score0Element.innerText = 0;
score1Element.innerText = 0;

// Rolling dice functionality
function initGame () {
    current0Element.innerText = 0;
    current1Element.innerText = 0;
    score0Element.innerText = 0;
    score1Element.innerText = 0;
    
    scores = [0, 0];
    playing = true;
    currentScore = 0; 
    activePlayer = 0;
    
    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player1Element.classList.remove('player--active');
    player0Element.classList.add('player--active');
}

function switchPlayer () {
    document.getElementById(`current--${activePlayer}`).innerText = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

function rollDice () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).innerText = currentScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
}

function holdPoint() {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).innerText = scores[activePlayer];
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
}

initGame();
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdPoint);
btnNew.addEventListener('click', initGame);