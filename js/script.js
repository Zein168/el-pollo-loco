
/**
 * Initializes all game interface elements after the page has loaded.
 */
window.addEventListener("load", () => {
    initMenuButton();
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

function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
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
            musicIcon.src = "img/music_note.svg";
        } else {
            world.backgroundSound.pause();
            musicIcon.src = "img/music_off.svg";
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
            effectIcon.src = "img/volume_up.svg";
        } else {
            effectIcon.src = "img/volume_off.svg";
        }
    });
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
        world.character.energy = 100;
        world.character.deathSoundPlayed = false;
    }
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("restartBtn2").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("mobileControls").classList.remove("active");
    document.querySelector(".sound-bar").style.display = "flex";
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

function checkOrientation() {
    const rotateMessage = document.getElementById("rotateMessage");
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
        rotateMessage.style.display = "none";
        return;
    }
    if (window.innerHeight > window.innerWidth) {
        rotateMessage.style.display = "flex";
    } else {
        rotateMessage.style.display = "none";
    }
}
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

function initMenuButton() {
    const menuButton = document.getElementById("menu");
    menuButton.addEventListener("click", () => {
        goToHome();
    });
}