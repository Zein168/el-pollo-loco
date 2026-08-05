/**
 * Represents the coin status bar in the game.
 * Extends StatusBar and displays the player's
 * current coin collection progress.
 */
class CoinBar extends StatusBar  {

     /**
     * Creates a new coin status bar with all coin
     * status images and initializes the percentage to 0.
     */
    constructor() {
        super([
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        ], 40, 50, 0);

    }

}