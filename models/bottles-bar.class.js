class BottleBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 105;
        this.width = 200;
        this.height = 60;
        this.img = this.imageCache[this.IMAGES[0]];
    }
}