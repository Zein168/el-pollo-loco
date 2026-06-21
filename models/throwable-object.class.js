class ThrowableObjects extends MovableObject {
    BOTTLES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLES_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 80;
        this.otherDirection = otherDirection;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLES_ROTATION);
        }, 100);
    }
}