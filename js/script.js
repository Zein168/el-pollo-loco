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
    document.getElementById("story").addEventListener("click", () => {
        storyContainer.classList.remove("hidden");
    });
    document.getElementById("closeStory").addEventListener("click", () => {
        storyContainer.classList.add("hidden");
    });
});