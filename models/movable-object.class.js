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
        top: 20,
        bottom: 10,
        left: 20,
        right: 20
    };


    applyGravity() {
        this.intervals.push(setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25));
    }

    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true;
        } else {
            return this.y < 150
        }

    }

    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right > mo.x &&
            this.y + this.offset.top + this.height - this.offset.bottom > mo.y &&
            this.x + this.offset.left < mo.x + mo.width &&
            this.y + this.offset.top < mo.y + mo.height;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            if (this instanceof Character) {
                this.hurtSoundPlayed = false;
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.5;
    }



    die() {
        this.isDead = true;
        this.speed = 0;
        setTimeout(() => {
            this.y = 1000;
        }, 500);
    }

}