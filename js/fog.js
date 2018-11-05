var mousePressed = false;
var lastX, lastY;
var ctx;
var fog_line_width = 100;

function InitThis() {
    ctx = document.getElementById('canvas_fog').getContext("2d");
    ctx.canvas.width = $('#map-preview').width() + 1;
    ctx.canvas.height = $('#map-preview').height() + 1;

    $('#canvas_fog').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#canvas_fog').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#canvas_fog').mouseup(function (e) {
        mousePressed = false;
    });
    $('#canvas_fog').mouseleave(function (e) {
        mousePressed = false;
    });

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.lineWidth = fog_line_width;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function updatefogview() {

    enable = $("#fog_enable")[0].checked;
    dmview = $("#fog_dmview")[0].checked;

    if (enable == true) {
        $('#canvas_fog')[0].style.display = "";
    } else {
        $('#canvas_fog')[0].style.display = "none"
    }

    if (enable == true & dmview == true) {
        $('#canvas_fog')[0].style.mixBlendMode = "difference";
        $('#map-preview')[0].style.filter = "invert(100)";
    } else {
        $('#canvas_fog')[0].style.mixBlendMode = "multiply";
        $('#map-preview')[0].style.filter = "invert(0)";
    }

    InitThis()

}

function fogbrushsize(value) {
    fog_line_width = value
}

InitThis()
$('#canvas_fog')[0].style.display = "difference";
$('#canvas_fog')[0].style.display = "none";
