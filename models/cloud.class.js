/**
 * Represents a cloud object in the game.
 * Extends MovableObject and handles the cloud movement.
 */
class Cloud extends MovableObject {
    y = 50;
    height = 200;
    width = 350;
    speed = 0.5;

    /**
     * Creates a cloud object.
     * Loads the cloud image, sets the starting position
     * and starts the automatic movement animation.
     *
     * @param {number} x - Horizontal starting position of the cloud
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = x;
        this.animation();
    }

     /**
     * Starts the cloud movement animation.
     * Moves the cloud continuously to the left and resets
     * its position when it leaves the visible game area.
     */
    animation() {
        this.intervals.push(setInterval(() => {
            this.moveLeft();
            if (this.x < -this.width) {
                this.resetPosition();
            }
        }, 1000 / 60));
    }

    /**
     * Resets the cloud to a new position on the right side
     * of the game world with a random offset.
     */
    resetPosition() {
        this.x = 720 + Math.random() * 4000;
    }

}