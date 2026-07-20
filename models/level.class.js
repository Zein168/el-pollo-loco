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

    constructor(enemies, clouds, backgroundObjects, coins, bottles, hearts) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.hearts = hearts;
    }
}