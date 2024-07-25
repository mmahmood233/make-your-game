import { game, map } from '../game.js';


const gameWidth = 1500; // New game width
let enemyDirection = 1;
let enemySpeed = 2;

export function createEnemies() {
    const enemySize = 55; // Adjust this value as needed
    const enemyGap = 15;  // Gap between enemies
    const startX = (game.clientWidth - (map.columns * (enemySize + enemyGap))) / 2;
    const startY = 50;

    for (let row = 0; row < map.rows; row++) {
        for (let col = 0; col < map.columns; col++) {
            const tileValue = map.getTile(col, row);
            if (tileValue === 1) {  // Create an enemy only for tiles with value 1
                const enemyElement = document.createElement('div');
                enemyElement.classList.add('invader');
                enemyElement.style.left = `${startX + col * (enemySize + enemyGap)}px`;
                enemyElement.style.top = `${startY + row * (enemySize + enemyGap)}px`;
                enemyElement.style.width = `${enemySize}px`;
                enemyElement.style.height = `${enemySize}px`;
                game.appendChild(enemyElement);
            }
        }
    }
}

export function moveEnemies(deltaTime) {
    const enemies = document.querySelectorAll('.invader');
    let leftmostX = Infinity;
    let rightmostX = -Infinity;

    enemies.forEach((enemy) => {
        const rect = enemy.getBoundingClientRect();
        leftmostX = Math.min(leftmostX, rect.left);
        rightmostX = Math.max(rightmostX, rect.right);
    });

    const gameRect = game.getBoundingClientRect();

    if (rightmostX >= gameRect.right || leftmostX <= gameRect.left) {
        enemyDirection *= -1; // Reverse direction
    }

    enemies.forEach((enemy) => {
        const currentLeft = parseFloat(enemy.style.left);
        const newLeft = currentLeft + enemySpeed * enemyDirection;
        enemy.style.left = `${newLeft}px`;
    });
}


export function enemyShoot() {
    if (Math.random() < 0.01) { // Adjust this value to control overall frequency
        createEnemyBullet();
    }
}

function createEnemyBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('enemy-bullet');
    
    // Random horizontal position within the game width
    const randomX = Math.random() * gameWidth;
    bullet.style.left = `${randomX}px`;
    
    // Start from the top of the game area
    bullet.style.top = '0px';
    
    game.appendChild(bullet);
}



