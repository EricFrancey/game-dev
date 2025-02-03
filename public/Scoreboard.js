class Scoreboard {
    constructor(square) {
        this.x = square.b
        this.y = square.y
    }

    drawKeyXP(keyXP, keyXPPerLevel,keyLevels) {
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        
        ['Up', 'Down', 'Left', 'Right'].forEach((key, index) => {
            const yOffset = 30 + index * 60;
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText(`${key}: ${keyXP[key].toFixed(1)}`, 10, yOffset + 80);
            ctx.fillStyle = "gray";
            ctx.fillRect(10, yOffset + 100, 200, 20);
            ctx.fillStyle = "blue";
            ctx.fillRect(10, yOffset + 100, (keyXP[key] / keyXPPerLevel[key]) * 200, 20);
            ctx.strokeStyle = "white";
            ctx.strokeRect(10, yOffset + 100, 200, 20);
            ctx.fillStyle = "Black";
            ctx.fillText(`Level: ${keyLevels[key]}`, 220, yOffset + 115);
        })
    }

    draw() {

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
    }
}