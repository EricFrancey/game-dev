// Square properties
class Square {
    constructor(canvas){
        this.name = ""
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
      
        // if (keys['1']) this.color ='red';
        // if (keys['2']) this.color ='blue';
        // if (keys['3']) this.color ='green';
        // if (keys['4']) this.color ='yellow';
        // if (keys['5']) this.color ='purple';
        // if (keys['6']) this.color ='orange';
        // if (keys['7']) this.color ='magenta';
        // if (keys['8']) this.color ='cyan';
        // if (keys['9']) this.color ='white';

        if (keys['1']) {

            this.keyLevels = {
                Up: 1,
                Down: 1,
                Left: 1,
                Right: 1
            };
        }

        if (keys['2']) {

            this.keyLevels = {
                Up: 1,
                Down: 100,
                Left: 200,
                Right: 450
            };

        }

        if (keys['3']) {

            this.keyLevels = {
                Up: 1000,
                Down: 100,
                Left: 200,
                Right: 450
            };

        }

        if (keys['4']) {

            this.keyLevels = {
                Up: 250,
                Down: 250,
                Left: 250,
                Right: 250
            };

        }



    }

    contains(x,y){
        return(x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
    }

    draw(ctx, viewport){
        ctx.fillStyle = this.color;
        const [x, y] = viewport.toCanvas(this.x, this.y); 
        ctx.fillText(this.name, x, y);
        // ctx.fillRect(x, y, this.size / viewport.scaleFactor, this.size / viewport.scaleFactor); // Draw the square
    
        const maxRings = Math.ceil(Math.sqrt(this.keyLevels.Right)); // Define the number of concentric circles

        const baseRadius = 10; // Base radius for first ring
    
        let circleIndex = 0;
        for (let ring = 1; ring <= maxRings; ring++) {
            const numCircles = ring * 6; // Increase circles per ring
            const radius = baseRadius * ring;
            const colorList = ['black', 'white'];
            for (let i = 0; i < numCircles && circleIndex < this.keyLevels.Right / 10; i++, circleIndex++) {
                const angle = (i * (2 * Math.PI / numCircles));
                const circleX = x + 25 + radius * Math.cos(angle);
                const circleY = y + radius * Math.sin(angle);
                
                ctx.beginPath();
                ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#003300';
                // ctx.stroke();

                if (this.keyLevels.Right > 10) {
                    const circleX = x + 50 + radius * Math.cos(angle);
                    const circleY = y + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();



                    if (this.keyLevels.Up > 10) {
                        const circleX = x + 50 + radius * Math.cos(angle);
                        const circleY = y + 50 + radius * Math.sin(angle);
                        ctx.beginPath();
                        ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                        ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                        ctx.fill();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#003300';
                        // ctx.stroke();
                        
                    }




                }
                if (this.keyLevels.Right > 100) {
                    const circleX = x + 100 + radius * Math.cos(angle);
                    const circleY = y + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Right > 1000) {
                    const circleX = x + 200 + radius * Math.cos(angle);
                    const circleY = y + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
            }
            
        }


        circleIndex = 0;
        for (let ring = 1; ring <= maxRings; ring++) {
            const numCircles = ring * 6; // Increase circles per ring
            const radius = baseRadius * ring;
            const colorList = ['green', 'blue', 'red', 'black', 'white', 'white', 'white'];
            for (let i = 0; i < numCircles && circleIndex < this.keyLevels.Left / 10; i++, circleIndex++) {
                const angle = (i * (2 * Math.PI / numCircles));
                const circleX = x - 25 + radius * Math.cos(angle);
                const circleY = y + radius * Math.sin(angle);
                
                ctx.beginPath();
                ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                // ctx.fillStyle = colorList[circleIndex % colorList.length];
                ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#003300';
                // ctx.stroke();
                if (this.keyLevels.Left > 10) {
                    const circleX = x - 50 + radius * Math.cos(angle);
                    const circleY = y + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Left > 100) {
                    const circleX = x - 200 + radius * Math.cos(angle);
                    const circleY = y + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Left > 1000) {
                    const circleX = x - 500 + radius * Math.cos(angle);
                    const circleY = y + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
            }
        }

        circleIndex = 0;
        for (let ring = 1; ring <= maxRings; ring++) {
            const numCircles = ring * 6; // Increase circles per ring
            const radius = baseRadius * ring;
            const colorList = ['green', 'blue', 'red', 'red', 'red', 'green', 'white'];
            for (let i = 0; i < numCircles && circleIndex < this.keyLevels.Up / 10; i++, circleIndex++) {
                const angle = (i * (2 * Math.PI / numCircles));
                const circleX = x + radius * Math.cos(angle);
                const circleY = y - 25 + radius * Math.sin(angle);
                
                ctx.beginPath();
                ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#003300';
                // ctx.stroke();
                if (this.keyLevels.Up > 10) {
                    const circleX = x + radius * Math.cos(angle);
                    const circleY = y -50 + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Up > 100) {
                    const circleX = x + radius * Math.cos(angle);
                    const circleY = y - 200 + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Up > 1000) {
                    const circleX = x + radius * Math.cos(angle);
                    const circleY = y - 500 + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
            }
        }

        circleIndex = 0;
        for (let ring = 1; ring <= maxRings; ring++) {
            const numCircles = ring * 6; // Increase circles per ring
            const radius = baseRadius * ring;
            const colorList = ['blue', 'blue', 'red', 'black', 'black', 'white', 'white'];
            for (let i = 0; i < numCircles && circleIndex < this.keyLevels.Down / 10; i++, circleIndex++) {
                const angle = (i * (2 * Math.PI / numCircles));
                const circleX = x + radius * Math.cos(angle);
                const circleY = y + 25 + radius * Math.sin(angle);
                
                ctx.beginPath();
                ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#003300';
                // ctx.stroke();
                if (this.keyLevels.Down > 10) {
                    const circleX = x + radius * Math.cos(angle);
                    const circleY = y + 50 + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Down > 100) {
                    const circleX = x + radius * Math.cos(angle);
                    const circleY = y + 200 + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
                if (this.keyLevels.Down > 1000) {
                    const circleX = x + radius * Math.cos(angle);
                    const circleY = y + 500 + radius * Math.sin(angle);
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = colorList[(Math.floor(Math.random() * colorList.length))]
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#003300';
                    // ctx.stroke();
                }
            }
            
        }
    }
    };