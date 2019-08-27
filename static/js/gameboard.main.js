// 
// SocketIO Connection and Update
// 
var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit('first-connect', "client connected");
});

socket.on('update', function (state) {
    console.log(state)
    STATE = state
    // board
    update_gameboard_board_maps(state)
    update_gameboard_board_effects(state)
    update_gameboard_board_fog(state)
    update_gameboard_board_grid(state)
    // update_dashboard_board_settings(state)
    // // audio
    // update_dashboard_audio_music(state)
    // update_dashboard_audio_soundeffects(state)
    // update_dashboard_audio_ambiance(state)
})
