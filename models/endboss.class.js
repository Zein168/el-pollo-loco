/**
 * Represents the endboss enemy in the game.
 * Extends MovableObject and handles movement, attacks, animations, and health.
 */
class Endboss extends MovableObject {
    height = 500;
    width = 250;
    y = -50;
    energy = 100;
    isDead = false;
    isHurt = false;
    isAttacking = false;
    attackCooldown = false;
    speed = 1;
    isActivated = false;
    isAlert = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 5000;
        
    }

    animate() {
        this.startMovement();
        this.startAnimation();
        this.startAttack();
    }

    startMovement() {
        this.intervals.push(setInterval(() => {
            this.checkActivation();
            this.moveTowardsCharacter();
        }, 1000 / 60));;
    }

    checkActivation() {
        if (
            this.world &&
            this.world.character.x >= 4600 &&
            !this.isActivated
        ) {
            this.isActivated = true;
            this.isAlert = true;
            setTimeout(() => {
                this.isAlert = false;
            }, 1500);
        }
    }

    moveTowardsCharacter() {
        if (this.isActivated && !this.isAlert && this.energy > 0) {
            if (this.world.character.x < this.x - 20) {
                this.x -= this.speed;
                this.otherDirection = false;
            } else if (this.world.character.x > this.x + 150) {
                this.x += this.speed;
                this.otherDirection = true;
            }
        }
    }

    updateAnimation() {
        if (this.energy <= 0) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAlert) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    startAttack() {
        this.intervals.push(setInterval(() => {
            if (this.isActivated && !this.isAlert) {
                this.attack();
            }
        }, 1500));
    }

    startAnimation() {
        this.intervals.push(setInterval(() => {
            this.updateAnimation();
        }, 200));
    }

    attack() {
        if (this.attackCooldown || this.isAlert || this.energy <= 0) {
            return;
        }
        this.isAttacking = true;
        setTimeout(() => {
            if (this.world.character.isColliding(this)) {
                this.world.character.hit();
            }
            this.isAttacking = false;
            this.attackCooldown = true;
            setTimeout(() => {
                this.attackCooldown = false;
            }, 1000);
        }, 500);
    }

    hit() {
        if (this.isDead) return;
        this.energy -= 20;
        if (this.energy <= 0) {
            this.die();
            return;
        }
        this.isHurt = true;
        setTimeout(() => {
            this.isHurt = false;
        }, 500);
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.energy = 0;
        this.currentImage = 0;
    }
} 