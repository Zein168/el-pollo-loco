window.addEventListener("load", () => {


    const howToPlay = document.getElementById("howToPlay");

    document.getElementById("howToPlayBtn").addEventListener("click", () => {
        howToPlay.classList.remove("hidden");
    });

    document.getElementById("closeHowToPlay").addEventListener("click", () => {
        howToPlay.classList.add("hidden");
    });

});