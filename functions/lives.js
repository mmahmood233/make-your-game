import { game } from '../game.js';
import { createEnemies } from './enemies.js';
import { timerInterval } from './timer.js';

let lives = 3;

export function initializeLives() {
    lives = 3; 
    updateLivesDisplay();
}

export function decreaseLives(resetEnemies = true) {
    lives--; // Decrease the number of lives
    updateLivesDisplay(); // Update the lives display
    if (lives <= 0) {
        clearInterval(timerInterval);
        gameOver();
    } else {
        // Play player dead sound
        const playerIsDeadSound = new Audio('/playerKilled.wav');
        playerIsDeadSound.currentTime = 0;
        playerIsDeadSound.play().catch(error => console.log('Error playing player dead sound:', error));
        
        // Reset enemies only if needed
        if (resetEnemies) {
            restartGame();
        }
    }
}

export function getLives() { 
    return lives; 
}

function restartGame() {
    // Remove all existing enemies
    const enemies = document.querySelectorAll('.invader');
    enemies.forEach(enemy => enemy.remove());

    // Create new enemies
    createEnemies();

    // Reset player position if needed
    // resetPlayerPosition();
}

function gameOver() {
    console.log('Game Over');
    // Create and display a game over screen
    const gameOverElement = document.createElement('div');
    gameOverElement.id = 'game-over';
    gameOverElement.textContent = 'GAME OVER';
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

function updateLivesDisplay() {
    let livesElement = document.getElementById('lives'); 
    if (!livesElement) {
        livesElement = document.createElement('div'); // Create a new element if it doesn't exist
        livesElement.id = 'lives'; // Set the ID
        livesElement.style.position = 'absolute';
        livesElement.style.top = '10px';
        livesElement.style.right = '10px';
        livesElement.style.color = 'white';
        livesElement.style.fontSize = '20px';
        game.appendChild(livesElement); // Add the lives element to the game container
    }
    livesElement.textContent = `Lives: ${lives}`; // Update the lives display
}
