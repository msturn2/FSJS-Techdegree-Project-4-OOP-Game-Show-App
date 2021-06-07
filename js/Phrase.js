/**
 * Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js
 */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }


    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        const splitPhrases = this.phrase.split('');
        const ul = document.createElement("ul");
        const div = document.getElementById("phrase");

        splitPhrases.forEach(letter => {
            let li = document.createElement("li");
            li.textContent = letter;
        
            /^\s+|\s+$/g.test(letter) ? 
            li.setAttribute("class", "space") : 
            li.setAttribute("class", `hide letter ${letter}`);
        
            ul.appendChild(li);
        });

        div.innerHTML = "";
        div.appendChild(ul);
    }


    /**
    * Checks if passed letter is in phrase
    * @param    {string}    letter - Letter to check
    * @return   {boolean}   True - if letter is in string
    */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }


    /**
    * Displays passed letter on screen after a match is found
    * @param {string} letter - Letter to display
    */
    showMatchedLetter(letter) {
        const letters = document.querySelectorAll(".letter");
        
        letters.forEach((li) => {
            if (li.textContent === letter) 
                li.setAttribute("class", "show");
        });
    }
}