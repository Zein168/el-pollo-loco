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
    throwCooldown = 1500;
    coinBonus = 0;
    coinsSinceBonus = false;
    gameInterval;
    jumpKillCooldown = false;
    collisionManager;

    /**
   * Creates a new game world.
   *
   * Initializes the canvas context, keyboard controls,
   * game settings, collision management, game state images,
   * sounds, and starts the game loop.
   *
   * @param {HTMLCanvasElement} canvas - Canvas element used for rendering the game.
   * @param {Keyboard} keyboard - Keyboard input controller for player actions.
   */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.musicOn = settings.music;
        this.effectsOn = settings.effects;
        this.collisionManager = new CollisionManager(this);
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
            this.collisionManager.checkAll();
            this.checkThrowObjects();

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