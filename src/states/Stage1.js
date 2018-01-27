import Phaser from 'phaser'

import Player from '../objects/Player'

class Stage1 extends Phaser.State {

    preload() {
        this.player = new Player(this.game);
        this.player.loadPlayer();
        this.game.load.image('Dashicon', 'assets/Icon.png');
    }

    create() {
        this.dashicon = this.game.add.sprite(this.game.width / 2, this.game.height - 100, 'Dashicon');
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.initBackground();
        this.game.input.mouse.capture = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.player.createPlayer();
        console.log(this.dashicon.alpha);
    }

    update() {
        this.player.checkMove(this.cursors);
        if (Date.now() - this.player.lastCall < this.player.cooldown) {
            this.dashicon.alpha = (Date.now() - this.player.lastCall) / this.player.cooldown;
        }
    }

    initBackground() {
        this.game.stage.backgroundColor = '#fff';
    }

}

export default Stage1;