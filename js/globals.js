'use strict'

window.document.oncontextmenu = function () {
    return false;
}

const MINE = '💣'
const FLAG = '🚩'
var gNormal = '😊'
var gLose = '🤯'
var gWin = '😎'
var gLife = '❤'


var gBoard = [];


var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gHints = 3;

var gMines;



var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isWin: false,
    isHint: false,
    isSafe: false
}


var gLifes = []
var gSafe = 3;

var gHighScores = [];
var gHighScoresIdx;

var gTimeInterval;

var gElModal = document.querySelector('.modal')
var gElDifficulty = document.querySelector('.difficulty')
var gElSmiley = document.querySelector('.smiley')
