// Square properties
class Square {
    constructor(canvas){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 50; // Size of the player square and grid squares
        this.speed = 5;
        this.color = 'red';

        this.bufferzone = 50;
        
        this.keyLevels = {
            Up: 1,
            Down: 1,
            Left: 1,
            Right: 1
        };
        
        this.keyXPThisLevel = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        };
        
        this.keyXPPerLevel = {
            Up: 0.1,  // XP required for the first level is 0.1 seconds
            Down: 0.1,
            Left: 0.1,
            Right: 0.1
        };
        this.keyTotalXP = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        };
        this.keyLifetimeTotalXP = {
            Up: 0,
            Down: 0,
            Left: 0,
            Right: 0
        };
        this.totalXP = 0;
        this.score = 0;
        this.lastUpdateTime = 0;
        this.lastScoreTime = 0;
    }

    updatexp(){
   
        ["Up", "Down", "Left", "Right"].forEach((dir, i) => {
            if (this[["w", "s", "a", "d"][i]]) {
                this.keyXPThisLevel[dir] += 1;
                this.keyLifetimeTotalXP[dir] += 1;
                if (this.keyXPThisLevel[dir] >= this.keyXPPerLevel[dir]) {
                    this.keyLevels[dir] += 1;
                    this.keyTotalXP[dir] += this.keyXPThisLevel[dir];
                    this.keyXPThisLevel[dir] = 0;
                    this.keyXPPerLevel[dir] *= 1.1;
                }
            }
        });
    }

    update(keys, deltaTime){
  
        this.w = (keys['w'] || keys['ArrowUp']) ? 1 : 0 
        this.a = (keys['a'] || keys['ArrowLeft']) ? 1: 0
        this.s = (keys['s'] || keys['ArrowDown']) ? 1: 0
        this.d = (keys['d'] || keys['ArrowRight'])? 1:0
        this.updatexp()
        this.vx = this.speed*(this.d - this.a + joystick.dx);
        this.vy = this.speed*(this.s - this.w + joystick.dy);

        this.x += this.vx;
        this.y += this.vy;
      
        if (keys['1']) this.color ='red';
        if (keys['2']) this.color ='blue';
        if (keys['3']) this.color ='green';
        if (keys['4']) this.color ='yellow';
        if (keys['5']) this.color ='purple';
        if (keys['6']) this.color ='orange';
        if (keys['7']) this.color ='magenta';
        if (keys['8']) this.color ='cyan';
        if (keys['9']) this.color ='white';
        if (keys['10']) this.color ='gray';

    }

    contains(x,y){
        return(x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
    }

    draw(ctx, viewport){
        ctx.fillStyle = this.color;
        const [x,y] = viewport.toCanvas(this.x,this.y); 
        ctx.fillRect(x, y, this.size/viewport.scaleFactor, this.size/viewport.scaleFactor); // Draw the square
    }
};