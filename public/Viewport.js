class Viewport{
    constructor(canvas){

        this.top = 0;
        this.left = 0;
        this.bufferzone = 50;
        this.zoomLevel = 2;
        this.scaleFactor = Math.sqrt(this.zoomLevel);
        this.width = canvas.width*this.scaleFactor;
        this.height = canvas.height*this.scaleFactor;
        this.maxZoomLevel = 10;
        this.zoomed = false;
        this.shrunk = false;
    }

    update(keys, square){
        this.doZoom(keys, square);
        this.moveWithSquare(square);
    }

    doZoom(keys, square){
        if (keys['-']){
            if (!this.zoomed){
                var [dx,dy] = this.toCanvas(square.x, square.y)
                this.width /= this.scaleFactor;
                this.height /= this.scaleFactor;
                this.zoomLevel = Math.min(this.maxZoomLevel, this.zoomLevel + 1)
                this.scaleFactor = Math.sqrt(this.zoomLevel);
                this.zoomed = true;
                this.left = square.x - dx*this.scaleFactor;
                this.top = square.y - dy*this.scaleFactor;
                this.width *= this.scaleFactor;
                this.height *= this.scaleFactor;

            }
        } else {
            this.zoomed = false;
        }

        if (keys['=']){
            if (!this.shrunk){
                var [dx,dy] = this.toCanvas(square.x, square.y)
                this.width /= this.scaleFactor;
                this.height /= this.scaleFactor;
                this.zoomLevel = Math.max(1, this.zoomLevel - 1)
                this.scaleFactor = Math.sqrt(this.zoomLevel);
                this.shrunk = true;
                this.left = square.x - dx*this.scaleFactor;
                this.top = square.y - dy*this.scaleFactor;
                this.width *= this.scaleFactor;
                this.height *= this.scaleFactor;
            }
        } else {
            this.shrunk = false;
        }

    }

    moveWithSquare(square){
        // Smoothly update grid offsets when the player reaches the canvas edges
        if ((square.x <= this.left + this.bufferzone) || (square.x + square.size >= this.left + this.width - this.bufferzone)) {
            this.left += square.vx;
        }

    
        if ((square.y <= this.top + this.bufferzone) || (square.y + square.size >= this.top + this.height - this.bufferzone)) {
           this.top += square.vy;
        }   
        
    }

    toCanvas(x,y){
        // takes a position and gets canvas coordinates
        return([(x - this.left)/this.scaleFactor, (y - this.top)/this.scaleFactor]);
    }

    contains(x,y){
        return((this.left < x < this.left+this.width) && (this.top < y < this.top+this.height))
    }
}