class Opponent {
    constructor(x, y, id, color) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.color = color;

      this.rnd = [0.0, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2];
      this.vx = this.rnd[Math.floor(Math.random() * 3)];
      this.vy = this.rnd[Math.floor(Math.random() * 3)];

      this.number = 0;
      this.size = 50;
    }

    update(number){
        if (this.id == 'bot'){
            this.x+=this.vx;
            this.y+=this.vy;
        }

        this.number = number;
    }

    contains(x,y){
        return(x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
    }

    draw(ctx, viewport) {

        if (viewport.contains(this.x,this.y)){

            const [x,y] = viewport.toCanvas(this.x,this.y);

            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, 50/viewport.scaleFactor, 50/viewport.scaleFactor); // Draw the square
            if (this.id == 'bot'){
                ctx.fillText(`Bot ${this.number}`, x, y);
            } else {
                ctx.fillText(`Player ${this.number}`, x, y);
            }

        }
    }
}