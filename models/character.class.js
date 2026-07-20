/**
 * Represents the player character in the game.
 * Extends MovableObject and handles movement, animations, sounds, and actions.
 */
class Character extends MovableObject {
    height = 280;
    offset = {
        top: 60,
        bottom: 10,
        left: 35,
        right: 35
    };
    y = 70;
    speed = 10;
    lastAction = Date.now();
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    
    /**
 * Creates a new character instance.
 * Loads all character animations, initializes sounds,
 * applies gravity, and starts the animation loop.
 */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.jumpSound = new Audio('audio/jump-sound.mp3');
        this.deathSound = new Audio('audio/gameover.mp3');
        this.deathSoundPlayed = false;
        this.hurtSound = new Audio('audio/hurt.mp3');
        this.hurtSoundPlayed = false;
        this.applyGravity();
        this.animate();
    }

    /**
 * Starts the character animation loops.
 * Updates movement, camera position, and animations.
 */
    animate() {
        this.intervals.push(setInterval(() => {
            this.checkMovement();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60));

        this.intervals.push(setInterval(() => {
            this.checkAnimation();
        }, 100));
    }

    /**
  * Checks player input and handles movement actions.
  * Controls walking direction and jumping.
  */
    checkMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastAction = Date.now();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastAction = Date.now();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastAction = Date.now();
        }
    }

    /**
 * Controls the character animation depending on the current state.
 * Handles death, damage, movement, jumping, and idle animations.
 */
    checkAnimation() {
        if (this.energy <= 0) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else {
            this.playNormalAnimation();
        }
    }

    /**
    * Plays the death animation and triggers the death sound.
    */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.playDeathSound();
    }

    /**
     * Plays the hurt animation and triggers the hurt sound.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound();
    }

    /**
  * Controls normal character animations.
  * Switches between walking, jumping, idle, and long idle states.
  */
    playNormalAnimation() {
        this.hurtSoundPlayed = false;

        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isLongIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Plays the death sound once if sound effects are enabled.
     */
    playDeathSound() {
        if (!this.deathSoundPlayed && this.world.effectsOn) {
            this.deathSound.currentTime = 0;
            this.deathSound.play();
            this.deathSoundPlayed = true;
        }
    }

    /**
     * Plays the hurt sound once if sound effects are enabled.
     */
    playHurtSound() {
        if (!this.hurtSoundPlayed && this.world.effectsOn) {
            this.hurtSound.currentTime = 0;
            this.hurtSound.play();
            this.hurtSoundPlayed = true;
            setTimeout(() => {
                this.hurtSound.pause();
                this.hurtSound.currentTime = 0;
            }, 500);
        }
    }

    /**
 * Makes the character jump and plays the jump sound.
 */
    jump() {
        this.speedY = 30;
        this.jumpSound.currentTime = 0;
        if (this.world.effectsOn) {
            this.jumpSound.play();
        }
    }

    /**
* Checks whether the character has been idle for a long time.
*
* @returns {boolean} True if the character is long idle
*/
    isLongIdle() {
        return Date.now() - this.lastAction > 5000;
    }
}