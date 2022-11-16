const setCanvasStyle = () => {
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    canvas2.width = CANVAS_WIDTH
    canvas2.height = CANVAS_HEIGHT

    document.getElementById('opacityRange').addEventListener('change', (e) => {
        const value = e.currentTarget.value / 100
        console.log(value)
        canvas.style.backgroundImage = `linear-gradient(rgba(0, 63, 162, ${value}), transparent 1px),linear-gradient(90deg,rgba(0, 63, 162, ${value}), transparent 1px)`
        canvas2.style.backgroundImage = `linear-gradient(rgba(0, 63, 162, ${value}), transparent 1px),linear-gradient(90deg,rgba(0, 63, 162, ${value}), transparent 1px)`
    })

    canvas.style.backgroundSize = `${CELL_SIZE}px ${CELL_SIZE}px`
    canvas2.style.backgroundSize = `${CELL_SIZE}px ${CELL_SIZE}px`
}
