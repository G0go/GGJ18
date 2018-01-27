class FullscreenManager {

    constructor(game) {
        this.game = game;
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