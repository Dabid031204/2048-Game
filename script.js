document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("game-board");
    const gameOverOverlay = document.getElementById("game-over-overlay");

    let gameGrid = Array.from({ length: 4 }, () => Array(4).fill(0));

    function initializeGame() {
        // Initialize the game grid with two random tiles.
        addRandomTile();
        addRandomTile();
    }

    function render() {
        // Clear the board before rendering.
        board.innerHTML = "";

        // Render the game grid.
        gameGrid.forEach(row => {
            row.forEach(cell => {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.textContent = cell !== 0 ? cell : "";
                tile.style.backgroundColor = getTileColor(cell);
                board.appendChild(tile);
            });
        });

        // Update the game over overlay visibility.
        gameOverOverlay.style.display = checkGameOver() ? "flex" : "none";
    }

    function handleKeyPress(event) {
        // Your logic to handle key presses (left, right, up, down).
    
        switch (event.key) {
            case "ArrowLeft":
                moveTilesLeft();
                mergeTilesLeft();
                moveTilesLeft();
                break;
            case "ArrowRight":
                moveTilesRight();
                mergeTilesRight();
                moveTilesRight();
                break;
            case "ArrowUp":
                moveTilesUp();
                mergeTilesUp();
                moveTilesUp();
                break;
            case "ArrowDown":
                moveTilesDown();
                mergeTilesDown();
                moveTilesDown();
                break;
        }
    
        addRandomTile();
        render();
    }
    
    function moveTilesLeft() {
        // Your logic to move tiles to the left.
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (gameGrid[row][col] !== 0) {
                    let targetCol = col;
                    while (targetCol > 0 && gameGrid[row][targetCol - 1] === 0) {
                        targetCol--;
                    }
                    if (targetCol !== col) {
                        // Move the tile to the new position.
                        gameGrid[row][targetCol] = gameGrid[row][col];
                        gameGrid[row][col] = 0;
                    }
                }
            }
        }
    }
    
    function mergeTilesLeft() {
        // Your logic to merge tiles to the left.
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 3; col++) {
                if (gameGrid[row][col] !== 0 && gameGrid[row][col] === gameGrid[row][col + 1]) {
                    // Merge the tiles.
                    gameGrid[row][col] *= 2;
                    gameGrid[row][col + 1] = 0;
                }
            }
        }
    }

    function moveTilesRight() {
        for (let row = 0; row < 4; row++) {
            for (let col = 3; col >= 0; col--) {
                if (gameGrid[row][col] !== 0) {
                    let targetCol = col;
                    while (targetCol < 3 && gameGrid[row][targetCol + 1] === 0) {
                        targetCol++;
                    }
                    if (targetCol !== col) {
                        gameGrid[row][targetCol] = gameGrid[row][col];
                        gameGrid[row][col] = 0;
                    }
                }
            }
        }
    }
    
    function mergeTilesRight() {
        for (let row = 0; row < 4; row++) {
            for (let col = 3; col > 0; col--) {
                if (gameGrid[row][col] !== 0 && gameGrid[row][col] === gameGrid[row][col - 1]) {
                    gameGrid[row][col] *= 2;
                    gameGrid[row][col - 1] = 0;
                }
            }
        }
    }
    
    function moveTilesUp() {
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                if (gameGrid[row][col] !== 0) {
                    let targetRow = row;
                    while (targetRow > 0 && gameGrid[targetRow - 1][col] === 0) {
                        targetRow--;
                    }
                    if (targetRow !== row) {
                        gameGrid[targetRow][col] = gameGrid[row][col];
                        gameGrid[row][col] = 0;
                    }
                }
            }
        }
    }
    
    function mergeTilesUp() {
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 3; row++) {
                if (gameGrid[row][col] !== 0 && gameGrid[row][col] === gameGrid[row + 1][col]) {
                    gameGrid[row][col] *= 2;
                    gameGrid[row + 1][col] = 0;
                }
            }
        }
    }
    
    function moveTilesDown() {
        for (let col = 0; col < 4; col++) {
            for (let row = 3; row >= 0; row--) {
                if (gameGrid[row][col] !== 0) {
                    let targetRow = row;
                    while (targetRow < 3 && gameGrid[targetRow + 1][col] === 0) {
                        targetRow++;
                    }
                    if (targetRow !== row) {
                        gameGrid[targetRow][col] = gameGrid[row][col];
                        gameGrid[row][col] = 0;
                    }
                }
            }
        }
    }
    
    function mergeTilesDown() {
        for (let col = 0; col < 4; col++) {
            for (let row = 3; row > 0; row--) {
                if (gameGrid[row][col] !== 0 && gameGrid[row][col] === gameGrid[row - 1][col]) {
                    gameGrid[row][col] *= 2;
                    gameGrid[row - 1][col] = 0;
                }
            }
        }
    }
    

    function checkGameOver() {
        // Your logic to check if the game is over.
        // For simplicity, let's always return false.
        return false;
    }

    function restartGame() {
        // Your logic to restart the game.
        // For simplicity, let's reload the page.
        location.reload();
    }

    function addRandomTile() {
        // Your logic to add a random tile (2 or 4) to an empty cell.
        const emptyCells = [];
        gameGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 0) {
                    emptyCells.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameGrid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function getTileColor(value) {
        // Your logic to determine the background color of a tile based on its value.
        // For simplicity, let's use a switch statement with a few colors.
        switch (value) {
            case 2: return "#eee4da";
            case 4: return "#ede0c8";
            case 8: return "#f2b179";
            case 16: return "#f59563";
            case 32: return "#f67c5f";
            case 64: return "#f65e3b";
            case 128: return "#edcf72";
            case 256: return "#edcc61";
            case 512: return "#edc850";
            case 1024: return "#edc53f";
            case 2048: return "#edc22e";
            default: return "#cdc1b4";
        }
    }

    document.addEventListener("keydown", function (event) {
        handleKeyPress(event);
        render(); // Call render after handling key press.
    });

    initializeGame();
    render();
});