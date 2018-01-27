class FullscreenManager {

    constructor(game) {
        this.game = game;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    }

    Gofull() {
        if (!this.game.scale.isFullScreen)
            this.game.scale.startFullScreen(false);
    }

    init() {
        this.game.input.onDown.add(this.Gofull, this);
    }
}

export default FullscreenManager;