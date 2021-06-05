/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }


    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
    createPhrases() {
        const phrases = [
            new Phrase("Aspire to inspire before we expire"),
            new Phrase("Whatever you do do it well"),
            new Phrase("Tough times never last but tough people do"),
            new Phrase("I dont need it to be easy I need it to be worth it"),
            new Phrase("There is no substitute for hard work"),
            new Phrase("Try to get out of life alive"),
            new Phrase("The time is always right to do what is right"),
            new Phrase("Happiness depends on ourselves"),
            new Phrase("Turn your wounds into wisdom"),
            new Phrase("It hurt because it mattered")
        ];
        
        return phrases;
    }


    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const randomIndexNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndexNum];
    };
    
    
    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        document.getElementById("overlay").style.display = "none";
        const randPhrase = this.getRandomPhrase();
        randPhrase.addPhraseToDisplay();
        this.activePhrase = randPhrase;
        this.resetGame();
    }


    /**
    * Handles onscreen keyboard button clicks
    * @param {HTMLButtonElement} button - The clicked button element
    */
    handleInteraction(e) {
        const type = e.type;

        const either = (element) => {
            const letter = element.textContent;
            element.disabled = true;

            if (this.activePhrase.checkLetter(letter)) {
                element.setAttribute("class", "chosen");
                this.activePhrase.showMatchedLetter(letter);

                if (this.checkForWin()) {
                    this.gameOver(true);
                }
            } else {
                this.removeLife();
                element.setAttribute("class", "wrong");
            }
        }

        if (type === "click") {
            const clicked = document.querySelectorAll(".key");

            clicked.forEach((element) => {
                if (e.target === element) either(element);
            });
        }

        if (type === "keyup") {
            const keyed = document.querySelectorAll(".key");
            
            keyed.forEach((element) => {
                if (e.key === element.textContent && 
                    !element.disabled) either(element);
            });
        }
    }


    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const hide = document.querySelectorAll(".hide");
        return hide.length === 0;
    }


    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const life = document.querySelector(".tries");
            
        if (this.missed === 4) {
            this.gameOver(false);
        } else {
            this.missed++;
            life.firstElementChild.src = "images/lostHeart.png";
            life.setAttribute("class", "lost");
        }
    }


    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const messageWon = "Great Job!";
        const messageLost = "Sorry, better luck next time!";
        const overlayDiv = document.getElementById("overlay");
        const messageElement = document.querySelector("h1");
        overlayDiv.style.display = "";

        if (gameWon) { 
            overlayDiv.setAttribute("class", "win");
            messageElement.textContent = messageWon;
        } else {
            overlayDiv.setAttribute("class", "lose");
            messageElement.textContent = messageLost;
        }
    }


    resetGame() {
        const resetH1 = document.querySelector("h1");
        const resetHearts = document.querySelectorAll(".lost");
        const resetButtons = document.querySelectorAll("button[disabled]");
        const resetOverlay = document.getElementById("overlay");

        resetH1.textContent = "";
        resetOverlay.setAttribute("class", "start");
        
        resetButtons.forEach(button => {
            button.disabled = false;
            if (button.classList.contains("chosen") || button.classList.contains("wrong")) {
                button.setAttribute("class", "key");
            }
        });

        resetHearts.forEach(heart => {
            heart.setAttribute("class", "tries");
            heart.firstElementChild.src = "images/liveHeart.png";
        });
    }
}