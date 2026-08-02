/**
 * Represents a drawable object in the game.
 * Handles image loading, image caching, and rendering objects on the canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
    * Loads a single image and stores it in the image cache.
    *
    * @param {string} path - Path to the image file
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.imageCache[path] = this.img;
    }

    /**
     * Draws the current image of the object on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Loads multiple images and stores them in the image cache.
    * Used for animations where several image frames are needed.
    *
    * @param {string[]} arr - Array containing image paths
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        })
    }
}