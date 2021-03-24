'use strict'

var gBoard = [];

var gNormal = '😊'
var gLose = '🤯'
var gWin = '😎'
var gLife = '❤'

var gLevel = {
    SIZE: 4,
    MINES: 2
};


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isWin: false,
    isHint: false
}


var gLifes = []

var gTimeInterval;

var gElModal = document.querySelector('.modal')
var gElDifficulty = document.querySelector('.difficulty')
var gElSmiley = document.querySelector('.smiley')


function init() {
    gElSmiley.innerText = gNormal
    gBoard = getMat(gLevel.SIZE)
    printMat(gBoard, '.board')
    if (gLevel.SIZE === 4) renderLife(2);
    else renderLife(3)
    renderHints()
}

function startGame(elCell, i, j) {
    gElDifficulty.style.display = 'none';
    gBoard = getMat(gLevel.SIZE, i, j)
    printMat(gBoard, '.board')
    var minesPosition = [];
    minesPosition = setMinesPosition(i, j)
    setMines(gBoard, minesPosition)
    gGame.isOn = true;
    cellClicked(elCell, i, j)
    startTime();
}


function startTime() {
    var sTime = Date.now()
    var elTimeTd = document.querySelector('.time');
    gTimeInterval = setInterval(() => {
        var currTime = Date.now()
        var passedTime = new Date(currTime - sTime)
        gGame.secsPassed = (passedTime.getSeconds() < 10) ? '0' + passedTime.getSeconds() : passedTime.getSeconds();
        elTimeTd.innerText = `${gGame.secsPassed}`
    }, 1000)
}

function renderLife(size) {
    var elLife = document.querySelector('.life');
    var str= '';
    gLifes = []
    for (var i = 0; i < size; i++) {
        gLifes.push(gLife)
        str += gLife;
        str += '|'
    }
    elLife.innerText = str
}


function getSize(size, minesAmount) {
    gLevel.SIZE = size;
    gLevel.MINES = minesAmount;
    init();
}


function checkGameOver() {}

function gameOver() {
    gElModal.style.display = 'block';
    gElDifficulty.style.display = 'block';
    clearInterval(gTimeInterval);
    gGame.isOn = false;
    gElSmiley.innerText = (gGame.markedCount === gMines.length) ? gWin : gLose;
}

function restart() {
    gElModal.style.display = 'none';
    gElDifficulty.style.display = 'none'
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    var elTimeTd = document.querySelector('.time');
    elTimeTd.innerText = '00'
    gBoard = [];
    gLifes = []
    init();
}

