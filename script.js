function isSafe(board, row, col, N) {
    for (let i = 0; i < row; i++) {
        if (board[i][col]) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (board[i][j]) return false;
    }
    return true;
}

function solveNQueensUtil(board, row, solutions, N) {
    if (row === N) {
        solutions.push(board.map(r => r.slice()));
        return;
    }
    for (let col = 0; col < N; col++) {
        if (isSafe(board, row, col, N)) {
            board[row][col] = true;
            solveNQueensUtil(board, row + 1, solutions, N);
            board[row][col] = false; // Backtrack
        }
    }
}

function solveNQueens() {
    const N = parseInt(document.getElementById('n').value);
    const solutions = [];
    const board = Array.from({ length: N }, () => Array(N).fill(false));
    solveNQueensUtil(board, 0, solutions, N);
    displaySolutions(solutions, N);
}

function displaySolutions(solutions, N) {
    const solutionsDiv = document.getElementById('solutions');
    solutionsDiv.innerHTML = '';
    solutions.forEach((solution, index) => {
        const solutionDiv = document.createElement('div');
        solutionDiv.classList.add('solution');
        solutionDiv.innerHTML = `<h3>Solution ${index + 1}:</h3>`;
        const boardDiv = document.createElement('div');
        boardDiv.classList.add('board');
        
        solution.forEach(row => {
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                if (cell) {
                    const queenDiv = document.createElement('div');
                    queenDiv.classList.add('queen');
                    cellDiv.appendChild(queenDiv);
                }
                boardDiv.appendChild(cellDiv);
            });
        });
        solutionDiv.appendChild(boardDiv);
        solutionsDiv.appendChild(solutionDiv);
    });
}
