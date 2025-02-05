class Login{
    constructor(){
        this.loggedIn = false
        this.guesting = false
        this.welcomed = false

        this.playingMusic = false;
        this.ratio = 1.618;

        this.welcomeMusicButton = new Button(3*canvas.width/9, canvas.height/9, this.ratio*canvas.width/9, canvas.height/9, "Play with music", function() {
            this.clicked = true;
          });

        this.welcomeMusicButton.addEventListeners()

        this.welcomeNoMusicButton = new Button(5*canvas.width/9, canvas.height/9, this.ratio*canvas.width/9, canvas.height/9, "Play in silence", function() {
            this.clicked = true;
          });

        this.welcomeNoMusicButton.addEventListeners()

        this.playButton = new Button(3*canvas.width/9, 3*canvas.height/9, this.ratio*canvas.width/9, canvas.height/18, "Login", function() {
            this.clicked = true
            var name = prompt("Name")
            return(name)
        });

        this.playAsGuestButton = new Button(5*canvas.width/9, 3*canvas.height/9, this.ratio*canvas.width/9, canvas.height/18, "Play as Guest", function() {
            this.clicked = true
        });
    }

    update(){
        if(this.welcomeMusicButton.clicked && !this.playingMusic){
            if (this.welcomeMusicButton.click_x%2 == 0){
                music['login1'].play()
            } else {
                music['login2'].play()
            }
            this.welcomeNoMusicButton.removeEventListeners()
            this.welcomeMusicButton.removeEventListeners()
            this.playButton.addEventListeners()
            this.playAsGuestButton.addEventListeners()
            this.welcomed = true;
        }
        if (this.welcomeNoMusicButton.clicked){
            this.welcomeNoMusicButton.removeEventListeners()
            this.welcomeMusicButton.removeEventListeners()
            this.playButton.addEventListeners()
            this.playAsGuestButton.addEventListeners()
            this.welcomed = true;
        }

        if (this.playButton.clicked){
            square.name = this.playButton.clickResult
            this.loggedIn = true;
        }

        if (this.playAsGuestButton.clicked){
            this.guesting = true;
        }
    }

    draw(){

        if (this.welcomed){
            this.playButton.draw()
            this.playAsGuestButton.draw()
        } else {
            this.welcomeMusicButton.draw()
            this.welcomeNoMusicButton.draw()
        }

    }

    finish(){
        this.playButton.removeEventListeners();
        this.playAsGuestButton.removeEventListeners();
    }
    
}