//
// Updates
// 
function update_dashboard_board_grid() {
    gridSquareEnable(STATE.board.grid.square.enable)
    gridSquareScale(STATE.board.grid.square.scale)
    gridSquareOpacity(STATE.board.grid.square.opacity)
    gridHexEnable(STATE.board.grid.hex.enable)
    gridHexScale(STATE.board.grid.hex.scale)
    gridHexOpacity(STATE.board.grid.hex.opacity)
}

// 
// Button callbacks
// 
function dashboard_board_grid_square_enable(that) {
    updateToggleState('#grid-square-enable-control', !STATE.board.grid.square.enable)
    STATE.board.grid.square.enable = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_grid_square_scale(that) {
    STATE.board.grid.square.scale = that.value
    socket.emit('client-update', STATE);
}
function dashboard_board_grid_square_opacity(that) {
    STATE.board.grid.square.opacity = that.value
    socket.emit('client-update', STATE);
}
function dashboard_board_hex_square_enable(that) {
    updateToggleState('#grid-hex-enable-control', !STATE.board.grid.hex.enable)
    STATE.board.grid.hex.enable = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_hex_square_scale(that) {
    STATE.board.grid.hex.scale = that.value
    socket.emit('client-update', STATE);
}
function dashboard_board_hex_square_opacity(that) {
    STATE.board.grid.hex.opacity = that.value
    socket.emit('client-update', STATE);
}

// 
// Client updates
// 
function gridSquareEnable(bool){
    updateToggleState('#grid-square-enable-control', bool)
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
    updateToggleState('#grid-hex-enable-control', bool)
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

