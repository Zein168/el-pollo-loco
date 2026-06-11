class Bottles extends MovableObject {
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.x = x;
        this.y = 340;     
        this.width = 60;
        this.height = 80;
    }
}