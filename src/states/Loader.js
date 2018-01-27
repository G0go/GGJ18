<<<<<<< HEAD
import FullscreenManager from "../objects/FullscreenManager";
=======
import Phaser from 'phaser'
>>>>>>> de6ccc1141e082adf3a75d2525417762e143b578

class Loader extends Phaser.State {

    create() {
        this.initGlobalVariables();
        this.game.state.start('Menu');
    }

    initGlobalVariables() {
        this.game.global = {
            height: window.innerHeight,
            width: window.innerWidth,
            fullscreenManager: new FullscreenManager(this.game)
        };
    }

}

export default Loader;