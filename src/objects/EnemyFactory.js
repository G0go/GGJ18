import Spell from '../objects/Spell'
import Enemy from "./Enemy";

class EnemyFactory {

    constructor(game) {
        this.game = game;
        this.enemies = [];
        this.enemyType = {
            SHOOTER: 0,
            SWORDMAN: 1,
            DOG: 2,
        };
        this.protos = [
            { name: 'shooter', spell: new Spell('Shoot', 700, (self) => {}), range: 300, path: '' },
            { name: 'swordman', spell: new Spell('Hit', 300, (self) => {}), range: 300, path: '' },
            { name: 'dog', spell: new Spell('Bite', 300, (self) => {}), range: 300, path: '' }
        ];
        this.lastTrigger = undefined;
    }

    loadSprites() {
        this.game.load.image('swordman', 'assets/swordman.png');
    }

    clearTriggers() {
        this.lastTrigger = undefined;
        this.enemies.map(enemy => enemy.triggered = false);
    }

    spawn(type, position) {
        let proto = this.protos[type];
        let sprite = this.game.add.sprite(position.x, position.y, proto.name);
        let enemy = new Enemy(sprite, proto.spell);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add((enemy) => { enemy.triggered = true; this.lastTrigger = enemy; });
        this.enemies.push(enemy);
        this.game.physics.enable(enemy.sprite, Phaser.Physics.P2JS);
        return enemy;
    }

    clear() {
        this.enemies.splice(0, this.enemies.length);
    }

}

export default EnemyFactory;
