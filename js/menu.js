
/**
 * Stores the automatic scrolling interval.
 */
let autoScroll = null;
let autoScrollActive = false;
let userScrolling = false;

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