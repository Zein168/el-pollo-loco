class Heart {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.img = new Image();
        this.img.src = "img/7_statusbars/3_icons/icon_health.png";

        this.spawnTime = Date.now();
        this.collectable = false;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    update() {
        if (Date.now() - this.spawnTime > 300) {
            this.collectable = true;
        }
    }
}