import {startConfetti, stopConfetti, removeConfetti} from "./confetti.js";

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
    rock: {name: 'Rock', defeats: ['scissors', 'lizard']},
    paper: {name: 'Paper', defeats: ['rock', 'spock']},
    scissors: {name: 'Scissors', defeats: ['paper', 'lizard']},
    lizard: {name: 'Lizard', defeats: ['paper', 'spock']},
    spock: {name: 'Spock', defeats: ['scissors', 'rock']},
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
// we can use this instead of return computer choice in our function
let computerChoice = '';

// reset all 'selected' icons
function resetSelected() {
    allGameIcons.forEach((icon) => {
        icon.classList.remove('selected');
    });
    stopConfetti();
    removeConfetti();
}

// resetScore & playerChoice/computerChoice
function resetAll() {
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    playerScoreEl.textContent = `${playerScoreNumber}`;
    playerChoiceEl.textContent = '';
    computerScoreEl.textContent = `${computerScoreNumber}`;
    computerChoiceEl.textContent = '';
    resultText.textContent = '';
    resetSelected();
}

window.resetAll = resetAll;

// random computer choice
function computerRandomChoice() {
    const computerChoiceNumber = Math.random();
    // it will go 1 by 1 no need for &&
    if (computerChoiceNumber < 0.2) {
        computerChoice = 'rock';
    } else if (computerChoiceNumber <= 0.4) {
        computerChoice = 'paper';
    } else if (computerChoiceNumber <= 0.6) {
        computerChoice = 'scissors';
    } else if (computerChoiceNumber <= 0.8) {
        computerChoice = 'lizard';
    } else {
        computerChoice = 'spock';
    }
}

// add 'selected' styling & computerChoice
function displayComputerChoice() {
    switch (computerChoice) {
        case 'rock':
            computerRock.classList.add('selected');
            computerChoiceEl.textContent = ' --- Rock';
            break;
        case 'paper':
            computerPaper.classList.add('selected');
            computerChoiceEl.textContent = ' ---- paper';
            break;
        case 'scissors':
            computerScissors.classList.add('selected');
            computerChoiceEl.textContent = ' --- scissors';
            break;
        case 'lizard':
            computerLizard.classList.add('selected');
            computerChoiceEl.textContent = ' --- lizard';
            break;
        case 'spock':
            computerSpock.classList.add('selected');
            computerChoiceEl.textContent = ' --- spock';
            break;
        default:
            break;
    }
}

// check result, increase Scores, update Result text
function updateScore(playerChoice) {
    if (playerChoice === computerChoice) {
        resultText.textContent = "it's a tie";
    } else {
        const choice = choices[playerChoice];
        if (choice.defeats.indexOf(computerChoice) > -1) {
            startConfetti();
            resultText.textContent = "You Won!";
            playerScoreNumber++;
            playerScoreEl.textContent = `${playerScoreNumber}`;
        } else {
            resultText.textContent = "You Lost!";
            computerScoreNumber++;
            computerScoreEl.textContent = `${computerScoreNumber}`;
        }
    }
}

// call functions to process turn (we need player choice in function cause we dont have global player choice)
function checkResult(playerChoice) {
    resetSelected();
    computerRandomChoice();
    displayComputerChoice();
    updateScore(playerChoice);
}

// passing player selection value and styling icons
function select(playerChoice) {
    checkResult(playerChoice);
    // add 'selected' styling & playerChoice
    switch (playerChoice) {
        case 'rock':
            playerRock.classList.add('selected');
            playerChoiceEl.textContent = ' --- Rock';
            break;
        case 'paper':
            playerPaper.classList.add('selected');
            playerChoiceEl.textContent = ' ---- paper';
            break;
        case 'scissors':
            playerScissors.classList.add('selected');
            playerChoiceEl.textContent = ' --- scissors';
            break;
        case 'lizard':
            playerLizard.classList.add('selected');
            playerChoiceEl.textContent = ' --- lizard';
            break;
        case 'spock':
            playerSpock.classList.add('selected');
            playerChoiceEl.textContent = ' --- spock';
            break;
        default:
            break;
    }
}

window.select = select;

// on startup , set initial values
resetAll();


