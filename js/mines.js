'use strict'

var gMines;


function setMinesNegsCount(i, j) {
    var count = 0;
    var currI = i;
    var currJ = j;
    for (var i = currI - 1; i <= currI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = currJ - 1; j <= currJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (i === currI && j === currJ) continue
            if (gBoard[i][j].isMine) count++;
        }
    }
    return count;
}

function setMinesPosition(clickedI, clickedJ) {
    gMines = [];
    for (var i = 0; i < gLevel.MINES; i++) {
        var cell = {
            i: getRandIntInclusive(0, gLevel.SIZE - 1),
            j: getRandIntInclusive(0, gLevel.SIZE - 1)
        }
        if (!gGame.isOn) {
            while (clickedI === cell.i && clickedJ === cell.j) {
                cell.i = getRandIntInclusive(0, gLevel.SIZE - 1)
                cell.j = getRandIntInclusive(0, gLevel.SIZE - 1)
            }
        }
        if(gMines < gLevel.length) setMinesPosition(clickedI, clickedJ)
        gMines.push(cell);
    }
    return gMines;
}

function setMines(newMat, minesPosition) {
    for (var i = 0; i < minesPosition.length; i++) {
        newMat[minesPosition[i].i][minesPosition[i].j].isMine = true;
    }
}