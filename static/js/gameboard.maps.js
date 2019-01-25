
function update_board(board) {

    if (board['global mute'] == false) {
        $("#map-preview").attr("src", board.map.path)
    } else {
        $("#map-preview").attr("src", "static/maps/default.jpg")
    }
    
}