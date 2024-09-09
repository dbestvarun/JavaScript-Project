let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = ''
    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 2 / 3) {
        computerMove = 'paper';
    }
    else {
        computerMove = 'scissors';
    }

    return computerMove;
}

let autoPlaying = false;
let intervalId;

document.querySelector('.js-auto').addEventListener('click', () => {
    if (!autoPlaying) {
        intervalId = setInterval(() => {
            let playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        autoPlaying = true;
        document.querySelector('.js-auto').innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        autoPlaying = false;
        document.querySelector('.js-auto').innerHTML = 'Auto Play';
    }
});



document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'a') {
        if (!autoPlaying) {
            intervalId = setInterval(() => {
                let playerMove = pickComputerMove();
                playGame(playerMove);
            }, 1000);
            autoPlaying = true;
            document.querySelector('.js-auto').innerHTML = 'Stop Playing';
        } else {
            clearInterval(intervalId);
            autoPlaying = false;
            document.querySelector('.js-auto').innerHTML = 'Auto Play';
        }
    }
    else if (event.key === 'Backspace') {
        document.querySelector('.js-confirmation').innerHTML = `Are you sure you want to reset the score? 
    <button class="js-yes-confirmation reset-confirm-button">Yes</button>
    <button class="js-no-confirmation reset-confirm-button">No</button>`;
    }
    console.log(event.key);
});

function playGame(playerMove) {


    const computerMove = pickComputerMove();

    let result = '';
    const outcome = document.querySelector('.js-result')

    if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = 'Tie';
        }
        else if (computerMove === 'rock') {
            result = 'You Lose.';
        }
        else {
            result = 'You Win.';
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'You Lose.';
        }
        else {
            result = 'You Win.';
        }
    }
    else {
        if (computerMove === 'paper') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You Lose.';
        }
        else {
            result = 'You Win.';
        }
    }

    if (result === 'Tie') {
        score.ties += 1;
        outcome.classList.remove('result-win','result-lose');
        outcome.classList.add('result-tie');
    }
    else if (result == 'You Win.') {
        score.wins += 1;
        outcome.classList.remove('result-lose','result-tie');
        outcome.classList.add('result-win');
    }
    else {
        score.losses += 1;
        outcome.classList.remove('result-win','result-tie');
        outcome.classList.add('result-lose');
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
    outcome.innerHTML = result;
    

    document.querySelector('.js-moves').innerHTML = `You
<img src="img/${playerMove}-emoji.png" class="move-icon">
<img src="img/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    document.querySelector('.js-confirmation').innerHTML = `Are you sure you want to reset the score? 
    <button class="js-yes-confirmation reset-confirm-button">Yes</button>
    <button class="js-no-confirmation reset-confirm-button">No</button>`;
});

document.querySelector('.js-confirmation').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-yes-confirmation')) {
        score.wins = 0;
        score.ties = 0;
        score.losses = 0;
        localStorage.removeItem('score');
        updateScore();
        document.querySelector('.js-result').innerHTML = '';
        document.querySelector('.js-moves').innerHTML = `The score was reset.`;
        document.querySelector('.js-confirmation').innerHTML = ' ';
    } else if (event.target.classList.contains('js-no-confirmation')) {
        document.querySelector('.js-confirmation').innerHTML = ' ';
    }
});

function updateScore() {
    document.querySelector('.js-score').innerHTML = `<span style="color: green">Wins:</span> ${score.wins}. <span style="color: red">Loses:</span> ${score.losses}. <span style="color: grey">Ties:</span> ${score.ties}.`;
}


