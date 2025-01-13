const socket = io();

var opponents = {};
socket.on('message', (msg) => {

    var [id, x, y] = parseMsg(msg);
    if (Object.hasOwn(opponents, id)){
        opponents[id].x = parseInt(x);
        opponents[id].y = parseInt(y);
    } else {
        opponents[id] = new Opponent(x,y, 'bot');
    }

});
   

// Get the canvas element and set the 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

square = new Square();

// Grid offset (initially centered)
let gridOffsetX = 0;
let gridOffsetY = 0;

// Event listener for keyboard input
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update the position of the square based on key input
function update() {
    // Player movement logic
    if (keys['w'] || keys['ArrowUp']) square.y -= square.speed;
    if (keys['a'] || keys['ArrowLeft']) square.x -= square.speed;
    if (keys['s'] || keys['ArrowDown']) square.y += square.speed;
    if (keys['d'] || keys['ArrowRight']) square.x += square.speed;

    // Prevent the player from going outside the canvas
    square.x = Math.max(0, Math.min(square.x, canvas.width - square.size));
    square.y = Math.max(0, Math.min(square.y, canvas.height - square.size));

    // Smoothly update grid offsets when the player reaches the canvas edges
    if (square.x <= 0) {
        gridOffsetX += square.speed; // Move grid right when player reaches left edge
        square.x = 0; // Prevent the square from moving out of bounds
    } else if (square.x + square.size >= canvas.width) {
        gridOffsetX -= square.speed; // Move grid left when player reaches right edge
        square.x = canvas.width - square.size; // Prevent the square from moving out of bounds
    }

    if (square.y <= 0) {
        gridOffsetY += square.speed; // Move grid down when player reaches top edge
        square.y = 0; // Prevent the square from moving out of bounds
    } else if (square.y + square.size >= canvas.height) {
        gridOffsetY -= square.speed; // Move grid up when player reaches bottom edge
        square.y = canvas.height - square.size; // Prevent the square from moving out of bounds
    }

    // update opponents

    // Draw opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].update(o+1);
        opponents[id].draw();
    }
}


// Score and visited squares tracker
let score = 0;
const visitedSquares = new Set();

// Function to calculate a unique key for each grid square
function getSquareKey(x, y) {
    return `${Math.floor(x / (square.size * 3))},${Math.floor(y / (square.size * 3))}`;
}

// Update the drawGrid function
function drawGrid() {
    const gridSize = square.size * 3; // Each grid square size is the same as the player square

    for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
            // Determine the checkerboard pattern
            const isEven = (Math.floor((x + gridOffsetX) / gridSize) + Math.floor((y + gridOffsetY) / gridSize)) % 2 === 0;

            // Calculate the current grid square position
            const gridX = x + gridOffsetX % gridSize;
            const gridY = y + gridOffsetY % gridSize;

            // Check for collision with the player square
            const isColliding =
                square.x < gridX + gridSize &&
                square.x + square.size > gridX &&
                square.y < gridY + gridSize &&
                square.y + square.size > gridY;

            // Set color: green if colliding, otherwise checkerboard color
            ctx.fillStyle = isEven ? '#ddd' : '#bbb';

            // Draw the square
            ctx.fillRect(gridX, gridY, gridSize, gridSize);

            // Update score if the square is collided with and hasn't been visited
            if (isColliding) {
                const key = getSquareKey(gridX, gridY);
                if (!visitedSquares.has(key)) {
                    visitedSquares.add(key); // Mark the square as visited
                    score++; // Increment the score
                }
            }
        }
    }
}

// Draw the score overlay
function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Update the draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the grid first
    drawGrid();

    // Then draw the player square
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size); // Draw the square

    // Draw opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].update(o+1);
        opponents[id].draw();
    }

    // Draw the score overlay
    drawScore();
}


// The game loop
function gameLoop() {
    socket.emit('message', square.x.toString() + " " + square.y.toString());
    update();
    draw();
    requestAnimationFrame(gameLoop); // Call the game loop again
}


// Init game variables
var opponent1 = new Opponent(0,0, 'bot');
opponents['bot'] = opponent1;

// Start the game loop
gameLoop();
