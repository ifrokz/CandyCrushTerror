$("#lienzo").on("touchstart",function(e){

  var touchX = e.originalEvent.touches[0].pageX;
  var touchY = e.originalEvent.touches[0].pageY;

    if(Math.abs(touchX-(pausePosX+buttonWidth/2))<buttonWidth/2){
        if(Math.abs(touchY-(pausePosY+buttonWidth/2))<buttonWidth/2){
            if(pause){
                pause = false;
            }else{
                pause = true;
            }
        }
    }else{
        if(pause){
            
        }else{
            tortazos++;
            $("#buffer").html("");
            $("#buffer").append("<audio src='sound/tortazo.wav' autoplay>");
            torta = true;
            ctx.drawImage(explosion,touchX-explosionWidth/2,touchY-explosionWidth/2,explosionWidth,explosionWidth);
        }
    }
});

