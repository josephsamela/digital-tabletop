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
    update_dashboard_board_maps(state)
    update_dashboard_board_effects(state)
    update_dashboard_board_fog(state)
    update_dashboard_board_grid(state)
    // update_dashboard_board_settings(state)
    // // audio
    // update_dashboard_audio_music(state)
    // update_dashboard_audio_soundeffects(state)
    // update_dashboard_audio_ambiance(state)
})

// 
// Dashboard Client Panel Interactions
// 
hide_all_panels('left');
hide_all_panels('right');

function panel_update(button, id, side) {
    var panel = document.getElementById(id);
    if (panel.style.display == "none"){
        hide_all_panels(side);
        panel.style.display = "";
        button.style.background = "#252526";
    } else {
        panel.style.display = "none"
        hide_all_panels(side);
    }
}
function hide_all_panels(side){
    var panel = document.querySelectorAll('.panel'+'.'+side);
    Array.prototype.forEach.call(panel, function(elements, index) {
        elements.style.display = "none"
    });

    var panel = document.querySelectorAll('.icon-'+side);
    Array.prototype.forEach.call(panel, function(elements, index) {
        elements.style.background = ""
    });
}
function updateToggleState(id, state) {
    if (state == true) {
        $(id).prop('checked', true);
    } else {
        $(id).prop('checked', false);
    }
}