
var points = 0;
var moves = 50;

var candyImg = [];
// Caramelo normal
for(var i = 1;i<=6;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
// Caramelo espcial rueda sin borde
for(var i = 11;i<=16;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
// Caramelo espcial rueda con borde
for(var i = 21;i<=26;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
// Caramelo espcial corazón
for(var i = 31;i<=36;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}

// Caramelo espcial multicolor
candyImg[40]= new Image();
candyImg[40].src = "img/candy/40.png";

