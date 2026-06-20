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
    endbossBar = new EndbossBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            enemy.animate();
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkHeartCollisions();
            this.checkBottleHitsEnemy();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.dKeyPressed) {

            if (this.bottlesLeft <= 0) {
                return;
            }
            let bottle = new ThrowableObjects(
                this.character.x + 100,
                this.character.y + 100
            );
            this.throwableObjects.push(bottle);
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
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.endbossBar);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.level.hearts.forEach(h => h.update());
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(- this.camera_x, 0);

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
                    } else {
                        enemy.die();
                    }
                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });
    }

}