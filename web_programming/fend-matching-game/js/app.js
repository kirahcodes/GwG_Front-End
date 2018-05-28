/* Create a list that holds all of your cards */
const cards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];
const restartButton = document.querySelector('.restart');

/* Generate HTML for each card */
function generateCard(card) {
    let cardCode = `<li class="card animated" data-symbol="${card}"><i class="fa ${card}"></i></li>`;
    return cardCode;
}

/* Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Set up the game */
function buildGame() {
    let cardDeck = document.querySelector('.deck');

    /* Shuffle the list of cards using the provided "shuffle" method below */
    shuffle(cards); // Shuffle cards

    /* Loop through each card and create its HTML */
    let cardHTML = cards.map(function (card) {
        return generateCard(card);
    });
    /* Add each card's HTML to the page */
    cardDeck.innerHTML = cardHTML.join('');
}

buildGame();

let cardsArray = [...document.querySelectorAll('.card')];
let flippedCards = []; // hold the flipped cards
let moveCounter = document.querySelector('.moves');
let starCounter = [...document.querySelectorAll('li i.fa.fa-star')];
let starCount = 3;
let moves = 0;
let matches = 0;

moveCounter.innerText = moves; // move counter 0 by default

function displayModal(starResult) {
    const starHTML = `<i class="fa fa-star"></i>`;
    console.log('Star Rating = ' + handleStarRating() + starHTML);
}

/* Check for matches */
function checkForMatch(cards) {
    /* If the cards symbols match */
    if (cards[0].dataset.symbol === cards[1].dataset.symbol) {
        /* Add the match class to each matching card */
        cards[0].classList.add('match', 'rubberBand');
        cards[1].classList.add('match', 'rubberBand');

        /* Remove the open and show class from the match */
        cards[0].classList.remove('open', 'show', 'flipInY');
        cards[1].classList.remove('open', 'show', 'flipInY');

        /* Increment the match counter */
        matches++;
    }

    /* When all matches are found, stop the timer and display results */
    if (matches == 8) {
        stopTimer();
        displayModal();
    }
}

/* Star rating calculator */
function handleStarRating(moves) {
    let stars = document.querySelector('.stars');
    // If the move counter exceeds 10
    if (moves > 10) {
        // decrement the star count by 1
        starCount = 2;

        // remove the 1st filled star
        starCounter[2].classList.add('fadeOut');

        // If the move counter exceeds 20
        if (moves > 20) {
            // decrement the star count by 1
            starCount = 1;

            // remove the 2nd filled star
            starCounter[1].classList.add('fadeOut');
        }
    }
    return starCount;
}

/* Add the open card to a list of open cards */
function addToflippedCards(card) {
    /* Pushes current flipped card into array */
    flippedCards.push(card);
    
    /* When 2 cards are open */
    if (flippedCards.length == 2) {
        checkForMatch(flippedCards);

        moves++; // increment the move counter for every pair flipped
        moveCounter.innerText = moves; // update the move counter

        handleStarRating(moves);
        /* if the flipped cards don't match, hide them */
        setTimeout(function () {
            /* hide the flipped cards if they don't match */
            flippedCards.forEach(function (flippedCard) {
                flippedCard.classList.remove('open', 'show', 'flipInY');
            });

            /* Remove all open cards */
            flippedCards = [];
        }, 750);
    }
}

/* Display the card */
function displayCard(card) {
    card.classList.add('open', 'show', 'flipInY');

    /* Add the card to the flippedCards array */
    addToflippedCards(card);
}

let flip = 0; // holds the first flip to start the timer

let ms = 0,
    seconds = 0,
    minutes = 0,
    hours = 0;

/* Starts the timer */
function startTimer() {
    let minStr, secStr;

    /* Increment the seconds every 1000ms */
    seconds++;

    /* Increment minutes every 60 seconds */
    if (seconds > 59) {
        minutes++;

        /* Reset seconds to 0 when 1 minute is reached */
        seconds = 0;
    }

    /* Handle single digit minutes and seconds */
    if (minutes < 10) {
        minStr = '0' + minutes;

        if (seconds < 10) {
            secStr = '0' + seconds;
        } else {
            secStr = seconds;
        }
    } else {
        minStr = minutes;
    }

    let time = ('' + minStr + ':' + secStr);
    console.log(time);

    return time;
}

function stopTimer() {
    // Clear the interval
    clearInterval(ms); // stop the timer
    let time = startTimer();
    console.log('Last match found at ' + time);
}

/* Click event Listener for each card*/
cardsArray.forEach(function (card) {
    /* Set up the event listener for a card */
    card.addEventListener('click', function () {
        flip++;
        /* Start the timer when the first card is clicked */
        if (flip == 1) {
            seconds = 0;
            ms = setInterval(startTimer, 1000);
        }

        /* If card is NOT flipped (has open/show class) */
        if (!card.classList.contains('open') && 
            !card.classList.contains('show') &&
            !card.classList.contains('rubberBand')) {

            // display the card's symbol
            displayCard(card);
        }
    });
});

/* Restart the game */
restartButton.addEventListener('click', function () {
    location.reload();
});