class Spell {
    constructor(name, key, cooldown, effect) {
        this.name = name;
        this.cooldown = cooldown;
        this.effect = effect;
        this.lastCall = 0;
        this.key = key;
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
        let spellStyle = { font: "20px Arial", fill: "#fff", align: "center" };
        this.spellName = game.add.text(game.world.centerX, game.height - 70, this.name, spellStyle);
        this.spellName.anchor.set(0.5);
        let keyStyle = { font: "14px Arial", fill: "#fff", align: "center" };
        this.keyName = game.add.text(game.world.centerX, game.height - 50, this.key, keyStyle);
        this.keyName.anchor.set(0.5);
    }

    print() {
        this.dashicon.alpha = 1;
        this.spellName.alpha = 1;
        this.keyName.alpha = 1;
    }

    hide() {
        this.dashicon.alpha = 0;
        this.spellName.alpha = 0;
        this.keyName.alpha = 0;
    }

    destroy() {
        this.dashicon.destroy();
        this.spellName.destroy();
        this.keyName.destroy();
    }

}

export default Spell;