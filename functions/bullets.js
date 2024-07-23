import { game } from '../game.js';
import { playerX } from './players.js';
import { increaseScore } from './score.js';
import { decreaseLives } from './lives.js';


export function createBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${playerX + 25}px`; // Center of the player
    bullet.style.bottom = '50px'; // Just above the player
    game.appendChild(bullet);
}

export function moveBullets() {
    const bullets = document.querySelectorAll('.bullet');
    bullets.forEach(bullet => {
        const y = parseFloat(bullet.style.bottom) + 3; // Bullet speed
        if (y > 600) { 
            bullet.remove();  // Bullet disappears when it goes off the screen 600 is the height of the game area
        } else {
            bullet.style.bottom = `${y}px`; 
            checkBulletCollision(bullet); // Check if bullet collides with enemy
        }
    });
}

function checkBulletCollision(bullet) {
    const enemies = document.querySelectorAll('.invader');
    enemies.forEach(enemy => {
        if (isColliding(bullet, enemy)) {
            bullet.remove();
            enemy.remove();
            increaseScore(10); // Increase score by 10 for each enemy destroyed
        }
    });
}

export function checkPlayerCollision() {
    const enemies = document.querySelectorAll('.invader');
    const playerElement = document.getElementById('player');

    enemies.forEach(enemy => {
        if (isColliding(playerElement, enemy)) {
            decreaseLives();
            enemy.remove();
        }
    });
}

function isColliding(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
    );
}


