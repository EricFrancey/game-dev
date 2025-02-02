class Joystick {
    constructor(){
        this.joystick = document.getElementById('joystick');
        this.inner = document.getElementById('joystick-inner');
        this.active = false;
        this.dx = 0;
        this.dy = 0;

        this.joystick.addEventListener('touchstart', (e) => {
            this.active = true;
            this.update(e.touches[0]);
        });
        
        this.joystick.addEventListener('touchmove', (e) => {
            if (this.active) this.update(e.touches[0]);
        });
        
        this.joystick.addEventListener('touchend', () => {
            this.active = false;
            this.reset();
        });
    }

    // Update joystick position and square direction
    update(touch) {
        const rect = this.joystick.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;
        const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), rect.width / 2);
        const angle = Math.atan2(deltaY, deltaX);

        // Move joystick inner circle
        this.inner.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // // Update square direction
        this.dx = Math.cos(angle) * (distance / (rect.width / 2));
        this.dy = Math.sin(angle) * (distance / (rect.height / 2));

    }

// Reset joystick to center and stop movement
    reset() {
        this.inner.style.transform = 'translate(-50%, -50%)';
        this.dx = 0;
        this.dy = 0;
    }

}