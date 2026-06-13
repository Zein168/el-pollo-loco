class SmallChicken extends MovableObject {

    constructor(x) {
        super();

        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = x;
        this.y = 340;     
        this.width = 60;
        this.height = 80;
    }
}