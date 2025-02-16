class Debug{
    constructor(){
        this.debug = false;
        this.isActive = false;
        this.intro = true
    }

    update(keys){
        if (keys['9'] && !this.isActive) { 
            this.debug = !this.debug; 
            this.isActive = true; 
        }
        
        if (!keys['9']) { 
            this.isActive = false; 
        }
        if (this.debug) {
            if (keys['8']) this.intro = false
        }   
    }

    draw(viewport, intro){
        // draw viewport coords
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`v left: ${JSON.stringify(viewport.left)}`, 1000, 90);
        ctx.fillText(`v top: ${JSON.stringify(viewport.top)}`, 1000, 120);
        ctx.fillText(`play intro: ${this.intro}`, 1000, 200);
    }
    
}