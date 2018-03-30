from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

MAP = "static/maps/default.jpg"

@app.route("/")
def index():
    return render_template('index.html')

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

    return render_template('board.html')

# curl -POST localhost:5000/board -d "static/img/map.jpg"

if __name__ == '__main__':
#    app.run(debug = True)
   app.run(host='0.0.0.0')
