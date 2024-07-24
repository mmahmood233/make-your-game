import { game, enemyMap } from '../game.js';

const gameWidth = 1500; // New game width
const gameHeight = 830; // New game height
const enemyWidth = 70;
const enemyHeight = 50;
const enemyGap = 10;
let enemyDirection = 1;
let enemySpeed = 2;
let enemyDropSpeed = 0.1;
let enemyDropDistance = 20;
let isMovingDown = false;
let dropProgress = 0;

export function createEnemies() {
    const startX = (gameWidth - (enemyMap[0].length * (enemyWidth + enemyGap))) / 2;
    const startY = 50;
    enemyMap.forEach((row, rowIndex) => {
        row.forEach((enemy, colIndex) => {
            if (enemy === 1) {
                const enemyElement = document.createElement('div');
                enemyElement.classList.add('invader');
                enemyElement.style.left = `${startX + colIndex * (enemyWidth + enemyGap)}px`;
                enemyElement.style.top = `${startY + rowIndex * (enemyHeight + enemyGap)}px`;
                enemyElement.style.width = `${enemyWidth}px`;
                enemyElement.style.height = `${enemyHeight}px`;
                game.appendChild(enemyElement);
            }
        });
    });
}

export function moveEnemies(deltaTime) {
    const enemies = document.querySelectorAll('.invader');
    let leftmostX = Infinity;
    let rightmostX = -Infinity;

    enemies.forEach((enemy) => {
        const x = parseFloat(enemy.style.left);
        leftmostX = Math.min(leftmostX, x);
        rightmostX = Math.max(rightmostX, x + enemyWidth);
    });

    if (isMovingDown) {
        dropProgress += enemyDropSpeed * deltaTime;
        if (dropProgress >= enemyDropDistance) {
            isMovingDown = false;
            dropProgress = 0;
            enemyDirection *= -1;
        }
    } else if (rightmostX >= gameWidth - 10 || leftmostX <= 10) {
        isMovingDown = true;
    }

    enemies.forEach((enemy) => {
        const x = parseFloat(enemy.style.left);
        const y = parseFloat(enemy.style.top);
        
        if (isMovingDown) {
            enemy.style.top = `${y + enemyDropSpeed * deltaTime}px`;
        } else {
            enemy.style.left = `${x + enemySpeed * enemyDirection * deltaTime / 16}px`;
        }
    });
}

export function enemyShoot() {
    const enemies = document.querySelectorAll('.invader');
    enemies.forEach(enemy => {
        if (Math.random() < 0.0005) { // Adjust this value to control frequency
            createEnemyBullet(enemy);
        }
    });
}

function createEnemyBullet(enemy) {
    const bullet = document.createElement('div');
    bullet.classList.add('enemy-bullet');
    const enemyRect = enemy.getBoundingClientRect();
    bullet.style.left = `${enemyRect.left + enemyRect.width / 2 - 2}px`;
    bullet.style.top = '0px';
    game.appendChild(bullet);
}



