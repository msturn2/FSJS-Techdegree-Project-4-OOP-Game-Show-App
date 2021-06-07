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
            new Phrase("Just win Baby"),
            new Phrase("Democracy Dies in Darkness"),
            new Phrase("Think different"),
            new Phrase("Power corrupts"),
            new Phrase("You cant win them all"),
            new Phrase("Get out of life alive"),
            new Phrase("Waste not want not"),
            new Phrase("Just Do It"),
            new Phrase("The best or nothing"),
            new Phrase("It hurt because it mattered")
        ];
        
        return phrases;
    }


    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 
            this.phrases.length)];
    };
    
    
    /**
    * Begins game by selecting a random phrase and 
    * displaying it to user
    */
    startGame() {
        document.getElementById("overlay")
            .style.display = "none";
        const randPhrase = this.getRandomPhrase();
        randPhrase.addPhraseToDisplay();
        this.activePhrase = randPhrase;
        this.resetGame();
        
        const changeHearts = document.querySelectorAll(".tries");
        changeHearts.forEach(changeHeart => {
            changeHeart.firstElementChild.src = "images/beatingHeart.gif";
            changeHeart.firstElementChild.alt = 
                "Beating Heart from https://gifer.com/en/4ZOO";
        });
    }


    /**
    * Handles click and keyup events
    * @param {eventObject} e - event object passed
    * by event handler
    */
    handleInteraction(e) {
        const type = e.type;


        /**
        * Displays phrase tiles while disabling onscreen
        * keyboard
        * @param {HTMLButtonElement} element - DOM node
        */
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
        this.missed++;
        const life = document.querySelector(".tries");
        life.firstElementChild.src = "images/flamingSkull.png";
        life.firstElementChild.alt = 
            "Flaming Skull from https://www.clipartmax.com/so/flaming-skull-clipart/";
        life.setAttribute("class", "lost");

        if (this.missed === 5) this.gameOver(false);
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
            const script = document.createElement("script");
            script.setAttribute("src", "js/confetti.js");
            script.setAttribute("id", "confetti-remove");
            document.body.appendChild(script);
            overlayDiv.setAttribute("class", "win");
            messageElement.textContent = messageWon;
        } else {
            overlayDiv.setAttribute("class", "lose");
            messageElement.textContent = messageLost;
        }
    }


    /**
     * Removes dynamically added elements, classes,
     * ids and enables the onscreen keyboard allowing
     * the game to replay
     */
    resetGame() {
        const resetH1 = document.querySelector("h1");
        const resetHearts = document.querySelectorAll(".lost");
        const resetButtons = document.querySelectorAll("button[disabled]");
        const resetOverlay = document.getElementById("overlay");
        const resetScript = document.getElementById("confetti-remove");
        const resetCanvas = document.querySelector("canvas");

        if (resetCanvas) {
            resetScript.parentNode
            .removeChild(resetScript);
            resetCanvas.parentNode
            .removeChild(resetCanvas);
        }

        resetH1.textContent = "";
        resetOverlay.setAttribute("class", "start");
        
        resetButtons.forEach(button => {
            button.disabled = false;
            if (button.classList.contains("chosen") || 
                button.classList.contains("wrong")) 
                button.setAttribute("class", "key");
        });

        resetHearts.forEach(heart => {
            heart.setAttribute("class", "tries");
        });
    }
}