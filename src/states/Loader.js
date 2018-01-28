import FullscreenManager from "../objects/FullscreenManager";
import Phaser from 'phaser'
import PhaserNavmesh from "phaser-navmesh";

class Loader extends Phaser.State {

    create() {
        this.initGlobalVariables();
        this.game.state.start('Menu');
    }

    initGlobalVariables() {
        this.game.path = this.game.plugins.add(PhaserNavmesh);
        this.game.global = {
            height: window.innerHeight,
            width: window.innerWidth,
            fullscreenManager: new FullscreenManager(this.game)
        };
    }

}

export default Loader;