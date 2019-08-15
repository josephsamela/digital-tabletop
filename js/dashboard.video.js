var video = {
    mute: false
}

function videoMute(t) {
    video.mute = !video.mute
    updateToggleState(t, video.mute)
    console.log('videoMute is ' + video.mute)
}