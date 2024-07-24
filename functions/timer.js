import { game, freezeGame } from '../game.js';

let timeRemaining = 120; 
export let timerInterval;

export function initializeTimer() {
    timeRemaining = 120;
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

export function pauseTimer() {
    clearInterval(timerInterval); // Stop the timer
}

export function resumeTimer() {
    timerInterval = setInterval(updateTimer, 1000); // Resume the timer
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
    const timeMenu = document.getElementById('time-menu');
    timeMenu.style.display = 'block';
    freezeGame();
    pauseTimer();
}
