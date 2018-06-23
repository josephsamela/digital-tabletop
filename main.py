from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from os import walk
import json
import socket
import webbrowser

app = Flask(__name__)
app.config['SECRET_KEY'] = 'pathfinder'
socketio = SocketIO(app)

MAP = "static/maps/default.jpg"

@app.route("/")
def index():
    maps = generate_maps("static/maps/")
    effects = generate_effects("static/audio/effect/")
    themes = generate_themes("static/audio/theme/")
    return render_template('index.html', themes=themes, maps=maps, effects=effects)

@app.route("/board")
def board():
    global MAP
    return render_template('board.html', maps=MAP)

@socketio.on('message')
def handle_message(message):
    print('   MESSAGE: ' + message)
    if message == "New connection!":
        emit('update map', MAP, broadcast=True)

@socketio.on('update map')
def handle_message(message):
    print('UPDATE MAP: ' + message)
    global MAP
    MAP = message
    emit('update map', message, broadcast=True)

def generate_maps(theme_path):
    text = ''
    path_list = get_file_list(theme_path)
    for f in path_list:
        path = theme_path+f
        if "default.jpg" in f:
            continue
        if "-" in f:
            title, subtitle = f.split("-")
        else:
            title = f
        template = "<div id='"+path+"' name='map-thumbnail' onclick='update_map(this)' class='uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid'><div class='uk-flex-last@s uk-card-media-right uk-cover-container'><img src='"+path+"' uk-cover><canvas width='400' height='100'></canvas></div><div><div class='uk-card-body'><div class='uk-card-badge uk-label'>Map</div><h1 class='uk-card-title'>"+title+"</h1><p>"+subtitle[0:-3]+"</p></div></div></div>"
        text = text+template+'\n\n'
    return text

def generate_themes(theme_path):
    text = ''
    path_list = get_file_list(theme_path)
    map_num = 1
    for f in path_list:
        print(f)
        path = theme_path+f
        title, subtitle = f.split("-")
        template = "<div id='player"+str(map_num)+"' class='uk-card uk-card-default uk-width-1-1@m uk-margin'><div class='uk-card-badge uk-label'>"+subtitle[0:-4]+"</div><div class='uk-card-body'><h1 class='uk-card-title'>"+title+"</h1><audio id='player_control"+str(map_num)+"' controls preload='auto' controlsList='nodownload' style='width:100%'><source id='theme' src='"+path+"'></audio></div></div>"
        text = text+template+'\n\n'
        map_num += 1
    return text

def generate_effects(theme_path):
    text = '' 
    path_list = get_file_list(theme_path)
    map_num = 10000
    for f in path_list:
        print(f)
        path = theme_path+f
        title, subtitle = f.split("-")
        template = "<div id='player"+str(map_num)+"' class='uk-card uk-card-default uk-width-1-1@m uk-margin'><div class='uk-card-badge uk-label'>"+subtitle[0:-4]+"</div><div class='uk-card-body'><h1 class='uk-card-title'>"+title+"</h1><audio id='player_control"+str(map_num)+"' controls loop preload='auto' controlsList='nodownload' style='width:100%;'><source id='theme' src='"+path+"'></audio></div></div>"
        text = text+template+'\n\n'
        map_num += 1
    return text

def get_file_list(path):
    f = []
    for (dirpath, dirnames, filenames) in walk(path):
        f.extend(filenames)
    return f

if __name__ == '__main__':
    with open('config.json', 'r') as f:
        config = json.load(f)

    port = config['port']
    address = config['address']

    if port == 80:
        if address == "0.0.0.0":
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            address = s.getsockname()[0]
            s.close()
            print("Running on http://"+address)
        else:
            print("Running on http://"+address)
    else:
        print("Running on http://"+address+":"+port)

    url = "http://"+address+":"+str(port)
    # webbrowser.open(url, new=1, autoraise=True)
    # webbrowser.open(url+"/board", new=2, autoraise=True)

    socketio.run(app, host=address, port=port)
