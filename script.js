const GAME_BOARD = document.getElementById("game-board")

const COLOURS = ['#dc143c', '#009dff']
const PLAYERS = ['RED', 'BLUE']
var SCORES = [0, 0]
var currentPlayer

let gameboard = []
let data = [[], [], [], [], []]
let winStatus = [8]
var slotCounter = 0

main()
function main() {
    currentPlayer = 0
    createBoard()
    displayText()
}

function createBoard() {
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
    for (var i = 0; i < 5; i++) data[i] = []
}

function displayText() {
    gameboard[0][0].slotElement.innerHTML = 'TIC TAC TOE'
    gameboard[4][0].slotElement.innerHTML = '0'
    gameboard[4][1].slotElement.innerHTML = 'SCORE'
    gameboard[4][2].slotElement.innerHTML = '0'
}
 
function on_click(slot) {
    const slotElement = slot.slotElement
    var R = slot.r, C = slot.c
    if (data[R][C] != 'X' && data[R][C] != 'O') {
        slotElement.style.backgroundColor = COLOURS[currentPlayer]
        data[R][C] = PLAYERS[currentPlayer]
        slotCounter++
        var condition = checkWin()
        if (condition == 'RED' || condition == 'BLUE') {
            displayWin(condition)
        }
        currentPlayer = (currentPlayer + 1) % 2
    }
}

function checkWin() {
    for (var r = 1; r < 4; r++) { // horizontals
        if (data[r][0] == data[r][1] && data[r][1] == data[r][2]) return data[r][0]
    }
    if (data[1][0] == data[2][1] && data[2][1] == data[3][2]) return data[1][0]
    if (data[1][2] == data[2][1] && data[2][1] == data[3][0]) return data[1][2]
    for (var c = 0; c < 3; c++) { // verticals
        if (data[1][c] == data[2][c] && data[2][c] == data[3][c]) return data[1][c]
    }
    if (slotCounter == 9) return 'Tie'
    return 'NONE'
}

function displayWin(colour) {
    gameboard[0][0].slotElement.innerHTML = colour + " WINS!"
    if (colour == 'RED') gameboard[4][0].slotElement.innerHTML = ++SCORES[0]
    else gameboard[4][2].slotElement.innerHTML = ++SCORES[1]
    setTimeout(disableGame(), 3000)
    resetGame()
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
 }

function disableGame() {
    for (var r = 1; r < 4; r++) {
        for (var c = 0; c < 3; c++) {
            oldSlot = gameboard[r][c].slotElement
            newSlot = document.createElement('div')
            newSlot.classList.add("slot")
            newSlot.style.backgroundColor = oldSlot.style.backgroundColor
            oldSlot.parentNode.replaceChild(newSlot, oldSlot);
        }
    }
}

function resetGame() {
    data = [[], [], [], [], []]
    currentPlayer = (SCORES[0] + SCORES[1]) % 2

}


