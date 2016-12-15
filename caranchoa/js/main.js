$(document).ready(function(){  
    temp = setTimeout("start();",1000);
});

function start(){
    loop();
}

function loop(){
    ctx.clearRect(0,0,windowWidth,windowHeight)

    if(pause){
        ctx.drawImage(playImg,pausePosX,pausePosY,buttonWidth,buttonHeight);
    }else{
        if(contraReloj){
            if(segundosTranscurridos/fps<segundosSeleccionados){
                segundosTranscurridos++;
                tortasPorSegundo = tortazos/(segundosTranscurridos/fps);
                tortasPorSegundo = tortasPorSegundo.toFixed(2);
                console.log(tortasPorSegundo+"// Segundos:"+segundosTranscurridos/fps);
                console.log("SegundosSeleccionados: "+segundosSeleccionados+"/ segundosTranscurridos"+segundosTranscurridos);
            }else{
                console.log("se ha acabado el tiempo");
            }
        }
        ctx.drawImage(pauseImg,pausePosX,pausePosY,buttonWidth,buttonHeight);
    }
    if(torta || animacionTortazo<=5){
        if(ladoTortazo == 1){
            ctx.drawImage(bombaImg[1],0,0,windowWidth,windowHeight);
        }else{
            ctx.drawImage(bombaImg[2],0,0,windowWidth,windowHeight);
        }
    }else{
        ctx.drawImage(bombaImg[0],0,0,windowWidth,windowHeight);
    }

    torta = false;

    ctx.textAlign="center"; 

    var texto = "Segundos restantes: "+Math.floor(segundosSeleccionados-segundosTranscurridos/fps);
    var fontPx = 10;
    ctx.font= fontPx+"px Arial";
    ctx.fillText(texto,windowWidth/2,fontPx*2); 
    texto = "Le has pegado "+tortasPorSegundo+"/s";
    ctx.fillText(texto,windowWidth/2,fontPx*4); 

    animacionTortazo++;
    clearTimeout(temp);
    temp = setTimeout("loop();",1000/fps);
}