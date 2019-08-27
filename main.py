from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import json

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
    global STATE
    emit('update', STATE, broadcast=True)

@socketio.on('fog-update')
def updateFog(value):
    if value == 'reset':
        emit('fog-reset', value, broadcast=True)
    else:
        emit('fog-update', value, broadcast=True)

@socketio.on('client-update')
def updateState(newstate):
    global STATE
    STATE = newstate
    emit('update', STATE, broadcast=True)

if __name__ == '__main__':

    global STATE
    with open('state.json', 'r') as f:
        STATE = json.load(f)

    socketio.run(app, host="0.0.0.0", port=8000)
