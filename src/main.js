/*
 *  Jessica Zogaric
 *  Rocket Patrol: The Cute Remaster
 *  Approximate time to complete: 15 1/2 hours
 *  Mods:
 *  Background music (5), High score counter (5), "FIRE" UI (5), New scrolling tile for background (5),
 *  new title screen (10), add 4 randomly playing sound effects (10), parallax background scrolling(10),
 *  mouse controls direction and shooting(15), add new spaceship with new functions and art (15),
 *  player can move after rocket fires(5)
 *  Point total: 85
 *  Citations: background music by Lesiakower on pixabay.com, Phaser documentation
 */

//configured the screen so its 640 x 480 and pass the config thru the let game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ] //puts the diff scenes we have in the scene array
  }
//reservekeyboard vars (no longer needed)
let keyF, keyR, keyLEFT, keyRIGHT;
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;