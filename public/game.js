
var music = {"login1" : new Audio('resources/mp3/login screen.mp3'), "login2" :new Audio('resources/mp3/stick.mp3')} ;

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
opponents['bot1'] = opponent1;
opponents['bot2'] = opponent2;
opponents['bot3'] = opponent3;
square = new Square(canvas);
grid = new Grid(canvas);
joystick = new Joystick();
viewport = new Viewport(canvas);
login = new Login();

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
function update() {

    square.update(keys);
    grid.update(square);
    viewport.update(keys,square);
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
    //grid.draw(ctx, square);
    //viewport.drawPoints(ctx,square, opponents);
    square.draw(ctx, viewport);

    // Draw opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].draw(ctx, viewport);
    }

    // Draw the score overlay
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${grid.score}`, 10, 30);

    // draw coordinates
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`X: ${square.x}   Y: ${square.y}`, 10, 60);

    // draw viewport coords
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`v: ${JSON.stringify(viewport)}`, 10, 90);

    // draw viewport coords
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`k: ${JSON.stringify(keys)}`, 10, 120);
}

function loginScreen(){
    if (!login.loggedIn){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        login.update();
        login.draw();
        requestAnimationFrame(loginScreen);
    }
}

// The game loop
function gameLoop() {
    if (login.loggedIn){
        socket.emit('message', square.x.toString() + " " + square.y.toString() + " " + square.color.toString());
        update();
        draw();
    }
    requestAnimationFrame(gameLoop); // Call the game loop again
}

requestAnimationFrame(loginScreen)
requestAnimationFrame(gameLoop);
