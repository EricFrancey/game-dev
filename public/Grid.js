// Background Grid
class Grid {
    constructor(canvas){
        this.gridOffsetX = 0;
        this.gridOffsetY = 0;
        this.gridSize = 150;
        this.width = canvas.width;
        this.height = canvas.height;

        this.score = 0;
        this.visitedSquares = new Set();
    }

    getSquareKey(x, y) {
        return `${Math.floor(x / this.gridSize)},${Math.floor(y / this.gridSize)}`;
    }

    update(square){
        // Smoothly update grid offsets when the player reaches the canvas edges
        if (square.x <= 0) {
            this.gridOffsetX += square.speed; // Move grid right when player reaches left edge
        } else if (square.x + square.size >= this.width) {
            this.gridOffsetX -= square.speed; // Move grid left when player reaches right edge
        }
    
        if (square.y <= 0) {
            this.gridOffsetY += square.speed; // Move grid down when player reaches top edge
        } else if (square.y + square.size >= this.height) {
            this.gridOffsetY -= square.speed; // Move grid up when player reaches bottom edge
        }
        
    }

    draw(ctx, square){
        for (let x = -this.gridSize; x < this.width + this.gridSize; x += this.gridSize) {
            for (let y = -this.gridSize; y < this.height + this.gridSize; y += this.gridSize) {
                // Determine the checkerboard pattern
                const isEven = (Math.floor((x + this.gridOffsetX) / this.gridSize) + Math.floor((y + this.gridOffsetY) / this.gridSize)) % 2 === 0;
    
                // Calculate the current grid square position
                const gridX = x + this.gridOffsetX % this.gridSize;
                const gridY = y + this.gridOffsetY % this.gridSize;
    
                // Check for collision with the player square
                const isColliding =
                    square.x < gridX + this.gridSize &&
                    square.x + square.size > gridX &&
                    square.y < gridY + this.gridSize &&
                    square.y + square.size > gridY;
    
                // Set color: green if colliding, otherwise checkerboard color
                ctx.fillStyle = isEven ? '#ddd' : '#bbb';
    
                // Draw the square
                ctx.fillRect(gridX, gridY, this.gridSize, this.gridSize);
    
                // Update score if the square is collided with and hasn't been visited
                if (isColliding) {
                    const key = this.getSquareKey(gridX, gridY);
                    if (!this.visitedSquares.has(key)) {
                        this.visitedSquares.add(key); // Mark the square as visited
                        this.score++; // Increment the score
                    }
                }
            }
        }
    }

};