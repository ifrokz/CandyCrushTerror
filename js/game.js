var fps = 60;
var timer = "";
var leftPriority = true;
var firstClick = false;
var candiesSorted = false;
var frame = 0;
var cannotMove = false;

$(document).ready(function(){
    clearData();
    prepareCanvas();
    prepareLevelCanvas(1);
    timer = setTimeout("start()",100);
});

function start(){
    drawLevelCanvas();
    scanLevelCanvas();
    hideLevelCanvas();
    clickCandies(); // de momento para testear comportamiento
    clearTimeout(timer);
    timer = setTimeout("loop()",900);
}

function loop(){
    ctx.clearRect(0,0,1080,1920);
    drawGrid();
    updateTiles();
    updateCandies();
    sortCandies();
    if(leftPriority){
        checkCandies();
    }
    if(!leftPriority){
        reScanLevelCanvas();
    }
    frame++;
    leftPriority = !leftPriority; // si leftPriority=true, caida en diagonal izquierda primero, si leftPriority=false, caida en diagonal derecha primero
    clearTimeout(timer);
    timer = setTimeout("loop()",1000/fps);
}