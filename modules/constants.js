const canvas = document.querySelector('#root')
const canvas2 = document.querySelector('#root2')
const ctx = canvas.getContext('2d')
const ctx2 = canvas2.getContext('2d')


const counterSpan = document.getElementById('generationCounter')
const startButton = document.getElementById('start')
const clearButton = document.getElementById('clear')
const restoreLastTryButton = document.getElementById('restoreLastTry')
const resetLastTryButton = document.getElementById('resetLastTry')
const saveOnStartCheckBox = document.getElementById('saveOnStartCheckBox')
const randomFillButton = document.getElementById('randomFillButton')
const randomFillInput = document.getElementById('randomFillValue')

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 400

const CELL_SIZE = 5

const WIDTH = CANVAS_WIDTH / CELL_SIZE
const HEIGHT = CANVAS_HEIGHT / CELL_SIZE

const INTERVAL = 60

