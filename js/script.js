window.addEventListener("load", () => {
    const howToPlay = document.getElementById("howToPlay");
    document.getElementById("howToPlayBtn").addEventListener("click", () => {
        howToPlay.classList.remove("hidden");
    });

    document.getElementById("closeHowToPlay").addEventListener("click", () => {
        howToPlay.classList.add("hidden");
    });

});

window.addEventListener("load", () => {
    const storyContainer = document.getElementById("storyContainer");
    document.getElementById("storyBtn").addEventListener("click", () => {
        storyContainer.classList.remove("hidden");
    });
    document.getElementById("closeStory").addEventListener("click", () => {
        storyContainer.classList.add("hidden");
    });
});

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

document.addEventListener("fullscreenchange", () => {
    const icon = document.getElementById("fullscreenIcon");
    const gameButtons = document.querySelector(".game-buttons");

    if (document.fullscreenElement) {
        icon.src = "img/fullscreen_exit.png";
        gameButtons.classList.add("hidden");
    } else {
        icon.src = "img/fullscreen.png";
        gameButtons.classList.remove("hidden");
    }
});

window.addEventListener("load", () => {

    const impressum = document.getElementById("impressumContainer");
    document.getElementById("impressumBtn").addEventListener("click", () => {
        impressum.classList.remove("hidden");
    });

    document.getElementById("closeImpressum").addEventListener("click", () => {
        impressum.classList.add("hidden");
    });

});