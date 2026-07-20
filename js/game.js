/**
 * Stores the reference to the canvas element
 * where the game is rendered.
 */
let canvas;

/**
 * Contains the entire game world and manages
 * all game objects, logic, and processes.
 */
let world;

/**
 * Stores the current state of the keyboard controls.
 */
let keyboard = new Keyboard();

/**
 * Initializes the game.
 * Creates the canvas, loads the first level,
 * creates the game world, and activates mobile controls.
 */
function init() {
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
    world.showIntro = true;
    initMobileControls();
}

/**
 * Event listener for pressed keys.
 * Sets the corresponding control variables
 * in the Keyboard object to true.
 *
 * @param {KeyboardEvent} e - Triggered keyboard event
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


/**
 * Event listener for released keys.
 * Sets the corresponding control variables
 * in the Keyboard object back to false.
 *
 * @param {KeyboardEvent} e - Triggered keyboard event
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});