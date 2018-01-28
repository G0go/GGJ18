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

        this.map.setCollisionByExclusion([4, 5, 6, 64, 65, 66, 67, 68, 69, 70, 71]);

        this.game.physics.p2.convertTilemap(this.map, this.layer);
        this.player.createPlayer();

        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.player.sprite.body.collideWorldBounds = true;
        this.player.sprite.body.x = 200;
        this.player.sprite.body.y = 200;
        let enemy = this.game.global.factory.spawn(this.game.global.factory.enemyType.SWORDMAN, {x: 170, y: 100});
        // const navMesh = this.game.path.buildMeshFromTiled(this.map, 'stage1');
        // const p1 = new Phaser.Point(200, 200);
        // const p2 = new Phaser.Point(200, 100);
        // navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
        // navMesh.debugClear(); // Clears the overlay
        // navMesh.debugDrawMesh({
        //     drawCentroid: true, drawBounds: false, drawNeighbors: true, drawPortals: true
        // });
        // const path = navMesh.findPath(p1, p2, {
        //     drawPolyPath: true, drawFinalPath: true
        // });
        // console.log(path);
    }

    update() {
        this.player.checkMove(this.cursors);
        this.player.spell.checkCooldown();
    }

    initBackground() {
        this.game.stage.backgroundColor = '#000';
    }

    drawUI() {
        this.player.spell.drawOnUI(this.game);
    }

}

export default Stage1;