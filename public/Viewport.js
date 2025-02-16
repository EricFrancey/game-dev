class Viewport{
    constructor(canvas){

        this.top = 0;
        this.left = 0;
        this.bufferzone = 50;
        this.zoomLevel = 5;
        this.scaleFactor = Math.sqrt(this.zoomLevel);
        this.width = canvas.width*this.scaleFactor;
        this.height = canvas.height*this.scaleFactor;
        this.maxZoomLevel = 1000;
        this.zoomed = false;
        this.shrunk = false;
        this.pointColours = {};
        this.pointOffset = 100;
    }

    update(keys, square){
        this.doZoom(keys, square);
        this.moveWithSquare(square);
    }

    doZoom(keys, square){
        // BUG!
        // go down to bottom of screen
        // zoom out (-)
        // press w and zoom out (=) at the same time
        // -> fall off screen
        // edit: helps to be zoom in close to max
        if (keys['-'] || keys["mousewheel_down"]){
            if (!this.zoomed){
                var [dx,dy] = this.toCanvas(square.x, square.y)
                this.width /= this.scaleFactor;
                this.height /= this.scaleFactor;
                this.zoomLevel = Math.min(this.maxZoomLevel, this.zoomLevel + 1)
                this.scaleFactor = this.zoomLevel;
                this.zoomed = true;
                this.left = square.x - dx*this.scaleFactor;
                this.top = square.y - dy*this.scaleFactor;
                this.width *= this.scaleFactor;
                this.height *= this.scaleFactor;

            }
        } else {
            this.zoomed = false;
        }

        if (keys['='] || keys["mousewheel_up"]){
            if (!this.shrunk){
                var [dx,dy] = this.toCanvas(square.x, square.y)
                this.width /= this.scaleFactor;
                this.height /= this.scaleFactor;
                this.zoomLevel = Math.max(1, this.zoomLevel - 1)
                this.scaleFactor = this.zoomLevel;
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
        if ((square.x <= this.left + this.bufferzone*this.scaleFactor) || (square.x + square.size >= this.left + this.width - this.bufferzone*this.scaleFactor)) {
            this.left += square.vx;
        }

    
        if ((square.y <= this.top + this.bufferzone*this.scaleFactor) || (square.y + square.size >= this.top + this.height - this.bufferzone*this.scaleFactor)) {
           this.top += square.vy;
        }   
        
    }

    centerOnSquare(square){
        this.left = square.x - this.width/2;
        this.top = square.y - this.height/2;
    }

    toCanvas(x,y){
        // takes a position and gets canvas coordinates
        return([(x - this.left)/this.scaleFactor, (y - this.top)/this.scaleFactor]);
    }

    contains(x,y){
        return(this.left < x && x < this.left+this.width && this.top < y && y < this.top+this.height)
    }

    drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
        // https://stackoverflow.com/questions/25095548/how-to-draw-a-circle-in-html5-canvas-using-javascript
         ctx.beginPath()
         ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
         if (fill) {
           ctx.fillStyle = fill
           ctx.fill()
         }
         if (stroke) {
           ctx.lineWidth = strokeWidth
           ctx.strokeStyle = stroke
           ctx.stroke()
         }
       }

    drawPoints(ctx, square, opponents){

        var spacing  = 1000
        for (var x = this.left - this.left%spacing; x < this.left + this.width; x = x + spacing){
            for (var y = this.top - this.top%spacing; y < this.top + this.height; y = y + spacing){
                var [cx,cy] = this.toCanvas(x,y);

                var colour = "black"//this.eatPoints(ctx, square, opponents,x ,y);
                //this.drawGrid(colour, x, y);
                this.atomShaker(x,y, square);
                //this.skyscraperTops(x,y, square);
                //this.drawCircle(ctx, cx, cy, 5/this.scaleFactor, 'red', 'red', 1)

            }
        }
    }

    eatPoints(ctx, square, opponents, x, y){
        var strCoords = x.toString() + "," + y.toString()
        if (square.contains(x,y) && !Object.hasOwn(this.pointColours, strCoords)){
            this.pointColours[strCoords] = square.color;
            square.points++;
        }

        for (var o = 0; o < Object.keys(opponents).length; o++){
            var id = Object.keys(opponents)[o];
            var opponent = opponents[id]
            if (opponent.contains(x,y) && !Object.hasOwn(this.pointColours, strCoords)){
                this.pointColours[strCoords] = opponent.color;
                opponent.vx = opponent.rnd[Math.floor(Math.random() * opponent.rnd.length)];
                opponent.vy = opponent.rnd[Math.floor(Math.random() * opponent.rnd.length)];
            }
        }


        var colour = 'black';
        if(Object.hasOwn(this.pointColours, strCoords)){
            colour = "rgb(240,240,240)" //this.pointColours[strCoords];
        }

        return colour;
    }

    drawGrid(colour, x, y){
        if (colour != 'black'){
            ctx.fillStyle = colour;
            var [dx,dy] = this.toCanvas(x-50, y-50);
            ctx.fillRect(dx, dy, 100/this.scaleFactor,100/this.scaleFactor); // Draw the square
        }

    }

    atomShaker(x,y, square){

        // a vector pointing from the point to the square
        var radius = 100;
        var outerRadius = 10000;
        var radiationStrength = 3;
        var vector = {x : square.x-x, y:square.y-y}
        var dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y,2));
        vector.x = vector.x/dist
        vector.y = vector.y/dist
        var [out_x, out_y] = this.toCanvas(x,y);

        if (dist < radius){
            this.drawCircle(ctx, out_x, out_y, 5*((radius - dist)/radius)*(1 + 5/this.scaleFactor), 'red', 'red', 1);
        } else if ((dist >= radius) && (dist < outerRadius)) {
            [out_x, out_y] = this.toCanvas(x + ((dist - radius)/radius)*(radiationStrength/2 - Math.floor(Math.random() * radiationStrength)),
                                           y + ((dist - radius)/radius)*(radiationStrength/2 - Math.floor(Math.random() * radiationStrength)));
            this.drawCircle(ctx, out_x,out_y, 5/this.scaleFactor, 'black', 'black', 1);
        }
        
    }

    skyscraperTops(x,y, square){

        // a vector pointing from the point to the square
        var vector = {x : square.x-x, y:square.y-y}
        var dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y,2));
        vector.x = vector.x/dist
        vector.y = vector.y/dist

        var out_x = x + vector.x/Math.pow(dist,2)
        var out_y = y + vector.y/Math.pow(dist,2)


        var [cx,cy] = this.toCanvas(out_x,out_y);
        
        ctx.beginPath(); // Start a new path
        const [x1, y1] = this.toCanvas(square.x, square.y)
        const [x2, y2] = this.toCanvas(x, y)
        ctx.moveTo(x2, y2);
        ctx.lineTo((x2+x1)/2, (y2+y1)/2);
        ctx.lineWidth = 3
        ctx.strokeStyle = "rgba(0, 0, 0)";
        ctx.stroke(); // Render the path

        this.drawCircle(ctx, cx, cy, 5/this.scaleFactor, 'red', 'red', 1);
    }
}