import Spell from '../objects/Spell'

class Player {

    constructor(game) {
        this.moves = [this.moveDown, this.moveUp];
        this.game = game;
        this.spell = new Spell('Dash', 3000, (self) => {
            self.moveToPosition(40);
            if (Math.abs(self.sprite.body.x - self.target.x) < 30 && Math.abs(self.sprite.body.y - self.target.y) < 30)
                self.trigger = false;
        });
        this.trigger = false;
        this.target = undefined;
    }

    loadPlayer() {
        this.game.load.atlasJSONHash('player', './assets/spritesheet.png', './assets/parasite.json');
    }

    createPlayer(game) {
        this.game.input.onDown.add(this.attack, this);
        this.sprite = this.game.add.sprite(48, 48, 'player');
        this.sprite.scale.setTo(1.5, 1.5);
        this.sprite.animations.add('move');
        this.game.physics.p2.enable(this.sprite);
        this.game.camera.follow(this.sprite);
    }

    checkMove(cursors) {
        let keys = [cursors.down.isDown, cursors.up.isDown];

        if (!this.trigger) {
            let angle = this.toPosition(this.game.input.mousePointer);
            this.sprite.body.setZeroVelocity();
            for (let i = 0; i < keys.length; i++)
                if (keys[i])
                    this.moves[i](this.sprite, angle);
        } else
            this.spell.effect(this);

    }

    toPosition(obj) {
        let angle = Math.atan2(obj.y - this.sprite.body.y, obj.x - this.sprite.body.x);
        this.sprite.body.rotation = angle;
        return (angle);
    }

    moveToPosition(speed) {
        let angle = Math.atan2(this.target.y - this.sprite.body.y, this.target.x - this.sprite.body.x);
        this.sprite.body.x += Math.cos(angle) * speed;
        this.sprite.body.y += Math.sin(angle) * speed;
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

    attack() {
        if (this.spell.isReady()) {
            this.spell.use();
            this.trigger = true;
            this.target = {x: this.game.input.mousePointer.x, y: this.game.input.mousePointer.y};
        }
    }

}

export default Player;