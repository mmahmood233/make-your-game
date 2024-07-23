import { player } from '../game.js';
import { keys } from './movement.js';

export let playerSpeed = 3;
export let playerX = 375;

export function updatePlayerPosition() {
    if (keys.ArrowLeft && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys.ArrowRight && playerX < 750) {
        playerX += playerSpeed;
    }
    player.style.left = `${playerX}px`;
}
