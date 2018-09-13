var deck = [];
var index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var type = ['hearts', 'clubs', 'spades', 'diamonds'];
var cardsDealt = -1;
var cardReady = 0;
var guessed = 0;

function createDeck() {
    var card = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
            card = [index[j], type[i]]
            deck.push(card);
        }
    }
}

function shuffleDeck(times) {
    var ammountShuffle = times;
    var tempCard = [];
    var card1 = [];
    var card2 = [];
    for (var i = 0; i < ammountShuffle; i++) {
        card1 = Math.floor((Math.random() * 51) + 1);
        card2 = Math.floor((Math.random() * 51) + 1);
        tempCard = deck[card1];
        deck[card1] = deck[card2];
        deck[card2] = tempCard;
    }
}
function showCard() {
    cardsDealt++;
    $("#number").html(deck[cardsDealt][0]);
    $("#suits").html('<img src="suits/' + deck[cardsDealt][1] + '.png" alt="">');
    $("#dealt").html('Dealt: ' + (cardsDealt+1)+ ' / 52');    
}
function readyNextCard() {
    cardReady = cardsDealt + 1;   
}
function startGame() {
    showCard();
    readyNextCard();
}
function updateResults(guess) {
    $("#guess").html(guess);
    $("#score").html('Score: ' + guessed);
}
function guessNextCard(guess) {
    if (cardsDealt < 52) {
        switch (guess) {
            case '+':
                if (deck[cardsDealt][0] < deck[cardReady][0]) {
                    guessed++;
                    updateResults('Adivinaste!')
                } else {
                    updateResults('Erraste!');
                }
                break;
            case '-':
                if (deck[cardsDealt][0] > deck[cardReady][0]) {
                    guessed++;
                    updateResults('Adivinaste!');
                } else {
                    updateResults('Erraste!');
                }
                break;
        }
        showCard();
        readyNextCard();
    } else {
        updateResults('Fin del juego!');
    }
}
function restart() {
    shuffleDeck(2000);
    cardsDealt = -1;
    guessed = 0;
    updateResults('Adivina!');
    startGame();
}

$(document).ready(function () {
    $('#higher').click(function () { guessNextCard('+'); });
    $('#lower').click(function () { guessNextCard('-'); });
    $('#restart').click(function () { restart(); });
    createDeck();
    shuffleDeck(2000);
    updateResults('Adivina!');
    startGame();
});