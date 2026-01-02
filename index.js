'use strict';

const BACKSPACE_KEY = 'Backspace';
const ENTER_KEY = 'Enter';

const MAX_NUMBER_OF_ATTEMPTS = 6;
const history = [];
let currentWord = '';


const init = () => {
    console.log('welcome to Super Fandle!');

    //Grab the gameboard
    const gameBoard = document.querySelector('#board');

    generateBoard(gameBoard);

    document.addEventListener('keydown', event => onKeyDown(event.key));
}

const generateBoard = (board, rows = 6, columns = 5) => {
    for (let row = 0; row < rows; row++) {
        const elmRow = document.createElement('ul');

        elmRow.setAttribute('data-row', row);

        for (let column = 0; column < columns; column++) {
            const elmColumn = document.createElement('li');
            elmColumn.setAttribute('data-status', 'empty');
            elmColumn.setAttribute('data-animation', 'idle');

            elmRow.appendChild(elmColumn);
        }

        board.appendChild(elmRow)
    }
};

const onKeyDown = (key) => {
    //Limit guesses to 6
    if (history.length >= MAX_NUMBER_OF_ATTEMPTS) return;

    const currentRow = document.querySelector(`#board ul[data-row='${history.length}']`);

    let targetColumn = currentRow.querySelector('[data-status="empty"]');

    if (key === BACKSPACE_KEY) {
        if (targetColumn === null) {
            targetColumn = currentRow.querySelector('li:last-child');
        } else {
            targetColumn = targetColumn.previousElementSibling ?? targetColumn;
        }

        targetColumn.textContent = '';
        targetColumn.setAttribute('data-status', 'empty');

        currentWord = currentWord.slice(0, -1);

        return;
    }

    if (currentWord.length >= 5) return;

    const upperCaseLetter = key.toUpperCase();

    if (/^[A-Z]$/.test(upperCaseLetter)) {
        currentWord += upperCaseLetter;

        targetColumn.textContent = upperCaseLetter;
        targetColumn.setAttribute('data-status', 'filled');
        targetColumn.setAttribute('data-animation', 'pop');
    }
}

//Call the initilaization function when the DOM is loaded to get
//everything setup and the game repsonding to any user actions
document.addEventListener('DOMContentLoaded', init);