class BootScene extends Phaser.Scene {   
  constructor() {
    super("BootScene");  
  }
  

  /**
   * Load the resources, availables for all scenes
   */
  preload() {
    this.load.image("background", "assets/images/background.png");   
    
    this.load.spritesheet("ship1", "assets/spritesheets/ship.png", {frameWidth: 16, frameHeight: 16} );
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {frameWidth: 32, frameHeight: 16} );
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {frameWidth: 32, frameHeight: 32} );

    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {frameWidth: 16, frameHeight: 16} );

    this.load.spritesheet("powerUp", "assets/spritesheets/power-up.png", {frameWidth: 16, frameHeight: 16} );

    this.load.spritesheet("player", "assets/spritesheets/player.png", {frameWidth: 16, frameHeight: 24} );

    this.load.spritesheet("beam", "assets/spritesheets/beam.png", {frameWidth: 16, frameHeight: 16} );
  }


  /**
   * Add elements to scene
   */
  create() {
    this.add.text(20, 20, 'Loading game...');    
    console.log("cargando Scene 1");     
   
    //Sprite animations, require spritesheets
    this.anims.create({
      key: "ship1_fly",
      frames: this.anims.generateFrameNumbers("ship1"),
      frameRate: 20,    //fps
      repeat: -1        //infinite loop
    });
    this.anims.create({
      key: "ship2_fly",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1    
    });
    this.anims.create({
      key: "ship3_fly",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1    
    });
    
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,        //only one loop
      hideOnComplete: true      //disappears when finished
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("powerUp", {start: 0, end: 1}),
      frameRate: 20,    
      repeat: -1        
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("powerUp", {start: 2, end: 3}),
      frameRate: 20,
      repeat: -1
    });
    
    this.anims.create({
      key: "player_fly",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_shoot",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

    this.scene.start("MenuScene");   //start another scene
  }
}