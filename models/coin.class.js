class Coin extends DrawableObject {

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');

        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 80;
    }
}