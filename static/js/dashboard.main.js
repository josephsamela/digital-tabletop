var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit('first-connect', "CONNECT dashboard");
});

socket.on('maps', function (maps) {
    console.log("maps")
    console.log(maps)
    
    // Initially build map list
    build_map_panel(maps)
    //Initialize fuse fuzzy search
    var options = {
        keys: [{
            name: 'title',
            weight: 0.9
        }, {
            name: 'description',
            weight: 0.1
        }]
    }
    fuse = new Fuse(maps, options)
});
socket.on('board', function (board) {
    BOARD = board
    update_board(board)
});
socket.on('light', function (light) {
    LIGHT = light
    build_light_panel(light)
});
socket.on('fog', function (fog) {
    FOG = fog
    console.log("fog")
    console.log(fog)
});
socket.on('effect', function (effect) {
    EFFECT = effect
    console.log("effect")
    console.log(effect)
    update_effect (effect)
});
