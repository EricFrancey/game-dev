class Tether {
    constructor(distance){
        this.distance = distance
        this.obj1 = null
        this.obj2 = null
    }

    euclideanDistance(x,y){
        return(Math.sqrt(Math.pow(x-this.x,2) + Math.pow(y-this.y,2)))
    }

    update(){

    }

    tether(obj1, obj2){
        this.obj1 = obj1
        this.obj2 = obj2
    }

    draw(viewport, square){

        const [x,y] = viewport.toCanvas(this.x,this.y);

        if (Math.sqrt(Math.pow(this.obj1.x-this.obj2.x,2) + Math.pow(this.obj1.y-this.obj2.y,2)) < this.distance){
            ctx.beginPath(); // Start a new path
            const [x1, y1] = viewport.toCanvas(this.obj1.x, this.obj1.y)
            const [x2, y2] = viewport.toCanvas(this.obj2.x, this.obj2.y)
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = 3
            ctx.strokeStyle = "rgba(0, 0, 0," +  (1 - Math.sqrt(Math.pow(this.obj1.x-this.obj2.x,2) + Math.pow(this.obj1.y-this.obj2.y,2))/this.distance).toString() + ")";
            ctx.stroke(); // Render the path
        }
    }
}