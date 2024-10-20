const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Snake settings
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: getRandomPosition(), y: getRandomPosition() };
let score = 0;
let gameInterval;

// Start the game
function startGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    food = { x: getRandomPosition(), y: getRandomPosition() };
    score = 0;
    gameInterval = setInterval(updateGame, 100);
}

// Generate random positions for food
function getRandomPosition() {
    return Math.floor(Math.random() * 20) * 20;
}

// Update the game on each tick
function updateGame() {
    const head = { x: snake[0].x + direction.x * 20, y: snake[0].y + direction.y * 20 };
    snake.unshift(head);

    // Check if snake ate the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        snake.pop(); // Remove tail if no food eaten
    }

    // Check for game over conditions
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head)) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score: ${score}`);
    }

    // Render game elements
    drawGame();
}

// Check if the snake collides with itself
function collision(head) {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Draw the game elements (snake and food)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Control snake direction with arrow keys
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Start the game when the page loads
startGame();
