const game = (function () {
    let cells = document.querySelectorAll('[data-cell]');
    let board = [
        'x', 'x', 'o',
        'o', 'x', 'o',
        'x', 'o', 'x'
    ];

    const resetGame = () => {
        board = board.map(item => item = '');
    }

    const updateBoard = () => {
        cells.forEach((cell, i) => cell.innerText = board[i]);
    };

    return { updateBoard, resetGame };
})();

const resetButton = document.querySelector('[data-reset-game]')
resetButton.addEventListener('click', function () {
    game.resetGame();
    game.updateBoard();
})

game.updateBoard();