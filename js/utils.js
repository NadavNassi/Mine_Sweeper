'use strict'




function getMat(size, i, j) {
    var newMat = [];
    for (var i = 0; i < size; i++) {
        newMat[i] = [];
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            newMat[i][j] = cell;
        }
    }
    return newMat
}

function printMat(mat, selector) {
    var strHTML = `<table class="board-container"><tbody>`;
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = `cell cell-${i}-${j}`;
            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j}), hintRevile(${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}





function getRandIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
