function darknessSlider(c) {
    $('#darkness').val(c.value)
    $('#canvas_darkness').css('opacity', c.value);
    $('#canvas_darkness').css('background-color', 'black');
}

