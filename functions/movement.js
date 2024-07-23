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

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isSpacePressed) {
        isSpacePressed = true;
        createBullet();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        isSpacePressed = false;
    }
});

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
