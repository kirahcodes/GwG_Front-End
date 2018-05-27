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

/* Generate HTML for each card */
function generateCard(card) {
    let cardCode = `<li class="card" data-symbol="${card}"><i class="fa ${card}"></i></li>`;
    return cardCode;
}

/* Set up the game */
function buildGame() {
    let cardDeck = document.querySelector('.deck');

    /* Shuffle the list of cards using the provided "shuffle" method below */ 
    shuffle(cards); // Shuffle cards
    
    /* Loop through each card and create its HTML */
    let cardHTML = cards.map(function(card) {
        return generateCard(card);
    });
    /* add each card's HTML to the page */
    cardDeck.innerHTML = cardHTML.join('');
}

buildGame();

let cardsArray = [...document.querySelectorAll('.card')];
let flippedCards = []; // hold the flipped cards
let moveCounter = document.querySelector('.moves');
let moves = 0;


function checkForMatch(cards) {
    // if the cards match
    if (cards[0].dataset.symbol === cards[1].dataset.symbol) {
        cards[0].classList.add('match');
        cards[1].classList.add('match');
        
        cards[0].classList.remove('open', 'show');
        cards[1].classList.remove('open', 'show');
    } else {
        return;
    }
}

// add the open card to a list of open cards
function addToflippedCards(card) {
    // pushes current flipped card into array
    flippedCards.push(card);
    card.classList.add('open', 'show');
    
    // When 2 cards are open
    if (flippedCards.length == 2) {
        checkForMatch(flippedCards);

        moves++; // increment the move counter for every pair flipped
        moveCounter.innerText = moves; // update the move counter
        
        // if the flipped cards don't match, hide them
        setTimeout(function() {
            flippedCards.forEach(function(flippedCard) {
                flippedCard.classList.remove('open', 'show');
            });
            
            // remove all open cards
            flippedCards = [];
        }, 750);
    }
}

function displayCard(card) {
    card.classList.add('open', 'show');
    
    // Add the card to the flippedCards array
    addToflippedCards(card);
}

// Click event Listener
cardsArray.forEach(function(card) {
    // set up the event listener for a card
    card.addEventListener('click', function() {
        
        // if card is NOT flipped (has open/show class)
        if (!card.classList.contains('open') && !card.classList.contains('show')) {
            // display the card's symbol
            displayCard(card);
        }
    });
});

/*
display the card's symbol (put this functionality in another function that you call from this one) 
add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

// Shuffle function from http://stackoverflow.com/a/2450976

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