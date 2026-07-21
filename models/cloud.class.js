/**
 * Represents a cloud object in the game.
 * Extends MovableObject and handles the cloud movement.
 */
class Cloud extends MovableObject {
    y = 50;
    height = 200;
    width = 350;
    speed = 2;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = x;
        this.animation();

    }

 animation() {
        this.intervals.push(setInterval(() => {
            this.moveLeft();

            if (this.x < -this.width) {
                this.resetPosition();
            }

        }, 1000 / 60));
    }

    resetPosition() {
        this.x = 720 + Math.random() * 4000;
    }


}