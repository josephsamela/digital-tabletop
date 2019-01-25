
var path = []
var nowplaying = []

var audio = {
    "type": "folder",
    "content": {
        "music": {
            "type": "folder",
            "path": "/music",
            "content": {
                "music1": {
                    "type": "music",
                    "path": "/music/music1.mp3"
                },
                "music2": {
                    "type": "music",
                    "path": "/music/music2.mp3"
                },
                "more music": {
                    "type": "folder",
                    "path": "/music/more_music",
                    "content": {
                        "music3": {
                            "type": "music",
                            "path": "/music/more_music/music3.mp3"
                        },
                        "music4": {
                            "type": "music",
                            "path": "/music/more_music/music4.mp3"
                        }
                    }
                }
            }
        },
        "sound effects": {
            "type": "folder",
            "path": "/effect",
            "content": {
                "effect1": {
                    "type": "music",
                    "path": "/effect/effect.mp3"
                },
                "effect2": {
                    "type": "music",
                    "path": "/effect/effect.mp3"
                },
                "more effects": {
                    "type": "folder",
                    "path": "/effect/more_effect",
                    "content": {
                        "effect3": {
                            "type": "music",
                            "path": "/music/more_music/music3.mp3"
                        },
                        "effect4": {
                            "type": "music",
                            "path": "/music/more_music/music4.mp3"
                        }
                    }
                }
            }
        }
    }
}


function update() {
    var panel = $("#musiclist");
    panel.empty();

    obj = audio;
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
    update();
}

function up() {
    path.splice(-1, 1);
    update();
}

function add(path) {
    nowplaying.push(path)
    drawnowplaying()
}

update();