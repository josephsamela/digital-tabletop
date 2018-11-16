
function darknessSlider(c) {
    $('#darkness').val(c.value)
    $('#canvas_darkness').css('opacity', c.value);
    $('#canvas_darkness').css('background-color', 'black');

    ctx = $("#canvas_darkness")[0].getContext('2d');
    ctx.canvas.width = $('#map-preview').width() + 1;
    ctx.canvas.height = $('#map-preview').height() + 1;
}