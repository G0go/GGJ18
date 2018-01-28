import Spell from '../objects/Spell'
import Phaser from 'phaser'

class Player {

    constructor(game) {
        this.game = game;
        this.spell = new Spell('Dash', 'LF click', 1000, (self) => {
            if (self.sprite == undefined || this.game.global.factory.lastTrigger == undefined) {
                this.trigger = false;
                return;
            }
            if (Math.abs(self.sprite.body.x - self.target.x) < 10 && Math.abs(self.sprite.body.y - self.target.y) < 10)
                this.transform();
            else
                self.moveToPosition(20);
        });
        this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.Z);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.S);
        this.trigger = false;
        this.target = undefined;
        this.angle = 0;
        this.isAlive = true;
        this.vanilla = true;
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
                    if (this.vanilla)
                        this.sprite.animations.play('move', 8);
                }
            },
            {
                key: cursors.down.isDown,
                callback: () => {
                    this.sprite.body.x += -(Math.cos(this.angle) * 2);
                    this.sprite.body.y += -(Math.sin(this.angle) * 2);
                    if (this.vanilla)
                        this.sprite.animations.play('move', 8);
                }
            },
            {
                key: this.space.isDown,
                callback: () => {}
            },
            {
                key: this.down.isDown,
                callback: () => {
                    this.sprite.body.x += -(Math.cos(this.angle) * 2);
                    this.sprite.body.y += -(Math.sin(this.angle) * 2);
                    if (this.vanilla)
                        this.sprite.animations.play('move', 8);
                }
            },
            {
                key: this.up.isDown,
                callback: () => {
                    this.sprite.body.x += Math.cos(this.angle) * 2;
                    this.sprite.body.y += Math.sin(this.angle) * 2;
                    if (this.vanilla)
                        this.sprite.animations.play('move', 8);
                }
            }
        ];

        if (this.sprite == undefined) {
            console.log("Error no sprite set");
            return;
        }
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

    transform() {
        let to = this.game.global.factory;
        console.log(to.lastTrigger);
        if (to.lastTrigger != undefined && to.lastTrigger != null) {
            this.sprite.destroy();
            this.sprite = to.lastTrigger;
            this.trigger = false;
            this.game.camera.follow(this.sprite);
            to.clearTriggers();
            this.vanilla = false;
        }
    }
}

export default Player;