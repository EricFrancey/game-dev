class Scoreboard {
    constructor(square) {
        this.x = square.b
        this.y = square.y
    }

    drawKeyXP(keyXPThisLevel, keyXPPerLevel, keyLevels, keyLifetimeTotalXP) {
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        
        ['Up', 'Down', 'Left', 'Right'].forEach((key, index) => {
            const yOffset = 30 + index * 60;
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText(`${key} xp this level: ${keyXPThisLevel[key].toFixed(1)} | xp for lvl up: ${keyXPPerLevel[key].toFixed(1)} | total xp: ${keyLifetimeTotalXP[key]}`, 10, yOffset + 80);
            ctx.fillStyle = "gray";
            ctx.fillRect(10, yOffset + 100, 200, 20);
            ctx.fillStyle = "blue";
            ctx.fillRect(10, yOffset + 100, (keyXPThisLevel[key] / keyXPPerLevel[key]) * 200, 20);
            ctx.strokeStyle = "white";
            ctx.strokeRect(10, yOffset + 100, 200, 20);
            ctx.fillStyle = "Black";
            ctx.fillText(`Level: ${keyLevels[key]}`, 220, yOffset + 115);
        })
    }

    draw() {
    }
}