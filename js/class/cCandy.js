candyCount = 1;
var Candy = function(row,column,type,id){
    this.row = row;
    this.column = column;
    this.type = type;
    this.id = id;
    this.img = new Image();
    this.img.src = "img/candy/"+this.type+".png";
    this.x = column * 100 + 40;
    this.y = 3*100;
    this.speed = 0;
    this.aceleration = 4;
    console.log(this.row+"//"+this.column);


    this.update = function(){ // de momento implementado solamente que caigan pabajo
        if(this.y < this.row * 100 + 100 * 3 + 10){
            this.speed += this.aceleration;
            this.y += this.speed;
        }else{
            this.speed = 0;
            this.y = this.row * 100 + 100 * 3 + 10;
        }
        // ESTA ES LA FUNCIÓN ANTIGUA DE JOSE
        /*if( (10 + this.y ) < (1910 + this.row * 100) ){
            this.speed += this.aceleration;
            this.y += this.speed;
        }else{
            this.speed = 0;
            this.y = 1910 - this.row *100;
        }*/
    }

    this.render = function(){
        ctx.drawImage(this.img, this.x, this.y);
    }
}

var candies = [];

function updateCandies(){
    for (var c in candies){
        candies[c].update();
        candies[c].render();
    }
}

// ESTA ES LA FUNCIÓN ANTIGUA DE JOSE
/*function clickCandies(){ // esta función nos servirá para cuando hagamos click en un caramelo, pillar su row y su column y filtrar en la base de datos para seleccionar ese caramelo
    $("#canvas").click(function(event){ // de momento genera caramelos donde haces click
        console.log(event.pageX + " | " + event.pageY);
        if(event.pageX > 40 && event.pageX < 1040 && event.pageY > 10+3*100 && event.pageY < 1910-5*100){
            candies.push(new Candy( 19 - Math.floor( ( event.pageY -10 ) / 100 ) , Math.floor( (event.pageX -40) / 100 ) , Math.ceil(Math.random() * 8 ) ) )
        }
    });
}*/

function clickCandies(){ // esta función nos servirá para cuando hagamos click en un caramelo, pillar su row y su column y filtrar en la base de datos para seleccionar ese caramelo
    $("#canvas").click(function(event){ // de momento genera caramelos donde haces click
        console.log(event.pageX + " | " + event.pageY);
        if(event.pageX > 40 && event.pageX < 1040 && event.pageY > 10 + 3 * 100 && event.pageY < 1910 - 5 * 100){
             candies.push( new Candy(Math.floor( ( event.pageY - 10 ) / 100 ) - 3, Math.floor( ( event.pageX - 40 ) / 100), Math.ceil( Math.random() * 8 ), ) );
             addCandyToDatabase(candies[candies.length-1].row,candies[candies.length-1].column);
             candyCount++;
        }
    });
}

function spawnCandies(row,column){
    candies.push(new Candy(row, column, Math.ceil( Math.random() * 8 ), candyCount ) );
    addCandyToDatabase(row, column, candyCount);
    candyCount++;
}

function removeCandies(row,column){
    removeCandyFromDatabase(row,column);
}