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
}

function restartGame() {
    initLevel1();
    world = new World(canvas, keyboard);
    world.showIntro = false;
    world.startEnemies();
    document.getElementById("restartBtn2").style.display = "none";
    document.getElementById("homePage").style.display = "none";
}

function initSoundButtons() {
    document.getElementById("restartIcon").addEventListener("click", () => {
        restartGame();
    });
    document.getElementById("musicIcon").addEventListener("click", () => {
        world.musicOn = !world.musicOn;
        if (world.musicOn) {
            if (world.gameStarted) {
                world.backgroundSound.play();
            }
            document.getElementById("musicIcon").src = "img/volume_up.svg";
        } else {
            world.backgroundSound.pause();
            document.getElementById("musicIcon").src = "img/volume_off.svg";
        }
    });
    document.getElementById("effectIcon").addEventListener("click", () => {
        world.effectsOn = !world.effectsOn;

        if (world.effectsOn) {
            document.getElementById("effectIcon").src = "img/music_note.svg";
        } else {
            document.getElementById("effectIcon").src = "img/music_off.svg";
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