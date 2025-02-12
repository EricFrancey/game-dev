class Opponent {
    constructor(x, y, id, color) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.color = color;

      //this.rnd = [0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8, -0.1, -0.2, -0.4, -0.8, -1.6, -3.2, -6.4, -12.8];
      this.rnd = [0.1, 0.2, 0.4, 0.8, -0.1, -0.2, -0.4, -0.8];
      //this.rnd = [1.6, 3.2, 6.4, 12.8, -1.6, -3.2, -6.4, -12.8];
      this.vx = this.rnd[Math.floor(Math.random() * this.rnd.length)];
      this.vy = this.rnd[Math.floor(Math.random() * this.rnd.length)];

      this.number = 0;
      this.size = 50;

      this.keyLevels = {
        Up: 1,
        Down: 5,
        Left: 20,
        Right: 45
    };

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
        const [x, y] = viewport.toCanvas(this.x, this.y); 
        ctx.fillStyle = this.color;
        if (this.id == 'bot'){
            ctx.fillText(`Bot ${this.number}:${Math.round(this.x)} ${Math.round(this.y)}`, 0, 150 + 30*this.number);
        } else {
            ctx.fillText(`Player ${this.number}:${Math.round(this.x)} ${Math.round(this.y)}`,0, 150 + 30*this.number);
        }

        if (viewport.contains(this.x,this.y)){

            const [x,y] = viewport.toCanvas(this.x,this.y);
            ctx.fillRect(x, y, this.size/viewport.scaleFactor, this.size/viewport.scaleFactor); // Draw the square
            if (this.id == 'bot'){
                ctx.fillText(`Bot ${this.number}:${Math.round(this.x)} ${Math.round(this.y)}`, x, y);
            } else {
                ctx.fillText(`Player ${this.number}`, x, y);
            }

        }

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
                }
                if (this.keyLevels.Right > 100) {
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
                if (this.keyLevels.Right > 1000) {
                    const circleX = x + 500 + radius * Math.cos(angle);
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
}