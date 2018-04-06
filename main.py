from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
from os import walk


MAP = "static/maps/default - Default Loading Screen.jpg"

MAPS_PATH = "static/maps/"
THEME_PATH = "static/audio/theme/"
EFFECTS_PATH = "static/audio/effect/"

@app.route("/")
def index():

    themes = generate_themes(THEME_PATH)
    maps = generate_maps(MAPS_PATH)
    effects = generate_effects(EFFECTS_PATH)

    return render_template('index.html', map=MAP, themes=themes, maps=maps, effects=effects)

@app.route("/test")
def test():
    return render_template('test.html')

@app.route("/update", methods = ['POST', 'GET'])
def update():

    if request.method == "POST":
        data = request.get_data().decode('utf-8')
        print(data)

        content, path = data.split(",")

        global MAP

        print(content)
        print(path)

        if content == "map":
            MAP = path
        else:
            pass

        return "True"
    
    if request.method == "GET":
        return jsonify(map=MAP)

@app.route("/board", methods = ['POST', 'GET'])
def board():
    if request.method == "POST":
        print("post!")
    return render_template('board.html', map=MAP)

def get_file_list(path):
    f = []
    for (dirpath, dirnames, filenames) in walk(path):
        f.extend(filenames)
    return f

def generate_themes(theme_path):
    text = ''
    path_list = get_file_list(theme_path)
    map_num = 1
    for f in path_list:
        print(f)
        path = theme_path+f
        title, subtitle = f.split("-")
        template = '<button type="button" id="player'+str(map_num)+'_button" class="list-group-item list-group-item-action rounded custom_card"><div class="d-flex w-100 justify-content-between"><h6>'+title+'<small>'+subtitle+'</small></h6></div><audio controls loop preload="auto" controlsList="nodownload" style="width:100%" id="player'+str(map_num)+'"><source id="theme" src="'+path+'"></audio></button>'
        text = text+template+'\n\n'
        map_num += 1
    return text

def generate_effects(theme_path):
    text = ''
    path_list = get_file_list(theme_path)
    map_num = 100
    for f in path_list:
        print(f)
        path = theme_path+f
        title, subtitle = f.split("-")
        template = '<button type="button" id="player'+str(map_num)+'_button" class="list-group-item list-group-item-action rounded custom_card"><div class="d-flex w-100 justify-content-between"><h6>'+title+'<small>'+subtitle+'</small></h6></div><audio controls preload="auto" controlsList="nodownload" style="width:100%" id="player'+str(map_num)+'"><source id="theme" src="'+path+'"></audio></button>'
        text = text+template+'\n\n'
        map_num += 1
    return text

def generate_maps(theme_path):
    text = ''
    path_list = get_file_list(theme_path)
    map_num = 1
    for f in path_list:
        print(f)
        path = theme_path+f
        title, subtitle = f.split("-")
        template = '<button type="button" id="map'+str(map_num)+'" name="map-thumbnail" class="list-group-item list-group-item-action p-0 rounded custom_card" onclick="switchMap(this, \''+path+'\');"><div class="d-flex justify-content-between"><div class="p-2 m-0 map_description"><h5>'+title+'</h5><small>'+subtitle+'</small></div><div class="card-img-bottom map-thumbnail-'+str(map_num)+' rounded-right" style="background: url(\''+path+'\') center no-repeat;"></div></div></button>'
        text = text+template+'\n\n'
        map_num += 1
    return text

# curl -POST localhost:5000/board -d "static/img/map.jpg"

if __name__ == '__main__':
#    app.run(debug = True)
   app.run(host='0.0.0.0')
