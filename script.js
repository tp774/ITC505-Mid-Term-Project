// Initialize canvas and context
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 500;
canvas.height = 500;

// Game variables
let snake, food, dx, dy, score, game;
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const countdownDisplay = document.getElementById('countdown');

// Event listeners for starting and resetting the game
startButton.addEventListener('click', startCountdown);
resetButton.addEventListener('click', resetGame);
document.addEventListener('keydown', changeDirection);

// Function to start the countdown
function startCountdown() {
    let countdown = 3;
    countdownDisplay.classList.remove('hidden');
    countdownDisplay.textContent = countdown;

    const interval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
            clearInterval(interval);
            countdownDisplay.classList.add('hidden');
            startGame();
        } else {
            countdownDisplay.textContent = countdown;
        }
    }, 1000);
}

// Start or restart the game
function startGame() {
    // Reset game variables
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
    score = 0;
    updateScore(0);
    placeFood();

    // Clear any previous game loop
    if (game) clearInterval(game);

    // Start the game loop
    game = setInterval(main, 250);
}

// Reset the game
function resetGame() {
    clearInterval(game);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateScore(0);
    countdownDisplay.classList.add('hidden');
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
}

// Main game loop
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
        updateScore(score);
        growSnake();
        placeFood();
    }
}

// Update the score on the page
function updateScore(newScore) {
    document.getElementById('score').textContent = newScore;
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

// Change snake direction based on key press
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

// Check if the game is over
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
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
        y: Math.floor(Math.random() * (canvas.height / 20)) * 20,
    };
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}
