var fog = {
    enable: false,
    general: {
        dmview: false,
    }
}

function fogEnable(t) {
    fog.enable = !fog.enable
    updateToggleState(t, fog.enable)
    console.log('fogEnable is '+fog.enable)

    if (fog.enable == true){
        $('#canvas_fog').show()
    } else {
        $('#canvas_fog').hide()
    }
}

function fogGeneralDMView(t) {
    fog.general.dmview = !fog.general.dmview
    updateToggleState(t, fog.general.dmview)
    console.log('fogGeneralDMView is '+fog.general.dmview)

    if (fog.general.dmview == true){
        $('#canvas_fog').css('mix-blend-mode', 'exclusion')
        $('#canvas_fog').css('filter', 'invert(1)')
    } else {
        $('#canvas_fog').css('mix-blend-mode', '')
        $('#canvas_fog').css('filter', '')
    }
}

function fogGeneralReset(t) {
    console.log("fogGeneralReset")

    var el = document.getElementById('canvas_fog');
    var contx = el.getContext('2d');
    contx.fillStyle = "black";
    contx.fillRect(0, 0, el.width, el.height);
}