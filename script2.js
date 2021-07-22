const GAME_BOARD = document.getElementById("game-board")

const COLOURS = ['#dc143c', '#009dff']
const PLAYERS = ['RED', 'BLUE']
var SCORES = [0, 0]
var currentPlayer, humanPlayer
var offType = ""

let gameboard = []
let data = [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]
var slotCounter = 0

main()
function main() {
    currentPlayer = humanPlayer = 0
    createBoard()
    displayText()
}

function createBoard() {
    gameboard = []
    for (var r = 0; r < 5; r++) {
        let row = []
        if (r == 0) {
            const slotElement = document.createElement("label")
            slotElement.classList.add("label1")
            const slot = {slotElement, r, c}
            row.push(slot)
        } else {
            for (var c = 0; c < 3; c++) {
                if (r == 4) {
                    if (c == 0 || c == 2) {
                        const slotElement = document.createElement("label")
                        slotElement.classList.add("label2")
                        const slot = {slotElement, r, c}
                        row.push(slot)
                    } else {
                        const slotElement = document.createElement("label")
                        slotElement.classList.add("label3")
                        const slot = {slotElement, r, c}
                        row.push(slot)
                    }
                } else {
                    const slotElement = document.createElement("div")
                    slotElement.classList.add("slot")
                    const slot = {slotElement, r, c}
                    row.push(slot)
                }
            }
        }
        gameboard.push(row)
    }
    var counter = 1
    gameboard.forEach(row => {
        row.forEach(slot => {
            if (counter > 1 && counter < 11) {
                slot.slotElement.addEventListener('mousedown', e => {
                    switch (e.which) {
                        case 1: 
                            on_click(slot)
                            break
                    }
                })
            }
            GAME_BOARD.appendChild(slot.slotElement)
            counter++
        })
    })
}

function displayText() {
    gameboard[0][0].slotElement.innerHTML = 'TIC TAC TOE'
    gameboard[4][0].slotElement.innerHTML = SCORES[0]
    gameboard[4][1].slotElement.innerHTML = 'SCORE'
    gameboard[4][2].slotElement.innerHTML = SCORES[1]
}

function on_click(slot) {
    on()
    const slotElement = slot.slotElement
    var R = slot.r, C = slot.c
    if (isEmpty(R, C) && currentPlayer == humanPlayer) {
        slotElement.style.backgroundColor = COLOURS[currentPlayer]
        data[R][C] = PLAYERS[currentPlayer]
        slotCounter++
        currentPlayer = (currentPlayer + 1) % 2
        var condition = checkWin()
        if (condition != 'RED' && condition != 'BLUE' && condition != 'TIE')
            window.setTimeout(getCompMove, 600)
        else
            gameOver(condition)
    } else off()
}

function getCompMove() { // using minimax algo
    var bestScore = -Infinity, move 
    for (var r = 1; r < 4; r++) {
        for (var c = 0; c < 3; c++) {
            if (!isEmpty(r, c)) continue
            data[r][c] = PLAYERS[currentPlayer]
            var score = minimax()
            data[r][c] = ""
            if (score > bestScore) {
                bestScore = score
                move = {r, c}
            }
        }
    }
    data[move.r][move.c] = PLAYERS[currentPlayer]
    gameboard[move.r][move.c].slotElement.style.backgroundColor = COLOURS[currentPlayer]
    slotCounter++
    currentPlayer = (currentPlayer + 1) % 2
    var condition = checkWin()
    if (condition != 'RED' && condition != 'BLUE' && condition != 'TIE') off()
    else gameOver(condition)
}

function minimax() {
    return 1
}

function isEmpty(row, col) {
    return data[row][col] == ""
}

function gameOver(condition) {
    if (condition == 'RED' || condition == 'BLUE') displayWin(condition)
    if (condition == 'TIE') displayTie()
    on()
    offType = "RESTART"
    window.setTimeout(off, 1500);
}

function checkWin() {
    for (var r = 1; r < 4; r++) { // horizontals
        if (data[r][0] == data[r][1] && data[r][1] == data[r][2] && data[r][0] != "") return data[r][0]
    }
    if (data[1][0] == data[2][1] && data[2][1] == data[3][2] && data[1][0] != "") return data[1][0]
    if (data[1][2] == data[2][1] && data[2][1] == data[3][0] && data[1][2] != "") return data[1][2]
    for (var c = 0; c < 3; c++) { // verticals
        if (data[1][c] == data[2][c] && data[2][c] == data[3][c] && data[1][c] != "") return data[1][c]
    }
    if (slotCounter == 9) return 'TIE'
    return 'NONE'
}

function displayTie() {
    gameboard[0][0].slotElement.innerHTML = "TIE!"
}

function displayWin(colour) {
    gameboard[0][0].slotElement.innerHTML = colour + " WINS!"
    if (colour == 'RED') gameboard[4][0].slotElement.innerHTML = ++SCORES[0]
    else gameboard[4][2].slotElement.innerHTML = ++SCORES[1]
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
 }

function disableGame() {
    document.getElementById("overlay").style.display = "block";
}

function removeElements() {
    gameboard.forEach(row => {
        row.forEach(slot => {
            slot.slotElement.remove()
        })
    })
}

function resetGame() {
    data = [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]
    currentPlayer = (SCORES[0] + SCORES[1]) % 2
    slotCounter = 0
    offType = ""
    removeElements()
    createBoard()
    displayText()
    document.getElementById("overlay").style.display = "none";
    if (currentPlayer != humanPlayer) {
        // alert("bot")
    }
}

function stopProp(event) {
    event.stopPropagation();
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    if (offType == "RESTART") resetGame()
}