import Phaser from 'phaser'

import Player from '../objects/Player'

class Stage1 extends Phaser.State {

    preload() {
        this.player = new Player(this.game);
        this.player.loadPlayer();
        this.game.load.image('dashicon', './assets/play_button.png');
    }

    create() {
        let dashicon = this.game.add.sprite(this.game.width / 2, this.game.height - 50, 'dashicon');
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.initBackground();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.player.createPlayer();
    }

    update() {
        this.player.checkMove(this.cursors);
    }

    initBackground() {
        this.game.stage.backgroundColor = '#fff';
    }

}

export default Stage1;