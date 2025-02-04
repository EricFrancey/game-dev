class Landmark {
    constructor(name, x, y, size, colour){
        this.name = ""
        this.x = x;
        this.y = y;
        this.size = size; // Size of the player square and grid squares
        this.colour = colour;

        // // Radii of the white glow.
        // this.innerRadius = 5,
        // this.outerRadius = 70,
        // // Radius of the entire circle.
        // this.radius = 60;

        // this.gradient = ctx.createRadialGradient(this.x, this.y, this.innerRadius, this.x, this.y, this.outerRadius);
        // this.gradient.addColorStop(0, 'black');
        // this.gradient.addColorStop(1, 'white');
    }

    update(){

    }

    draw(viewport){
        if (viewport.contains(this.x,this.y)){
            ctx.fillStyle = this.color;
            const [x,y] = viewport.toCanvas(this.x,this.y);
            ctx.fillRect(x, y, this.size/viewport.scaleFactor, this.size/viewport.scaleFactor); // Draw the square
            ctx.fillText(`${this.name}`, x, y);


            // ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            // ctx.fillStyle = this.gradient;
            // ctx.fill();
        }
    }
}
