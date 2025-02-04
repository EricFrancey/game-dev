class Button {
    constructor(x, y, width, height, text, onClick) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;
      this.onClick = onClick;
      this.isHovered = false;
      this.clicked = false;
      this.click_x;
      this.click_y;
      this.frame = 0;
      
      // Draw the button when it's created
      this.draw();
      

      // Bind mouse events
      this.boundHandleClick = this.handleClick.bind(this)
      this.boundHandleMouseMove = this.handleMouseMove.bind(this)
    
    }

    // Draw the button
    draw() {
      // Draw button rectangle
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.isHovered ? 'lightblue' : 'lightgray';  // Change color on hover
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();

      // Draw button text
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(this.text, this.x + 10, this.y + this.height / 2);

      ctx.closePath();
    }

    // Handle mouse click event
    handleClick(event) {
      // Check if the click is inside the button
      const mouseX = event.offsetX
      const mouseY = event.offsetY
      if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
        this.click_x = mouseX
        this.click_y = mouseY
        this.onClick();  // Execute the onClick callback
      }
    }

    // Handle mouse move event
    handleMouseMove(event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // Update hover state
      this.isHovered = mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
      
      this.draw();  // Redraw the button with updated hover state
    }

    removeEventListeners(){
        canvas.removeEventListener('click', this.boundHandleClick);
        canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
    }

    addEventListeners(){
      canvas.addEventListener('click', this.boundHandleClick);
      canvas.addEventListener('mousemove', this.boundHandleMouseMove);
  }
  }