class Opponent {
    constructor(x, y, id, color) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.color = color;

      this.vx = 0.1;
      this.vy = 0.1;

      this.number = 0;
    }

    update(number){
        if (this.id == 'bot'){
            this.x+=this.vx;
            this.y+=this.vy;
        }

        this.number = number;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 50, 50); // Draw the square
        if (this.id == 'bot'){
            ctx.fillText(`Bot ${this.number}`, this.x, this.y);
        } else {
            ctx.fillText(`Player ${this.number}`, this.x, this.y);
        }
    }
}