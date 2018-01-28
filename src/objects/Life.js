class Life {

    constructor(game, timelife) {
        this.game = game;
        this.x = 50;
        this.y = game.height - 420;
        this.maxWidth = 250;
        this.height = 50;
        this.sprite = undefined;
        this.time = undefined;
        this.timeLife = timelife;
        this.isAlive = true;
    }

    start() {
        this.time = Date.now();
    }

    create() {
        this.graphics = this.game.add.graphics(this.x, this.y);
        this.graphics.beginFill(0x40A472, 1);
        this.graphics.lineStyle(2, 0x40A472, 1);
        this.lifebar = this.graphics.drawRect(this.x, this.y, this.maxWidth, this.height);
        this.graphics.endFill();
    }

    update() {
        let elapse = Date.now() - this.time;
        let width = this.maxWidth * (1 - elapse / this.timeLife);
        if (width <= 0)
            this.isAlive = false;
        else
            this.lifebar.width = width;
    }

}

export default Life