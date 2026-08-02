/**
 * Handles all collision checks between game objects.
 * Manages enemy hits, collectibles, and bottle collisions.
 */
class CollisionManager {

    constructor(world) {
        this.world = world;
    }

    /**
     * Runs all collision checks.
     */
    checkAll() {
        this.checkCollisions();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkHeartCollisions();
        this.checkBottleHitsEnemy();
    }

    /**
     * Checks collisions between the player and enemies.
     * Handles normal damage and jump attacks.
     */
    checkCollisions() {
        for (let enemy of this.world.level.enemies) {
            if (enemy.isDead) continue;
            if (!this.world.character.isColliding(enemy)) continue;

            if (this.isJumpingOnEnemy(enemy)) {
                this.killEnemyByJump(enemy);
                return;
            }

            this.characterHit();
            break;
        }
    }

    /**
     * Checks if the player is jumping on top of an enemy.
     *
     * @param {MovableObject} enemy - Enemy to check
     * @returns {boolean} True if enemy can be defeated by jumping
     */
    isJumpingOnEnemy(enemy) {
        let characterFeet = this.world.character.y + this.world.character.height;
        let enemyHead = enemy.y;

        return (
            this.world.character.speedY < 0 &&
            characterFeet - enemyHead < 40 &&
            !this.world.character.jumpKillDone
        );
    }

    /**
     * Defeats an enemy by jumping on it.
     * Creates a health item and bounces the player upwards.
     *
     * @param {MovableObject} enemy - Enemy that gets defeated
     */
    killEnemyByJump(enemy) {
        if (this.world.character.jumpKillDone) {
            return;
        }
        this.world.character.jumpKillDone = true;
        enemy.die();
        this.world.character.speedY = 15;
        this.world.level.hearts.push(
            new Heart(enemy.x, enemy.y)
        );
    }

    /**
     * Applies damage to the player and updates health bar.
     */
    characterHit() {
        this.world.character.hit();
        this.world.statusBar.setPercentage(
            this.world.character.energy
        );
    }

    /**
     * Checks collected coins.
     */
    checkCoinCollisions() {
        if (this.world.coinBonusActive) return;

        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
    }

    /**
     * Removes a collected coin and updates counter.
     *
     * @param {number} index - Coin index
     */
    collectCoin(index) {
        this.world.level.coins.splice(index, 1);
        this.world.collectedCoins++;
        this.world.playCoinSound();
        this.world.updateCoinBar();
    }

    /**
     * Checks collected bottles.
     */
    checkBottleCollisions() {
        this.world.level.bottles.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                this.world.level.bottles.splice(index, 1);
                this.world.bottlesLeft++;
                this.world.updateBottleBar();
            }
        });
    }

    /**
     * Checks collected health items.
     */
    checkHeartCollisions() {
        this.world.level.hearts.forEach((heart, index) => {
            if (
                heart.collectable &&
                this.world.character.isColliding(heart) &&
                this.world.character.energy < 100
            ) {
                this.world.level.hearts.splice(index, 1);
                this.world.character.energy += 20;
                this.world.character.energy =
                    Math.min(100, this.world.character.energy);

                this.world.statusBar.setPercentage(
                    this.world.character.energy
                );
            }
        });
    }

    /**
     * Checks bottle hits against enemies.
     */
    checkBottleHitsEnemy() {
        this.world.throwableObjects.forEach((bottle, index) => {
            if (bottle.hasHit) return;

            let hit = this.world.level.enemies.some(enemy => {
                if (bottle.isColliding(enemy)) {
                    this.handleBottleHit(bottle, enemy);
                    return true;
                }
                return false;
            });

            if (hit) {
                this.world.throwableObjects.splice(index, 1);
            }
        });
    }

    /**
     * Handles a successful bottle hit.
     *
     * @param {ThrowableObjects} bottle - Bottle object
     * @param {MovableObject} enemy - Hit enemy
     */
    handleBottleHit(bottle, enemy) {
        if (bottle.hasHit || enemy.isDead) return;

        bottle.hasHit = true;

        if (enemy instanceof Endboss) {
            this.hitEndboss(enemy);
        } else {
            this.hitEnemy(enemy);
        }
    }

    /**
     * Defeats a normal enemy after a bottle hit.
     *
     * @param {MovableObject} enemy - Enemy instance
     */
    hitEnemy(enemy) {
        if (!enemy.isDead) {
            this.world.level.bottles.push(
                new Bottles(enemy.x)
            );
            enemy.die();
        }
    }

    /**
     * Damages the endboss and updates boss health.
     *
     * @param {Endboss} enemy - Endboss instance
     */
    hitEndboss(enemy) {
        enemy.hit();
        this.world.endbossBar.setPercentage(enemy.energy);

        if (enemy.energy <= 0) {
            this.world.winGame();
        }
    }
}