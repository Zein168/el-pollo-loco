class SmallChicken extends MovableObject {
    y = 370;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x;
        this.y = 370;
        this.speed = 0.15 + Math.random() * 0.5;
        this.isDead = false
        this.chickenSound = new Audio('audio/baby-chick.mp3');
        this.chickenSoundPlayed = false;
    }

    animate() {
        setInterval(() => {
            const distance = this.world.character.x - this.x;
            if (distance > 10) {
                this.otherDirection = true;
                this.moveRight();
            } else if (distance < -10) {
                this.otherDirection = false;
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.chickenSoundPlayed) {
                    if (this.world.effectsOn) {
                        this.chickenSound.currentTime = 0;
                        this.chickenSound.play();
                    }
                    this.chickenSoundPlayed = true;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}