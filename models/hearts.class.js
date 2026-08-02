/**
 * Represents a collectible heart item in the game.
 * Handles its position, appearance, and collection availability.
 */
class Heart {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

/**
 * Creates a health item.
 * Sets its position, size, image and spawn state.
 * The item becomes collectible after a short delay.
 *
 * @param {number} x - Horizontal position of the health item
 * @param {number} y - Vertical position of the health item
 */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.img = new Image();
        this.img.src = "img/7_statusbars/3_icons/icon_health.png";
        this.spawnTime = Date.now();
        this.collectable = false;
    }

/**
 * Draws the health item on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

/**
 * Updates the collectible state of the health item.
 * Enables collection after the spawn delay has passed.
 */
    update() {
        if (Date.now() - this.spawnTime > 300) {
            this.collectable = true;
        }
    }
}