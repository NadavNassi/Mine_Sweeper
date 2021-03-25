'use strict'



function cellClicked(elCell, i, j) {
    if (!gGame.isOn && !gGame.shownCount) {
        startGame(elCell, i, j)
        return;
    }
    if (!gGame.isOn) return;
    if (elCell.classList.contains('.clicked')) return;
    if (gBoard[i][j].isMark) return;
    if (gGame.isHint) return;
    if (gGame.isSafe) {
        var value = setMinesNegsCount(i, j);
        renderCell(i, j, value);
        gGame.isSafe = false;
        gGame.shownCount++;
        gBoard[i][j].isShown = true;
        renderSafeButton();
        return;
        if (gBoard[i][j].isMine) gGame.markedCount++;
        return;
    }
    if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
        gBoard[i][j].minesAroundCount = setMinesNegsCount(i, j)
        if(!gBoard[i][j].minesAroundCount){
            renderCell(i, j, '');
            expandShown(gBoard, i, j);
        } else renderCell(i, j, gBoard[i][j].minesAroundCount)
        return;
    }
    if (gBoard[i][j].isMine) {
        renderCell(i, j, MINE)
        gLifes.pop();
        gGame.markedCount++;
        gGame.shownCount++;
        renderLife(gLifes.length)
        checkGameOver();
        return;
    }
}

function cellMarked(elCell, i, j) {
    var elFlags = document.querySelector('.marked')
    if (!gGame.isOn) return;
    if (elCell.classList.contains('clicked')) return;
    if (!gBoard[i][j].isMark) {
        gBoard[i][j].isMark = true;
        elCell.innerText = FLAG;
        if (gBoard[i][j].isMine) {
            gGame.markedCount++;
        }
        elFlags.innerText = (gGame.markedCount < 10) ? '0' + gGame.markedCount : gGame.markedCount
    } else {
        gBoard[i][j].isMark = false;
        elCell.innerText = '';
        if (gBoard[i][j].isMine) gGame.markedCount--;
        elFlags.innerText = (gGame.markedCount < 10) ? '0' + gGame.markedCount : gGame.markedCount
    }
    checkGameOver();
}


function expandShown(board, idx, jdx) {
    if (!board[idx][jdx].isMine && !gGame.isHint) {
        for (var i = idx - 1; i <= idx + 1; i++) {
            if (i < 0 || i > gBoard.length - 1) continue;
            for (var j = jdx - 1; j <= jdx + 1; j++) {
                if(i === idx && j === jdx) continue;
                if (j < 0 || j > gBoard[0].length - 1) continue;
                if (board[i][j].isMine) continue;
                if (board[i][j].isShown) continue;
                if (board[i][j].isMark) continue;
                var negsCount = setMinesNegsCount(i, j);
                gBoard[i][j].minesAroundCount = negsCount;
                if (negsCount > 0) renderCell(i, j, negsCount)
                else {
                    renderCell(i, j, '');
                    expandShown(gBoard, i, j);
                }
            }
        }
    }
}


function renderCell(i, j, value) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.add('clicked')
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
    elCell.innerHTML = (value === 0) ? '' : value;
}

function useSafeClick() {
    if (gSafe > 0) {
        gGame.isSafe = true;
        gSafe--;
    } else {
        var elSafeBtn = document.querySelector('.safe')
        elSafeBtn = '<button class="btn-safe" onclick="useSafeClick()" disable>SAFE CLICK</button>'
    }
}





// function expandShown(board, idx, jdx) {
//     if (!board[idx][jdx].isMine && !board[idx][jdx].isMark && !board[idx][jdx].isShown && !board[idx][jdx].minesAroundCount) {
//         board[idx][jdx].isShown = true;
//         renderCell(idx, jdx, '');
//         gGame.shownCount++;
//         renderCells(idx, jdx);
//     } else if (board[idx][jdx].minesAroundCount >= 0 && !board[idx][jdx].isShown) {
//         gBoard[idx][jdx].isShown = true;
//         renderCell(idx, jdx, board[idx][jdx].minesAroundCount);
//         gGame.shownCount++;
//     }
// }

// function renderCells(idx, jdx) {
//     for (var i = idx - 1; i <= idx + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue;
//         for (var j = jdx - 1; j <= jdx + 1; j++) {
//             if (i === idx && j === jdx)
//                 continue;
//             if (j < 0 || j >= gBoard[i].length)
//                 continue;
//             if (gBoard[i][j].minesAroundCount >= 0 && !gBoard[i][j].isShown) {
//                 expandShown(gBoard, i, j);
//             }
//         }
//     }
// }