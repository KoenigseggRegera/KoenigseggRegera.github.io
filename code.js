// Setup the game variables
const car = document.getElementById('car');
const gameArea = document.getElementById('gameArea');
const scoreValue = document.getElementById('scoreValue');
let score = 0;
let gameOver = false;

// Initial car position
let carPositionX = 275; // Car starts in the center of the game area

// Listen for keyboard events to move the car
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && carPositionX > 0) {
        carPositionX -= 20; // Move left
    }
    if (event.key === 'ArrowRight' && carPositionX < gameArea.offsetWidth - car.offsetWidth) {
        carPositionX += 20; // Move right
    }
    car.style.left = carPositionX + 'px';
});

// Function to create obstacles
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    gameArea.appendChild(obstacle);

    // Move the obstacle down and check for collision
    let obstaclePositionY = 0;
    const obstacleFallInterval = setInterval(() => {
        obstaclePositionY += 5;
        obstacle.style.top = obstaclePositionY + 'px';

        // Collision detection
        if (obstaclePositionY > gameArea.offsetHeight - car.offsetHeight - 20 && 
            obstaclePositionY < gameArea.offsetHeight - 20 && 
            Math.abs(parseInt(obstacle.style.left) - carPositionX) < 50) {
            gameOver = true;
            clearInterval(obstacleFallInterval);
            alert('Game Over! Your score: ' + score);
        }

        // Remove obstacles that go off the screen
        if (obstaclePositionY > gameArea.offsetHeight) {
            clearInterval(obstacleFallInterval);
            gameArea.removeChild(obstacle);
            if (!gameOver) {
                score += 10;
                scoreValue.textContent = score;
            }
        }
    }, 20);
}

// Start the game
function startGame() {
    if (!gameOver) {
        createObstacle();
    }
    if (!gameOver) {
        setTimeout(startGame, Math.random() * 1000 + 500); // Random time for obstacles
    }
}

// Start the game loop
startGame();
