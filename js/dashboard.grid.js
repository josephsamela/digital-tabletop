var grid = {
    square: {
        enable: false,
        scale: 25
    },    
    hex: {
        enable: false,
        scale: 100
    }
}

function gridSquareEnable(t){
    grid.square.enable = !grid.square.enable
    updateToggleState(t, grid.square.enable)
    console.log('gridSquareMute is '+grid.square.enable)

    if (grid.square.enable == true){
        $('#canvas_grid_square').show()
    } else {
        $('#canvas_grid_square').hide()
    }
}

function gridSquareScale(t){
    grid.square.scale = t.value
    console.log('gridSquareScale is '+t.value)
    drawSquareGrid(w, h, 'canvas_grid_square', t.value);
}

function gridHexEnable(t){
    grid.hex.enable = !grid.hex.enable
    updateToggleState(t, grid.hex.enable)
    console.log('gridHexMute is '+grid.hex.enable)

    if (grid.hex.enable == true){
        $('#canvas_grid_hex').show()
    } else {
        $('#canvas_grid_hex').hide()
    }
}

function gridHexScale(t){
    grid.hex.scale = Number(t.value)
    console.log('gridHexScale is '+grid.hex.scale)
    drawHexGrid('canvas_grid_hex', grid.hex.scale)
}
