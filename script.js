const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //Second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  //do the cards match?
  //Using a tenary operator instead of an if/else statement
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  console.log("Function was executed!");

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;

    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; //this line uses ES6 destructuring assignment
  [firstCard, secondCard] = [null, null];
}
//Wrapping a function inside parenthesis makes it an immediately invoked expression. Meaning the function will be executed right after its definition.
(function shuffleCards() {
    //Assign each card a random number between 1 and 12
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
card.style.order = randomNum;
    });
}
)();
cards.forEach((card) => card.addEventListener("click", flipCard));
