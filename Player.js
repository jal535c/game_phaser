class Player extends Phaser.Physics.Arcade.Sprite {   
  /**
   * Player manager
   * @param {*} configPlayer
   */
  constructor(configPlayer) {   
    super(configPlayer.scene, configPlayer.posX, configPlayer.posY, configPlayer.texture);
    
    this.scene = configPlayer.scene;

    this.posX = configPlayer.posX;  //respawn in his own position
    this.posY = configPlayer.posY;

    //Add the player to the current scene, and enables physics
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    
    this.setCollideWorldBounds(true);     //Set limits of the world
    this.play("player_fly");  

    this.setTint(configPlayer.color);   //paint semi-transparent color on top of sprite
    
    if (configPlayer.cursors) {
      this.playerKeys = configPlayer.scene.input.keyboard.createCursorKeys();
    } else {
      this.playerKeys = configPlayer.scene.input.keyboard.addKeys({   
        up: Phaser.Input.Keyboard.KeyCodes.W,       
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });
    }
    
    this.shootKey = this.scene.input.keyboard.addKey(configPlayer.shootKey);  
    
    this.beamMax = configPlayer.beamMax;
    this.lives = 3;

    //paint the beams numbers and the lives
    let posX = (configPlayer.playerNumber == 1) ? 10 : 220;
    this.beamTxt = this.scene.add.text(posX, 0, this.beamMax, {font:"25px Arial", fill:"yellow"}).setDepth(2);
    this.livesTxt = this.scene.add.text(posX, 20, this.lives, {font:"25px Arial", fill:"yellow"}).setDepth(2);

    //Add the player to the players group
    this.scene.players.add(this);
  }


  /**
   * Update player, called by the Level1 update
   */
  update() {   
    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.shootKey) && this.beamMax>0) {            
      this.beamMax--;
      this.beamTxt.text = this.beamMax;      
    
      var beam = new Beam({
        scene: this.scene,
        posX: this.x,
        posY: this.y - 16,      //beam start in front of the head
        texture: "beam"
      });                  
    }
    
    if (this.lives === 0) {
      this.disableBody(true, true);   //only hide, not destroy
    }
  }


  /**
   * Manager to move player
   */
  movePlayerManager() {
    this.body.setVelocity(0);     //stop if don't press key
    
    if (this.playerKeys.left.isDown) {
      this.body.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.playerKeys.right.isDown) {
      this.body.setVelocityX(gameSettings.playerSpeed);
    } 
    
    if (this.playerKeys.up.isDown) {      
      this.body.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.playerKeys.down.isDown) {
      this.body.setVelocityY(gameSettings.playerSpeed);
    }
  }


  /**
   * Reset player position and decrement lives
   */
  die() {
    this.x = this.posX;
    this.y = this.posY;
    
    this.lives--;
    this.livesTxt.text = this.lives;    //update text for lives
  }


  /**
   * Collision between player and enemy.
   * Reduce lives counter.
   * @param {*} player 
   * @param {*} enemy 
   */
  hurtPlayer(player, enemy) {
    enemy.resetShipPos();
    player.die();
  }


  /**
   * Collision between player and powerUp.
   * Pick up the powerUp
   * @param {*} player 
   * @param {*} powerUp
   */
  pickPowerUp(player, powerUp) {
    if (powerUp.extraLife) {
      player.lives++;
      player.livesTxt.text = player.lives;    //update lives text
    }

    if (powerUp.extraBeam) {
      player.beamMax += 10;
      player.beamTxt.text = player.beamMax;   //update beam text
    }
    
    powerUp.destroy();
  }
}