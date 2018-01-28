import Spell from '../objects/Spell'
import Enemy from "./Enemy";

class EnemyFactory {

    constructor(game) {
        this.game = game;
        this.initEnemiesType();
        this.protos = this.initEnemies();
        this.enemies = [];
    }

    initEnemiesType() {
        this.GUNMAN = 0;
        this.SWORDMAN = 1;
        this.DOG = 2;
    }

    initEnemies() {
        return ([
            { name: 'gunman', spell: new Spell('Shoot', 700, (self) => {}), range: 300, path: '' },
            { name: 'swordman', spell: new Spell('Hit', 300, (self) => {}), range: 200, path: '' },
            { name: 'dog', spell: new Spell('Bite', 300, (self) => {}), range: 400, path: '' }
        ]);
    }

    loadSprites() {
    }

    spawn(type, position) {
        let proto = this.enemies[type];
        let sprite = this.game.add.sprite(position.x, position.y, proto.name);
        let enemy = new Enemy(sprite, proto.spell);
        this.enemies.add(enemy);
        return enemy;
    }

}

export default EnemyFactory;