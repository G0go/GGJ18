import Phaser from 'phaser'

import Player from '../objects/Player'

class Stage1 extends Phaser.State {

    preload() {
        this.player = new Player(this.game);
        this.player.loadPlayer();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.initBackground();
        this.game.input.mouse.capture = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.player.createPlayer();
        this.initTxt();
    }

    update() {
        this.player.checkMove(this.cursors);
    }

    initBackground() {
        this.game.stage.backgroundColor = '#fff';
    }

    initTxt() {
        let style = { font: "65px Arial", fill: "#000", align: "center" };
        let txt = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);
        txt.anchor.set(0.5);
    }

}

export default Stage1;