/**
 * Stores the current game settings.
 * Controls music and sound effects states.
 */
let settings = {
    music: JSON.parse(localStorage.getItem("music")) ?? true,
    effects: JSON.parse(localStorage.getItem("effects")) ?? true
};

/**
 * Updates the displayed sound icons
 * according to the current settings.
 */
function updateSoundIcons() {
    document.getElementById("musicIcon").src =
        settings.music ? "img/music_note.svg" : "img/music_off.svg";

    document.getElementById("effectIcon").src =
        settings.effects ? "img/volume_up.svg" : "img/volume_off.svg";
}