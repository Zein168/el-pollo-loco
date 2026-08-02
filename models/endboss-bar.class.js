/**
 * Represents the endboss health bar in the game.
 * Extends DrawableObject and displays the current health status of the endboss.
 */
class EndbossBar extends StatusBar  {
    /**
    * Creates the endboss health bar.
    * Loads the required images through the parent StatusBar class,
    * stores the endboss reference and initializes the bar position.
    *
    * @param {Endboss} endboss - The endboss instance linked to this health bar
    */
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

    /**
    * Updates the position of the health bar.
    * Keeps the bar attached above the endboss while it moves.
    */
    updatePosition() {
        this.x = this.endboss.x + 200;
        this.y = this.endboss.y + 70;
    }
}