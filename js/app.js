/** 
 * Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js 
 */

let game;


/** 
 * Listens for click on `#btn__reset` and calls startGame() on game object
 */
document.getElementById("btn__reset").addEventListener("click", () => {
    game = new Game();
    game.startGame();
});


/** 
 * Listen for onscreen keyboard click
 */
// document.querySelectorAll(".key").forEach(li => { 
//     li.addEventListener("click", (e) => {
//         game.handleInteraction(e);
//     });
// });


document.addEventListener("click", (e) => {
    game.handleInteraction(e);
});


/**
 * Listen for keyboard keyup
 */
document.addEventListener("keyup", (e) => {
    game.handleInteraction(e);
});