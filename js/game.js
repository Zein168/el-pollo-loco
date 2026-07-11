let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log("my Character is", world.character);
}

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

    console.log(e);
});

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

    console.log(e);
});

window.addEventListener("load", () => {

    document.getElementById("restartBtn").addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("restartBtn2").addEventListener("click", () => {
        world = new World(canvas, keyboard);
        world.showIntro = false;
        document.getElementById("restartBtn2").style.display = "none";
        document.getElementById("homePage").style.display = "none";
    });

    document.getElementById("homePage").addEventListener("click", () => {
        console.log("homePage");
        location.reload();
        document.getElementById("homePage").style.display = "none";
    });
    document.getElementById("startBtn").addEventListener("click", () => {
        world.showIntro = false;
        world.backgroundSound.play();
        document.getElementById("startBtn").style.display = "none";
    });

});

