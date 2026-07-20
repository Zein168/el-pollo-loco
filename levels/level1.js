/**
 * Creates all coins for level 1.
 * Generates coins in rows and columns
 * and returns them as an array.
 *
 * @returns {Coin[]} Array containing all created coins
 */
function createCoins() {
    let coins = [];
    for (let x = 600; x <= 4800; x += 600) {
        for (let y = 100; y <= 250; y += 120) {
            coins.push(new Coin(x, y));
        }
    }
    return coins;
}

/**
 * Creates all bottles for level 1.
 * Places groups of bottles at predefined positions
 * and returns them as an array.
 *
 * @returns {Bottles[]} Array containing all created bottles
 */
function createBottles() {
    let bottles = [];
    for (let x = 800; x <= 4000; x += 1000) {
        bottles.push(new Bottles(x));
        bottles.push(new Bottles(x + 60));
        bottles.push(new Bottles(x + 120));
    }
    return bottles;
}
/**
 * Stores the first level configuration.
 * Contains enemies, clouds, background objects,
 * coins, bottles and other level elements.
 */
let level1;
/**
 * Initializes level 1.
 *
 * Creates the level with:
 * - Enemies
 * - Clouds
 * - Background layers
 * - Collectible coins
 * - Collectible bottles
 *
 * @returns {void}
 */
function initLevel1() {
    level1 = new Level(
        [
            new Chicken(900),
            new SmallChicken(600),
            new Chicken(1200),
            new SmallChicken(1110),
            new Chicken(1600),
            new SmallChicken(1430),
            new Chicken(2200),
            new SmallChicken(2120),
            new Chicken(2800),
            new SmallChicken(3280),
            new Chicken(4200),
            new SmallChicken(4260),
            new Chicken(4260),
            new SmallChicken(4250),
            new Chicken(4800),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719,),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719,),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8),
        ],

        [
            ...createCoins(),
        ],

        [
            ...createBottles(),
           
        ],

        [

        ],
    );
}