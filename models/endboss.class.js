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


    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 5000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world && this.world.character.x >= 4600) {
                this.isActivated = true;
            }
            if (this.isActivated && this.energy > 0) {
                if (this.world.character.x < this.x - 100) {
                    this.x -= this.speed;
                    this.otherDirection = false;
                }
                else if (this.world.character.x > this.x + 100) {
                    this.x += this.speed;
                    this.otherDirection = true;
                }

            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);

            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);

            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);

            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);

        setInterval(() => {
            if (this.isActivated) {
                this.attack();
            }
        }, 1000);
    }

    attack() {
        if (this.attackCooldown) {
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
        this.energy -= 20;
        this.isHurt = true;
        setTimeout(() => {
            this.isHurt = false;
        }, 500);

        if (this.energy <= 0) {
            this.isHurt = false;
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.energy = 0;
        this.playAnimation(this.IMAGES_DEAD);
    }

} 