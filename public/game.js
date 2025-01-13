// communications
const socket = io();

// Get the canvas element and set the 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Init game variables
var opponents = {};
var opponent1 = new Opponent(0,0, 'bot');
opponents['bot'] = opponent1;
square = new Square();
grid = new Grid();

// Event listener for keyboard input
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// communications
socket.on('message', (msg) => {

    var [id, x, y] = parseMsg(msg);
    if (Object.hasOwn(opponents, id)){
        opponents[id].x = parseInt(x);
        opponents[id].y = parseInt(y);
    } else {
        opponents[id] = new Opponent(x,y, 'bot');
    }

});

// update game objects
function update() {

    square.update();
    grid.update(square);

    // update opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].update(o+1);
    }
}

// Draw to screen
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the grid first
    grid.draw(square);
    square.draw();

    // Draw opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].draw();
    }

    // Draw the score overlay
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${grid.score}`, 10, 30);
}

// The game loop
function gameLoop() {
    socket.emit('message', square.x.toString() + " " + square.y.toString());
    update();
    draw();
    requestAnimationFrame(gameLoop); // Call the game loop again
}

// Start the game loop
gameLoop();
