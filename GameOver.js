class GameOver extends Phaser.Scene {  
  constructor() {
    super("GameOver");   
  }


  create() {  
    this.gameOverTxt = this.add.text(40, config.height/2 - 20, 'GAME OVER', {font:"25px Arial", fill:"red"});
    console.log("loading Scene Game over");

    this.gameOverTxt.setInteractive().on("pointerdown", ()=>{
      this.scene.start("MenuScene");
    });
  }
}