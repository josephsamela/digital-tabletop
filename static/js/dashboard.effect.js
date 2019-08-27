//
// Updates
// 
function update_dashboard_board_effects() {
    effectBrightness(STATE.board.effects.brightness)
    effectWeatherRain(STATE.board.effects.weather.rain)
    effectWeatherThunderstorm(STATE.board.effects.weather.thunderstorm)
    effectWeatherSnow(STATE.board.effects.weather.snow)
}

// 
// Button callbacks
// 
function dashboard_board_effects_brightness(that) {
    STATE.board.effects.brightness = that.value
    socket.emit('client-update', STATE);
}
function dashboard_board_effects_weather_rain(that) {
    STATE.board.effects.weather.rain = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_effects_weather_thunderstorm(that) {
    STATE.board.effects.weather.thunderstorm = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}
function dashboard_board_effects_weather_snow(that) {
    STATE.board.effects.weather.snow = that.childNodes[0].childNodes[0].checked
    socket.emit('client-update', STATE);
}

// 
// Client updates
// 
function effectBrightness(bool) {
    $('#canvas_darkness').css('opacity', bool);
    $('#canvas_darkness').css('background-color', 'black');
}

function effectWeatherRain(bool) {
    updateToggleState('#weather-rain-control', bool)
    if (bool == true) {
        $('#canvas_effect_rain').show()
    } else {
        $('#canvas_effect_rain').hide()
    }
}

function effectWeatherThunderstorm(bool) {
    updateToggleState('#weather-thunderstorm-control', bool)
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
    updateToggleState('#weather-snow-control', bool)
    if (bool == true) {
        $('#canvas_effect_snow').show()
    } else {
        $('#canvas_effect_snow').hide()
    } 
}
