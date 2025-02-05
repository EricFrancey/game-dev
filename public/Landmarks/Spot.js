class Spot {
    constructor(name, x, y, colour, radius){
        this.name = name
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.radius = radius;
    }

    euclideanDistance(x,y){
        return(Math.sqrt(Math.pow(x-this.x,2) + Math.pow(y-this.y,2)))
    }

    update(viewport, square){

    }

    drawCircleWithGradient(viewport) {   
        
        const [x,y] = viewport.toCanvas(this.x,this.y);
        // Create a gradient (from red to blue)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius/viewport.scaleFactor);
        gradient.addColorStop(0,this.colour);
        gradient.addColorStop(1,"rgba(240, 240, 240, 0)");
  
        // Set the gradient as the fill style
        ctx.fillStyle = gradient;
  
        // Draw the circle
        ctx.beginPath();
        ctx.arc(x, y, this.radius/viewport.scaleFactor, 0, 2 * Math.PI);
        ctx.fill();
      }

    draw(viewport, square){
        const [x,y] = viewport.toCanvas(this.x,this.y);
        this.drawCircleWithGradient(viewport)
    }
}
