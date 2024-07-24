import { player } from '../game.js';
import { keys } from './movement.js';

const gameWidth = 1500; // Game width
const playerWidth = 80;  // New player width
const playerHeight = 60; // New player height

export let playerSpeed = 5;
export let playerX = gameWidth / 2 - playerWidth / 2; // Start at the center

export function updatePlayerPosition() {
    if (keys.ArrowLeft && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys.ArrowRight && playerX < gameWidth - playerWidth) {
        playerX += playerSpeed;
    }
    
    // Ensure player stays within bounds
    playerX = Math.max(0, Math.min(gameWidth - playerWidth, playerX));
    
    player.style.left = `${playerX}px`;
}

export function initializePlayerPosition() {
    playerX = gameWidth / 2 - playerWidth / 2;
    player.style.left = `${playerX}px`;
    player.style.bottom = '20px';
    player.style.width = `${playerWidth}px`;
    player.style.height = `${playerHeight}px`;
}