'use strict'

// window.localStorage.removeItem('highScore')

function getHighScore() {
    switch (gLevel.SIZE) {
        case 4:
            gHighScoresIdx = 0;
            break;
        case 8:
            gHighScoresIdx = 1;
            break;
        case 12:
            gHighScoresIdx = 2;
            break;
    }
    gHighScores = JSON.parse(window.localStorage.highScore)
}

function renderHighScore() {
    if (!localStorage.highScore) createLocalStorage();
    var elHighScore = document.querySelector('.high-score')
    getHighScore();
    if (!gHighScores[gHighScoresIdx]) elHighScore.innerHTML = '';
    else {
        var strHtml = '<table><tr><td>Name</td><td>Time</td>'
        strHtml += `<tr><td>${gHighScores[gHighScoresIdx].name}</td><td>${gHighScores[gHighScoresIdx].time} secondes</td></tr>`
        strHtml += '</table>'
        elHighScore.innerHTML = strHtml;
    }
}


function checkIfNewHighScore() {
    if(!gGame.isWin) return;
    if (!gHighScores[gHighScoresIdx]) {
        gHighScores[gHighScoresIdx]=createNewHighScore()
    }else {
        if (gGame.secsPassed < gHighScores[gHighScoresIdx].time){
            gHighScores[gHighScoresIdx] = createNewHighScore()
        }
    }
    

    localStorage.setItem('highScore', JSON.stringify(gHighScores))
}

function createNewHighScore() {
    var newHighScore = {
        name: prompt(`Congrats! you are in  #1 place. What\'s your name?`),
        time: gGame.secsPassed
    }
    return newHighScore
}

function createLocalStorage() {
    console.log('in create');
    var gHighScores = [null, null, null]
    window.localStorage.setItem('highScore', JSON.stringify(gHighScores))
}


