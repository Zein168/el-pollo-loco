class Bottles extends MovableObject {
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    constructor(x) {
        super();
        this.loadImages(this.IMAGES);
        let randomIndex = Math.floor(Math.random() * this.IMAGES.length);
        this.loadImage(this.IMAGES[randomIndex]);
        this.x = x;
        this.y = 340;
        this.width = 60;
        this.height = 80;
    }
}