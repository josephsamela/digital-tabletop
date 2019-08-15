console.log("board.main.js")

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    socket.emit('first-connect', "CONNECT gameboard");
});

socket.on('maps', function (maps) {
    console.log("maps")
    console.log(maps)
});
socket.on('board', function (board) {
    console.log("board")
    console.log(board)
    update_board(board)
});
socket.on('light', function (light) {
    console.log("light")
    console.log(light)
});
socket.on('fog', function (fog) {
    console.log("fog")
    console.log(fog)
});
socket.on('effect', function (effect) {
    console.log("effect")
    console.log(effect)
    update_effect_dashboard(effect)
});
