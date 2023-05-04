class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
      this.highScore = 0; //high score starting at 0 
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        //new spaceship
        this.load.image('spaceship2', './assets/spaceship2.png');
        //new starfield made by me 
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet for explosion
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        //load background music by Lesiakower on pixabay.com
        this.load.audio('menu_music', './assets/menu_music.mp3');
        //load images for a parallax background
        this.load.image('sky', './assets/sky.png');
        this.load.image('haze', './assets/haze.png');
        this.load.image('orange_star', './assets/orange_star.png');
        this.load.image('purple_star', './assets/purple_star.png');

        }

    create() {
        //make the tile sprites parallax
        this.add.image(0, 0, 'sky').setOrigin(0, 0,);

        //place tile sprite
        this.starfield = this.add.tileSprite(0, 75, game.config.width, game.config.height, 'haze').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'orange_star').setOrigin(0, 0);
        this.starfield3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'purple_star').setOrigin(0, 0);

        // purple UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x5E5BA6).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // play game background music
        this.sound.play('menu_music', {volume: 0.3});
        //define the keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // add three spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        // add new spaceship
        this.ship02 = new Spaceship2(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize scores
        this.p1Score = 0;
        // adding 'FIRE' to the UI
        let fireConfig = {
          fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#0D0C2C',
            color: '#FFFFFF',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 80
        }
        // display score
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#0D0C2C',
            color: '#FFFFFF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 80
        }
        let highScoreConfig = {
          fontFamily: 'Arial',
          fontSize: '28px',
          backgroundColor: '#0D0C2C',
          color: '#FFFFFF',
          align: 'left',
          padding: {
          top: 5,
          bottom: 5,
          },
          fixedWidth: 285
      }
        this.fireUI = this.add.text(borderUISize*5 + borderPadding, borderUISize + borderPadding*2, 'FIRE', fireConfig);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize*9 + borderPadding, borderUISize + borderPadding*2, 'High Score: ' + this.highScore, highScoreConfig); //add high score counter

        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.sound.stopAll(); //stop sound when time runs out
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //update highscore text
        if (this.gameOver && this.p1Score > this.highScore) {
          this.highScore = this.p1Score;
          this.scoreRight.setText = 'High Score: ' + this.highScore;
          console.log(this.highScore);
        }
        //Fire UI displays before u shoot but not while
        if (this.p1Rocket.isFiring) {
          this.fireUI.alpha = 0;
        }
        else
          this.fireUI.alpha = 1;
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite
        this.starfield2.tilePositionX -= 5;  // update tile sprite
        this.starfield3.tilePositionX -= 6;  // update tile sprite


        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
             this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);   
        }
      }

      checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
      }
      shipExplode(ship) {
        //add random sounds on explosion impact
        let soundArray = ['sfx_explosion', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5'];
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });       
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //play random explosion sound effects
        let randomsoundArray = Phaser.Utils.Array.GetRandom(soundArray);
        this.sound.play(randomsoundArray);
        //this.sound.play('sfx_explosion');
      }
  }
  