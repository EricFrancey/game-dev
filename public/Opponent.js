class Opponent {
    constructor(x, y, id, color) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.color = color;

      this.rnd = [0.0, 0.1, 0.2];
      this.vx = this.rnd[Math.floor(Math.random() * 3)];
      this.vy = this.rnd[Math.floor(Math.random() * 3)];

      this.number = 0;
    }

    update(number){
        if (this.id == 'bot'){
            this.x+=this.vx;
            this.y+=this.vy;
        }

        this.number = number;
    }

    draw(ctx, viewport) {

        if (viewport.contains(this.x,this.y)){

            const [x,y] = viewport.toCanvas(this.x,this.y);

            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, 50, 50); // Draw the square
            if (this.id == 'bot'){
                ctx.fillText(`Bot ${this.number}`, x, y);
            } else {
                ctx.fillText(`Player ${this.number}`, x, y);
            }

        }
    }
}