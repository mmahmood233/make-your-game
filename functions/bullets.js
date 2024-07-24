import { game } from '../game.js';
import { playerX } from './players.js';
import { increaseScore } from './score.js';
import { decreaseLives } from './lives.js';

const gameHeight = 830; // New game height
const bulletSound = new Audio('/shoot.wav');
const enemyDestroySound = new Audio('/enemyKilled.wav');
const playerIsDeadSound = new Audio('/playerKilled.wav');

export function createBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${playerX + 39}px`; // Center of the player
    bullet.style.bottom = '60px'; // Just above the player
    game.appendChild(bullet);

    // Play bullet sound
    bulletSound.currentTime = 0;
    bulletSound.play().catch(error => console.log('Error playing bullet sound:', error));
}

export function moveBullets() {
    const bullets = document.querySelectorAll('.bullet');
    const enemyBullets = document.querySelectorAll('.enemy-bullet');
    bullets.forEach(bullet => {
        const y = parseFloat(bullet.style.bottom) + 5; // Bullet speed
        if (y > gameHeight) { 
            bullet.remove();  // Bullet disappears when it goes off the screen
        } else {
            bullet.style.bottom = `${y}px`;
            checkBulletCollision(bullet); // Check if bullet collides with enemy
        }
    });
    enemyBullets.forEach(bullet => {
        const y = parseFloat(bullet.style.top) + 2; // Adjust speed as needed
        if (y > gameHeight) {
            bullet.remove();
        } else {
            bullet.style.top = `${y}px`;
            checkEnemyBulletCollision(bullet);
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

            // Play enemy destroy sound
            enemyDestroySound.currentTime = 0;
            enemyDestroySound.play().catch(error => console.log('Error playing enemy destroy sound:', error));
        }
    });
}

export function checkPlayerCollision() {
    const enemies = document.querySelectorAll('.invader');
    const playerElement = document.getElementById('player');
    let collisionOccurred = false;

    enemies.forEach(enemy => {
        if (isColliding(playerElement, enemy)) {
            decreaseLives(true); // Reset enemies position
            enemy.remove();
            collisionOccurred = true;
        }
    });

    if (collisionOccurred) {
        playerIsDeadSound.currentTime = 0;
        playerIsDeadSound.play().catch(error => console.log('Error playing player dead sound:', error));
    }
}

function checkEnemyBulletCollision(bullet) {
    const playerElement = document.getElementById('player');
    if (isColliding(bullet, playerElement)) {
        bullet.remove();
        decreaseLives(false); // Do not reset enemies position
        playerIsDeadSound.currentTime = 0;
        playerIsDeadSound.play().catch(error => console.log('Error playing player dead sound:', error));
    }
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
