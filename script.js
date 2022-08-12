const game = (function () {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    const winningCombinations = [
        [0, 1, 2], //horizontal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], //vertical
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], //diagonal
        [2, 4, 6]
    ]
    const message = document.querySelector('[data-message]');
    let currentPlayer;
    let gameFinished;

    const resetGame = () => {
        board = board.map(item => item = '');
        gameFinished = false;

        currentPlayer = player1;
        message.innerText = `It's a ${currentPlayer.getName()}'s turn`;
    }

    const checkWin = () => {
        return winningCombinations.some(combination => {
            return combination.every(i => {
                return board[i] === currentPlayer.getSign();
            })
        })
    }

    const checkTie = () => {
        return board.every(cell => {
            return cell != '';
        }); 
        //only checks for cells having input because checkResult() already checked for win
    }

    const checkResult = () => {
        if (checkWin()) {
            message.innerText = `It's a ${currentPlayer.getName()}'s win!`
            gameFinished = true;
        } else if (checkTie()) {
            message.innerText = `It's a tie! No winners this time`;
            gameFinished = true;
        }
    }

    const changeCell = (index) => {
        if (gameFinished) return;
        if (board[index]) return;

        board[index] = currentPlayer.getSign();
        checkResult();

        if (!gameFinished) {
            currentPlayer = (currentPlayer == player1) ? player2 : player1;
            message.innerText = `It's a ${currentPlayer.getName()}'s turn`;
        }
    }

    const updateBoard = () => {
        cells.forEach((cell, i) => cell.innerText = board[i]);
    };

    return { resetGame, changeCell, updateBoard};
})();

const Player = function (inputSign, playerIndex) {
    let sign = inputSign;
    let name = `Player ${playerIndex}`

    const getSign = () => {
        return sign;
    }

    const setName = (newName) => {
        if (newName) name = newName;
    }

    const getName = () => {
        return name;
    }

    return { getSign, setName, getName }
}

const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.querySelector('[data-reset-game]');
const changeNamesButton = document.querySelector('[data-change-names]');
const cancelButton = document.querySelector('[data-cancel]');
const modal = document.querySelector('[data-modal]');
const form = document.querySelector('[data-form]');


cells.forEach(cell => cell.addEventListener('click', function () {
    game.changeCell(this.dataset.index - 1);
    game.updateBoard();
}))

resetButton.addEventListener('click', function () {
    game.resetGame();
    game.updateBoard();
})

changeNamesButton.addEventListener('click', function() {
    modal.showModal();
})

cancelButton.addEventListener('click', function() {
    modal.close();
})

form.addEventListener('submit', function(e) {
    let data = new FormData(this);
    player1.setName(data.get('player-1-name'));
    player2.setName(data.get('player-2-name'));
    game.resetGame();
    game.updateBoard();
})

const player1 = Player('x', 1);
const player2 = Player('o', 2);
game.resetGame();