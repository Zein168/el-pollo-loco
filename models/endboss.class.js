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
    speed = 5;
    isActivated = false;
    isAlert = false;
    isBackingOff = false;
    attackCount = 0;

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


    /**
     * Creates the endboss enemy.
     * Loads all required animation images and sets the initial position.
     */
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

    /**
     * Starts all endboss systems.
     * Activates movement, animations and attack behavior.
     */
    animate() {
        this.startMovement();
        this.startAnimation();
        this.startAttack();
    }

    /**
     * Starts the movement loop.
     * Checks activation state and moves the endboss towards the character.
     */
    startMovement() {
        this.intervals.push(setInterval(() => {
            this.checkActivation();
            this.moveTowardsCharacter();
        }, 1000 / 60));;
    }

    /**
     * Activates the endboss when the character reaches the boss area.
     * Starts the alert animation before normal behavior begins.
     */
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

    /**
  * Moves the endboss towards the character.
  * Movement is disabled during alert state or after death.
  * If the endboss recently hit the character, it performs a back step.
  */
    moveTowardsCharacter() {
        if (!this.isActivated || this.isAlert || this.energy <= 0) {
            return;
        }

        if (this.isBackingOff) {
            this.x += this.speed * 2;
            return;
        }

        if (this.world.character.x < this.x - 20) {
            this.x -= this.speed;
            this.otherDirection = false;

        } else if (this.world.character.x > this.x + 150) {
            this.x += this.speed;
            this.otherDirection = true;
        }
    }

    /**
     * Selects the correct animation depending on the current state.
     * Handles death, hurt, attack, alert and walking animations.
     */
    updateAnimation() {
        if (this.energy <= 0) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.isAlert) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Starts the attack timer.
     * The endboss can attack regularly after activation.
     */
    startAttack() {
        this.intervals.push(setInterval(() => {
            if (this.isActivated && !this.isAlert) {
                this.attack();
            }
        }, 1500));
    }

    /**
 * Starts the animation update loop.
 */
    startAnimation() {
        this.intervals.push(setInterval(() => {
            this.updateAnimation();
        }, 200));
    }

    /**
     * Performs an attack against the character.
     * Starts the attack animation and checks for a successful hit.
     */
    attack() {
        if (this.attackCooldown || this.isAlert || this.energy <= 0) {
            return;
        }
        this.startAttackAnimation();
        setTimeout(() => {
            let hasHitPepe = this.checkAttackHit();
            setTimeout(() => {
                this.endAttack(hasHitPepe);
            }, 400);
        }, 500);
    }


    /**
     * Starts the attack animation and cooldown.
     */
    startAttackAnimation() {
        this.attackCooldown = true;
        this.isAttacking = true;
        this.currentAnimation = null;
        this.currentImage = 0;
    }

    /**
     * Checks if the attack hits the character.
     */
    checkAttackHit() {
        let distance = Math.abs(this.world.character.x - this.x);
        if (distance < 180) {
            this.world.character.hit();
            return true;
        }
        return false;
    }

    /**
     * Ends the attack and triggers the back step after a hit.
     */
    endAttack(hasHitPepe) {
        this.isAttacking = false;
        if (hasHitPepe) {
            this.backStep();
        }
        setTimeout(() => {
            this.attackCooldown = false;
        }, 600);
    }

    /**
     * Reduces the endboss health when hit.
     * Triggers hurt animation or death when health reaches zero.
     */
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

    /**
     * Handles the death state of the endboss.
     * Stops further actions and resets the animation frame.
     */
    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.energy = 0;
        this.currentAnimation = null;
        this.currentImage = 0;
    }

    /**
     * Performs a short backward step after a successful attack.
     * Temporarily enables the back movement state.
     */
    backStep() {
        this.isBackingOff = true;
        setTimeout(() => {
            this.isBackingOff = false;
        }, 300);
    }
} 