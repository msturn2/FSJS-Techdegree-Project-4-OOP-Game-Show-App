/** 
 * Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js 
 */

let game;
const overlay = document.getElementById("overlay");


/** 
 * Listens for click on `#btn__reset` and calls 
 * startGame() on game object
 */
document.getElementById("btn__reset")
    .addEventListener("click", () => {
        game = new Game();
        game.startGame();
});


/** 
 * Listen for onscreen keyboard click
 */
document.addEventListener("click", (e) => {
    if (overlay.style.display === "none") {
        game.handleInteraction(e);
    }
});


/**
 * Listen for keyboard keyup
 */
document.addEventListener("keyup", (e) => {
    if (overlay.style.display === "none") {
        game.handleInteraction(e);
    }
});