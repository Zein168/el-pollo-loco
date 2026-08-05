/**
 * Represents a collectible coin in the game.
 * Extends MovableObject and can be collected by the player.
 */
class Coin extends MovableObject {
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };

    /**
 * Creates a collectible coin at the given position.
 *
 * @param {number} x - The horizontal position of the coin.
 * @param {number} y - The vertical position of the coin.
 */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
    }
}