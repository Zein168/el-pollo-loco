/**
 * Initializes and manages all game sounds.
 */
World.prototype.initSounds = function() {
    this.winSound = new Audio('audio/victory.mp3');
    this.throwSound = new Audio('audio/bottle-throw.mp3');
    this.backgroundSound = new Audio('audio/background-music.mp3');
    this.coinSound = new Audio('audio/coin.mp3');
    this.backgroundSound.loop = true;
    this.backgroundSound.volume = 0.3;
};


/**
 * Stops all active game sounds.
 */
World.prototype.stopAllSounds = function() {
    this.backgroundSound.pause();
    this.throwSound.pause();
    this.coinSound.pause();
    this.winSound.pause();
    this.backgroundSound.currentTime = 0;
    this.throwSound.currentTime = 0;
    this.coinSound.currentTime = 0;
    this.winSound.currentTime = 0;
    this.character.deathSound.pause();
    this.character.hurtSound.pause();
    this.character.deathSound.currentTime = 0;
    this.character.hurtSound.currentTime = 0;
};


/**
 * Plays coin collection sound.
 */
World.prototype.playCoinSound = function() {
    if (this.effectsOn) {
        this.coinSound.currentTime = 0;
        this.coinSound.play();
    }
};