import { createBullet } from './bullets.js';

export const keys = {
    ArrowLeft: false,
    ArrowRight: false
};

export function handleKeyDown(e) {
    if (e.key in keys) {
        keys[e.key] = true;
    }
}

export function handleKeyUp(e) {
    if (e.key in keys) {
        keys[e.key] = false;
    }
}

let isSpacePressed = false; 
let bulletInterval;


document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isSpacePressed) {
        isSpacePressed = true;
        createBullet();
        bulletInterval = setInterval(createBullet, 250); // Create a new bullet every 500ms
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        isSpacePressed = false; // Reset the flag when the spacebar is released
        clearInterval(bulletInterval); // Stop creating bullets when the spacebar is released
    }
});

document.addEventListener('keydown', handleKeyDown); 
document.addEventListener('keyup', handleKeyUp);
