//
// Updates
// 
function update_gameboard_board_fog() {
    fogEnable(STATE.board.fog.enable)
    fogGeneralDMView(STATE.board.fog.general.dmview)
}

// 
// Client updates
// 
function fogEnable(bool) {
    if (bool == true){
        $('#canvas_fog').show()
    } else {
        $('#canvas_fog').hide()
    }
}

function fogGeneralDMView(bool) {
    if (bool == true){
        $('#canvas_fog').css('mix-blend-mode', '')
        $('#canvas_fog').css('filter', '')
    } else {
        $('#canvas_fog').css('mix-blend-mode', '')
        $('#canvas_fog').css('filter', '')
    }
}

function fogGeneralReset() {
    var el = document.getElementById('canvas_fog');
    var contx = el.getContext('2d');
    contx.fillStyle = "black";
    contx.fillRect(0, 0, el.width, el.height);
}
