from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import os
import json
from stat import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'pathfinder'
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/board")
def gameboard():
    return render_template('board.html')

@socketio.on('first-connect')
def firstConnect(message):
    print(message)
    global BOARD, LIGHT, FOG, EFFECT, MAPS, AUDIO
    emit('maps', MAPS, broadcast=True)
    emit('audio', AUDIO, broadcast=True)
    emit('board', BOARD, broadcast=True)
    emit('light', LIGHT, broadcast=True)
    emit('fog', FOG, broadcast=True)
    emit('effect', EFFECT, broadcast=True)

@socketio.on('maps')
def mapList(message):
    print('MAPS: ' + message)
    global MAPS
    emit('effect', MAPS, broadcast=True)

@socketio.on('audio')
def audioList(message):
    print('AUDIO: ' + message)
    global AUDIO
    emit('effect', AUDIO, broadcast=True)

@socketio.on('board')
def board(message):
    print('BOARD')
    global BOARD
    BOARD = message
    emit('board', BOARD, broadcast=True)

@socketio.on('light')
def light(message):
    print(message)
    global LIGHT
    LIGHT = message
    emit('light', LIGHT, broadcast=True)

@socketio.on('fog')
def fog(message):
    print('FOG: ' + message)
    global FOG
    emit('fog', FOG, broadcast=True)

@socketio.on('effect')
def effect(message):
    print(message)
    global EFFECT
    EFFECT = message
    emit('effect', EFFECT, broadcast=True)

def path_to_dict(path, d):
    name = os.path.basename(path)
    if os.path.isdir(path):
        if name not in d['content']:
            d['content'][name] = {'type':'folder', 'path':'/static/media/audio/'+name,'content':{}}
        for x in os.listdir(path):
            path_to_dict(os.path.join(path,x), d['content'][name])
    else:
        d['content'][name] = {'type':'music','path':'/static/media/audio/'+name}

    return d

if __name__ == '__main__':
    # Read avaliable maps 
    maps = []
    for filename in os.listdir( os.getcwd()+'/static/media/maps/' ):
        if 'default.jpg' in filename:
            continue
        title, maptype, description = filename.split(' - ')
        description = description.split('.')[0]+'.'
        path = '/static/media/maps/'+filename
        m = {
            'title':title,
            'type':maptype,
            'description':description,
            'path': path
        }
        maps.append(m)
    # Write maps information to maps.json
    with open('maps.json', 'w') as outfile:
        json.dump(maps, outfile)

    # Read avaliable audio
    path = os.getcwd()+'./static/media/audio/'
    audio = path_to_dict(path, {'type':'folder','path':'/','content':{}})
    # Write maps information to audio.json
    with open('audio.json', 'w') as outfile:
        json.dump(audio["content"][""], outfile)


    # Import effect config
    global BOARD, LIGHT, FOG, EFFECT, MAPS, AUDIO
    with open('board.json', 'r') as f:
        BOARD = json.load(f)
    with open('light.json', 'r') as f:
        LIGHT = json.load(f)
    with open('fog.json', 'r') as f:
        FOG = json.load(f)
    with open('effect.json', 'r') as f:
        EFFECT = json.load(f)
    with open('maps.json', 'r') as f:
        MAPS = json.load(f)
    with open('audio.json', 'r') as f:
        AUDIO = json.load(f)

    # Import server config
    with open('config.json', 'r') as f:
        config = json.load(f)
    port = config['port']
    address = config['address']
    print("Running on http://"+address+":"+str(port))

    socketio.run(app, host=address, port=port)
