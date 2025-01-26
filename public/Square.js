// Square properties
class Square {
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 50; // Size of the player square and grid squares
        this.speed = 5;
        this.color = 'red';
    }

    update(){

        // Player movement logic
        if (keys['w'] || keys['ArrowUp']) this.y -= this.speed;
        if (keys['a'] || keys['ArrowLeft']) this.x -= this.speed;
        if (keys['s'] || keys['ArrowDown']) this.y += this.speed;
        if (keys['d'] || keys['ArrowRight']) this.x += this.speed;

        // mobile
        this.x += this.speed*joystick.dx;
        this.y += this.speed*joystick.dy;
      
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

        // Prevent the player from going outside the canvas
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.size));
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.size));


        // Smoothly update grid offsets when the player reaches the canvas edges
        if (this.x <= 0) {
            this.x = 0; // Prevent the this from moving out of bounds
        } else if (this.x + this.size >= canvas.width) {
            this.x = canvas.width - this.size; // Prevent the this from moving out of bounds
        }

        if (this.y <= 0) {
            this.y = 0; // Prevent the this from moving out of bounds
        } else if (this.y + this.size >= canvas.height) {
            this.y = canvas.height - this.size; // Prevent the this from moving out of bounds
        }

    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size); // Draw the square
    }
};