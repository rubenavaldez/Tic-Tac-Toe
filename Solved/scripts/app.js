let liveGame = true;
let currentPlayer = "X";
let gameProgress = ["", "", "", "", "", "", "", "", ""];
const gameStatus = document.querySelector('#gameStatus')



const win = () => `Player ${currentPlayer} has won!`;

const draw = () => `Game ended in a draw!`;

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
    [2, 4, 6]
];

// The grid cells will have the correct player symbol ( X or O ) displayed
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerText = yourTurn();
}



buttons = document.getElementsByClassName('btn')

buttons = [...buttons]

// The entire grid will be clickable
buttons.forEach(button => {
    button.addEventListener('click', handleBtnClick)
});


function handleBtnClick(btnEvent) {
    const clickedBtn = btnEvent.target;
    const btnVal = clickedBtn.value;

    console.log(btnVal);
    if (gameProgress[btnVal] !== "" || !liveGame) {
        console.log('hiyaaa');
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
    buttons.forEach(button => button.innerHTML = "");
}


// When the game ends it should display who won the game or if the game ended in a draw
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const won = howToWin[i];
        let a = gameProgress[won[0]];
        let b = gameProgress[won[1]];
        let c = gameProgress[won[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    
    if (roundWon) {
        on()
        document.getElementById('text').innerText = win()
        gameStatus.innerHTML = "Game Over";
        gameActive = false;
        return;
    }
    
    let roundDraw = !gameProgress.includes("");
    if (roundDraw) {
        on()
        document.getElementById('text').innerText = draw()
        gameStatus.innerHTML = "Game Over";
        gameActive = false;
        return;
    }
    
    handlePlayerChange();
}



// There will be a restart game button that will restart the entire game
document.querySelector('.restart-btn').addEventListener('click', newGame);


// ----------------------Overlay On and Off Section----------------------------------------

// Appears whent the game ends
function on() {
    const overlay = document.getElementById("overlay").style.display = "block";
    document.querySelector(".container").style.display = "none";
    
    overlay.innerText = win()
    // --------------------Fireworks----------------------------------------//
    
    //tsParticles library - https://github.com/matteobruni/tsparticles
    
    console.log(tsParticles.load("tsparticles", {
        fullScreen: {
            enable: true
        },
        detectRetina: true,
        background: {
            color: "#000"
        },
        fpsLimit: 60,
        emitters: {
            direction: "top",
            life: {
                count: 0,
                duration: 0.1,
                delay: 0.1
            },
            rate: {
                delay: 0.15,
                quantity: 1
            },
            size: {
                width: 100,
                height: 0
            },
            position: {
                y: 100,
                x: 50
            }
        },
        particles: {
            number: {
                value: 0
            },
            destroy: {
                mode: "split",
                split: {
                    count: 1,
                    factor: { value: 1 / 3 },
                    rate: {
                        value: 100
                    },
                    particles: {
                        stroke: {
                            color: {
                                value: [
                                    "#ffffff",
                                    "#b22234",
                                    "#b22234",
                                    "#3c3bfe",
                                    "#3c3bfe",
                                    "#3c3bfe"
                                ]
                            },
                            width: 1
                        },
                        number: {
                            value: 0
                        },
                        collisions: {
                            enable: false
                        },
                        opacity: {
                            value: 1,
                            animation: {
                                enable: true,
                                speed: 0.7,
                                minimumValue: 0.1,
                                sync: false,
                                startValue: "max",
                                destroy: "min"
                            }
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: 1,
                            animation: {
                                enable: false
                            }
                        },
                        life: {
                            count: 1,
                            duration: {
                                value: {
                                    min: 1,
                                    max: 2
                                }
                            }
                        },
                        move: {
                            enable: true,
                            gravity: {
                                enable: false
                            },
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            outMode: "destroy"
                        }
                    }
                }
            },
            life: {
                count: 1
            },
            shape: {
                type: "line"
            },
            size: {
                value: 50,
                animation: {
                    enable: true,
                    sync: true,
                    speed: 150,
                    startValue: "max",
                    destroy: "min"
                }
            },
            stroke: {
                color: {
                    value: "#ffffff"
                },
                width: 1
            },
            rotate: {
                path: true
            },
            move: {
                enable: true,
                gravity: {
                    acceleration: 15,
                    enable: true,
                    inverse: true,
                    maxSpeed: 100
                },
                speed: { min: 10, max: 20 },
                outModes: {
                    default: "destroy",
                    top: "none"
                },
                trail: {
                    fillColor: "#000",
                    enable: true,
                    length: 10
                }
            }
        }
    }));
    //--------------------------------------------------------------------//
    
}

// Hides the overlay and restarts the game to prevent the users
//  from adding to the board if spaces are left
function off() {
    document.getElementById("overlay").style.display = "none";
    document.querySelector(".container").style.display = "grid";
    newGame()
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
