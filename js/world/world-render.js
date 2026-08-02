/**
 * Handles rendering of the game world.
 * Draws background, objects, status bars and game screens.
 */


/**
 * Draws the complete game scene.
 */
World.prototype.draw = function() {
    this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

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
    this.drawGameEnd();
    requestAnimationFrame(() => this.draw());
};

/**
 * Draws win and lose screens.
 */
World.prototype.drawGameEnd = function() {
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
};

/**
 * Adds multiple objects to the canvas.
 */
World.prototype.addObjectsToMap = function(objects) {
    objects.forEach(object => {
        this.addToMap(object);
    });
};

/**
 * Draws one object on the canvas.
 */
World.prototype.addToMap = function(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }
};

/**
 * Flips image direction.
 */
World.prototype.flipImage = function(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
};

/**
 * Resets image direction.
 */
World.prototype.flipImageBack = function(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();

};