const guessedLettersList = [];
const badGuessesList = [];
const category = null;
let drawGallows = () => {
    let canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
    ctx.lineWidth = 10;

    let drawBaseGallows = () => {
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
    let drawHead = () => {
        ctx.beginPath();
        ctx.arc(250, 100, 18, 0, 2 * Math.PI);
        ctx.stroke();
    }

    let drawTorso = () => {
        ctx.beginPath();
        ctx.moveTo(250, 115);
        ctx.lineTo(250, 180); 
        ctx.closePath();
        ctx.stroke();
    }

    let drawRightArm = () => {
        ctx.beginPath();
        ctx.moveTo(250, 160);
        ctx.lineTo(220, 130);
        ctx.closePath();
        ctx.stroke();
    }

    let drawLeftArm = () => {
        ctx.beginPath();
        ctx.moveTo(250, 160);
        ctx.lineTo(280, 130);
        ctx.closePath();
        ctx.stroke();
    }

    let drawLeftLeg = () => {
        ctx.beginPath();
        ctx.moveTo(250, 175);
        ctx.lineTo(220, 210);
        ctx.closePath();
        ctx.stroke();
    }

    let drawRightLeg = () => {
        ctx.beginPath();
        ctx.moveTo(250, 175);
        ctx.lineTo(280, 210);
        ctx.closePath();
        ctx.stroke();
    }

    drawBaseGallows();

    if (badGuessesList.length > 0) {
        drawHead();
    }
    if (badGuessesList.length > 1) {
        drawTorso();
    }
    if (badGuessesList.length > 2) {
        drawRightArm();
    }
    if (badGuessesList.length > 3) {
        drawLeftArm();
    }
    if (badGuessesList.length > 4) {
        drawLeftLeg();
    }
    if (badGuessesList.length > 5) {
        drawRightLeg();
    }
}

drawGallows();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let completeGame = () => {
    document.getElementById("guess").disabled = true;
    document.getElementById('letter-guess-container').style.display = "none";
}

let resetGame = () => {
    document.getElementById("letter-guess-container").style.display = "block";
    document.getElementById("guess").disabled = false;
    while (guessedLettersList.length > 0) {
        guessedLettersList.pop();
    }
    while (badGuessesList.length > 0) {
        badGuessesList.pop();
    }
    document.getElementById('guess').value = '';
    const badGuessesListContainer = document.getElementById('bad-guesses-list');
    removeAllChildNodes(badGuessesListContainer);
    document.getElementById('game-result-message').innerHTML = '';
    drawGallows();
}

let populateDropdown = () => {
    const wordDict = {
        'fruits' : ['apple', 'banana', 'coconut', 'cherry', 'grape', 'kiwi', 'lemon', 'lime', 'mango', 'orange', 
        'peach', 'pear', 'pineapple', 'plum', 'watermelon'],

        'vegetables': ['artichoke', 'spinach', 'potato', 'tomato', 'asparagus', 'carrot', 'cauliflower', 'celery', 
        'chayote', 'onion', 'leek', 'lettuce', 'mushroom', 'onion', 'parsnip', 'beans', 'beetroot', 'pepper', 
        'potato', 'pumpkin', 'radish', 'broccoli', 'cabbage', 'corn', 'cucumber', 'eggplant',
         'garlic', 'pea', 'zucchini'],

        'countries': ['afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'argentina', 'armenia', 'austria', 
        'azerbaijan', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 
        'bolivia', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burundi', 'cambodia', 'cameroon', 'canada', 'chad', 
        'chile', 'china', 'colombia', 'comoros', 'congo', 'croatia', 'cuba', 'cyprus', 'denmark', 'djibouti', 
        'dominica', 'ecuador', 'egypt', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'finland', 'france', 'gabon', 
        'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau', 
        'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 
        'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 
        'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'macao', 'madagascar', 'malawi', 'malaysia', 
        'maldives', 'mali', 'malta', 'mauritania', 'mauritius', 'mayotte', 'mexico', 'moldova', 'monaco', 'mongolia', 
        'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nepal', 'netherlands', 'nicaragua', 'niger', 'nigeria', 
        'norway', 'oman', 'pakistan', 'panama', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'réunion', 
        'romania', 'russia', 'rwanda', 'senegal', 'serbia', 'seychelles', 'singapore', 'slovakia', 'slovenia', 'somalia', 'spain', 
        'sudan', 'suriname', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'timor-leste', 
        'togo', 'tunisia', 'turkey', 'turkmenistan', 'uganda', 'ukraine', 'uruguay', 'uzbekistan', 'venezuela', 'vietnam', 'yemen', 
        'zambia', 'zimbabwe'],

        'seasons': ['spring', 'summer', 'fall', 'winter']
    }
    const dropdown = document.getElementById('dropdown');
    if(dropdown.childElementCount < Object.keys(wordDict).length) {
        for (const key in wordDict) {
            const option = document.createElement('option');
            option.value = key;
            option.text = key;
            dropdown.appendChild(option);
        }
    }
    return wordDict;
}

populateDropdown();

let getCategory = () => {
    const dropdown = document.getElementById('dropdown');
    const selectedCategory = dropdown.options[dropdown.selectedIndex];
    const category = selectedCategory.value;
    return category;
}

let generateWordBtnHandler = () => {
    resetGame();
    currentCategory = getCategory();
    let wordDict = populateDropdown();
    let randWordList = wordDict[currentCategory];
    let randWord = randWordList[Math.floor(Math.random() * randWordList.length)];
    console.log(`You are cheating! The random word is ${randWord}`)
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
const btn = document.getElementById('generate-word-btn').addEventListener('click', generateWordBtnHandler);


let checkGameState = () => {
    const gameResultMessage = document.getElementById('game-result-message');
    const dashesDiv = document.getElementById('letter-dashes-container');
    let children = dashesDiv.childNodes;
    let emptyDash = false;
    children.forEach((child, index) => {
        if(child.innerHTML === '') {
            emptyDash = true;
        }
    });
    if (!emptyDash) {
        gameResultMessage.innerHTML = 'You won!';
    } else {
        if (badGuessesList.length >= 6) {
            gameResultMessage.innerHTML = 'You lost!';
        } 
    }
    if (gameResultMessage.innerHTML != '') {
        completeGame();
    }
}

let guessHandler = () => {
    const randWord = document.getElementById('letter-dashes-container').getAttribute('randWord');
    const guess = document.getElementById('guess').value;
    const badGuessesListContainer = document.getElementById('bad-guesses-list');
    if (guess !== '' && randWord) {
        if (!guessedLettersList.includes(guess)) {
            guessedLettersList.push(guess);
            guessedLettersList.sort();
            if (randWord.includes(guess)) {
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
                badGuessesList.push(guess);
            }
        }
        checkGameState();
        removeAllChildNodes(badGuessesListContainer);
        for (let letter in badGuessesList) {
            const newBadGuessListItem = document.createElement('li');
            const newBadGuessValue = document.createTextNode(badGuessesList[letter]);
            newBadGuessListItem.setAttribute('class', 'guessed-letter');
            newBadGuessListItem.appendChild(newBadGuessValue);
            badGuessesListContainer.appendChild(newBadGuessListItem);
        }
        drawGallows();
    }
}

const guess = document.getElementById('guess').addEventListener('input', guessHandler);
