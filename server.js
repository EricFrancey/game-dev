const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Serve the game
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => {
    console.log(`Game running at http://localhost:${port}`);
});
