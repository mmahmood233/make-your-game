const game = document.getElementById('game');
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let playerSpeed = 3;
let playerX = 375; // Center of the game area (800/2 - 50/2)

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const keys = {
    ArrowLeft: false,
    ArrowRight: false
};

function handleKeyDown(e) {
    if (e.key in keys) {
        keys[e.key] = true;
    }
}

function handleKeyUp(e) {
    if (e.key in keys) {
        keys[e.key] = false;
    }
}

function updatePlayerPosition() {
    if (keys.ArrowLeft && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys.ArrowRight && playerX < 750) { // 800 - 50 (player width)
        playerX += playerSpeed;
    }
    player.style.left = `${playerX}px`;
}

// function gameLoop() {
//     updatePlayerPosition();
//     requestAnimationFrame(gameLoop);
// }

// gameLoop();

const enemyWidth = 40;
const enemyHeight = 30;
const enemyGap = 10;
let enemyDirection = 1;
let enemySpeed = 1;
let enemyDropSpeed = 0.1;
let enemyDropDistance = 20;
let isMovingDown = false;
let dropProgress = 0;

function createEnemies() {
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

function moveEnemies(deltaTime) {
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

createEnemies();
requestAnimationFrame(gameLoop);

let lastTime = 0;
// function gameLoop(currentTime) {
//     if (!lastTime) lastTime = currentTime;
//     const deltaTime = currentTime - lastTime;

//     updatePlayerPosition();
//     moveEnemies(deltaTime);

//     lastTime = currentTime;
//     requestAnimationFrame(gameLoop);
// }

// gameLoop();

function createBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${playerX + 25}px`; // Center of the player
    bullet.style.bottom = '50px'; // Just above the player
    game.appendChild(bullet);
}

function moveBullets() {
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
            // Increase score here
        }
    });
}

function isColliding(a, b) {
    const aRect = a.getBoundingClientRect(); // Get the bounding rectangle of each element bullet
    const bRect = b.getBoundingClientRect(); // Get the bounding rectangle of each element enemy
    return !(
        aRect.top + aRect.height < bRect.top || // Check if the top of the bullet is below the bottom of the enemy
        aRect.top > bRect.top + bRect.height || //the bullet hits the bottom of the enemy only
        aRect.left + aRect.width < bRect.left || // Check if the left side of the bullet is to the right of the right side of the enemy
        aRect.left > bRect.left + bRect.width // Check if the right side of the bullet is to the left of the left side of the enemy
    );
}

function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;

    updatePlayerPosition();
    moveEnemies(deltaTime);
    moveBullets();

    lastTime = currentTime;
    requestAnimationFrame(gameLoop);
}

gameLoop();

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


