//Spaceship prefabs
class Spaceship2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointvalue
        this.moveSpeed = game.settings.spaceship2Speed; //pixels per frame
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width + borderUISize) {
            this.x = game.config.width;
        }
    }
    //reset the position
    reset() {
        this.x = game.config.width;
    }
}