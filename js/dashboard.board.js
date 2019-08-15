// Control switching setting panel tabs
function settingtabtoggle(id) {
    if (id == "setting-tab-toggle-light") {
        $("#setting-panel-light").css('display', '');
        $("#setting-panel-fog").css('display', 'none');
        $("#setting-panel-effect").css('display', 'none');
    }

    if (id == "setting-tab-toggle-fog") {
        $("#setting-panel-light").css('display', 'none');
        $("#setting-panel-fog").css('display', '');
        $("#setting-panel-effect").css('display', 'none');
    }

    if (id == "setting-tab-toggle-effect") {
        $("#setting-panel-light").css('display', 'none');
        $("#setting-panel-fog").css('display', 'none');
        $("#setting-panel-effect").css('display', '');
    }
}

// Control gameboard global mute button
function global_mute() {
    console.log("global mute!")
    
    if (BOARD['global mute'] == false){
        BOARD['global mute'] = true
    } else {
        BOARD['global mute'] = false
    }

    console.log(BOARD)

    socket.emit('board', BOARD);
}

// Control gameboard erase all settings
function global_erase() {
    console.log("global erase!")
    window.confirm("This will erase ALL light, fog and effect settings! Are you sure?");
}

// Control gameboard toggle DM/Player view button
function toggle_map_view() {
    console.log("toggle map view!")
}

function update_board(board) {
    $("#map-preview").attr("src", board.map.path)

    if (BOARD['global mute'] == true){
        $('#global-mute').addClass('is-dark')
    } else {
        $('#global-mute').removeClass('is-dark')
    }
}
