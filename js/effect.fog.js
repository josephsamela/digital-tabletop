
function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

var el = document.getElementById('canvas_fog');

var h = document.getElementById("map-preview").height+3;
var w = document.getElementById("map-preview").width+3;

el.height = h;
el.width = w;

fog_canvas_orig_width = w;
fog_canvas_orig_height = h;

// el.height = innerHeight;
// el.width = innerWidth;

var contx = el.getContext('2d');

contx.fillStyle = "black";
contx.fillRect(0, 0, el.width, el.height);

contx.lineJoin = contx.lineCap = 'round';

var isDrawing, lastPoint;

el.onmousedown = function (e) {
    isDrawing = true;
    var c = $('#canvas_fog').offset()['left']

    var wid = $('#canvas_fog').width()
    var hei = $('#canvas_fog').height()

    w_corr = wid/fog_canvas_orig_width
    h_corr = hei/fog_canvas_orig_height
    
    lastPoint = { x: (e.clientX-c)/w_corr, y: e.clientY/h_corr };

    console.log(lastPoint)
};

el.onmousemove = function (e) {
    if (!isDrawing) return;
    var c = $('#canvas_fog').offset()['left']
    
    var wid = $('#canvas_fog').width()
    var hei = $('#canvas_fog').height()
    
    w_corr = wid/fog_canvas_orig_width
    h_corr = hei/fog_canvas_orig_height
    
    var currentPoint = { x: (e.clientX-c)/w_corr, y: e.clientY/h_corr };

    console.log(currentPoint)

    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);

    for (var i = 0; i < dist; i += 5) {

        x = lastPoint.x + (Math.sin(angle) * i);
        y = lastPoint.y + (Math.cos(angle) * i);

        var radgrad = contx.createRadialGradient(x, y, 10, x, y, 20);

        radgrad.addColorStop(0, '#fff');
        radgrad.addColorStop(0.5, 'rgba(255,255,255,0.5)');
        radgrad.addColorStop(1, 'rgba(255,255,255,0)');

        contx.fillStyle = radgrad;
        contx.fillRect(x - 20, y - 20, 40, 40);
    }

    lastPoint = currentPoint;
};

el.onmouseup = function () {
    isDrawing = false;
};
