class Viewport{
    constructor(){
        this.width = canvas.width;
        this.height = canvas.height;
        this.top = 0;
        this.left = 0;
        this.bufferzone = 50;
    }

    moveWithSquare(square){
        // Smoothly update grid offsets when the player reaches the canvas edges
        if ((square.x <= this.left + this.bufferzone) || (square.x + square.size >= this.left + canvas.width - this.bufferzone)) {
            this.left += square.vx;
        }

    
        if ((square.y <= this.top + this.bufferzone) || (square.y + square.size >= this.top + canvas.height - this.bufferzone)) {
           this.top += square.vy;
        }
        
        
    }

    toCanvas(x,y){
        // takes a position and gets canvas coordinates
        return([x - this.left, y - this.top]);
    }

    contains(x,y){
        return((this.left < x < this.left+this.width) && (this.top < y < this.top+this.height))
    }
}