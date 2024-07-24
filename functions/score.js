import { game, freezeGame } from '../game.js';
import { timerInterval, pauseTimer } from './timer.js';

let score = 0;

export function increaseScore(points) {
    score += points; // Increase the score by the given points
    updateScoreDisplay();
}

export function getScore() {
    return score;
}

export function checkWinCondition() {
    const remainingEnemies = document.querySelectorAll('.invader');
    if (remainingEnemies.length === 0) {
        clearInterval(timerInterval);
        showWinScreen();
    }
}

function updateScoreDisplay() {
    let scoreElement = document.getElementById('score'); 
    if (!scoreElement) {
        scoreElement = document.createElement('div');
        scoreElement.id = 'score';
        scoreElement.style.position = 'absolute';
        scoreElement.style.top = '10px';
        scoreElement.style.left = '10px';
        scoreElement.style.color = 'white';
        scoreElement.style.fontSize = '20px';
        game.appendChild(scoreElement); // Add the score element to the game container
    }
    scoreElement.textContent = `Score: ${score}`; // Update the score display
}

export function initializeScore() {
    score = 0; // Reset score to 0 when the game starts
    updateScoreDisplay();
}

function showWinScreen() {
    const winMenu = document.getElementById('win-menu');
    winMenu.style.display = 'block';
    freezeGame();
    pauseTimer();
}
