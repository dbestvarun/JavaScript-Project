// generating the number 
let randomNumber = parseInt(Math.random() * 100 + 1);

// declaring all the required variables
const submitButton = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const guessRemainingSlot = document.querySelector('.lastResult');
const guide = document.querySelector('.lowOrHi');
const gameOver = document.querySelector('.resultParas');

let guessRemaining = +10;

const p = document.createElement('p');

let playGame = true;

if (playGame) {
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = +userInput.value;
    validateGuess(guess);
  })

}

//Methods of this game
function startGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    guessRemaining = 10;
    guessRemainingSlot.innerHTML = guessRemaining;
    guessSlot.innerHTML = '';
    displayMessage('');
    submitButton.removeAttribute('disabled');
    userInput.removeAttribute('disabled');
    gameOver.removeChild(p);

    playGame = true;
  })
}

function endGame() {
  userInput.setAttribute('disabled', '');
  submitButton.setAttribute('disabled', '');
  p.innerHTML = `<h2 id='newGame'>Start A New Game </h2>`;
  gameOver.appendChild(p);
  playGame = false;
  startGame();
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Enter a valid number');
  } else if (guess > 100 || guess < 1) {
    alert('Enter a number between 1 and 100.')
  } else {
    if (guessRemaining > 1) {
      displayGuess(guess);
      checkGuess(guess);
    } else {
      let wrongResult = true;
      displayGuess(guess);
      if (wrongResult) {
        displayMessage(`Game Over. The Random Number was ${randomNumber}`);
        endGame();
      }
    }
  }
}

function checkGuess(guess, wrongResult = true) {
  if (guess === randomNumber) {
    displayMessage(`You have guessed it right. The Mystery Number is ${randomNumber}`);
    endGame();
    wrongResult = false;
  } else if (guess >= randomNumber + 15) {
    displayMessage(`The Guessed Number is TOO HIGH!`);
  } else if (guess <= randomNumber - 15) {
    displayMessage(`The Guessed Number is TOO LOW!`);
  } else if (guess < randomNumber) {
    displayMessage(`The Guessed Number is LOW!`);
  } else {
    displayMessage(`The Guessed Number is HIGH!`);
  }
}

function displayMessage(message) {
  guide.innerHTML = `<h2>${message}</h2>`;
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `| ${guess} |`;
  guessRemaining--;
  guessRemainingSlot.innerHTML = guessRemaining;
}
