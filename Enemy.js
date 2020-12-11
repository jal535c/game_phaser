class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(configEnemy) {
    super(configEnemy.scene, configEnemy.posX, configEnemy.posY, configEnemy.texture);

    this.scene = configEnemy.scene;    
    this.speed = configEnemy.speed;
    
    this.scene.add.existing(this);    //add the enemy to the current scene 
    this.scene.physics.world.enableBody(this);    //enable physics

    this.play(configEnemy.anim);      //play the animation

    this.scene.enemies.add(this);     //add the enemy to the enemies group

    //Make clickable the sprite (the enemy ship)
    this.setInteractive();
    this.scene.input.on('gameobjectdown', this.destroyShip, this.scene);    //listener
  }


  /**
   * Update the enemy
   */
  update() {
    this.moveShip();
  }


  /**
   * Movement management
   */
  moveShip() {  
    this.y += this.speed;
    
    if (this.y > config.height+10) {
      this.resetShipPos();
    }
  }


  /**
   * Reset ship position with random x
   */
  resetShipPos() {
    this.y = 0;
    var randomX = Phaser.Math.Between(0+10, config.width-10);
    this.x = randomX;
  }


  /**
   * Destroy the ship clickable. Is a callback function, gameObject will be this
   * @param pointer - mouse positions
   * @param gameObject - reference to the ship object
   */
  destroyShip(pointer, gameObject) {   
    gameObject.setTexture("explosion");   
    gameObject.play("explode");         
  }
}