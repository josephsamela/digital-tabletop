//
// Updates
// 
function update_gameboard_board_grid() {
    gridSquareEnable(STATE.board.grid.square.enable)
    gridSquareScale(STATE.board.grid.square.scale)
    gridSquareOpacity(STATE.board.grid.square.opacity)
    gridHexEnable(STATE.board.grid.hex.enable)
    gridHexScale(STATE.board.grid.hex.scale)
    gridHexOpacity(STATE.board.grid.hex.opacity)
}

// 
// Client updates
// 
function gridSquareEnable(bool){
    if (bool == true){
        $('#canvas_grid_square').show()
    } else {
        $('#canvas_grid_square').hide()
    }
}

function gridSquareScale(value){
    drawSquareGrid(w, h, 'canvas_grid_square', value);
}

function gridSquareOpacity(value){
    $('#canvas_grid_square').css('opacity', value)
}

function gridHexEnable(bool){
    if (bool == true){
        $('#canvas_grid_hex').show()
    } else {
        $('#canvas_grid_hex').hide()
    }
}

function gridHexScale(value){
    drawHexGrid('canvas_grid_hex', value)
}

function gridHexOpacity(value){
    $('#canvas_grid_hex').css('opacity', value)
}

