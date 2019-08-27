//
// Updates
// 
function update_gameboard_board_maps() {
    drawMapList(STATE.board.maps.maps)
    mapChange(STATE.board.maps)
    mapsMute(STATE.board.maps.mute)
}

// 
// Client updates
// 
function drawMapList(maps) {
    $("#map-list").empty();
    $.each(maps, function (i,m) {
        var title = m.title
        var url = m.url
        $("#map-list").append(
            `<li onclick="dashboard_board_maps_change('` + url + `')"><div class="menu-item"> ` + title + `</div></li>`
        )
    });
}
function mapsMute(state) {
    if (state == true) {
        $('#map-preview')[0].src = 'static/media/maps/default.jpg';
    } else {
        $('#map-preview')[0].src = STATE.board.maps.current.url;
    }
}
$("#map-preview").on("load", function () {
    dashboardCanvasResize()
});
function mapChange(maps) {
    if (maps.mute == false) {
        $("#map-preview").attr('src', maps.current.url)
    }
}
