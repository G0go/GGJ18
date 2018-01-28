import Spell from '../objects/Spell'
import Enemy from "./Enemy";

class EnemyFactory {

    constructor(game) {
        this.enemyType = {
            SHOOTER: 0,
            SWORDMAN: 1,
            DOG: 2,
        };
        this.game = game;
        this.protos = [
            { name: 'shooter', spell: new Spell('Shoot', 700, (self) => {}) },
            { name: 'Dashicon', spell: new Spell('Hit', 300, (self) => {}) },
            { name: 'dog', spell: new Spell('Bite', 300, (self) => {}) }
        ];
        this.enemies = [];
    }

    spawn(type, position) {
        let proto = this.protos[type];
        let sprite = this.game.add.sprite(position.x, position.y, proto.name);
        let enemy = new Enemy(sprite, proto.spell);
        this.enemies.push(enemy);
        return enemy;
    }

}

export default EnemyFactory;
