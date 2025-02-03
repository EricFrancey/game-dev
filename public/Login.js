class Login{
    constructor(){
        this.loggedIn = false
        this.guesting = false
        this.welcomed = false

        this.playingMusic = false;

        this.welcomeMusicButton = new Button(150, 200, 200, 50, "Play with music", function() {
            this.clicked = true;
          });

        this.welcomeNoMusicButton = new Button(450, 200, 200, 50, "Play in silence", function() {
            this.clicked = true;
          });

        this.playButton = new Button(150, 300, 200, 100, "Play", function() {
            this.clicked = true
            var name = prompt("Name")
        });

        this.playAsGuestButton = new Button(450, 300, 200, 100, "Play as Guest", function() {
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
            this.welcomed = true;
        }
        if (this.welcomeNoMusicButton.clicked){
             this.welcomed = true;
        }

        if (this.playButton.clicked){
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
    
}