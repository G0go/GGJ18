import FullscreenManager from "../objects/FullscreenManager";
import Phaser from 'phaser';

class Gameover extends Phaser.State {

	preload() {
		this.game.load.image('Gameover_background', 'assets/Menu_background.jpg');
	}

	create() {
		this.game.global.fullscreenManager.init();
	    this.initBackground();
        let spellStyle = { font: "20px Arial", fill: "#fff", align: "center" };
        this.spellName = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "You loose..", spellStyle);
	}

	initBackground() {
        let sprite = this.game.add.image(this.game.width / 2, this.game.height / 2, 'Gameover_background');
        sprite.anchor.set(0.5, 0.5);
        sprite.width = this.game.width;
        sprite.height = this.game.height;
    }

}

export default Gameover;