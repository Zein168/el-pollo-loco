/**
 * Stores the current game settings.
 * Controls music and sound effects states.
 */
let settings = {
    music: JSON.parse(localStorage.getItem("music")) ?? true,
    effects: JSON.parse(localStorage.getItem("effects")) ?? true
};

/**
 * Toggles fullscreen mode.
 * Opens fullscreen if it is not active,
 * otherwise exits fullscreen.
 */
function toggleFullscreen() {
    const elem = document.getElementById("fullscreen");
    if (!document.fullscreenElement) {
        openFullscreen(elem);
    } else {
        closeFullscreen();
    }
}

/**
 * Opens fullscreen mode for the given element.
 *
 * @param {HTMLElement} elem - Element that should enter fullscreen mode
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

/**
 * Closes the currently active fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Initializes all game interface elements after the page has loaded.
 */
window.addEventListener("load", () => {
    initRotateButton();
    initHowToPlay();
    initStory();
    initFullscreen();
    initImpressum();
    initPrivacy();
    initGameButtons();
    initSoundButtons();
    initOutsideClickClose();
    initMobileControls();
    updateSoundIcons();
});

/**
 * Initializes the "How To Play" menu.
 */
function initHowToPlay() {
    const howToPlay = document.getElementById("howToPlay");
    document.getElementById("howToPlayBtn").addEventListener("click", () => {
        closeAllMenus();
        openWithAnimation(howToPlay);
    });
    document.getElementById("closeHowToPlay").addEventListener("click", () => {
        closeWithAnimation(howToPlay);
    });
}

/**
 * Initializes the story menu.
 */
function initStory() {
    const storyContainer = document.getElementById("storyContainer");
    document.getElementById("storyBtn").addEventListener("click", () => {
        closeAllMenus();
        openWithAnimation(storyContainer);
    });
    document.getElementById("closeStory").addEventListener("click", () => {
        closeWithAnimation(storyContainer);
    });
}

/**
 * Initializes fullscreen change handling.
 * Updates fullscreen icons and hides game buttons
 * depending on the current fullscreen state.
 */
function initFullscreen() {
    document.addEventListener("fullscreenchange", () => {
        const enterIcon = document.getElementById("fullscreenIcon");
        const exitIcon = document.getElementById("fullscreenIcon_exit");
        const gameButtons = document.querySelector(".game-buttons");
        if (document.fullscreenElement) {
            enterIcon.classList.add("hidden");
            exitIcon.classList.remove("hidden");
            gameButtons.classList.add("hidden");
        } else {
            enterIcon.classList.remove("hidden");
            exitIcon.classList.add("hidden");
            gameButtons.classList.remove("hidden");
        }
    });
}

/**
 * Initializes the impressum menu.
 */
function initImpressum() {
    const impressum = document.getElementById("impressumContainer");
    document.getElementById("impressumBtn").addEventListener("click", () => {
        closeAllMenus();
        openWithAnimation(impressum);
    });
    document.getElementById("closeImpressum").addEventListener("click", () => {
        closeWithAnimation(impressum);
    });
}

/**
 * Initializes the privacy information menu.
 */
function initPrivacy() {
    const privacy = document.getElementById("privacyContainer");
    document.getElementById("privacyBtn").addEventListener("click", () => {
        closeAllMenus();
        openWithAnimation(privacy);
    });
    document.getElementById("closePrivacy").addEventListener("click", () => {
        closeWithAnimation(privacy);
    });
}

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

function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
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
    world.character.deathSoundPlayed = false;
    world.character.hurtSoundPlayed = false;
    world.character.lastHit = 0;
    world.character.speedY = 0;
    world.character.jumpKillDone = false;
    world.character.deathSound.pause();
    world.character.deathSound.currentTime = 0;
    world.character.hurtSound.pause();
    world.character.hurtSound.currentTime = 0;
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
 * Initializes all sound-related buttons.
 */
function initSoundButtons() {
    initRestartSoundButton();
    initMusicButton();
    initEffectsButton();
}

/**
 * Initializes the restart sound button.
 */
function initRestartSoundButton() {
    document.getElementById("restartIcon").addEventListener("click", () => {
        restartGame();
    });
}

/**
 * Initializes the music toggle button.
 * Enables or disables background music.
 */
function initMusicButton() {
    const musicIcon = document.getElementById("musicIcon");
    musicIcon.addEventListener("click", () => {
        settings.music = !settings.music;
        localStorage.setItem("music", settings.music);
        world.musicOn = settings.music;
        if (world.musicOn) {
            world.backgroundSound.play();
            musicIcon.src = "img/volume_up.svg";
        } else {
            world.backgroundSound.pause();
            musicIcon.src = "img/volume_off.svg";
        }
    });
}

/**
 * Initializes the sound effects toggle button.
 * Enables or disables game effects.
 */
function initEffectsButton() {
    const effectIcon = document.getElementById("effectIcon");
    effectIcon.addEventListener("click", () => {
        settings.effects = !settings.effects;
        localStorage.setItem("effects", settings.effects);
        world.effectsOn = settings.effects;
        if (world.effectsOn) {
            effectIcon.src = "img/music_note.svg";
        } else {
            effectIcon.src = "img/music_off.svg";
        }
    });
}

/**
 * Stores the automatic scrolling interval.
 */
let autoScroll = null;
let autoScrollActive = false;
let userScrolling = false;

/**
 * Opens a menu element with a slide-in animation
 * and automatically scrolls its content.
 *
 * @param {HTMLElement} element - Menu element to open
 */
function openWithAnimation(element) {
    stopAutoScroll();
    element.classList.remove("hidden");
    element.classList.remove("slide-out");
    element.classList.add("slide-in");
    element.scrollTop = 0;
    initManualScrollControl(element);
    startAutoScroll(element);
}

/**
 * Starts automatic scrolling for a given element.
 * Uses requestAnimationFrame to smoothly move the scroll position.
 * Automatic scrolling pauses while the user is manually scrolling.
 *
 * @param {HTMLElement} element - Element that should be scrolled automatically
 */
function startAutoScroll(element) {
    autoScrollActive = true;
    function scrollStep() {
        if (!autoScrollActive) return;
        if (!userScrolling) {
            element.scrollTop += 0.5;
        }
        autoScroll = requestAnimationFrame(scrollStep);
    }
    autoScroll = requestAnimationFrame(scrollStep);
}

/**
 * Stops the automatic scrolling animation.
 * Cancels the current requestAnimationFrame loop
 * and resets the animation reference.
 */
function stopAutoScroll() {
    autoScrollActive = false;
    if (autoScroll) {
        cancelAnimationFrame(autoScroll);
        autoScroll = null;
    }
}

/**
 * Initializes manual scroll controls for an element.
 * Combines mouse and wheel scroll handling.
 *
 * @param {HTMLElement} element - Element that receives scroll controls
 */
function initManualScrollControl(element) {
    initMouseScrollControl(element);
    initWheelScrollControl(element);
}

/**
 * Initializes mouse-based scrolling behavior.
 * Stops automatic scrolling while the user interacts
 * and restarts it after releasing the mouse button.
 *
 * @param {HTMLElement} element - Element that receives mouse controls
 */
function initMouseScrollControl(element) {
    element.addEventListener("mousedown", () => {
        userScrolling = true;
        stopAutoScroll();
    });
    element.addEventListener("mouseup", () => {
        resumeAutoScroll(element, 1500);
    });
}

/**
 * Initializes wheel scrolling behavior.
 * Pauses automatic scrolling while the user scrolls manually.
 *
 * @param {HTMLElement} element - Element that receives wheel controls
 */
function initWheelScrollControl(element) {
    element.addEventListener("wheel", () => {
        userScrolling = true;
        stopAutoScroll();
        clearTimeout(element.scrollTimer);
        element.scrollTimer = setTimeout(() => {
            userScrolling = false;
            startAutoScroll(element);
        }, 500);
    });
}

/**
 * Restarts automatic scrolling after a delay.
 *
 * @param {HTMLElement} element - Element to scroll automatically
 * @param {number} delay - Delay before restarting auto scroll in milliseconds
 */
function resumeAutoScroll(element, delay) {
    setTimeout(() => {
        userScrolling = false;
        startAutoScroll(element);
    }, delay);
}

/**
 * Closes a menu element with a slide-out animation.
 *
 * @param {HTMLElement} element - Menu element to close
 */
function closeWithAnimation(element) {
    stopAutoScroll();
    element.classList.remove("slide-in");
    element.classList.add("slide-out");
    setTimeout(() => {
        element.classList.add("hidden");
        element.classList.remove("slide-out");
    }, 500);
}

/**
 * Closes all open menu elements.
 */
function closeAllMenus() {
    stopAutoScroll();
    document.querySelectorAll(
        "#howToPlay, #storyContainer, #impressumContainer, #privacyContainer"
    ).forEach(menu => {
        menu.classList.add("hidden");
        menu.classList.remove("slide-in");
        menu.classList.remove("slide-out");
    });
}

/**
 * Initializes closing menus when clicking outside.
 */
function initOutsideClickClose() {
    const menus = document.querySelectorAll(
        "#howToPlay, #storyContainer, #impressumContainer, #privacyContainer"
    );
    const buttons = document.querySelectorAll(
        "#howToPlayBtn, #storyBtn, #impressumBtn, #privacyBtn"
    );
    document.addEventListener("click", (event) => {
        const clickedButton = [...buttons].some(button =>
            button.contains(event.target)
        );
        if (clickedButton) return;
        menus.forEach(menu => {
            if (!menu.classList.contains("hidden") && !menu.contains(event.target)) {
                closeWithAnimation(menu);
            }
        });
    });
}

/**
 * Updates the displayed sound icons
 * according to the current settings.
 */
function updateSoundIcons() {
    document.getElementById("musicIcon").src =
        settings.music ? "img/volume_up.svg" : "img/volume_off.svg";

    document.getElementById("effectIcon").src =
        settings.effects ? "img/music_note.svg" : "img/music_off.svg";
}

/**
 * Hides the mobile control buttons.
 */
function hideMobileControls() {
    document.getElementById("mobileControls").classList.remove("active");
}

function showMobileControls() {
    const isTouchDevice =
        navigator.maxTouchPoints > 0 ||
        "ontouchstart" in window;
    const isSmallScreen = window.innerWidth <= 1024;
    if (isSmallScreen && isTouchDevice) {
        document.getElementById("mobileControls").classList.add("active");
    }
}


/**
 * Initializes touch controls for mobile devices.
 * Handles movement, jumping and throwing actions.
 */
function initMobileControls() {
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");
    const jumpBtn = document.getElementById("jumpBtn");
    const throwBtn = document.getElementById("throwBtn");
    leftBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    leftBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    rightBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    rightBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    jumpBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    jumpBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    throwBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    throwBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


/**
 * Returns to the home screen.
 * Stops the current game, resets game states,
 * and updates the interface visibility.
 */
function goToHome() {
    document.body.classList.remove("game-started");
    stopCurrentGameSounds();
    if (world) {
        world.stopGame();
        world.showIntro = true;
        world.gameWon = false;
        world.gameLost = false;
    }
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("restartBtn2").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("mobileControls").classList.remove("active");
    document.querySelector(".sound-bar").style.display = "flex";
}

function initRotateButton() {
    const rotateBtn = document.getElementById("rotateBtn");
    if (!isOrientationLockSupported()) {
        return;
    }
    let isLandscape = false;
    rotateBtn.addEventListener("click", async () => {
        await changeOrientation(isLandscape ? "portrait" : "landscape");
        isLandscape = !isLandscape;
    });
}

function isOrientationLockSupported() {
    return screen.orientation?.lock;
}

async function changeOrientation(mode) {
    try {
        await screen.orientation.lock(mode);
    } catch (error) {
        console.log("Orientation change failed");
    }
}

