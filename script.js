// Initialize canvas and context
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Game variables
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = 20;
let dy = 0;
let score = 0;

// Listen for arrow key presses
document.addEventListener('keydown', changeDirection);

// Start the game loop
let game = setInterval(main, 100);

// Main game function
function main() {
    if (isGameOver()) {
        alert('Game Over! Your final score is ' + score);
        clearInterval(game);
        return;
    }

    clearBoard();
    drawSnake();
    moveSnake();
    drawFood();

    // Check if snake eats food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        growSnake();
        placeFood();
    }
}

// Clear the canvas
function clearBoard() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, 20, 20);
    });
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

// Change snake direction
function changeDirection(event) {
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

// Check if game is over
function isGameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Grow the snake when it eats food
function growSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

// Place food at a random location
function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}
