class Opponent {
    constructor(x, y, id, color) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.color = color;
      this.name = "bot"

      //this.rnd = [0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, -0.1, -0.2, -0.4, -0.8, -1.6, -3.2, -6.4, -12.8];
      this.rnd = [0.1, 0.2, 0.4, 0.8, -0.1, -0.2, -0.4, -0.8];
      //this.rnd = [1.6, 3.2, 6.4, 12.8, -1.6, -3.2, -6.4, -12.8];
      this.vx = this.rnd[Math.floor(Math.random() * this.rnd.length)];
      this.vy = this.rnd[Math.floor(Math.random() * this.rnd.length)];

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

        ctx.fillStyle = this.color;

        if (debug){
            if (this.id == 'bot'){
                ctx.fillText(`Bot ${this.number}:${Math.round(this.x)} ${Math.round(this.y)}`, 0, 150 + 30*this.number);
            } else {
                ctx.fillText(`Player ${this.number}:${Math.round(this.x)} ${Math.round(this.y)}`,0, 150 + 30*this.number);
            }
        }

        if (viewport.contains(this.x,this.y)){

            const [x,y] = viewport.toCanvas(this.x,this.y);
            ctx.fillRect(x, y, this.size/viewport.scaleFactor, this.size/viewport.scaleFactor); // Draw the square
            if (this.id == 'bot'){
                ctx.fillText(`Bot ${this.number}:${Math.round(this.x)} ${Math.round(this.y)}`, x, y);
            } else {
                ctx.fillText(`${this.name}`, x, y);
            }

        }
    }
}