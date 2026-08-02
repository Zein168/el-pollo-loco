/**
 * Represents a movable object in the game.
 * Extends DrawableObject and provides movement, gravity, collision, and animation features.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isDead = false;
    intervals = [];
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

/**
 * Applies gravity to the object.
 * Updates the vertical position and falling speed over time.
 */
    applyGravity() {
        this.intervals.push(setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25));
    }

/**
 * Checks if the object is above the ground.
 * Throwable objects are always considered above ground
 * because they follow their own movement behavior.
 *
 * @returns {boolean} True if the object is above ground
 */
    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true;
        } else {
            return this.y < 150
        }

    }

/**
 * Checks if this object is colliding with another object.
 *
 * @param {MovableObject} mo - Object to check collision against
 * @returns {boolean} True if both objects overlap
 */
    isColliding(mo) {
        return this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top;
    }

/**
 * Plays an animation sequence.
 * Resets the animation when a new image sequence starts.
 *
 * @param {string[]} images - Array containing animation image paths
 */
    playAnimation(images) {
        if (this.currentAnimation !== images) {
            this.currentImage = 0;
            this.currentAnimation = images;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

/**
 * Moves the object to the right.
 */
    moveRight() {
        this.x += this.speed;
    }

    
/**
 * Moves the object to the left.
*/
    moveLeft() {
        this.x -= this.speed;
    }

/**
 * Makes the object jump by applying upward speed.
 */
    jump() {
        this.speedY = 30;
    }

/**
 * Reduces the object's energy after receiving damage.
 * Includes a cooldown to prevent repeated hits.
 */
    hit() {
        if (Date.now() - this.lastHit < 1000) {
            return;
        }
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
        if (this.hurtSoundPlayed !== undefined) {
            this.hurtSoundPlayed = false;
        }
    }

    /**
 * Checks if the object is currently hurt.
 *
 * @returns {boolean} True while the hurt duration is active
 */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;
    }

/**
 * Handles the death state of an object.
 * Stops movement and moves the object away after a short delay.
 */
    die() {
        this.isDead = true;
        this.speed = 0;
        setTimeout(() => {
            this.y = 1000;
        }, 500);
    }

/**
 * Stops all active animations and intervals.
 */
    stopAnimation() {
        this.intervals.forEach(interval => clearInterval(interval));
    }

}