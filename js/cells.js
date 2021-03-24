'use strict'
const MINE = '💣'
const FLAG = '🚩'



function cellClicked(elCell, i, j) {
    if (!gGame.isOn && !gGame.shownCount) {
        startGame(elCell, i, j)
        return;
    }
    if (!gGame.isOn) return;
    if (elCell.classList.contains('.clicked')) return;
    if (gBoard[i][j].isMark) return;
    if (gGame.isBonus) return;
    if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
        expandShown(gBoard, i, j)
        return;
    }
    if (gBoard[i][j].isMine && gLifes.length > 1) {
        renderCell(i, j, MINE)
        gLifes.pop();
        gGame.markedCount++;
        renderLife(gLifes.length)
        if (gGame.markedCount === gMines.length) {
            gameOver();
        }
        return;
    }
    if (gBoard[i][j].isMine) {
        renderCell(i, j, MINE)
        gLifes.pop();
        renderLife(gLife.length)
        gameOver();
        return;
    }
}

function cellMarked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (!gBoard[i][j].isMark) {
        gBoard[i][j].isMark = true;
        elCell.innerText = FLAG;
        if (gBoard[i][j].isMine) gGame.markedCount++;
    } else {
        gBoard[i][j].isMark = false;
        elCell.innerText = '';
        if (!gBoard[i][j].isMine) gGame.markedCount--;
    }
    if (gGame.markedCount === gMines.length) {
        gameOver();
    }
}

function expandShown(board, idx, jdx) {
    if (!board[idx][jdx].isMine || gGame.isBonus) {
        for (var i = idx - 1; i <= idx + 1; i++) {
            if (i < 0 || i > gBoard.length - 1) continue
            for (var j = jdx - 1; j <= jdx + 1; j++) {
                if (j < 0 || j > gBoard[0].length - 1) continue
                if (board[i][j].isMine) continue
                var negsCount = setMinesNegsCount(i, j);
                gBoard[i][j].minesAroundCount = negsCount;
                if (negsCount > 0) renderCell(i, j, negsCount)
                else {
                    renderCell(i, j, '')
                    // expandShown(gBoard, i, j);
                }
                gGame.shownCount++;
                gBoard[i][j].isShown = true;
            }
        }
    }
}


function renderCell(i, j, value) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.add('clicked')
    elCell.innerHTML = value;
}

