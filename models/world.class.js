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
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    collectedCoins = 0;
    maxCoins = 5;
    collectedBottles = 0;
    bottleBar = new BottleBar();
    maxBottles = 5;
    bottlesLeft = 5;
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
    winSound = new Audio('audio/victory.mp3');
    winSoundPlayed = false;
    throwSound = new Audio('audio/bottle-throw.mp3');
    backgroundSound = new Audio('audio/background-music.mp3');
    coinSound = new Audio('audio/coin.mp3');
    dKeyPressed = false;
    musicOn = true;
    effectsOn = true;
    gameStarted = false;
    lastThrowTime = 0;
    throwCooldown = 500;
    coinBonus = 0;
    coinsSinceBonus = false;
    gameInterval;
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
        this.backgroundSound.loop = true;
        this.backgroundSound.volume = 0.3;
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                this.endbossBar = new EndbossBar(enemy);
            }

        });
    }

    startEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.animate();
        });
    }

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

    canThrowBottle() {
        console.log("BOTTLE THROW");
        return this.keyboard.D &&
            !this.dKeyPressed &&
            Date.now() - this.lastThrowTime >= this.throwCooldown &&
            (this.bottlesLeft > 0 || this.bonusBottles > 0);
    }

    throwBottle() {
        let bottle = new ThrowableObjects(
            this.character.x + 100,
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

    updateBottleCount() {
        if (this.bottlesLeft > 0) {
            this.bottlesLeft--;
        } else if (this.bonusBottles > 0) {
            this.bonusBottles--;
        }
        this.updateBottleBar();
    }

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

    isJumpingOnEnemy(enemy) {
        let characterFeet = this.character.y + this.character.height;
        let enemyHead = enemy.y;

        return (
            this.character.speedY < 0 &&
            characterFeet - enemyHead < 40 &&
            !this.character.jumpKillDone
        );
    }

    killEnemyByJump(enemy) {
        this.character.jumpKillDone = true;
        enemy.die();
        this.character.speedY = 15;
        this.level.hearts.push(new Heart(enemy.x, enemy.y));
    }

    characterHit() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    stopAllSounds() {
        this.backgroundSound.pause();
        this.backgroundSound.currentTime = 0;
        this.throwSound.pause();
        this.coinSound.pause();
        this.winSound.pause();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.showIntro) {
            this.ctx.drawImage(
                this.introImage,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            requestAnimationFrame(() => this.draw());
            return;
        }
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.drawBonusCoins();
        this.drawBonusBottles();
        this.ctx.translate(this.camera_x, 0);
        if (this.endbossBar) {
            this.endbossBar.updatePosition();
            this.addToMap(this.endbossBar);
        }
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.level.hearts.forEach(h => h.update());
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        if (this.gameWon) {
            this.ctx.drawImage(
                this.winImage,
                25,
                50,
                650,
                400
            );
            if (this === world) {
                document.getElementById("restartBtn2").style.display = "block";
                document.getElementById("homePage").style.display = "block";
            }
        }
        if (this.gameLost) {
            this.ctx.drawImage(
                this.loseImage,
                45,
                50,
                650,
                400
            );
            if (this === world) {
                document.getElementById("restartBtn2").style.display = "block";
                document.getElementById("homePage").style.display = "block";
            }
        }
        // draw is repeatedly called so that the movements become visible
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    checkCoinCollisions() {
        if (this.coinBonusActive) return;
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
    }

    collectCoin(index) {
        this.level.coins.splice(index, 1);
        this.collectedCoins++;
        this.playCoinSound();
        this.updateCoinBar();
        if (this.collectedCoins >= this.maxCoins) {
            if (!this.coinBonusStarted) {
                this.coinBonusStarted = true;
            }
            this.coinBonus++;
        }
    }

    drawBonusCoins() {
        if (this.coinBonus > 0) {
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "#A0220A";
            this.ctx.fillText(
                "+" + this.coinBonus,
                245,
                100
            );
        }
    }

    playCoinSound() {
        if (this.effectsOn) {
            this.coinSound.currentTime = 0;
            this.coinSound.play();
        }
    }

    updateCoinBar() {
        let percent = (this.collectedCoins / this.maxCoins) * 100;
        this.coinBar.setPercentage(percent);
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                if (this.bottlesLeft < this.maxBottles) {
                    this.bottlesLeft++;
                } else {
                    this.bonusBottles++;
                }
                this.updateBottleBar();
            }
        });
    }

    drawBonusBottles() {
        if (this.bonusBottles > 0) {
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "#A0220A";
            this.ctx.fillText(
                "+" + this.bonusBottles,
                245,
                160
            );
        }
    }

    updateBottleBar() {
        let percent = (this.bottlesLeft / this.maxBottles) * 100;
        this.bottleBar.setPercentage(percent);
    }

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

    handleBottleHit(bottle, enemy) {
        if (bottle.hasHit || enemy.isDead) return;
        bottle.hasHit = true;
        if (enemy instanceof Endboss) {
            this.hitEndboss(enemy);
        } else {
            this.hitEnemy(enemy);
        }
    }

    hitEndboss(enemy) {
        enemy.hit();
        this.endbossBar.setPercentage(enemy.energy);
        if (enemy.energy <= 0) {
            this.winGame();
        }
    }

    hitEnemy(enemy) {
        if (!enemy.isDead) {
            let newBottle = new Bottles(enemy.x);
            this.level.bottles.push(newBottle);
            enemy.die();
        }
    }

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