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
        howToPlay.classList.remove("hidden");
    });
    document.getElementById("closeHowToPlay").addEventListener("click", () => {
        howToPlay.classList.add("hidden");
    });
}

function initStory() {
    const storyContainer = document.getElementById("storyContainer");
    document.getElementById("storyBtn").addEventListener("click", () => {
        storyContainer.classList.remove("hidden");
    });
    document.getElementById("closeStory").addEventListener("click", () => {
        storyContainer.classList.add("hidden");
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
        impressum.classList.remove("hidden");
    });
    document.getElementById("closeImpressum").addEventListener("click", () => {
        impressum.classList.add("hidden");
    });
}

function initPrivacy() {
    const privacy = document.getElementById("privacyContainer");
    document.getElementById("privacyBtn").addEventListener("click", () => {
        privacy.classList.remove("hidden");
    });
    document.getElementById("closePrivacy").addEventListener("click", () => {
        privacy.classList.add("hidden");
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