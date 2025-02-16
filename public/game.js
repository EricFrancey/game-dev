var demo = false;

var music = {"login1" : new Audio('resources/mp3/login screen.mp3'), "login2" :new Audio('resources/mp3/login screen.mp3')} ;

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
var landmarks = [];
var items = []

let lastUpdateTime = 0;
let totalTime = 0

square = new Square(canvas);
scoreboard = new Scoreboard(square)
grid = new Grid(canvas);
joystick = new Joystick();
viewport = new Viewport(canvas);
login = new Login();
debug = new Debug();

// Event listener for keyboard input
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

window.addEventListener("wheel", event => {
    keys["mousewheel_up"] = event.deltaY/Math.abs(event.deltaY) == -1
    keys["mousewheel_down"] = event.deltaY/Math.abs(event.deltaY) == 1
});

// communications
socket.on('message', (msg) => {

    var [id, x, y, color, name] = parseMsg(msg);
    if (Object.hasOwn(opponents, id)){
        opponents[id].x = parseInt(x);
        opponents[id].y = parseInt(y);
        opponents[id].color = color;
        opponents[id].name = name
    } else {
        opponents[id] = new Opponent(x,y, 'player', color);
    }

});

// update game objects
function update(deltaTime) {

    square.update(keys, deltaTime);
    grid.update(square);
    viewport.update(keys,square);
    debug.update(keys);
    landmarks.forEach((element) => element.update(viewport, square));

    viewport.moveWithSquare(square)
    if (square.name == "phone"){
        viewport.zoomLevel = 1000
        viewport.maxZoomLevel = 1000
        viewport.scaleFactor = Math.sqrt(viewport.zoomLevel);
        viewport.width = canvas.width*viewport.scaleFactor;
        viewport.height = canvas.height*viewport.scaleFactor;
        viewport.centerOnSquare(square)
    }

    // update opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].update(o+1);
    }

    items.forEach((element) => element.update());
}

// Draw to screen
function draw(totalTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    landmarks.forEach((element) => element.draw(viewport, square));

    // Draw the grid first
    //grid.draw(ctx, square);
    viewport.drawPoints(ctx,square, opponents);
    square.draw(ctx, viewport);
    if (square.name != "phone"){
        scoreboard.draw()
        scoreboard.drawKeyXP(square.keyXPThisLevel, square.keyXPPerLevel, square.keyLevels, square.keyLifetimeTotalXP)
    }
    // Draw opponents
    for (var o = 0; o < Object.keys(opponents).length; o++){
        var id = Object.keys(opponents)[o];
        opponents[id].draw(ctx, viewport);
    }

    items.forEach((element) => element.draw(viewport, square));

    // draw coordinates
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`X: ${Math.round(square.x)}   Y: ${Math.round(square.y)}`, 10, 60);

    // Draw the score overlay
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Points: ${square.points}`, 10, 30);

    if (debug.debug){
        debug.draw(viewport, keys)
    }
}

function loginScreen(){
    if (!login.loggedIn && !login.guesting){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        login.update();
        login.draw();
        requestAnimationFrame(loginScreen);
    } else {
        login.finish()
    }
}

// The game loop
function saveGame() {
    localStorage.setItem("keyLevels", JSON.stringify(square.keyLevels));
    localStorage.setItem("keyXPThisLevel", JSON.stringify(square.keyXPThisLevel));
    localStorage.setItem("keyTotalXP", JSON.stringify(square.keyTotalXP));
    localStorage.setItem("keyXPPerLevel", JSON.stringify(square.keyXPPerLevel));
    localStorage.setItem("keyLifetimeTotalXP", JSON.stringify(square.keyLifetimeTotalXP));
}

function loadGame() {
    if (localStorage.getItem("keyLevels")) {
        square.keyLevels = JSON.parse(localStorage.getItem("keyLevels"));
    } else {
        square.keyLevels = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        }
        localStorage.setItem("keyLevels", JSON.stringify(square.keyLevels));
    }
    if (localStorage.getItem("keyTotalXP")) {
        square.keyTotalXP = JSON.parse(localStorage.getItem("keyTotalXP"));
    } else {
        square.keyTotalXP = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        }
        localStorage.setItem("keyTotalXP", JSON.stringify(square.keyTotalXP));
    }
    if (localStorage.getItem("keyXPPerLevel")) {
        square.keyXPPerLevel = JSON.parse(localStorage.getItem("keyXPPerLevel"));
    } else { 
        square.keyXPPerLevel = {
            Up: 0.1,
            Down: 0.1,
            Left: 0.1,
            Right: 0.1
        }
        localStorage.setItem("keyXPPerLevel", JSON.stringify(square.keyXPPerLevel));
    }
    if (localStorage.getItem("keyXPThisLevel")) {
        square.keyXPThisLevel = JSON.parse(localStorage.getItem("keyXPThisLevel"));
    } else {
        square.keyXPThisLevel = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        }
        localStorage.setItem("keyXPThisLevel", JSON.stringify(square.keyXPThisLevel));
    }
    if (localStorage.getItem("keyLifetimeTotalXP")) {
        square.keyLifetimeTotalXP = JSON.parse(localStorage.getItem("keyLifetimeTotalXP"));
    } else {
        square.keyLifetimeTotalXP = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        }
        localStorage.setItem("keyLifetimeTotalXP", JSON.stringify(square.keyLifetimeTotalXP));
    }
}

function gameLoop(timestamp) {
    if (login.loggedIn || login.guesting){
        socket.emit('message', square.x.toString() + " " + square.y.toString() + " " + square.color.toString() + " " + square.name);
        if (!lastUpdateTime) lastUpdateTime = timestamp;
        let deltaTime = timestamp - lastUpdateTime;
        lastUpdateTime = timestamp;
        totalTime += deltaTime;
        update(deltaTime);
        draw(totalTime);
    }

    keys["mousewheel_up"] = false
    keys["mousewheel_down"] = false
    requestAnimationFrame(gameLoop); // Call the game loop again
}

if (demo){
    var opponent1 = new Opponent(0,0, 'bot', 'green');
    var opponent2 = new Opponent(0,0, 'bot', 'blue');
    var opponent3 = new Opponent(0,0, 'bot', 'red');
    opponents['bot1'] = opponent1;
    opponents['bot2'] = opponent2;
    opponents['bot3'] = opponent3;

    // landmarks.push(new Spot("Landmark", 1800, 1000, "rgba(0, 0, 240, 1)", 1000))
    // landmarks.push(new Spot("Landmark", 1000, 1000, "rgba(240, 0, 0, 1)", 1000))
    // landmarks.push(new Spot("Landmark", 200, 1000, "rgba(0, 240, 0, 1)", 1000))
    // landmarks.push(new WarpVoid("warp", 2000,2000, 3000, 3000))

    // landmarks.push(new WarpVoid("warp", 2000,2000, 1000000, 1000000))
    // landmarks.push(new WarpVoid("warp", 1000500, 1000500, 1000000000, 1000000000))
    // landmarks.push(new WarpVoid("warp", 1000000500, 1000000500, 1000000000000, 1000000000000))

    items.push(new Tether(5000), new Tether(5000), new Tether(5000));
    items[0].tether(square, opponent1)
    items[1].tether(square, opponent2)
    items[2].tether(square, opponent3)
}



requestAnimationFrame(loginScreen)
requestAnimationFrame(gameLoop);

window.onload = function () {
    loadGame();
};

window.addEventListener("beforeunload", saveGame);

