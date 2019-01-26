var path = []
var nowplaying = []

function build_audio_panel() {
    var panel = $("#musiclist");
    panel.empty();

    obj = AUDIO;
    $.each(path, function (index, value) {
        obj = obj['content'][value]
    })

    drawlist(panel, obj)
};

function drawlist(panel, obj) {
    $.each(obj.content, function (key, value) {
        console.log(key);
        var type = value.type;

        if (type == "folder"){
            panel.append('<div class="card" onclick="down(\'' + key + '\')"><i class="fas fa-' + type + '"></i> ' + key + '</div>');
        } else if (type == "music") {
            panel.append('<div class="card" onclick="add(\''+obj["path"]+key+'\')"><i class="fas fa-' + type + '"></i> ' + key + '</div>');
        }
    });
}

function drawnowplaying() {

    $.each(nowplaying, function (index, value) {
        console.log(value)
        var card = `<div class="card">
                    <p>Call of Kuthulu</p>
                    <audio controls src="#"></audio>

                    <div class="audiocontrols">
                        <div class="audiocontrol">
                            <i class="fas fa-step-backward"></i>
                        </div>
                        <div class="audiocontrol">
                            <i class="fas fa-step-forward"></i>
                        </div>
                        <div class="audiocontrol">
                            <i class="fas fa-sync"></i>
                        </div>
                        <div class="audiocontrol">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                </div>`
    })
}

function down(level) {
    path.push(level);
    build_audio_panel();
}

function up() {
    path.splice(-1, 1);
    build_audio_panel();
}

function add(path) {
    nowplaying.push(path)
    drawnowplaying()
}