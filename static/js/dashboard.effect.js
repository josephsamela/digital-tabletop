// Constorl setting mute, revealing plain gameboard
function setting_global_mute_effect () {
    console.log("mute effect!")

    $('#effect-mute-rain').addClass('is-dark');
    $('#effect-mute-snow').addClass('is-dark');
    $('#effect-mute-thunderstorm').addClass('is-dark');

    EFFECT.rain.mute = true;
    EFFECT.snow.mute = true;
    EFFECT.thunderstorm.mute = true;
    EFFECT.darkness.opacity = 0;

    socket.emit('effect', EFFECT);
}

function mute_effect(effect) {
    console.log(effect)
    var mute = EFFECT[effect].mute;
    if (mute == true) {
        EFFECT[effect].mute = false
    } else {
        EFFECT[effect].mute = true
    }
    socket.emit('effect', EFFECT);
}

function darknessSlider() {
    EFFECT.darkness.opacity = $("#darkness").val();
    socket.emit('effect', EFFECT);
}

function update_effect (effects) {

    if (effects.rain.mute == true) {
        $('#effect-mute-rain').addClass('is-dark');
        $('#canvas_effect_rain').hide()
    } else {
        $('#effect-mute-rain').removeClass('is-dark');
        $('#canvas_effect_rain').show()
    }

    if (effects.snow.mute == true) {
        $('#effect-mute-snow').addClass('is-dark');
        $('#canvas_effect_snow').hide()
    } else {
        $('#effect-mute-snow').removeClass('is-dark');
        $('#canvas_effect_snow').show()
    }

    if (effects.thunderstorm.mute == true) {
        $('#effect-mute-thunderstorm').addClass('is-dark');
        $('#canvas_effect_thunderstorm1').hide()
        $('#canvas_effect_thunderstorm2').hide()
        $('#canvas_effect_thunderstorm3').hide()
    } else {
        $('#effect-mute-thunderstorm').removeClass('is-dark');
        $('#canvas_effect_thunderstorm1').show()
        $('#canvas_effect_thunderstorm2').show()
        $('#canvas_effect_thunderstorm3').show()
    }

    $('#darkness').val(EFFECT.darkness.opacity)
    $('#canvas_darkness').css('opacity', EFFECT.darkness.opacity);
    $('#canvas_darkness').css('background-color', EFFECT.darkness.color);
    resizeDarknessCanvas()

}

$(window).resize(function(){
    resizeDarknessCanvas()
});

function resizeDarknessCanvas(){
    var canvas = $('#canvas_darkness')[0];
    canvas.width = $('#map-preview').width();
    canvas.height = $('#map-preview').height();
}
