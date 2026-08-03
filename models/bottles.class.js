/**
 * Represents a bottle object in the game.
 * Extends MovableObject and displays collectible bottles on the ground.
 */
class Bottles extends MovableObject {
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a collectible bottle at the given x-position.
     *
     * @param {number} x - The horizontal position of the bottle.
     */
    constructor(x) {
        super();
        this.loadImages(this.IMAGES);
        let randomIndex = Math.floor(Math.random() * this.IMAGES.length);
        this.loadImage(this.IMAGES[randomIndex]);
        this.x = x;
        this.y = 340;
        this.width = 60;
        this.height = 80;
    }
}