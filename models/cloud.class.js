class Cloud extends MovableObject {

    y = 50;
    height = 200;
    width = 350;
    



    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = Math.random() * 500;
        this.animation();

    }

    animation() {
        this.moveLeft();
    }


}