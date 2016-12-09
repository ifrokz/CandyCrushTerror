
function prepareCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}
// DIBUJA EL TABLERO (AUXILIAR EN DESARROLLO)
function drawGrid(){
    ctx.beginPath();
    for(var i = 10+100*3; i < 1920-100*5; i += 100){
        ctx.moveTo(40,i);
        ctx.lineTo(1040,i);
    }
    for(var i = 40; i < 1080; i += 100){
            ctx.moveTo(i,10+100*3);
            ctx.lineTo(i,1910-100*5);
            ctx.moveTo(i-1,10+100*3);
            ctx.lineTo(i-1,1910-100*5);
            ctx.moveTo(i+1,10+100*3);
            ctx.lineTo(i+1,1910-100*5);
    }
    ctx.closePath();
    ctx.stroke();
    
}

////////////////////////
// LECTURA DE NIVELES //
////////////////////////

function prepareLevelCanvas(level){
    $("body").append('<canvas class=level id=levelCanvas width=10px height=11px></canvas>');
    levelCanvas = document.getElementById("levelCanvas");
    levelCtx = levelCanvas.getContext("2d");
    levelImage = new Image();
    levelImage.src = "niveles/" + level + ".png";
}

function drawLevelCanvas(){
    levelCtx.drawImage(levelImage,0,0);
}

function scanLevelCanvas(){
    pixels = levelCtx.getImageData(0,0,10,11);
    pixelsArray = pixels.data;
    for(var i = 0; i < pixelsArray.length; i += 4){
        if(pixelsArray[i] < 10 && 
        pixelsArray[i + 1] < 10 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es negro
            // casilla donde puede haber un caramelo
            spawnCandies( ( Math.floor( ( i / 4 ) / 10 ) ) , ( i / 4 % 10 ) );
        }
        if(pixelsArray[i] > 240 && 
        pixelsArray[i + 1] < 10 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es rojo
            // casilla donde hay un bloque que no se puede mover y no puede ser atravesado por los caramelos
        }
        if(pixelsArray[i] < 10 && 
        pixelsArray[i + 1] > 240 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es verde
            // casilla transparente atravesable por caramelos pero no se quedan en ellas
        }
         //document.write(pixelsArray[i]+"-"+pixelsArray[i+1]+"-"+pixelsArray[i+2]+"-"+pixelsArray[i+3]+"<br>");
         //console.log ( "pixel " + i / 4 + ": fila: " + ( Math.floor( ( i / 4 ) / 10 ) ) +", columna: "+ ( i / 4 % 10 ) );
    }
}

function hideLevelCanvas(){
    $(".level").hide();
}
function showLevelCanvas(){
    $(".level").show();
}
function reScanLevelCanvas(){
    showLevelCanvas();
    for(var i = 0; i < pixelsArray.length; i += 4){
        if(pixelsArray[i] < 10 && 
        pixelsArray[i + 1] < 10 &&
        pixelsArray[i + 2] < 10 ){ // si el pixel es negro
            // casilla donde puede haber un caramelo
            //fila: Math.floor( ( i / 4 ) / 10 )
            //columna: ( i / 4 % 10 )
            //¿existe candy[fila,columna]?, si no existe haz un push
             
        }
    }
    HideLevelCanvas();
}