class Spell {
    constructor(name, cooldown, effect) {
        this.name = name;
        this.cooldown = cooldown;
        this.effect = effect;
        this.lastCall = 0;
    }

    isReady() {
        return (Date.now() - this.lastCall) > this.cooldown;
    }

    use() {
        this.lastCall = Date.now();
    }

    checkCooldown() {
        let time = Date.now() - this.lastCall;
        if (time < this.cooldown)
            this.dashicon.alpha = time / this.cooldown;
    }

    drawOnUI(game) {
        this.dashicon = game.add.sprite((game.width) / 2, game.height - 100, this.name + 'icon');
        this.dashicon.anchor.set(0.5);
        let style = { font: "20px Arial", fill: "#000", align: "center" };
        this.txt = game.add.text(game.world.centerX, game.height - 50, this.name, style);
        this.txt.anchor.set(0.5);
    }

    print() {
        this.dashicon.alpha = 1;
        this.txt.alpha = 1;
    }

    hide() {
        this.dashicon.alpha = 0;
        this.txt.alpha = 0;
    }

    destroy() {
        this.dashicon.destroy();
        this.txt.destroy();
    }

}

export default Spell;