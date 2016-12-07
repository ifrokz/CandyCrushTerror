var fps = 30;
var timer = "";
var leftPriority = true;

$(document).ready(function(){
    clearData();
    prepareCanvas();
    prepareLevelCanvas(1);
    timer = setTimeout("start()",1000);
});

function start(){
    drawLevelCanvas();
    scanLevelCanvas();
    hideLevelCanvas();
    clickCandies(); // de momento para testear comportamiento
    clearTimeout(timer);
    timer = setTimeout("loop()",1000);
}

function loop(){
    ctx.clearRect(0,0,1080,1920);
    drawGrid();
    updateTiles();
    updateCandies();
    leftPriority = !leftPriority; // si leftPriority=true, caida en diagonal izquierda primero, si leftPriority=false, caida en diagonal derecha primero
    clearTimeout(timer);
    timer = setTimeout("loop()",1000/fps);
}