import { updatePlayerPosition } from './functions/players.js';
import { createEnemies, moveEnemies } from './functions/enemies.js';
import { moveBullets, checkPlayerCollision } from './functions/bullets.js';
import { initializeScore, checkWinCondition } from './functions/score.js';
import { initializeLives } from './functions/lives.js';
import { initializeTimer } from './functions/timer.js';
import { initializePlayerPosition } from './functions/players.js';




export const game = document.getElementById('game');
export const player = document.getElementById('player');
export const enemy = document.getElementById('enemy');
document.getElementById('resume').addEventListener('click', togglePause);
document.getElementById('restart').addEventListener('click', restartGame);


export const enemyMap = [
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [, , , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [, , , , 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [, , , , , 1, 1, 1, 1, 1, 1, 1],
    [, , , , , , 1, 1, 1, 1, 1],
    [, , , , , , , 1, 1, 1],
    [, , , , , , , , 1],

];

let lastTime = 0;
export let gameLoopId
let isPaused = false;

function gameLoop(currentTime) {
    if (!isPaused) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        updatePlayerPosition();
        moveEnemies(deltaTime);
        moveBullets();
        checkPlayerCollision();
        checkWinCondition();
        lastTime = currentTime;
    }
    gameLoopId = requestAnimationFrame(gameLoop);
}

createEnemies();
initializeScore();
initializeLives();
initializeTimer();
gameLoop();
initializePlayerPosition();

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') {
        togglePause();
    }
});

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        showPauseMenu();
    } else {
        hidePauseMenu();
        lastTime = performance.now(); // Reset lastTime when unpausing
    }
}

function hidePauseMenu() {
    const pauseMenu = document.getElementById('pause-menu');
    pauseMenu.style.display = 'none';
}



function showPauseMenu() {
    const pauseMenu = document.getElementById('pause-menu');
    pauseMenu.style.display = 'block';
}


function restartGame() {
    window.location.reload();
}

