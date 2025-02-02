const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Serve the game
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// do I need this when I have server.listen?
// app.listen(port, () => {
//     console.log(`Game running at http://localhost:${port}`);
// });

var allSockets = [];

// Set up socket.io events
io.on('connection', (socket) => {
    var addr = socket.handshake.address;
    if (allSockets.includes(socket)){
        console.log('An existing user connected with address ' + addr);
    } else {
        allSockets.push(socket);
        console.log('A new user connected with address ' + addr);
        //console.log(socket);
    }

    // Listen for a 'message' event from the client
    socket.on('message', (msg) => {
        console.log('Message from client: ', msg);

        for (var i = 0; i < allSockets.length; i++){
            if (socket != allSockets[i]){
                allSockets[i].emit('message', addr + " " + msg);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});