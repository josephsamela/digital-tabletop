//
// Updates
// 
function update_dashboard_board_fog() {
    fogEnable(STATE.board.fog.enable)
    fogGeneralDMView(STATE.board.fog.general.dmview)
}

// 
// Button callbacks
// 
function dashboard_board_fog_enable(that) {
    updateToggleState('#fog-enable-control', !STATE.board.fog.enable)
    STATE.board.fog.enable = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_fog_general_dmview(that) {
    updateToggleState('#fog-dmview-control', !STATE.board.fog.general.dmview)
    STATE.board.fog.general.dmview = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_fog_reset(that) {
    fogGeneralReset(that)
    socket.emit('fog-update', 'reset');
}
// 
// Client updates
// 
function fogEnable(bool) {
    updateToggleState('#fog-enable-control', bool)
    if (bool == true){
        $('#canvas_fog').show()
    } else {
        $('#canvas_fog').hide()
    }
}

function fogGeneralDMView(bool) {
    updateToggleState('#fog-dmview-control', bool)
    if (bool == true){
        $('#canvas_fog').css('mix-blend-mode', 'difference')
        $('#canvas_fog').css('filter', 'invert(1)')
    } else {
        $('#canvas_fog').css('mix-blend-mode', '')
        $('#canvas_fog').css('filter', '')
    }
}

function fogGeneralReset() {
    // console.log("fogGeneralReset")
    var el = document.getElementById('canvas_fog');
    var contx = el.getContext('2d');
    contx.fillStyle = "black";
    contx.fillRect(0, 0, el.width, el.height);
}
