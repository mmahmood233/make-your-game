import { game, enemyMap } from '../game.js';



const enemyWidth = 40;
const enemyHeight = 30;
const enemyGap = 10;
let enemyDirection = 1;
let enemySpeed = 2;
let enemyDropSpeed = 0.1;
let enemyDropDistance = 20;
let isMovingDown = false;
let dropProgress = 0;

export function createEnemies() {
    const startX = (800 - (10 * (enemyWidth + enemyGap))) / 2;
    const startY = 50;  // Adjust this value to position enemies vertically
    enemyMap.forEach((row, rowIndex) => {
        row.forEach((enemy, colIndex) => {
            if (enemy === 1) {
                const enemyElement = document.createElement('div');
                enemyElement.classList.add('invader');
                enemyElement.style.left = `${startX + colIndex * (enemyWidth + enemyGap)}px`;
                enemyElement.style.top = `${startY + rowIndex * (enemyHeight + enemyGap)}px`;
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
        rightmostX = Math.max(rightmostX, x);
    });

    if (isMovingDown) {
        dropProgress += enemyDropSpeed * deltaTime;
        if (dropProgress >= enemyDropDistance) {
            isMovingDown = false;
            dropProgress = 0;
            enemyDirection *= -1;
        }
    } else if (rightmostX >= 760 || leftmostX <= 0) {
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
