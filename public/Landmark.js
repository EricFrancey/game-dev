class Landmark {
    constructor(name, x, y, size, colour){
        this.name = name
        this.x = x;
        this.y = y;
        this.size = size; // Size of the player square and grid squares
        this.colour = colour;
    }

    update(){

    }

    draw(viewport){
        if (viewport.contains(this.x,this.y)){
            ctx.fillStyle = this.color;
            const [x,y] = viewport.toCanvas(this.x,this.y);
            ctx.fillRect(x, y, this.size/viewport.scaleFactor, this.size/viewport.scaleFactor); // Draw the square
            ctx.fillText(`${this.name}`, x, y);
        }
    }
}
