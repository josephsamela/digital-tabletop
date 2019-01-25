function update_effect_dashboard(effect){

    if (effect.rain.mute == true) {
        $('#canvas_effect_rain').hide()
    } else {
        $('#canvas_effect_rain').show()
    }

    if (effect.snow.mute == true) {
        $('#canvas_effect_snow').hide()
    } else {
        $('#canvas_effect_snow').show()
    }

    if (effect.thunderstorm.mute == true) {
        $('#canvas_effect_thunderstorm1').hide()
        $('#canvas_effect_thunderstorm2').hide()
        $('#canvas_effect_thunderstorm3').hide()
    } else {
        $('#canvas_effect_thunderstorm1').show()
        $('#canvas_effect_thunderstorm2').show()
        $('#canvas_effect_thunderstorm3').show()
    }

    $('#canvas_darkness').css('opacity', effect.darkness.opacity);
    $('#canvas_darkness').css('background-color', effect.darkness.color);

}