// Gameboard
let gameBoard = (() => {
  let getSpaces = () =>  Array.from(document.querySelectorAll(".content"));
  return {getSpaces};
})();


// Player Object
let player = (num, mark) => {
  const number  = num;
  const name = `player${num}`;
  const marker = mark;
  let score = 0;
  return {score, name, marker};
  };


// Gameplay
let gamePlay = (() => {
  let spaces = Array.from(gameBoard.getSpaces());
  let p1 = player(1, "x");
  let p2 = player(2, "o");
  let currentPlayer = p1;

  const createEventListeners = () => {
    spaces.forEach(space => space.addEventListener("click", fillSpace, false));
  }

  const fillSpace = (e) => {
    space = e.target;
    if (space.innerText === "" ){
      space.innerHTML = currentPlayer.marker;
      switchPlayer();
    }
  }

  const switchPlayer = () => {
    if (currentPlayer === p1){
      currentPlayer = p2;
    } else {
      currentPlayer = p1;
    }
  }

  return {createEventListeners, fillSpace}

})();

newGame = gamePlay();
newGame.createEventListeners();
