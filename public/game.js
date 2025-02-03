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
var opponent1 = new Opponent(0,0, 'bot', 'green');
var opponent2 = new Opponent(0,0, 'bot', 'blue');
var opponent3 = new Opponent(0,0, 'bot', 'red');

let lastUpdateTime = 0;
let totalTime = 0

opponents['bot1'] = opponent1;
opponents['bot2'] = opponent2;
opponents['bot3'] = opponent3;
square = new Square(canvas);
scoreboard = new Scoreboard(square)
grid = new Grid(canvas);
joystick = new Joystick();
viewport = new Viewport(canvas);

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

    var [id, x, y, color] = parseMsg(msg);
    if (Object.hasOwn(opponents, id)){
        opponents[id].x = parseInt(x);
        opponents[id].y = parseInt(y);
        opponents[id].color = color;
    } else {
        opponents[id] = new Opponent(x,y, 'player', color);
    }

});

// update game objects
function update(deltaTime) {

    square.update(keys, deltaTime);
    grid.update(square);
    viewport.moveWithSquare(square)

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
    square.draw(ctx, viewport);
    scoreboard.draw()
    scoreboard.drawKeyXP(square.keyXP, square.keyXPPerLevel, square.keyLevels, square.keyTotalXP)
    // Draw opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].draw(ctx, viewport);
    }
}

// function saveGame() {
//     localStorage.setItem("gameData", JSON.stringify(totalTime));
// }

// function loadGame() {
//     let savedData = localStorage.getItem("gameData");
//     if (savedData) {
//         totalTime = JSON.parse(savedData);
//     }
// }
// The game loop
function gameLoop(timestamp) {

    if (!lastUpdateTime) lastUpdateTime = timestamp;
    let deltaTime = timestamp - lastUpdateTime;
    lastUpdateTime = timestamp;
    totalTime += deltaTime;
    update(deltaTime);
    draw(totalTime);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// window.addEventListener("beforeunload", saveGame);
