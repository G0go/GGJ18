import Phaser from 'phaser'
import Loader from 'states/Loader';
import Menu from 'states/Menu';
import Stage1 from 'states/Stage1';

class Game extends Phaser.Game {

	constructor() {
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', {
            init: () => {
                this.AStar = this.game.plugins.add(Phaser.Plugin.AStar);
                this.CPU = this.game.plugins.add(Phaser.Plugin.SaveCPU);
            }
        });
        this.initGameStates();
		this.state.start('Loader');
	}

    initGameStates() {
        this.state.add('Loader', Loader, false);
        this.state.add('Menu', Menu, false);
        this.state.add('Stage1', Stage1, false);
    }

}

new Game();
