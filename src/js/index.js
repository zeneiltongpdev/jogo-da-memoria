const symbols = [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
  ];
  
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  
  function createCards() {
    const doubledSymbols = symbols.concat(symbols);
    doubledSymbols.sort(() => Math.random() - 0.5);
    cards = doubledSymbols.map((symbol) => ({
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
  }
  
  function renderCards() {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
    cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      if (card.isFlipped) {
        cardElement.innerText = card.symbol;
        cardElement.classList.add("is-flipped");
      }
      if (card.isMatched) {
        cardElement.innerText = card.symbol;
        cardElement.classList.add("is-matched");
      }
      cardElement.addEventListener("click", () => {
        if (flippedCards.length < 2 && !card.isFlipped && !card.isMatched) {
          card.isFlipped = true;
          flippedCards.push({ index, symbol: card.symbol });
          renderCards();
          if (flippedCards.length === 2) {
            const match =
              flippedCards[0].symbol === flippedCards[1].symbol &&
              flippedCards[0].index !== flippedCards[1].index;
            if (match) {
              cards[flippedCards[0].index].isMatched = true;
              cards[flippedCards[1].index].isMatched = true;
              matchedCards.push(...flippedCards);
            }
            setTimeout(() => {
              cards[flippedCards[0].index].isFlipped = false;
              cards[flippedCards[1].index].isFlipped = false;
              flippedCards = [];
              renderCards();
              if (match && matchedCards.length === cards.length) {
                alert("Congratulations, you won!");
              }
            }, 1000);
          }
        }
      });
      gridContainer.appendChild(cardElement);
    });
  }
  
  function resetGame() {
    createCards();
    flippedCards = [];
    matchedCards = [];
    renderCards();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    createCards();
    renderCards();
    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", resetGame);
  });