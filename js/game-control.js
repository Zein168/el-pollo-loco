/**
 * Initializes all game-related buttons.
 * Handles restarting, returning home, and starting the game.
 */
function initGameButtons() {
    document.getElementById("restartBtn").addEventListener("click", () => {
        restartGame();
    });
    document.getElementById("restartBtn2").addEventListener("click", (e) => {
        e.target.blur();
        restartGame();
    });
    document.getElementById("homePage").addEventListener("click", () => {
        goToHome();
    });
    document.getElementById("startBtn").addEventListener("click", () => {
        startGame();
    });
}

/**
 * Starts the game.
 * Hides the intro screen, starts enemies,
 * starts background music and shows mobile controls.
 */
function startGame() {
    createNewWorld();
    world.character.gameStarted = true;
    document.body.classList.add("game-started");
    world.character.lastAction = Date.now();
    world.showIntro = false;
    world.startEnemies();
    if (world.musicOn) {
        world.backgroundSound.play();
    }
    document.getElementById("startBtn").style.display = "none";
    document.querySelector(".sound-bar").style.display = "flex";
    showMobileControls();
}

/**
 * Restarts the complete game.
 * Stops sounds, creates a new world,
 * resets states and updates the interface.
 */
function restartGame() {
    document.activeElement.blur();
    resetKeyboard();
    stopCurrentGameSounds();
    createNewWorld();
    resetGameState();
    startRestartedGame();
    resetGameUI();
}

/**
 * Creates a new game world with a fresh level.
 */
function createNewWorld() {
    if (world) {
        world.stopGame();
    }
    initLevel1();
    world = new World(canvas, keyboard);
}

/**
 * Resets all important game states
 * to their default values.
 */
function resetGameState() {
    world.character.gameStarted = true;
    world.winSoundPlayed = false;
    world.musicOn = settings.music;
    world.effectsOn = settings.effects;
    world.showIntro = false;
    world.gameWon = false;
    world.gameLost = false;
    world.character.energy = 100;
    world.character.isDead = false;
    world.character.lastHit = 0;
    world.character.speedY = 0;
    world.character.jumpKillDone = false;
}

/**
 * Starts a restarted game session.
 * Activates enemies and handles background music.
 */
function startRestartedGame() {
    world.character.gameStarted = true;
    world.startEnemies();
    if (world.musicOn) {
        world.backgroundSound.play();
    } else {
        world.backgroundSound.pause();
    }
}

/**
 * Resets the user interface after restarting the game.
 */
function resetGameUI() {
    updateSoundIcons();
    document.getElementById("restartBtn2").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    if (window.matchMedia("(pointer: coarse)").matches) {
        showMobileControls();
    }
}

/**
 * Stops all currently active game sounds.
 */
function stopCurrentGameSounds() {
    if (world) {
        world.winSound.pause();
        world.winSound.currentTime = 0;
        world.backgroundSound.pause();
        world.backgroundSound.currentTime = 0;
        world.character.deathSound.pause();
        world.character.deathSound.currentTime = 0;
        world.character.hurtSound.pause();
        world.character.hurtSound.currentTime = 0;
    }
}