/**
 * Represents a throwable bottle object in the game.
 * Extends MovableObject and handles throwing movement,
 * gravity and rotation animation.
 */
class ThrowableObjects extends MovableObject {
    BOTTLES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    offset = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25
    };

      /**
     * Creates a throwable bottle.
     * Loads images, sets position, direction and starts
     * throwing and rotation animations.
     *
     * @param {number} x - Horizontal starting position
     * @param {number} y - Vertical starting position
     * @param {boolean} otherDirection - Defines throwing direction
     */
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.hasHit = false;
        this.loadImages(this.BOTTLES_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 80;
        this.otherDirection = otherDirection;
        this.throw();
        this.animate();
    }

    
    /**
     * Starts the throwing movement.
     * Applies gravity and moves the bottle horizontally
     * depending on the throwing direction.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 6.5;
            } else {
                this.x += 6.5;
            }
        }, 25);
    }

        /**
     * Starts the bottle rotation animation.
     * Changes the displayed image continuously.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLES_ROTATION);
        }, 100);
    }
}