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
        const wordPhrases = this.phrase.split(" ")
        const ul = document.createElement("ul");
        const div = document.getElementById("phrase");

        for (let i = 0; i < wordPhrases.length; i++) {
            let span = document.createElement("span");
            span.setAttribute("class", "word");
            span.style.display = "inline-block";

            wordPhrases[i].split("").forEach(letter => {
                let li = document.createElement("li");
                li.textContent = letter;
                li.setAttribute("class", `hide letter ${letter}`);

                span.appendChild(li);
            });

            if (i < wordPhrases.length - 1) {
                let space = `<li class="space"> </li>`;
                ul.appendChild(span)
                    .insertAdjacentHTML("afterEnd", space);
            } else {
                ul.appendChild(span);
            }
        };

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