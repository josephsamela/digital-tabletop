from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from os import walk
import json
import socket
import webbrowser
import os

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
    global BOARD, LIGHT, FOG, EFFECT, MAPS
    emit('maps', MAPS, broadcast=True)
    emit('board', BOARD, broadcast=True)
    emit('light', LIGHT, broadcast=True)
    emit('fog', FOG, broadcast=True)
    emit('effect', EFFECT, broadcast=True)

@socketio.on('maps')
def mapList(message):
    print('MAPS: ' + message)
    global MAPS
    emit('effect', MAPS, broadcast=True)

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

if __name__ == '__main__':
    # Read avaliable maps 
    maps = []
    for filename in os.listdir( os.getcwd()+'/static/maps/' ):
        if 'default.jpg' in filename:
            continue
        title, maptype, description = filename.split(' - ')
        path = '/static/maps/'+filename
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

    # Import effect config
    global BOARD, LIGHT, FOG, EFFECT, MAPS
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

    # Import server config
    with open('config.json', 'r') as f:
        config = json.load(f)
    port = config['port']
    address = config['address']
    print("Running on http://"+address+":"+str(port))

    socketio.run(app, host=address, port=port)
