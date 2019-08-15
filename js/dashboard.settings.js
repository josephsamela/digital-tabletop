var settings = {
    darktheme: false
}

function settingsClearAll(t){
    console.log('settingsClearAll')
}

function settingsVisualDarkTheme(t){
    settings.darktheme = !settings.darktheme
    updateToggleState(t, settings.darktheme)
    console.log('settingsVisualDarkTheme is '+settings.darktheme)
}
``