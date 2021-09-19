document.addEventListener("DOMContentLoaded", () => {
  //card options:
  const cards = [
    {
      name: "One",
      img: "src/images/One.png" //remember, the path is looked at as if from the HTML file
    },
    {
      name: "Two",
      img: "src/images/Two.png"
    },
    {
      name: "Three",
      img: "src/images/Three.png"
    },
    {
      name: "Four",
      img: "src/images/Four.png"
    },
    {
      name: "Five",
      img: "src/images/Five.png"
    },
    {
      name: "Six",
      img: "src/images/Six.png"
    }
  ]

  function doubleUp(deck){
    const doubleDeck = [];
    for (var card of deck) {
      doubleDeck.push({...card});
      doubleDeck.push({...card});
    }
    return doubleDeck;
  }
// same thing as above can be done in 1 line using: return deck.flatMap(card => [{...card}, {...card}]);


  const newDeck = doubleUp(cards);
  console.log(newDeck);

  function sortCards(deck){
    deck.forEach(function (card) {
      card.num = Math.random()
    })
    deck.sort((a,b) => a.num - b.num);
    return deck;
  } 
    
//Original Code (WORKS):
    // for(let i = 0; i < deck.length; i++){
    //   deck[i].num = Math.random()
    // }
    
    // for( let i = 0; i < deck.length; i++){
    //   deck[i].num = i+1
    // }
    // return deck;

//Revised & condensed:
    // deck.forEach((card) => card.num = Math.random());
    // deck.sort((a,b) => a.num - b.num);

//The teacher's sorting method:
//              cards.sort(() => 0.5 - Math.random())


  console.log(sortCards(newDeck));

  const grid = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#result")
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function checkForMatch(){
     const cardsAll = document.querySelectorAll("img");
     if ((cardsChosenId[0] != cardsChosenId[1]) && (cardsChosen[0] === cardsChosen[1])){
      console.log("you have found a match!")
      cardsAll[cardsChosenId[0]].setAttribute("src", "src/images/GotIt.png");
      cardsAll[cardsChosenId[1]].setAttribute("src", "src/images/GotIt.png");
      cardsAll[cardsChosenId[0]].removeEventListener("click", flipCard)
      cardsAll[cardsChosenId[1]].removeEventListener("click", flipCard)
      cardsWon.push(cardsChosen)
     } else{
       console.log("You have selected the same card!")
       cardsAll[cardsChosenId[0]].setAttribute("src", "src/images/Blank.png");
       cardsAll[cardsChosenId[1]].setAttribute("src", "src/images/Blank.png");       
     }
     cardsChosen = [];
     cardsChosenId = [];
     console.log(cardsWon);
     scoreDisplay.textContent = cardsWon.length
     if (cardsWon.length === newDeck.length / 2){
       scoreDisplay.textContent = "Congratulations! You have won!"
     }
  }

  function flipCard(){
    let cardId = this.getAttribute("data-id");
    console.log(newDeck[cardId]);
    cardsChosen.push(newDeck[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", newDeck[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }

  }


  function createBoard(){
    for (let i = 0; i < newDeck.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "src/images/Blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard)
      grid.appendChild(card); 
    }

  }
  createBoard();
})

