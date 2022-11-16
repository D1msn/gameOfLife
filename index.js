setCanvasStyle()
let firstGeneration = []
let counter = 0
let interval
let lastTry = []

const inCanvas = (x, y) => x < WIDTH && y < HEIGHT && x >= 0 && y >= 0

const clearMainCanvas = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}
const clearPreviewCanvas = () => {
    ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function firstRender() {
    clearMainCanvas()
    for (let x = 0; x < WIDTH; x++) {
        firstGeneration[x] = []
        for (let y = 0; y < HEIGHT; y++) {
            firstGeneration[x][y] = 0
        }
    }
}

firstRender()

function getCellValue(x, y) {
    if (inCanvas(x, y)) return firstGeneration[x][y]

    return 0
}

const newGeneration = () => {
    clearMainCanvas()
    const newGeneration = []
    counterSpan.innerText = `${counter++}`
    for (let x = 0; x < WIDTH; x++) {
        newGeneration[x] = []
        for (let y = 0; y < HEIGHT; y++) {
            const lifePower = getLifePower(x, y)
            if (firstGeneration[x][y] === 0 && lifePower === 3) {
                newGeneration[x][y] = 1
            } else if (firstGeneration[x][y] === 1 && (lifePower > 3 || lifePower < 2)) {
                newGeneration[x][y] = 0
            } else {
                newGeneration[x][y] = firstGeneration[x][y]
            }

            if (newGeneration[x][y] === 1) {
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    firstGeneration = [...newGeneration]
}

function getLifePower(x, y) {
    const lifePower = getCellValue(x - 1, y - 1)
        + getCellValue(x, y - 1)
        + getCellValue(x + 1, y - 1)
        + getCellValue(x + 1, y)
        + getCellValue(x + 1, y + 1)
        + getCellValue(x, y + 1)
        + getCellValue(x - 1, y + 1)
        + getCellValue(x - 1, y)

    return lifePower
}

function drawMainField() {
    clearMainCanvas()
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (firstGeneration[x][y] === 1) {
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }
}

function drawPreviewField() {
    clearPreviewCanvas()
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (lastTry[x][y] === 1) {
                ctx2.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }
}

const resetGame = () => {
    clearInterval(interval)
    interval = false
    counterSpan.innerText = `0`
    clearMainCanvas()
}

const onMouseDrawCanvas = (event) => {
    const {offsetX, offsetY} = event
    const x = Math.floor(offsetX / CELL_SIZE)
    const y = Math.floor(offsetY / CELL_SIZE)

    if (inCanvas(x, y)) {
        firstGeneration[x][y] = event.ctrlKey ? 0 : 1
        drawMainField()
    }
}

canvas.addEventListener('click', onMouseDrawCanvas)

canvas.onmousedown = function () {
    this.onmousemove = onMouseDrawCanvas
    this.onmouseup = function () {
        this.onmousemove = function () {
        };
    }
}

restoreLastTryButton.addEventListener('click', () => {
    if (lastTry.length > 0) {
        firstGeneration = [...lastTry]
        resetGame()
        drawMainField()
    }
})

resetLastTryButton.addEventListener('click', () => {
    if (lastTry.length > 0) {
        resetLastTry()
    } else {
        resetLastTryButton.innerText = 'Reset last try'
        saveLastTry()
    }
})

clearButton.addEventListener('click', () => {
    startButton.innerText = 'Start'
    resetGame()
    firstRender()
})

function resetLastTry() {
    lastTry = []
    clearPreviewCanvas()
}

function saveLastTry() {
    lastTry = [...firstGeneration]
    drawPreviewField()
}

let saveOnChange = false
saveOnStartCheckBox.addEventListener('change', (e) => { saveOnChange = e.target.checked })

startButton.addEventListener('click', () => {
    if(saveOnChange){
        saveLastTry()
    }
    if (interval) {
        startButton.innerText = 'Start'
        clearInterval(interval)
        interval = false
    } else {
        startButton.innerText = 'Stop'
        interval = setInterval(newGeneration, INTERVAL)
    }
})



