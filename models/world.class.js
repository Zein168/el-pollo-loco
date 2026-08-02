/**
 * Represents the game world.
 * Manages game objects, player actions, collisions, rendering, sounds, and game states.
 */
class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new HealthBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    collectedCoins = 0;
    maxCoins = 5;
    collectedBottles = 0;
    bottleBar = new BottleBar();
    maxBottles = 5;
    bottlesLeft = 0;
    bonusBottles = 0;
    bottleBonusStarted = false;
    showBonusText = false;
    coinBonusActive = false;
    coinRewardGiven = false;
    endbossBar;
    gameWon = false;
    gameLost = false;
    introImage = new Image();
    showIntro = true;
    winSoundPlayed = false;
    dKeyPressed = false;
    musicOn = true;
    effectsOn = true;
    gameStarted = false;
    lastThrowTime = 0;
    throwCooldown = 500;
    coinBonus = 0;
    coinsSinceBonus = false;
    gameInterval;
    jumpKillCooldown = false;

    /**
     * Creates a new game world.
     *
     * @param {HTMLCanvasElement} canvas - Canvas element used for rendering
     * @param {Keyboard} keyboard - Keyboard input controller
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.musicOn = settings.music;
        this.effectsOn = settings.effects;
        this.winImage = new Image();
        this.winImage.src = 'img/You won, you lost/You won A.png';
        this.loseImage = new Image();
        this.loseImage.src = 'img/You won, you lost/Game Over.png';
        this.introImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
        this.initSounds();
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * Connects all game objects with the current world.
     * Assigns the world reference to the character and enemies.
     * Creates the endboss health bar if an endboss exists.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                this.endbossBar = new EndbossBar(enemy);
            }

        });
    }

    /**
     * Starts the animation loops of all enemies in the level.
     */
    startEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.animate();
        });
    }

    /**
 * Starts the main game loop.
 * Checks collisions, player actions, collectibles,
 * and handles game over conditions.
 */
    run() {
        this.gameInterval = setInterval(() => {
            if (this.gameWon || this.gameLost) {
                return;
            }
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkHeartCollisions();
            this.checkBottleHitsEnemy();
            if (this.character.energy <= 0 && !this.gameLost) {
                this.gameLost = true;
                hideMobileControls();
                this.character.playDeathSound();
                this.stopGame();
            }
        }, 30);
    }

    /**
     * Checks if the player can throw a bottle.
     * Handles keyboard input and throw cooldown.
     */
    checkThrowObjects() {
        if (this.keyboard.D && !this.dKeyPressed) {
            if (!this.canThrowBottle()) {
                return;
            }
            this.throwBottle();
            this.updateBottleCount();
            this.dKeyPressed = true;
        }
        if (!this.keyboard.D) {
            this.dKeyPressed = false;
        }
    }

    /**
 * Checks if the player is allowed to throw a bottle.
 * Verifies keyboard input, throw cooldown, and available bottles.
 *
 * @returns {boolean} True if a bottle can be thrown
 */
    canThrowBottle() {
        return this.keyboard.D &&
            !this.dKeyPressed &&
            Date.now() - this.lastThrowTime >= this.throwCooldown &&
            (this.bottlesLeft > 0 || this.bonusBottles > 0);
    }

    /**
     * Creates and throws a new bottle object.
     * Updates position, sound effects, and cooldown timer.
     */
    throwBottle() {
        let bottleX = this.character.otherDirection
            ? this.character.x - 50
            : this.character.x + 100;

        let bottle = new ThrowableObjects(
            bottleX,
            this.character.y + 100,
            this.character.otherDirection
        );
        this.throwableObjects.push(bottle);

        if (this.effectsOn) {
            this.throwSound.currentTime = 0;
            this.throwSound.play();
        }
        this.lastThrowTime = Date.now();
        this.character.lastAction = Date.now();
    }

    /**
 * Updates the amount of available bottles.
 * Removes bonus bottles first, then normal bottles.
 */
    updateBottleCount() {
        if (this.bonusBottles > 0) {
            this.bonusBottles--;
        } else if (this.bottlesLeft > 0) {
            this.bottlesLeft--;
        }
        this.updateBottleBar();
    }

    /**
 * Checks collisions between the player and enemies.
 * Handles normal damage and jump attacks.
 */
    checkCollisions() {
        for (let enemy of this.level.enemies) {
            if (enemy.isDead) continue;
            if (!this.character.isColliding(enemy)) continue;
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
 * @returns {boolean} True if the enemy can be defeated by jumping
 */
    isJumpingOnEnemy(enemy) {
        let characterFeet = this.character.y + this.character.height;
        let enemyHead = enemy.y;
        return (
            this.character.speedY < 0 &&
            characterFeet - enemyHead < 40 &&
            !this.character.jumpKillDone
        );
    }

    /**
 * Defeats an enemy by jumping on it.
 * Creates a heart reward and bounces the player upwards.
 *
 * @param {MovableObject} enemy - Enemy that gets defeated
 */
    killEnemyByJump(enemy) {
        if (this.character.jumpKillDone) {
            return;
        }
        this.character.jumpKillDone = true;
        enemy.die();
        this.character.speedY = 15;
        this.level.hearts.push(new Heart(enemy.x, enemy.y));

    }


    /**
     * Applies damage to the player and updates the health bar.
     */
    characterHit() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
 * Stops all active game sounds.
 */
    stopAllSounds() {
        this.backgroundSound.pause();
        this.backgroundSound.currentTime = 0;
        this.throwSound.pause();
        this.coinSound.pause();
        this.winSound.pause();
        this.throwSound.currentTime = 0;
        this.coinSound.currentTime = 0;
        this.winSound.currentTime = 0;
        this.character.deathSound.pause();
        this.character.deathSound.currentTime = 0;
        this.character.hurtSound.pause();
        this.character.hurtSound.currentTime = 0;
    }

    /**
     * Checks and handles collected coins.
     */
    checkCoinCollisions() {
        if (this.coinBonusActive) return;
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
    }

    /**
 * Removes a collected coin and updates the coin counter.
 *
 * @param {number} index - Index of the collected coin
 */
    collectCoin(index) {
        this.level.coins.splice(index, 1);
        this.collectedCoins++;
        this.playCoinSound();
        this.updateCoinBar();
    }

 /**
 * Draws the collected coin amount on the game screen.
 * Displays the counter only when at least one coin was collected.
 */
    drawBonusCoins() {
        if (this.collectedCoins === 0) {
            return;
        }
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "#A0220A";
        this.ctx.fillText(
            this.collectedCoins,
            245,
            100
        );

    }

 /**
 * Plays the coin collection sound effect.
 * Resets the audio position before playing.
 */
    playCoinSound() {
        if (this.effectsOn) {
            this.coinSound.currentTime = 0;
            this.coinSound.play();
        }
    }

     /**
     * Updates the displayed coin status bar.
     */
    updateCoinBar() {
        let percent = (this.collectedCoins / this.maxCoins) * 100;
        this.coinBar.setPercentage(percent);
    }

    /**
     * Checks and handles collected bottles.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottlesLeft++;
                this.updateBottleBar();
            }
        });
    }

    /**
 * Draws the available bottle amount on the game screen.
 * Displays the counter only when at least one bottle is available.
 */
    drawBonusBottles() {
        if (this.bottlesLeft === 0) {
            return;
        }
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "#A0220A";
        this.ctx.fillText(
            this.bottlesLeft,
            245,
            160
        );
    }

    /**
     * Updates the displayed bottle status bar.
     */
    updateBottleBar() {
        let percent = (this.bottlesLeft / this.maxBottles) * 100;
        this.bottleBar.setPercentage(percent);
    }

    
    /**
     * Checks if the player collects a health item.
     * Restores player energy and updates the health bar.
     */
    checkHeartCollisions() {
        this.level.hearts.forEach((heart, index) => {
            if (
                heart.collectable &&
                this.character.isColliding(heart) &&
                this.character.energy < 100
            ) {
                this.level.hearts.splice(index, 1);
                this.character.energy += 20;
                this.character.energy = Math.min(100, this.character.energy);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

     /**
     * Checks collisions between thrown bottles and enemies.
     */
    checkBottleHitsEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (bottle.hasHit) return;
            let hit = this.level.enemies.some(enemy => {
                if (bottle.isColliding(enemy)) {
                    this.handleBottleHit(bottle, enemy);
                    return true;
                }
                return false;
            });
            if (hit) {
                this.throwableObjects.splice(bottleIndex, 1);
            }
        });
    }

     /**
     * Handles a successful bottle hit.
     *
     * @param {ThrowableObjects} bottle - Bottle object hitting an enemy
     * @param {MovableObject} enemy - Enemy being hit
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
     * Damages the endboss and updates the boss health bar.
     *
     * @param {Endboss} enemy - Endboss instance
     */
    hitEndboss(enemy) {
        enemy.hit();
        this.endbossBar.setPercentage(enemy.energy);
        if (enemy.energy <= 0) {
            this.winGame();
        }
    }

    
    /**
     * Defeats a normal enemy after being hit by a bottle.
     *
     * @param {MovableObject} enemy - Enemy instance
     */
    hitEnemy(enemy) {
        if (!enemy.isDead) {
            let newBottle = new Bottles(enemy.x);
            this.level.bottles.push(newBottle);
            enemy.die();
        }
    }

     /**
     * Finishes the game successfully.
     * Stops sounds, animations, and displays the win screen.
     */
    winGame() {
        this.gameWon = true;
        hideMobileControls();
        this.stopAllSounds();
        this.character.stopAnimation();
        this.level.enemies.forEach(enemy => {
            enemy.stopAnimation();
        });
        if (!this.winSoundPlayed) {
            if (this.effectsOn) {
                this.winSound.play();
            }
            this.winSoundPlayed = true;
        }
    }

     /**
     * Stops the active game loop and animations.
     */
    stopGame() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        this.character.stopAnimation();
        this.level.enemies.forEach(enemy => {
            enemy.stopAnimation();
        });
        this.throwableObjects = [];
    }

}