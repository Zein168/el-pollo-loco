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
    musicOn = true;
    effectsOn = true;
    gameStarted = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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
        setInterval(() => {
            if (this.gameWon || this.gameLost) {
                return;
            }
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkHeartCollisions();
            this.checkBottleHitsEnemy();
            if (this.character.energy <= 0) {
                this.gameLost = true;
            }
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.dKeyPressed) {
            if (this.bottlesLeft <= 0) {
                return;
            }
            this.character.lastAction = Date.now();
            let bottle = new ThrowableObjects(
                this.character.x + 100,
                this.character.y + 100,
                this.character.otherDirection
            );
            this.throwableObjects.push(bottle);
            if (this.effectsOn) {
                if (this.effectsOn) {
                    this.throwSound.play();
                }
            }
            this.bottlesLeft--;
            this.bottleBar.setPercentage((this.bottlesLeft / 5) * 100);
            this.dKeyPressed = true;
        }
        if (!this.keyboard.D) {
            this.dKeyPressed = false;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    return;
                }
                if (
                    this.character.speedY < 0 &&
                    this.character.y + this.character.height - 10 < enemy.y + enemy.height
                ) {
                    enemy.die();
                    this.character.speedY = 10;
                    this.level.hearts.push(new Heart(enemy.x, enemy.y));
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
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
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        if (this.endbossBar) {
            this.endbossBar.updatePosition();
            this.addToMap(this.endbossBar);
        }
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.level.hearts.forEach(h => h.update());
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(- this.camera_x, 0);
        if (this.gameWon) {
            this.ctx.drawImage(
                this.winImage,
                5,
                105,
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
                5,
                80,
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
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (this.collectedCoins >= this.maxCoins) {
                    return;
                }
                this.level.coins.splice(index, 1);
                this.collectedCoins++;
                if (this.effectsOn) {
                    this.coinSound.currentTime = 0;
                    this.coinSound.play();
                }
                let percent = (this.collectedCoins / this.maxCoins) * 100;
                this.coinBar.setPercentage(percent);
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                if (this.bottlesLeft >= this.maxBottles) {
                    return;
                }
                this.level.bottles.splice(index, 1);
                if (this.bottlesLeft < this.maxBottles) {
                    this.bottlesLeft++;
                }
                let percent = (this.bottlesLeft / this.maxBottles) * 100;
                this.bottleBar.setPercentage(percent);
            }
        });
    }

    checkHeartCollisions() {
        this.level.hearts.forEach((heart, index) => {
            if (heart.collectable && this.character.isColliding(heart)) {
                this.level.hearts.splice(index, 1);
                this.character.energy += 20;
                this.character.energy = Math.min(100, this.character.energy);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkBottleHitsEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.endbossBar.setPercentage(enemy.energy);
                        if (enemy.energy <= 0) {
                            this.gameWon = true;
                            if (!this.winSoundPlayed) {
                                this.winSound.play();
                                this.winSoundPlayed = true;
                            }
                        }
                    } else {
                        let newBottle = new Bottles(enemy.x);
                        this.level.bottles.push(newBottle);
                        enemy.die();
                    }
                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }



}