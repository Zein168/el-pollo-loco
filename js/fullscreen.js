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
