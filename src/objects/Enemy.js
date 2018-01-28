class Enemy {

    constructor(sprite, spell, range) {
        this.sprite = sprite;
        this.spell = spell;
        this.range = range;
        this.triggered = false;
    }

}

export default Enemy;