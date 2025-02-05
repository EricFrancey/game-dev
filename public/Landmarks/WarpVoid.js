class WarpVoid {
    constructor(name, inx, iny, outx, outy){
        this.name = name
        this.inx = inx;
        this.iny = iny;
        this.outx = outx;
        this.outy = outy;
        this.radius = 400;
        this.stage = 0;
        this.maxStage = 100;
    }

    update(viewport,square){
        if (Math.sqrt(Math.pow(square.x-this.inx,2) + Math.pow(square.y-this.iny,2)) < 100){
            square.x = this.outx
            square.y = this.outy
            viewport.centerOnSquare(square)

        }

        this.stage++;
        if (this.stage > this.maxStage){
            this.stage = 0;
        }

    }


    drawIn(viewport, square){
        
        const [x,y] = viewport.toCanvas(this.inx,this.iny);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, ((100-this.stage)/100)*this.radius/viewport.scaleFactor);
        gradient.addColorStop(0,"rgba(0, 0, 0, 1)");
        gradient.addColorStop(1,"rgba(240, 240, 240, 0)");
        ctx.fillStyle = gradient;
  
        ctx.beginPath();
        ctx.arc(x, y, this.radius/viewport.scaleFactor, 0, 2 * Math.PI);
        ctx.fill();
      }

    drawOut(viewport){
        
        const [x,y] = viewport.toCanvas(this.outx,this.outy);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, (this.stage/100)*this.radius/viewport.scaleFactor);
        gradient.addColorStop(0,"rgba(0, 0, 0, 1)");
        gradient.addColorStop(1,"rgba(240, 240, 240, 0)");

        ctx.fillStyle = gradient;
  
        ctx.beginPath();
        ctx.arc(x, y, this.radius/viewport.scaleFactor, 0, 2 * Math.PI);
        ctx.fill();
      }

    draw(viewport, square){
        this.drawIn(viewport)
        this.drawOut(viewport)
    }
}
