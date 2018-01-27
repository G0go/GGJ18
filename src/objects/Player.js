class Player {

    constructor(game) {
        this.moves = [this.moveDown, this.moveUp];
        this.game = game;
    }

    loadPlayer() {
        this.game.load.atlasJSONHash('player', './assets/spritesheet.png', './assets/parasite.json');
    }

    createPlayer(game) {
        this.sprite = this.game.add.sprite(48, 48, 'player');
        this.sprite.scale.setTo(1.5, 1.5);
        this.sprite.animations.add('move');
        this.game.physics.p2.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.game.camera.follow(this.sprite);
    }

    checkMove(cursors) {
        let keys = [cursors.down.isDown, cursors.up.isDown];

        let angle = this.toMouse();
        this.sprite.body.setZeroVelocity();
        for (let i = 0; i < keys.length; i++)
            if (keys[i])
                this.moves[i](this.sprite, angle);
    }

    toMouse() {
        let angle = Math.atan2(this.game.input.mousePointer.y - this.sprite.body.y, this.game.input.mousePointer.x - this.sprite.body.x);
        this.sprite.body.rotation = angle;
        return (angle);
    }

    moveUp(sprite, angle) {
        sprite.body.x += Math.cos(angle) * 10;
        sprite.body.y += Math.sin(angle) * 10;
        sprite.animations.play('move', 8);
    }

    moveDown(sprite, angle) {
        sprite.body.x += -(Math.cos(angle) * 10);
        sprite.body.y += -(Math.sin(angle) * 10);
        sprite.animations.play('move', 8);
    }

}

export default Player;