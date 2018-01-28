import Spell from '../objects/Spell'
import Phaser from 'phaser'

class Player {

    constructor(game) {
        this.game = game;
        this.spell = new Spell('Dash', 'LF click', 3000, (self) => {
            self.moveToPosition(8);
            if (Math.abs(self.sprite.body.x - self.target.x) < 10 && Math.abs(self.sprite.body.y - self.target.y) < 10)
                self.trigger = false;
        });
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        this.trigger = false;
        this.target = undefined;
        this.angle = 0;
    }

    loadPlayer() {
        this.game.load.atlasJSONHash('player', './assets/spritesheet.png', './assets/parasite.json');
    }

    createPlayer() {
        this.game.input.onDown.add(this.attack, this);
        this.sprite = this.game.add.sprite(48, 48, 'player');
        this.sprite.scale.setTo(1, 1);
        this.sprite.animations.add('move');
        this.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
        this.game.camera.follow(this.sprite);
    }

    checkMove(cursors) {
        let moves = [
            {
                key: cursors.up.isDown,
                callback: () => {
                    this.sprite.body.x += Math.cos(this.angle) * 2;
                    this.sprite.body.y += Math.sin(this.angle) * 2;
                    this.sprite.animations.play('move', 8);
                }
            },
            {
                key: cursors.down.isDown,
                callback: () => {
                    this.sprite.body.x += -(Math.cos(this.angle) * 2);
                    this.sprite.body.y += -(Math.sin(this.angle) * 2);
                    this.sprite.animations.play('move', 8);
                }
            },
            {
                key: this.space.isDown,
                callback: () => {

                }
            }
        ];

        if (!this.trigger) {
            this.sprite.body.setZeroVelocity();
            this.angle = this.toPosition(this.game.input.mousePointer);
            moves.filter(e => e.key).forEach(e => e.callback());
        } else
            this.spell.effect(this);
    }

    toPosition(obj) {
        let angle = Math.atan2(obj.y - this.sprite.body.y, obj.x - this.sprite.body.x);
        this.sprite.body.rotation = angle;
        return angle;
    }

    moveToPosition(speed) {
        let angle = Math.atan2(this.target.y - this.sprite.body.y, this.target.x - this.sprite.body.x);
        this.sprite.body.x += Math.cos(angle) * speed;
        this.sprite.body.y += Math.sin(angle) * speed;
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