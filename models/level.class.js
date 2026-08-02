/**
 * Represents a game level.
 * Stores all objects and elements belonging to the level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 5200;
    coins;
    bottles;
    hearts;

    
    /**
     * Creates a game level with all required objects.
     *
     * @param {Enemy[]} enemies - Enemies placed in the level
     * @param {Cloud[]} clouds - Moving cloud objects
     * @param {DrawableObject[]} backgroundObjects - Background elements
     * @param {Coin[]} coins - Collectible coins
     * @param {Bottles[]} bottles - Collectible bottles
     * @param {Heart[]} hearts - Collectible health items
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, hearts) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.hearts = hearts;
    }
}