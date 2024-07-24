import { game, gameLoopId } from '../game.js';

let timeRemaining = 60; 
export let timerInterval;

export function initializeTimer() {
    timeRemaining = 60;
    updateTimerDisplay();
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

function updateTimer() {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the timer
        gameOver();
    }
}

function updateTimerDisplay() {
    let timerElement = document.getElementById('timer');
    if (!timerElement) {
        timerElement = document.createElement('div');
        timerElement.id = 'timer';
        timerElement.style.position = 'absolute';
        timerElement.style.top = '10px';
        timerElement.style.left = '50%';
        timerElement.style.transform = 'translateX(-50%)';
        timerElement.style.color = 'white';
        timerElement.style.fontSize = '20px';
        game.appendChild(timerElement);
    }
    timerElement.textContent = `Time: ${timeRemaining}`;
}

function gameOver() {
    console.log('Game Over');
    // Create and display a game over screen
    const gameOverElement = document.createElement('div');
    gameOverElement.id = 'game-over';
    gameOverElement.textContent = 'Time\'s Up';
    gameOverElement.style.position = 'absolute';
    gameOverElement.style.top = '50%';
    gameOverElement.style.left = '50%';
    gameOverElement.style.transform = 'translate(-50%, -50%)';
    gameOverElement.style.fontSize = '48px';
    gameOverElement.style.color = 'red';
    game.appendChild(gameOverElement);

    // Stop the game loop
    cancelAnimationFrame(gameLoopId);
}
