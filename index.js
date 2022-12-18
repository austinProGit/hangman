document.addEventListener('DOMContentLoaded', () => {
    let drawGallows = () => {
      let canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(150, 50);
      ctx.lineTo(150, 250);
      ctx.moveTo(150,250);
      ctx.lineTo(100, 250);
      ctx.lineTo(200,250);
      ctx.moveTo(150,50);
      ctx.lineTo(250,50);
      ctx.moveTo(250,50);
      ctx.lineTo(250,80);
      ctx.closePath();
      ctx.stroke();
    }
    drawGallows();
  });

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let wordAndDashHandler = () => {
    const wordList = ['apple', 'banana', 'cherry'];
    let randWord = wordList[Math.floor(Math.random() * wordList.length)];
    const dashesDiv = document.getElementById('letter-dashes-container');
    dashesDiv.setAttribute('randWord', randWord);
    removeAllChildNodes(dashesDiv);
    for (let char in randWord) {
        const newDash = document.createElement('button');
        newDash.setAttribute("class", "dash");
        dashesDiv.appendChild(newDash);
    }
    return randWord;
}
const btn = document.getElementById('generate-word-btn').addEventListener('click', wordAndDashHandler);
const guessedLettersList = [];
let guessHandler = () => {
    const randWord = document.getElementById('letter-dashes-container').getAttribute('randWord');
    const guess = document.getElementById('guess').value;
    const guessedLettersListContainer = document.getElementById('guessed-letters-list');
    if (guess !== '') {
        if (!guessedLettersList.includes(guess)) {
            guessedLettersList.push(guess);
            guessedLettersList.sort();
            if (randWord.includes(guess)) {
                console.log(`The letter ${guess} is in ${randWord}`)
                let indices = [];
                for (let i = 0; i < randWord.length; i ++) {
                    if (randWord[i] === guess) {
                        indices.push(i);
                    }
                }
                const dashesDiv = document.getElementById('letter-dashes-container');
                let children = dashesDiv.childNodes;
                children.forEach((child, index) => {
                    if (indices.includes(index)) {
                      child.innerHTML = guess;
                    }
                  });
            } else {
                console.log(`The letter ${guess} is not in ${randWord}`)
            }
        }
        removeAllChildNodes(guessedLettersListContainer);
        for (let letter in guessedLettersList) {
            const newLetterListItem = document.createElement('li');
            const newLetterValue = document.createTextNode(guessedLettersList[letter]);
            newLetterListItem.setAttribute('class', 'guessed-letter');
            newLetterListItem.appendChild(newLetterValue);
            guessedLettersListContainer.appendChild(newLetterListItem);
        }
    }
}
const guess = document.getElementById('guess').addEventListener('input', guessHandler);
