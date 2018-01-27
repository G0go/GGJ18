class Menu extends Phaser.State {

	preload() {
		this.game.load.image('Menu_background', 'assets/Menu_background.jpg');
	}

	create() {
	    this.initBackground();
	}

	initBackground() {
        let sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'Menu_background');
        sprite.anchor.set(0.5, 0.5);
        sprite.width = this.game.width;
        sprite.height = this.game.height;
    }

}

export default Menu;