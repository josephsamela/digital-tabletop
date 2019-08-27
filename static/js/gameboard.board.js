// Resize canvas when pages change...

// When window loads
$(window).resize(function () {
    dashboardCanvasResize()
});
// When map-preview image loads
$("#map-preview").on("load", function() {
    dashboardCanvasResize()
});

function dashboardCanvasResize() {
    adjustsize('#canvas_darkness')
    adjustsize('#canvas_effect_snow')
    adjustsize('#canvas_effect_rain')

    $('#canvas_fog').css('width', $('#map-preview').width() +3)
    $('#canvas_grid_square').css('width', $('#map-preview').width() +3)
    $('#canvas_grid_hex').css('width', $('#map-preview').width() +3)
}

function adjustsize(id) {
    var canvas = $(id)[0];
    canvas.width = $('#map-preview').width() + 3;
    canvas.height = $('#map-preview').height() + 3;
}
