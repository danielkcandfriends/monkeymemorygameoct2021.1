cardArray = [
    {text: "A", image: "images/Level4/ArtsyA.png"},
    {text: "A", image: "images/Level4/ArtsyA@2x.png"},
    {text: "B", image: "images/Level4/Alien.png"},
    {text: "B", image: "images/Level4/Alien@2x.png"},
    {text: "C", image: "images/Level4/Bee.png"},
    {text: "C", image: "images/Level4/Bee@2x.png"},
    {text: "D", image: "images/Level4/C-Saw-C.png"},
    {text: "D", image: "images/Level4/C-Saw-C@2x.png"},
    {text: "E", image: "images/Level4/Dude.png"},
    {text: "E", image: "images/Level4/Dude@2x.png"},
    {text: "F", image: "images/Level4/Elfee-E.png"},
    {text: "F", image: "images/Level4/Elfee-E@2x.png"},
    {text: "G", image: "images/Level4/FitFred.png"},
    {text: "G", image: "images/Level4/FitFred@2x.png"},
    {text: "H", image: "images/Level4/Girl.png"},
    {text: "H", image: "images/Level4/Girl@2x.png"},
    {text: "I", image: "images/Level4/GoGreen.png"},
    {text: "I", image: "images/Level4/GoGreen@2x.png"},
    {text: "J", image: "images/Level4/MrFace.png"},
    {text: "J", image: "images/Level4/MrFace@2x.png"},
    {text: "K", image: "images/Level4/EvilE.png"},
    {text: "K", image: "images/Level4/EvilE@2x.png"},
    {text: "L", image: "images/Level4/DivideByD.png"},
    {text: "L", image: "images/Level4/DivideByD@2x.png"},
    {text: "M", image: "images/Level4/SadC.png"},
    {text: "M", image: "images/Level4/SadC@2x.png"},
    {text: "N", image: "images/Level4/B-Tween.png"},
    {text: "N", image: "images/Level4/B-Tween@2x.png"},
    {text: "O", image: "images/Level4/Dudette.png"},
    {text: "O", image: "images/Level4/Dudette@2x.png"},
    {text: "P", image: "images/Level4/HappyC.png"},
    {text: "P", image: "images/Level4/HappyC@2x.png"}

];

clickedCard = [];

matchedCard = [];

////////////////////////////////////////// CARD COUNT
let deckPairCount = cardArray.length / 2;

// get user's desired pair count from GET request in URL
const urlParams = new URLSearchParams(window.location.search);
let pairCount = parseInt(urlParams.get('pairCount'));

// account for invalid pair counts entered by user
if (pairCount > deckPairCount || pairCount < 1) {
    pairCount = deckPairCount;
}

// delete pairs in cardArray to get desired pair count
for (let i = 0; i < deckPairCount - pairCount; i++) {
    let deckPairCount = cardArray.length / 2;
    // delete random pair
    let randomPairIndex = Math.floor(Math.random() * deckPairCount) * 2;
    cardArray.splice(2, 2);
}

///////////////////////////////////////// SHUFFLE DECK
var shuffleDeck = function () {
    // Using the Fisher-Yates (Knuth) shuffle
    var currentIndex = cardArray.length
        , temporaryValue
        , randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }
}
///////////////////////////////////////// End shuffle DECK
shuffleDeck();
console.log(cardArray);
var board = document.getElementById("board");

for (var i = 0; i < pairCount * 2; i++) {

    // appending cards to board
    var cardsBack = document.createElement("div");
    cardsBack.classList.add("card");
    board.appendChild(cardsBack);

    // adding images to cardback
    var images = document.createElement("img");
    images.src = cardArray[i].image;
    images.className = "image";
    cardsBack.appendChild(images);


    // Change color of cards on click
    cardsBack.addEventListener("click", function () {

        var card = this;
        if (clickedCard.length < 2) {
            card.classList.add("image");
            card.classList.add("match"); // add class of match to all cards
            clickedCard.push(card.innerHTML);
            matchedCard.push(card);

            //// compares cards that are clicked on
            if (clickedCard.length === 2) {
                let image1 = clickedCard[0].split("/")[2].split(" ")[0];
                let image2 = clickedCard[1].split("/")[2].split(" ")[0];

                if (image1.includes("@2x")) {
                    image1 = image1.replace("@2x", "");
                }
                if (image2.includes("@2x")) {
                    image2 = image2.replace("@2x", "");
                }

                if (image1 === image2) {

                    console.log("It's a match!");
                    clickedCard = [];
                    matchedCard = [];
                } else {
                    console.log("It's not a match!")
                    setTimeout(turnOffAllCards, 1000);
                    for (i = 0; i < matchedCard.length; i++) {
                        matchedCard[i].classList.remove("match");
                    }
                    matchedCard = [];
                    // calls turnOffAllCards
                }
            } // close if statement
        } // close second if statement
    }) // event listener
} // close for loop

function turnOffAllCards() {
    var frontCards = document.querySelectorAll("div.image:not(.match)");
    for (var i = 0; i < frontCards.length; i++) {
        frontCards[i].classList.remove("image");
        clickedCard = [];

    }

}
