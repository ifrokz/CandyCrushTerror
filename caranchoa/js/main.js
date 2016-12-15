$(document).ready(function(){  
    temp = setTimeout("start();",1000);
});

function start(){
    loop();
    $("#lienzo").attr("height",windowHeight);
    $("#lienzo").attr("width",windowWidth);
}

function loop(){
    ctx.clearRect(0,0,windowWidth,windowHeight)
    
    ctx.drawImage(anchoaBg,0,0,windowWidth,windowHeight);
    
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
    if(torta || animacionTortazo<=2){
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
    ctx.fillStyle="red";

    var texto = "Segundos restantes: "+Math.floor(segundosSeleccionados-segundosTranscurridos/fps);
    var fontPx = 15;
    ctx.font= fontPx+"px Comic Sans MS";
    ctx.fillText(texto,windowWidth/2,fontPx*2); 
    texto = "Le has pegado "+tortasPorSegundo+"/s";
    ctx.fillText(texto,windowWidth/2,fontPx*4); 

    animacionTortazo++;
    clearTimeout(temp);
    temp = setTimeout("loop();",1000/fps);
}