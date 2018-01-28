class Life {

    constructor(game, timelife) {
        this.game = game;
        this.x = 50;
        this.y = game.height - 50;
        this.maxWidth = 250;
        this.height = 50;
        this.sprite = undefined;
        this.time = undefined;
        this.timeLife = timelife;
        this.isAlive = true;
        this.graphics = this.game.add.graphics(this.x, this.y);
    }

    start() {
        this.time = Date.now();
    }

    create() {
        this.graphics.lineStyle(2, 0x40A472, 200);
        this.graphics.drawRect(this.x, this.y, this.maxWidth, this.height);
    }

    update() {
        /*let elapse = Date.now() - this.time;
        this.graphics. = this.maxWidth * (1 - elapse / this.time);
        if (this.graphics.width == 0)
            this.isAlive = false;*/
    }

}

export default Life