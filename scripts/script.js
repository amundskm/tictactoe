// Gameboard
let gameBoard = (() => {
  let getSpaces = () =>  document.querySelectorAll(".content");
  return {getSpaces};
})();


// Player Object
let player = (num) => {
  const number  = num;
  const name = `player${num}`;
  let score = 0;
  return {score, name, number};
  };

// Gameplay
let gameplay = (() => {
  let spaces = gameBoard.getSpaces();
  let p1 = player(1);
  let p2 = player(2);

  setOnClick(spaces)

  const addPoint = (player) => {
    player.score++;
  }

  const markSpace = (player, position) => {
    let marker
    let textColor
    if (player.number===1) {
      marker = "X";
      textColor = "red"
    } else {
      marker = "O";
      textColor = "blue"
    }

    child = document.createElement("SPAN");
    child.style = `font-size: 140px; color: ${textColor} `
    child.innerHTML = marker;
    position.append(child);
  };

  const setOnClick = (spaces) = > {
    for (space in spaces){
      space.onclick = markSpace(p1, space);
    }
  }

  // Run
  // while game is going on, check of onclick events in content divs
  // start with  p1, every click switches from p1 to p2. After selection, check if
  // the game is over.  If so, determine if there is a winner. Send alert and update score


  return {spaces, p1, p2, addPoint, markSpace};
});

newGame = gameplay();
//newGame.markSpace(newGame.p1, newGame.spaces[1]);
// newGame.markSpace(newGame.p2, newGame.spaces[3]);


// Reset

// Easy AI

// Hard AI

// Randomize AI between hard and easy
