class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.img = new Image();
        this.img.src = "img/7_statusbars/3_icons/icon_health.png";
    }

    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}