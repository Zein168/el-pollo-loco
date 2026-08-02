/**
 * Represents the bottle status bar in the game.
 * Extends DrawableObject and displays the current
 * Updates the displayed image depending on the current percentage value.
 */
class BottleBar extends StatusBar {
    constructor() {
        super([
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        ], 40, 100, 0);

        this.setPercentage(0);
    }
} 