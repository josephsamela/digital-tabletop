// var socket = io.connect('http://' + document.domain + ':' + location.port);

// socket.on('connect', function () {
//     socket.emit('first-connect', "CONNECT dashboard");
// });

// socket.on('maps', function (maps) {
//     console.log("maps")
//     console.log(maps)
    
//     // Initially build map list
//     build_map_panel(maps)
//     //Initialize fuse fuzzy search
//     var options = {
//         keys: [{
//             name: 'title',
//             weight: 0.9
//         }, {
//             name: 'description',
//             weight: 0.1
//         }]
//     }
//     fuse = new Fuse(maps, options)
// });
// socket.on('audio', function (audio) {
//     AUDIO = audio
//     build_audio_panel(audio)
// });
// socket.on('board', function (board) {
//     BOARD = board
//     update_board(board)
// });
// socket.on('light', function (light) {
//     LIGHT = light
//     build_light_panel(light)
// });
// socket.on('fog', function (fog) {
//     FOG = fog
//     console.log("fog")
//     console.log(fog)
// });
// socket.on('effect', function (effect) {
//     EFFECT = effect
//     console.log("effect")
//     console.log(effect)
//     update_effect (effect)
// });


// Initialize all panels hidden
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

function updateToggleState(t, state) {
    if (state == true) {
        t.childNodes[0].childNodes[0].checked = true
    } else {
        t.childNodes[0].childNodes[0].checked = false
    }
}