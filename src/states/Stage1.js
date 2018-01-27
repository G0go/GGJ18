import Phaser from 'phaser'

import Player from '../objects/Player'

class Stage1 extends Phaser.State {

    preload() {
        this.player = new Player(this.game);
        this.player.loadPlayer();
        this.game.load.image('Dashicon', 'assets/Icon.png');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.initBackground();
        this.game.input.mouse.capture = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.player.createPlayer();
        this.drawUI();
    }

    update() {
        this.player.checkMove(this.cursors);
        this.player.spell.checkCooldown();
    }

    initBackground() {
        this.game.stage.backgroundColor = '#fff';
    }

    drawUI() {
        this.player.spell.drawOnUI(this.game);
    }

}

export default Stage1;