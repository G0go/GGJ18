import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
        this.initGameStates();
		this.state.start('GameState');
	}

    initGameStates() {
        this.state.add('GameState', GameState, false);
    }

}

new Game();
