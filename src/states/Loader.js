import FullscreenManager from "../objects/FullscreenManager";
import Phaser from 'phaser'
import PhaserNavmesh from "phaser-navmesh";
import EnemyFactory from "../objects/EnemyFactory";

class Loader extends Phaser.State {

    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.initGlobalVariables();
        this.game.state.start('Menu');
    }

    initGlobalVariables() {
        this.game.path = this.game.plugins.add(PhaserNavmesh);
        this.game.global = {
            height: window.innerHeight,
            width: window.innerWidth,
            fullscreenManager: new FullscreenManager(this.game),
            factory: new EnemyFactory(this.game)
        };
    }

}

export default Loader;