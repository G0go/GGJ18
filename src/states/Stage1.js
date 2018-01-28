import Player from '../objects/Player'

class Stage1 extends Phaser.State {

    preload() {
        this.player = new Player(this.game);
        this.player.loadPlayer();
        this.game.load.image('Dashicon', 'assets/Icon.png');
        this.game.load.tilemap('stage1', 'assets/Stage1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tileset.png');
        this.map = undefined;
        this.layer = undefined;
        this.game.global.factory.loadSprites();
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.initBackground();
        this.game.input.mouse.capture = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.drawUI();

        this.map = this.game.add.tilemap('stage1');
        this.map.addTilesetImage('tileset', 'tiles');
        this.layer = this.map.createLayer('Calque de Tile 1');

        this.layer.resizeWorld();

        this.map.setCollisionByExclusion([4, 5, 64, 65, 66, 67, 68, 69, 70, 71]);

        this.game.physics.p2.convertTilemap(this.map, this.layer);
        this.player.createPlayer();

        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.player.sprite.body.collideWorldBounds = true;
        this.player.sprite.body.x = 200;
        this.player.sprite.body.y = 200;
        let enemy = this.game.global.factory.spawn(this.game.global.factory.enemyType.SWORDMAN, {x: 170, y: 100});
        let enemy2 = this.game.global.factory.spawn(this.game.global.factory.enemyType.SWORDMAN, {x: 170, y: 300});
        console.log(this.game.global.life);
        this.game.global.life.create();
        this.game.global.life.start();
    }

    update() {
        this.player.checkMove(this.cursors);
        this.player.spell.checkCooldown();
        console.log(this.game.global.life.isAlive);
        if (this.player.isAlive === false || this.game.global.life.isAlive === false)
        {
            this.game.state.start('Gameover');
        }
        this.game.global.life.update();
    }

    initBackground() {
        this.game.stage.backgroundColor = '#000';
    }

    drawUI() {
        this.player.spell.drawOnUI(this.game);
    }

}

export default Stage1;