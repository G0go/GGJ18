import Loader from 'states/Loader';
import Menu from 'states/Menu';

class Game extends Phaser.Game {

	constructor() {
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
        this.initGameStates();
		this.state.start('Loader');
	}

    initGameStates() {
        this.state.add('Loader', Loader, false);
        this.state.add('Menu', Menu, false);
    }

}

new Game();