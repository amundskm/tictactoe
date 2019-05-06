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
  let squares = []
  let score = 0;
  return {score, name, number, marker, squares};
  };


// Gameplay
const gamePlay = (() => {
  let spaces = Array.from(gameBoard.getSpaces());
  let p1 = player(1, "x");
  let p2 = player(2, "o");
  let currentPlayer = p1;
  let counter = 0;
  let tieScore = 0;

  // Create event listeners on squares
  const createEventListeners = () => {
    spaces.forEach(space => space.addEventListener("click", fillSpace));
    document.getElementById("resign-btn").addEventListener("click", resign);
    document.getElementById("restart-btn").addEventListener("click", restartGame)
  };

  // When clicked fill square in with current player marker if empty
  const fillSpace = (e) => {
    space = e.target;
    if (space.innerText === "" ){
      space.innerHTML = currentPlayer.marker;
      currentPlayer.squares.push(space.id);

      if (win() === true){
        updateScore();
        reset();
      };
      if (checkTie() === true){
        reset();
      };

      switchPlayer();
      if (currentPlayer === p2){
        if( p2.name === "Computer")
          ai();
        }
      }


    };


  // Switch current player
  const switchPlayer = () => {
    if (currentPlayer === p1){
      currentPlayer = p2;
    } else {
      currentPlayer = p1;
    };
  };

  // Determine if current player has won
  const win = () => {
    combinations = [["box-0","box-1","box-2"],
                    ["box-3","box-4","box-5"],
                    ["box-6","box-7","box-8"],
                    ["box-0","box-3","box-6"],
                    ["box-1","box-4","box-7"],
                    ["box-2","box-5","box-8"],
                    ["box-0","box-4","box-8"],
                    ["box-2","box-4","box-6"]]
    let squares = currentPlayer.squares;
    for(combo in combinations){
      let one = squares.indexOf(combinations[combo][0]);
      if (one != -1) {
        let two = squares.indexOf(combinations[combo][1]);
        if (two != -1) {
          let three = squares.indexOf(combinations[combo][2]);
          if (three != -1){
            return true;
          };
        };
      };
    };
    return false;
  };

  const playCounter = () => {
    counter++;
  };

  const checkTie = () => {
    if (counter >= 9){
      alert(`Game Over. It ended in a tie.`)
      tieScore++
      document.getElementById("ties-score").textContent = tieScore
      return true;
    };
    playCounter();
    return false;
  };

  const updateScore = () => {
    currentPlayer.score++;
    idName = `p${currentPlayer.number}-score`;
    document.getElementById(idName).textContent = currentPlayer.score;
    alert(`${currentPlayer.name} has won `);
  };

  const reset = () => {
    for(space in spaces){
      spaces[space].textContent = "";
    };
    p1.squares = [];
    p2.squares = [];
    counter = 0;
  };

  const resign = () => {
      switchPlayer();
      updateScore();
      reset();
  };

  const restartGame = () => {
     reset();
     p1.score = 0;
     p2.score = 0;
     tieScore = 0;
     document.getElementById("p1-score").textContent = 0;
     document.getElementById("p2-score").textContent = 0;
     document.getElementById("ties-score").textContent = 0;
     number();
   }

   const numPlayers = () => {
     document.getElementById("one-player").addEventListener("click", nameOnePlayer);
     document.getElementById("two-player").addEventListener("click", nameTwoPlayers);
   }

   const nameOnePlayer = () => {
     document.getElementById("start").style.display = "none";
     document.getElementById("input-names").style.display = "block";
     document.getElementById("p2-name-input").style.display = "none";
     document.getElementById("submit-names").addEventListener("click", updateOnePlayer);
   }

   const updateOnePlayer = () => {
     p1.name = document.getElementById("p1-name").value;
     document.getElementById("p1-score-name").textContent = `${p1.name}:`;
     p2.name = "Computer"
     document.getElementById("p2-score-name").textContent = "Computer:";
     document.getElementById("input-names").style.display = "none";
     document.getElementById("game").style.display = "block";
     document.getElementById("game-buttons").style.display = "block"
     createEventListeners();
   }

   const nameTwoPlayers = () => {
     document.getElementById("start").style.display = "none";
     document.getElementById("input-names").style.display = "block";
     document.getElementById("submit-names").addEventListener("click", updateTwoPlayers);
   }

   const updateTwoPlayers = () => {
     p1.name = document.getElementById("p1-name").value;
     document.getElementById("p1-score-name").textContent = `${p1.name}:`;
     p2.name = document.getElementById("p2-name").value;
     document.getElementById("p2-score-name").textContent = `${p2.name}:`;
     document.getElementById("input-names").style.display = "none";
     document.getElementById("game").style.display = "block";
     document.getElementById("game-buttons").style.display = "block";
     createEventListeners();
   }

   const ai = () => {

      let empty = spaces.filter((ele) => (ele.innerText === ""));
      
     let aiSpace = empty[Math.floor(Math.random() * empty.length)];
     aiSpace.click()

   }


  return {numPlayers, nameOnePlayer, fillSpace, resign, restartGame};

});

game = gamePlay();
game.numPlayers();
