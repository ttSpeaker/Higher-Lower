var deck = [];
var index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var type = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
var cardsDealt = 0;
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

function startGame() {
    deal();

}

function deal() {
    $("#last").html(deck[cardsDealt]);
    $("#number").html(deck[cardsDealt][0]);
    $("#suits").html('<img src="suits/' + deck[cardsDealt][1] + '.png" alt="">');
    cardsDealt++;
    $("#dealt").html('Dealt: ' + cardsDealt + ' / 52');
    return deck[cardsDealt];
}
function updateResults(guess) {
    $("#guess").html(guess);
    $("#score").html('Score: ' + guessed);
}
function guessNextCard(guess) {
    if (cardsDealt < 52) {
        var newCard = deal();
        switch (guess) {
            case '+':
                if (newCard[0] > deck[cardsDealt - 1][0]) {
                    guessed++;
                    updateResults('Guessed!')
                } else {
                    updateResults('Missed!');
                }
                break;
            case '-':
                if (newCard[0] < deck[cardsDealt - 1][0]) {
                    guessed++;
                    updateResults('Guessed!')
                } else {
                    updateResults('Missed!');
                }
                break;
        }
    } else {
        console.log('Game ended. Guessed: ' + guessed);
    }
}
function restart () {
    shuffleDeck(500);
    cardsDealt=0;
    guessed=0;
    startGame();
}

$(document).ready(function () {
    $('#higher').click(function () { guessNextCard('+'); });
    $('#lower').click(function () { guessNextCard('-'); });
    $('#restart').click(function(){restart();});
    createDeck();
    shuffleDeck(500);
    startGame();
});