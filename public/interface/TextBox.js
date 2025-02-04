class TextBox {
    constructor(canvas, inputContainer) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.inputContainer = inputContainer;

      this.textInput = null;
      this.currentX = 50;
      this.currentY = 50;

      // Listen for canvas click events to activate the textbox
      this.canvas.addEventListener('click', (e) => this.startTextInput(e));
    }

    // Create and position a new input field
    createInputField(x, y) {
      this.textInput = document.createElement('input');
      this.textInput.classList.add('textInput');
      this.textInput.style.left = `${x}px`;
      this.textInput.style.top = `${y}px`;
      this.inputContainer.appendChild(this.textInput);
      this.textInput.style.display = 'block';
      this.textInput.focus();
      
      this.textInput.onblur = () => this.onTextInputComplete(x, y);
    }

    // Start editing the text when canvas is clicked
    startTextInput(event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // Position the text input at the clicked location
      this.currentX = mouseX;
      this.currentY = mouseY;

      // Remove any existing input field before adding a new one
      if (this.textInput) {
        this.textInput.remove();
      }

      // Create a new input field
      this.createInputField(mouseX, mouseY);
    }

    // When text input is completed, draw the text on canvas
    onTextInputComplete(x, y) {
      const text = this.textInput.value;
      this.textInput.remove();
      this.textInput = null;

      // Draw the entered text on the canvas at the clicked position
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(text, x, y);
    }
  }

  // Create an instance of the TextBox class
  //const textBox = new TextBox(canvas, document.getElementById('inputContainer'));