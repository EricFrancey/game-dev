class Viewport{
    constructor(){
        this.width = canvas.width;
        this.height = canvas.height;
        this.top = 0;
        this.left = 0;
    }

    moveWithSquare(square){
        this.top += square.vy;
        this.left += square.vx;
    }

    viewPortToCanvas(x,y){
        // takes a position and gets canvas coordinates
        return(x - this.left, y - this.top);
    }

    contains(x,y){
        return((this.left < x < this.left+this.width) && (this.top < y < this.top+this.height))
    }
}