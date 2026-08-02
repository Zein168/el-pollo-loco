/**
 * Represents the endboss health bar in the game.
 * Extends DrawableObject and displays the current health status of the endboss.
 */
class EndbossBar extends StatusBar  {
    constructor(endboss) {
        super([
            'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
        ], 0, 0, 100);

        this.endboss = endboss;
        this.width = 200;
        this.height = 70;
        this.updatePosition();
    }

    updatePosition() {
        this.x = this.endboss.x + 200;
        this.y = this.endboss.y + 70;
    }
}