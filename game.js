import { updatePlayerPosition } from './functions/players.js';
import { createEnemies, moveEnemies } from './functions/enemies.js';
import { moveBullets, checkPlayerCollision } from './functions/bullets.js';
import { initializeScore } from './functions/score.js';
import { initializeLives } from './functions/lives.js';
import { initializeTimer } from './functions/timer.js';




export const game = document.getElementById('game');
export const player = document.getElementById('player');
export const enemy = document.getElementById('enemy');

export const enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let lastTime = 0;
export let gameLoopId

function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    updatePlayerPosition();
    moveEnemies(deltaTime);
    moveBullets();
    checkPlayerCollision();
    lastTime = currentTime;
    gameLoopId = requestAnimationFrame(gameLoop);
}

createEnemies();
initializeScore();
initializeLives();
initializeTimer();
gameLoop();