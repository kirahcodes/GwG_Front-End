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

/* Generate HTML for each card */
function generateCard(card) {
    let cardCode = `<li class="card animated" data-symbol="${card}"><i class="fa ${card}"></i></li>`;
    return cardCode;
}

/* Set up the game */
function buildGame() {
    let deck = document.querySelector('.deck');

    /* Shuffle the list of cards using the provided "shuffle" method */
    shuffle(cards); // Shuffle cards

    /* Loop through each card and create its HTML */
    let cardHTML = cards.map(function (card) {
        return generateCard(card);
    });

    /* Add each card's HTML to the page */
    deck.innerHTML = cardHTML.join('');
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

function displayModal() {
    const modal = document.querySelector('.modal-container');
    let displayTime = document.querySelector('.finalTime');
    let displayStarRating = document.querySelector('.finalStarRating');
    let displayMoves = document.querySelector('.finalMoveCount');

    displayTime.innerText = stopTimer();
    displayStarRating.innerText = starCount;
    displayMoves.innerText = moves;
    
    cardsArray.forEach(function(card) {
        card.classList.remove('flash');
        card.classList.add('tada');
    });
    
    modal.classList.remove('hide');
    modal.classList.add('fadeIn');
    /**
     * TODO: For Modal
     * Display congrats message
     * Ask if they want to play again
     * Tell the user how much time it took them to win
     * Tell the user what their star rating was
     */
}

/* Check for matches */
function checkForMatch(cards) {
    /* If the cards symbols match */
    if (cards[0].dataset.symbol === cards[1].dataset.symbol) {
        /* Add the match class to each matching card */
        cards[0].classList.add('match', 'flash');
        cards[1].classList.add('match', 'flash');

        /* Remove the open and show class from the match */
        cards[0].classList.remove('open', 'show');
        cards[1].classList.remove('open', 'show');

        /* Increment the match counter */
        matches++;
    }

    /* When all matches are found, stop the timer and display results */
    if (matches == 8) {
        stopTimer();
        setInterval(displayModal, 2000);
    }
}

/* Star rating calculator */
function handleStarRating(moves) {
    let stars = document.querySelector('.stars');
    // If the move counter exceeds 10
    if (moves > 10) {
        // Decrement the star count by 1
        starCount = 2;

        // Remove the 1st filled star
        starCounter[2].classList.add('fadeOut');

        // If the move counter exceeds 20
        if (moves > 20) {
            // Decrement the star count by 1
            starCount = 1;

            // Remove the 2nd filled star
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
                flippedCard.classList.remove('open', 'show', 'flipInX');
            });

            /* Remove all open cards */
            flippedCards = [];
        }, 750);
    }
}

/* Display the card */
function displayCard(card) {
    card.classList.add('open', 'show', 'flipInX');

    /* Add the card to the flippedCards array */
    addToflippedCards(card);
}

let flip = 0; // holds the first flip to start the timer

let ms = 0,
    seconds = 0,
    minutes = 0,
    hours = 0;
let timeDisplay = document.querySelector('.time');

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
/**
 * FIXME:
 * seconds are undefined when minutes pass 10
 */
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
    timeDisplay.textContent = time;
    
    return time;
}

function stopTimer() {
    // Stop the timer
    clearInterval(ms);
    let time = startTimer();
    console.log(time);
    return time;
}

/* Click event Listener for each card*/
cardsArray.forEach(function (card) {
    /* Set up the event listener for a card */
    card.addEventListener('click', function () {
        flip++;
        /* Start the timer when the first card is clicked */
        if (flip === 1) {
            seconds = 0;
            ms = setInterval(startTimer, 1000);
        }

        /* If card is NOT flipped (has open/show class) */
        if (!card.classList.contains('open') && 
            !card.classList.contains('show') &&
            !card.classList.contains('flash')) {

            // display the card's symbol
            displayCard(card);
        }
    });
});

/* Restart the game */
restartButton.addEventListener('click', function () {
    location.reload(); // reload the page
});