'use strict'


function renderHints() {
    var elHint = document.querySelector('.hints');
    var strHtml = '<h3>Click the bulb for hint</h3>';
    for (var i = 0; i < 3; i++) {
        strHtml += `<i class="far fa-lightbulb far-${i}" onclick="useHint(this)"></i>`
    }
    elHint.innerHTML = strHtml;
}

function useHint(elHint) {
    if (gGame.isOn && gHints) {
        elHint.classList.remove('far');
        elHint.classList.add('fas');
        gGame.isHint = true;
    } else return
}

function hintRevile(idx, jdx) {
    if (!gGame.isHint || !gHints) return;
    var currI = idx;
    var currJ = jdx;
    for (var i = currI - 1; i <= currI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = currJ - 1; j <= currJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.add('clicked');
            if (gBoard[i][j].isMine) {
                elCell.innerText = MINE
            }
        }
    }
    gHints--;
    setTimeout(hintUnrevile, 1000, idx, jdx);
}

function hintUnrevile(i, j, tempMat) {
    var currI = i;
    var currJ = j;
    for (var i = currI - 1; i <= currI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = currJ - 1; j <= currJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            var previous = elCell.innerText
            if (gBoard[i][j].isMine) {
                elCell.innerText = '';
            }
            if (gBoard[i][j].isShown === false) elCell.classList.remove('clicked');
        }
    }
    gGame.isHint = false;
}