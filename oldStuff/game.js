





















// <section id="infSection">
//     <center>
//         <h1>Hello gamers!</h1>
//         <h2 id="infH2">You are about to play The Isolation Game.</h2>
//         <p id="infPar">
//             This is a game where two players make moves consecutively
//             and the goal is to put the other player in such a position
//             where it will be no valid move for him.
//             Every player have two actions per move:<br>
//             1.The first action is to move to an adjacent cell.<br>
//             2.The second action is to eliminate a cell.<br>
//             Both actions are executed by clicking on a cell.<br><br>
//             Before starting the game a board must be generated.
//             In this board the two players will be placed randomly across it.<br>
//             To start the game "Start the game!" button must be pressed.<br><br>
//             If you are ready press the button below and enjoy!<br>
//         </p>
//         <a id="toGamePageLink" href="/gamePage">Proceed to the game page</a><br><br>
//     </center>
// </section>`


// <center>
//       <p id="exp">Enter the size of the board. You must enter an odd number:&nbsp; <input id="number" action="submit"
//           type="number" placeholder="Give me a number!"></input>
//         <button id="submitBtn" type="submit">Submit</button></p>
//     </center>

//     <center>
//       <button id="startBtn">Start the game!</button>
//     </center>

//     <center>
//       <p id="inst" data-curPl="one">Player ONE, click on a GREEN cells to move</p>
//     </center>

//     <center>
//       <div class="gridContainer">
//         <div class="grid"></div>
//       </div>
//     </center>


let inpNum = undefined;

// Buttons actions functions

export function submitBoardNumber() {

    let [divGridElement, inputNumber] = getBoardLengthAndGridElement();
    erasingCurrentGrid(divGridElement);

    if (inputNumber % 2 === 0 || inputNumber < 2 || inputNumber > 20 || inputNumber === '') {
        return alert('You must enter an odd number!');
    }

    inpNum = inputNumber;
    boardCreation(inputNumber);
    let divContainerElement = document.querySelectorAll('.cell');
    divContainerElement = Array.from(divContainerElement);
    cellIndicesMatrix(divContainerElement.map(el => el.textContent), inpNum);
};

function getBoardLengthAndGridElement() {
    let divGridElement = document.querySelector('.grid');
    const boardLength = document.getElementById('number').value;

    return [divGridElement, boardLength];
};

function erasingCurrentGrid(divGridElement) {
    divGridElement.textContent = '';
};


export function startTheGame() {

    const checkForBoard = document.querySelectorAll('.cell').length;
    let instructionElement = document.getElementById('inst');
    if (checkForBoard > 0) {
        instructionElement.style.display = 'inline-block';
    } else {
        alert('You must create the board first!');
    }
};

// Clicking on the board cells functionality

const divContainerElement = document.querySelector('.gridContainer');

divContainerElement.addEventListener('click', e => {
    if (e.target.classList[0] === 'cell') {
        const clickedCell = e.target;
        let divContainerElementArr = document.querySelectorAll('.cell');
        divContainerElementArr = Array.from(divContainerElementArr);

        if (divContainerElementArr.every(cell => cell.style.background === 'antiquewhite')) {
            cellToEliminate(clickedCell, divContainerElementArr);
        } else {
            movingPlayers(clickedCell);
        }
    }
});

// The size of the board and its cells functionality

function getAndSetElements(n) {

    let divContainer = document.querySelector('.container');

    let divGridElement = document.querySelector('.grid');

    divGridElement.style.gridTemplateColumns = `repeat(${n}, 60px)`;

    divGridElement.style.gridTemplateRows = `repeat(${n}, 60px)`;

    return [divContainer, divGridElement];

};

// Generating random numbers for the initial position of the players on the board functionality

function generateRandomNumbers(n) {
    let arrOfNumbers = [];

    let playerOnePosX = Math.floor(Math.random() * n) + 0;
    let playerOnePosY = Math.floor(Math.random() * n) + 0;

    let playerTwoPosX = Math.floor(Math.random() * n) + 0;
    let playerTwoPosY = Math.floor(Math.random() * n) + 0;

    let samePosition = playerOnePosX === playerTwoPosX && playerOnePosY === playerTwoPosY;

    while (samePosition) {
        playerOnePosX = Math.floor(Math.random() * n) + 0;
        playerOnePosY = Math.floor(Math.random() * n) + 0;

        playerTwoPosX = Math.floor(Math.random() * n) + 0;
        playerTwoPosY = Math.floor(Math.random() * n) + 0;

        samePosition = playerOnePosX === playerTwoPosX && playerOnePosY === playerTwoPosY;
    }

    arrOfNumbers.push(playerOnePosX, playerOnePosY, playerTwoPosX, playerTwoPosY);

    return arrOfNumbers;
}

// Creation of the board and putting the players on their places functionality

function boardCreation(n) {

    let [playerOnePosX, playerOnePosY, playerTwoPosX, playerTwoPosY] = generateRandomNumbers(n);

    let [divContainer, divGridElement] = getAndSetElements(n);

    for (let x = 0; x < n; x++) {

        for (let y = 0; y < n; y++) {

            let divElement = document.createElement('div');

            if (playerOnePosX === x && playerOnePosY === y) {
                divElement.textContent = '1';
            } else if (playerTwoPosX === x && playerTwoPosY === y) {
                divElement.textContent = '2';
            }
            divElement.classList.add('cell');
            divContainer.style.border = '5px solid black';
            divGridElement.appendChild(divElement);
        }

    }
}

// Moving player to another cell functionality

function movingPlayers(clickedCell) {
    let gameStarted = document.getElementById('inst').style.display;
    let divContainerElement = document.querySelectorAll('.cell');
    divContainerElement = Array.from(divContainerElement);

    playerMoving(clickedCell, gameStarted, divContainerElement);
};


function playerMoving(clickedCell, gameStarted, divContainerElement) {
    if (gameStarted === 'inline-block') {
        let instructionElement = document.getElementById('inst');
        let playerOnTurn = instructionElement.getAttribute('data-curPl');
        let currentPlayer = undefined;
        let currentPlayerText = undefined;
        let cellColor = undefined;
        let cellColActualName = undefined;

        if (playerOnTurn === 'one') {
            currentPlayer = '1';
            currentPlayerText = 'Player ONE';
            cellColor = 'green';
            cellColActualName = 'lightgreen';
        } else if (playerOnTurn === 'two') {
            currentPlayer = '2';
            currentPlayerText = 'Player TWO';
            cellColor = 'blue';
            cellColActualName = 'lightblue';
        }

        let playerCurCell = divContainerElement.find(el => el.textContent === currentPlayer);

        if (clickedCell.style.background === cellColActualName) {
            playerCurCell.textContent = '';
            clickedCell.textContent = currentPlayer;
            cellIndicesMatrix(divContainerElement.map(el => el.textContent), inpNum);
            divContainerElement.forEach(cell => cell.style.background = 'antiquewhite');
            instructionElement.textContent = 'Now click on any cell that is EMPTY to eliminate it';
        } else {
            alert(`${currentPlayerText}, you must click on a ${cellColor} cell!`);
        }

    } else {
        alert('The game is not started!');
    }
};

// Choosing which cell to eliminate functionality

function cellToEliminate(clickedCell, divContainerElement) {
    if (clickedCell.textContent === '1' || clickedCell.textContent === '2') {
        return alert('You cannot eliminate а player!');
    }

    clickedCell.textContent = '*';

    let instructionElement = document.getElementById('inst');
    let currentPlayer = instructionElement.getAttribute('data-curPl');
    let otherPlayer = undefined;

    if (currentPlayer === 'one') {
        instructionElement.setAttribute('data-curPl', 'two');
        instructionElement.textContent = 'Player TWO, you must click on a blue cell';
        otherPlayer = 'one';
    } else if (currentPlayer === 'two') {
        instructionElement.setAttribute('data-curPl', 'one');
        instructionElement.textContent = 'Player ONE, you must click on a green cell';
        otherPlayer = 'two';
    }

    cellIndicesMatrix(divContainerElement.map(el => el.textContent), inpNum);
    if (divContainerElement.every(cell => cell.style.background === 'antiquewhite')) {
        alert(`Game Over. Player ${otherPlayer} wins!`);
    };
};



function cellIndicesMatrix(arrayOfCells, inpNum) {

    let matrixOfIndices = [];
    let subMatrix = [];

    for (let o = 0; o < arrayOfCells.length;) {

        for (let i = 0; i < inpNum; i++) {
            if (arrayOfCells[o] !== '1' && arrayOfCells[o] !== '2' && arrayOfCells[o] !== '*') {
                subMatrix.push(o);
            } else {
                if (arrayOfCells[o] === '1') {
                    subMatrix.push('one');
                } else if (arrayOfCells[o] === '2') {
                    subMatrix.push('two');
                } else if (arrayOfCells[o] === '*') {
                    subMatrix.push('*');
                }
            }
            o++;
        }

        matrixOfIndices.push(subMatrix);
        subMatrix = [];
    }

    findAdjacentIndices(matrixOfIndices);
}

function findPlayersIndices(matrixOfIndices) {
    let playerOneIndices = undefined;
    let playerTwoIndices = undefined;

    matrixOfIndices.forEach((arr, o) => {
        arr.forEach((el, i) => el === 'one' ? playerOneIndices = [o, i] : false);
        arr.forEach((el, i) => el === 'two' ? playerTwoIndices = [o, i] : false);
    });

    return [playerOneIndices, playerTwoIndices];
}

function findAdjacentIndices(matrixOfIndices) {
    let [playerOneIndices, playerTwoIndices] = findPlayersIndices(matrixOfIndices);
    let arrOfCells = document.querySelectorAll('.cell');
    let instructionElement = document.getElementById('inst');
    let indexCounter = 0;
    let playerOnTurn = instructionElement.getAttribute('data-curPl');
    let currentPlayer = undefined;
    let curPlColor = undefined;
    let playerNotOnTurn = undefined;

    if (playerOnTurn === 'one') {
        currentPlayer = playerOneIndices;
        curPlColor = 'lightgreen';
        playerNotOnTurn = 'two';
    } else if (playerOnTurn === 'two') {
        currentPlayer = playerTwoIndices;
        curPlColor = 'lightblue';
        playerNotOnTurn = 'one';
    };

    for (let o = 0; o < matrixOfIndices.length; o++) {

        for (let i = 0; i < matrixOfIndices[o].length; i++) {

            if (i === currentPlayer[1] && (currentPlayer[0] + 1 === o || currentPlayer[0] - 1 === o || currentPlayer[0] === o)) {
                if (matrixOfIndices[o][i + 1] !== undefined && matrixOfIndices[o][i + 1] !== playerNotOnTurn && matrixOfIndices[o][i + 1] !== '*') {
                    arrOfCells[indexCounter + 1].style.background = curPlColor;
                }
                if (matrixOfIndices[o][i - 1] !== undefined && matrixOfIndices[o][i - 1] !== playerNotOnTurn && matrixOfIndices[o][i - 1] !== '*') {
                    arrOfCells[indexCounter - 1].style.background = curPlColor;
                }
                if (matrixOfIndices[o][i] !== playerNotOnTurn && matrixOfIndices[o][i] !== '*' && (currentPlayer[0] + 1 === o || currentPlayer[0] - 1 === o)) {
                    arrOfCells[indexCounter].style.background = curPlColor;
                }
            }

            indexCounter++;
        }
    }

    console.log(matrixOfIndices);
}