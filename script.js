const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Constants for the game
const box = 20; // Size of each segment of the snake
const canvasSize = 400; // Size of the canvas
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 9 * box, y: 9 * box }]; // Snake starts with one segment
let direction = "RIGHT"; // Initial direction
let food = {
    x: Math.floor(Math.random() * (canvasSize / box - 1)) * box,
    y: Math.floor(Math.random() * (canvasSize / box - 1)) * box,
};
let score = 0;
let game;

// Set a slower speed for the snake
const speed = 150; // Increase this value to reduce the speed

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lightgreen";
        ctx.beginPath();
        ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, Math.PI * 2); // Draw circles
        ctx.fill();
        ctx.closePath();
    }

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvasSize / box - 1)) * box,
            y: Math.floor(Math.random() * (canvasSize / box - 1)) * box,
        };
    } else {
        snake.pop(); // Remove the last segment if food is not eaten
    }

    // Check for collisions
    let newHead = { x: snakeX, y: snakeY };
    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over");
    }

    snake.unshift(newHead); // Add new head
}

// Collision detection function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Control the snake
document.addEventListener("keydown", directionControl);
function directionControl(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

// Start the game
function startGame() {
    game = setInterval(draw, speed); // Use the defined speed
}

// Call startGame function to begin
startGame();
