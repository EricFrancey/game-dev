// Square properties
class Square {
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 50; // Size of the player square and grid squares
        this.speed = 5;
        this.color = 'red';

        this.bufferzone = 50;
    }

    update(){

        // Player movement logic
        this.w = (keys['w'] || keys['ArrowUp']) ? 1 : 0 
        this.a = (keys['a'] || keys['ArrowLeft']) ? 1: 0
        this.s = (keys['s'] || keys['ArrowDown']) ? 1: 0
        this.d = (keys['d'] || keys['ArrowRight'])? 1:0

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

    draw(viewport){
        ctx.fillStyle = this.color;
        const [x,y] = viewport.toCanvas(this.x,this.y); 
        ctx.fillRect(x, y, this.size, this.size); // Draw the square
    }
};