let liveGame = true;
let currentPlayer = "X";
let gameProgress = ["", "", "", "", "", "", "", "", ""];
const gameStatus = document.querySelector("#gameStatus");

const win = () => `The ${currentPlayer}'s win it! The ${currentPlayer}'s win it!`;

const draw = () => `No Soup for YOU!`;

const yourTurn = () => `It's ${currentPlayer}'s turn`;

// gameStatus div set to inital innerText of "X goes first"
// The UI will display a message indicating which user's turn it is
gameStatus.innerHTML = yourTurn();

const howToWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// The grid cells will have the correct player symbol ( X or O ) displayed
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.innerText = yourTurn();
}

buttons = document.getElementsByClassName("btn");

buttons = [...buttons];

// The entire grid will be clickable
buttons.forEach((button) => {
  button.addEventListener("click", handleBtnClick);
});

function handleBtnClick(btnEvent) {
  const clickedBtn = btnEvent.target;
  const btnVal = clickedBtn.value;

  console.log(btnVal);
  if (gameProgress[btnVal] !== "" || !liveGame) {
    console.log("hiyaaa");
    return;
  }

  handleBtnUsed(clickedBtn, btnVal);
  handleResultValidation();
}

function handleBtnUsed(clickedBtn, btnVal) {
  gameProgress[btnVal] = currentPlayer;
  clickedBtn.innerHTML = currentPlayer;
}

function newGame() {
  liveGame = true;
  currentPlayer = "X";
  gameProgress = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = yourTurn();
  buttons.forEach((button) => (button.innerHTML = ""));
}

let roundDraw;
let roundWon;
// When the game ends it should display who won the game or if the game ended in a draw
function handleResultValidation() {
  roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const won = howToWin[i];
    let a = gameProgress[won[0]];
    let b = gameProgress[won[1]];
    let c = gameProgress[won[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    on();
    document.getElementById("text").innerText = win();
    gameStatus.innerHTML = "Game Over";
    gameActive = false;
    return;
  }

  roundDraw = !gameProgress.includes("");
  if (roundDraw) {
    on();
    document.getElementById("noSoup").innerText = draw();
    gameStatus.innerHTML = "Game Over";
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

// There will be a restart game button that will restart the entire game
document.querySelector(".restart-btn").addEventListener("click", newGame);

// ----------------------Overlay On and Off Section----------------------------------------

// Appears whent the game ends
function on() {
  const overlay = (document.getElementById("overlay").style.display = "block");

  if (roundWon) {
    document.querySelector(".container").style.display = "none";
    document.getElementById("tsparticles").style.display = "block";
    document.getElementById("tsparticles").style.filter = "none";
    tsParticles.loadJSON("tsparticles", "./assets/JSON/tsConfetti.json");
    overlay.innerText = win();
  } else if (roundDraw) {
      tsParticles.loadJSON("tsparticles", "./assets/JSON/ts404.json");
    document.getElementById("overlay").style.display = "none";
    document.querySelector(".container").style.display = "none";
    document.querySelector("#draw").style.display = "block";
    document.getElementById("tsparticles").style.filter = "blur(20px)";
    document.getElementById("tsparticles").style.display = "block";    
  }
  // --------------------Fireworks----------------------------------------//

  //tsParticles library - https://github.com/matteobruni/tsparticles

  //--------------------------------------------------------------------//
}

// Hides the overlay and restarts the game to prevent the users
//  from adding to the board if spaces are left
function off() {
  document.getElementById("tsparticles").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.querySelector("#draw").style.display = "none";
  document.querySelector(".container").style.display = "grid";
  newGame();
}
//-----------------------------------------------------------------------------------------

// Hints for your JavaScript:
// Your game should:
// track clicks that occur on the cells

// check if a valid move has been made

// prevent cells from being selected more than once

// keep track of and validate game status

// THEN change the active player

// check if their is a winner or if there is a draw

// stop the game once there is a win or draw

// udpate the UI to reflect all of the above
