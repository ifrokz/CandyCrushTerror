var c = document.getElementById("lienzo");
var ctx = c.getContext("2d");

var temp = "";
var fps = 30; 
var pause = false;

var segundosTranscurridos = 0;
var tortasPorSegundo = 0;
var tortazos = 0;

var contraReloj = true;
var segundosSeleccionados = 10;


var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;



///////////////////////
// Carga de imágenes //
///////////////////////
var buttonWidth = windowWidth/10;
var buttonHeight = buttonWidth;

var noImg = new Image();
noImg.src="img/ui/no.png";


var yesImg = new Image();
yesImg.src="img/ui/yes.png";

var playImg = new Image();
playImg.src="img/ui/play.png";

var restartImg = new Image();
restartImg.src="img/ui/restart.png";

var pauseImg = new Image();
pauseImg.src="img/ui/pause.png";
var pausePosX = windowWidth-buttonWidth;
var pausePosY = 0;


// Granbomba
torta = false;

var bombaImg = [];

bombaImg[0] = new Image();
bombaImg[0].src ="img/pj/0.png";
bombaImg[1] = new Image();
bombaImg[1].src ="img/pj/1.png";
bombaImg[2] = new Image();
bombaImg[2].src ="img/pj/2.png";

// EXPLOSION

var explosion = new Image();
explosion.src = "img/explosion.png"
var explosionWidth = windowWidth/5;
