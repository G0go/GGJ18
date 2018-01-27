import Phaser from 'phaser'

class Player {

    constructor(game) {
        this.game = game;
        this.moves = [this.moveLeft, this.moveRight, this.moveDown, this.moveUp];
    }

    loadPlayer() {
        this.game.load.image('player', './assets/spritesheet.png');
    }

    createPlayer() {
        this.sprite = this.game.add.sprite(48, 48, 'player', 1);
        this.sprite.animation.add('move', [1,2,3]);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.game.camera.follow(this.sprite);
    }

    checkMove(cursors) {
        let keys = [cursors.left.isDown, cursors.right.isDown, cursors.down.isDown, cursors.up.isDown];

        for (let i = 0; i < keys.length; i++)
            if (keys[i])
                this.moves[i]();
    }

    moveLeft() {
        this.sprite.body.velocity.set(0);
        this.sprite.velocity.x = -100;
    }

    moveRight() {
        this.sprite.body.velocity.set(0);
        this.sprite.velocity.x = 100;
    }

    moveUp() {
        this.sprite.body.velocity.set(0);
        this.sprite.velocity.y = -100;
    }

    moveDown() {
        this.sprite.body.velocity.set(0);
        this.sprite.velocity.y = 100;
    }

}

export default Player;