import Menu from 'states/Menu';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add('Menu', Menu, false);
		this.state.start('Menu');
	}

}

new Game();