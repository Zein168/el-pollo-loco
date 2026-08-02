/**
 * Represents the player's health status bar in the game.
 * Extends DrawableObject and displays the current health percentage.
 */
class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percentage = 100;

/**
 * Creates a status bar.
 * Loads the provided images and initializes position,
 * size and starting percentage value.
 *
 * @param {string[]} images - Array containing status bar image paths
 * @param {number} x - Horizontal position of the status bar
 * @param {number} y - Vertical position of the status bar
 * @param {number} percentage - Initial status percentage value
 */
    constructor(images, x, y, percentage) {
        super();
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage);
    }

/**
 * Updates the displayed status bar image according to the percentage.
 *
 * @param {number} percentage - Current status value
 */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

/**
 * Determines the correct image index based on the current percentage.
 *
 * @returns {number} Index of the matching status bar image
 */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}