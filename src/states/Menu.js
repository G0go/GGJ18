class Menu extends Phaser.State {

	preload() {
		this.game.load.image('Menu_background', 'assets/Menu_background.jpg');
		this.game.load.image('Play_button', 'assets/play_button.png');
	}

	create() {
	    this.initBackground();
	    this.button = this.initButton();
	}

	initBackground() {
        let sprite = this.game.add.image(this.game.width / 2, this.game.height / 2, 'Menu_background');
        sprite.anchor.set(0.5, 0.5);
        sprite.width = this.game.width;
        sprite.height = this.game.height;
    }

    initButton() {
		let button = this.game.add.button(this.game.width / 2, this.game.height / 2, 'Play_button', this.OnClick, this);
		button.anchor.set(0.5, 1.4);
		button.onInputOver.add(this.Over, this);
		button.onInputOut.add(this.Out, this);

		return (button);
	}

	Out() {
		this.button.scale.setTo(1, 1);
	}

	Over() {
		this.button.scale.setTo(1.2, 1.2);
	}

    OnClick() {
        this.game.state.start('Stage1');
    }


}

export default Menu;