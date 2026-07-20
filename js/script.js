let settings = {
    music: true,
    effects: true
};

function toggleFullscreen() {
    const elem = document.getElementById("fullscreen");
    if (!document.fullscreenElement) {
        openFullscreen(elem);
    } else {
        closeFullscreen();
    }
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

window.addEventListener("load", () => {
    initHowToPlay();
    initStory();
    initFullscreen();
    initImpressum();
    initPrivacy();
    initGameButtons();
    initSoundButtons();
    initOutsideClickClose();
    initMobileControls();
});

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

function initGameButtons() {
    document.getElementById("restartBtn").addEventListener("click", () => {
        location.reload();
    });
    document.getElementById("restartBtn2").addEventListener("click", () => {
        restartGame();
    });
    document.getElementById("homePage").addEventListener("click", () => {
        location.reload();
    });
    document.getElementById("startBtn").addEventListener("click", () => {
        startGame();
    });
}

function startGame() {
    world.showIntro = false;
    world.startEnemies();
    if (world.musicOn) {
        world.backgroundSound.play();
    }
    document.getElementById("startBtn").style.display = "none";
    document.querySelector(".sound-bar").style.display = "flex";
    showMobileControls();
}

function restartGame() {
    if (world) {
        world.winSound.pause();
        world.winSound.currentTime = 0;
        world.backgroundSound.pause();
        world.backgroundSound.currentTime = 0;
    }
    initLevel1();
    world = new World(canvas, keyboard);
    world.winSoundPlayed = false;
    world.musicOn = settings.music;
    world.effectsOn = settings.effects;
    world.showIntro = false;
    world.gameWon = false;
    world.gameLost = false;
    world.character.deathSoundPlayed = false;
    world.character.hurtSoundPlayed = false;
    world.startEnemies();
    if (world.musicOn) {
        world.backgroundSound.play();
    } else {
        world.backgroundSound.pause();
    }
    updateSoundIcons();
    document.getElementById("restartBtn2").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    showMobileControls();
}

function initSoundButtons() {
    initRestartSoundButton();
    initMusicButton();
    initEffectsButton();
}

function initRestartSoundButton() {
    document.getElementById("restartIcon").addEventListener("click", () => {
        restartGame();
    });
}

function initMusicButton() {
    const musicIcon = document.getElementById("musicIcon");

    musicIcon.addEventListener("click", () => {
        settings.music = !settings.music;
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

function initEffectsButton() {
    const effectIcon = document.getElementById("effectIcon");

    effectIcon.addEventListener("click", () => {
        settings.effects = !settings.effects;
        world.effectsOn = settings.effects;

        if (world.effectsOn) {
            effectIcon.src = "img/music_note.svg";
        } else {
            effectIcon.src = "img/music_off.svg";
        }
    });
}


let autoScroll = null;

function openWithAnimation(element) {
    clearInterval(autoScroll);
    element.classList.remove("hidden");
    element.classList.remove("slide-out");
    element.classList.add("slide-in");
    element.scrollTop = 0;
    autoScroll = setInterval(() => {
        element.scrollTop += 1;
    }, 50);
}

function closeWithAnimation(element) {
    clearInterval(autoScroll);
    element.classList.remove("slide-in");
    element.classList.add("slide-out");
    setTimeout(() => {
        element.classList.add("hidden");
        element.classList.remove("slide-out");
    }, 500);
}

function closeAllMenus() {
    clearInterval(autoScroll);
    document.querySelectorAll(
        "#howToPlay, #storyContainer, #impressumContainer, #privacyContainer"
    ).forEach(menu => {
        menu.classList.add("hidden");
        menu.classList.remove("slide-in");
        menu.classList.remove("slide-out");
    });
}

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

function updateSoundIcons() {
    document.getElementById("musicIcon").src =
        settings.music ? "img/volume_up.svg" : "img/volume_off.svg";

    document.getElementById("effectIcon").src =
        settings.effects ? "img/music_note.svg" : "img/music_off.svg";
}

function showMobileControls() {
    document.getElementById("mobileControls").style.display = "flex";
}

function hideMobileControls() {
    document.getElementById("mobileControls").style.display = "none";
}

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