var Candy = function(row,column,type){
    this.row = row;
    this.column = column;
    this.type = type;
    this.img = new Image();
    this.img.src = "img/candy/"+this.type+".png";
    this.x = column * 100 + 40;
    this.y = 0;
    this.speed = 0;
    this.aceleration = 4;
}
var candies = [];

function updateCandies(){
    for (var c in candies){
        candies[c].update();
        candies[c].render();
    }
}

function clickCandies(){ // esta función nos servirá para cuando hagamos click en un caramelo, pillar su row y su column y filtrar en la base de datos para seleccionar ese caramelo
    $("#canvas").click(function(event){ // de momento genera caramelos donde haces click
        console.log(event.pageX + " | " + event.pageY);
        if(event.pageX > 40 && event.pageX < 1040 && event.pageY > 10 && event.pageY < 1910){
            candies.push(new Candy( 19 - Math.floor( ( event.pageY -10 ) / 100 ) , Math.floor( (event.pageX -40) / 100 ) , Math.ceil(Math.random() * 8 ) ) )
        }
    })
}

function spawnCandies(row,column){

}

Candy.prototype.update = function(){ // de momento implementado solamente que caigan pabajo
    if( (10 + this.y ) < (1910 - this.row * 100) ){
        this.speed += this.aceleration;
        this.y += this.speed;
    }else{
        this.speed = 0;
        this.y = 1910 - this.row *100;
    }
}

Candy.prototype.render = function(){
    ctx.drawImage(this.img, this.x, this.y);
}