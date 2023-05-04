// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    update() {
      //left and right movement with mouse, not keys make it so u can move while firing
        if(game.input.mousePointer.x < this.x && this.x >= borderUISize + this.width) {
          this.x -= this.moveSpeed;
        } else if (game.input.mousePointer.x > this.x && this.x <= game.config.width - borderUISize - this.width) {
          this.x += this.moveSpeed;
        }
      //fire button with any mouse button
      if (game.input.mousePointer.isDown && !this.isFiring) {
        this.isFiring = true;
        this.sfxRocket.play();  // play sfx
      }
      //if fired, move up
      if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
        this.y -= this.moveSpeed;
      }
      //reset on miss
      if(this.y <= borderUISize * 3 + borderPadding) {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
      }
    }
    reset(){
      this.isFiring = false;
      this.y = game.config.height - borderUISize - borderPadding;
    }

}