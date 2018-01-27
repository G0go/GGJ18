class Loader extends Phaser.State {

    create() {
        this.initGlobalVariables();
        this.game.state.start('Menu');
    }

    initGlobalVariables() {
        this.game.global = {
            height: window.innerHeight,
            width: window.innerWidth
        };
    }

}

export default Loader;