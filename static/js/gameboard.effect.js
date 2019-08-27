//
// Updates
// 
function update_gameboard_board_effects() {
    effectBrightness(STATE.board.effects.brightness)
    effectWeatherRain(STATE.board.effects.weather.rain)
    effectWeatherThunderstorm(STATE.board.effects.weather.thunderstorm)
    effectWeatherSnow(STATE.board.effects.weather.snow)
}

// 
// Client updates
// 
function effectBrightness(bool) {
    $('#canvas_darkness').css('opacity', bool);
    $('#canvas_darkness').css('background-color', 'black');
}

function effectWeatherRain(bool) {
    if (bool == true) {
        $('#canvas_effect_rain').show()
    } else {
        $('#canvas_effect_rain').hide()
    }
}

function effectWeatherThunderstorm(bool) {
    if (bool == true) {
        $('#canvas_effect_thunderstorm1').show()
        $('#canvas_effect_thunderstorm2').show()
        $('#canvas_effect_thunderstorm3').show()
    } else {
        $('#canvas_effect_thunderstorm1').hide()
        $('#canvas_effect_thunderstorm2').hide()
        $('#canvas_effect_thunderstorm3').hide()
    } 
}

function effectWeatherSnow(bool) {
    if (bool == true) {
        $('#canvas_effect_snow').show()
    } else {
        $('#canvas_effect_snow').hide()
    } 
}
