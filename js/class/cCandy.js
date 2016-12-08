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
    this.speedX = 0;
    this.speedY = 0;
    this.aceleration = 1;
    console.log(this.row+"//"+this.column);


    this.update = function(){ // de momento implementado solamente que caigan pabajo
        // POS Y
        /*
        if(this.y < this.row * 100 + 100 * 3 + 10){
            this.speedX += this.aceleration;
            this.y += this.speedX;
        }else{
            this.speedX = 0;
            this.y = this.row * 100 + 100 * 3 + 10;
        }

        if((this.x-40)/100+40 > this.column){
            if(this.x < this.column * 100 + 40){
                this.speedY += this.aceleration;
                this.x += this.speedY;
            }else{
                this.speedY = 0;
                this.x = this.column * 100 + 40;
            } 
        }else{
           if(this.x > this.column * 100 + 40){
                this.speedY += this.aceleration;
                this.x -= this.speedY;
            }else{
                this.speedY = 0;
                this.x = this.column * 100 + 40;
            }
        }
 
        if((this.x-40)/100+40 < this.column){
 
        }*/


        
        //POS Y
        if(this.y < this.row*100+10+100*3){
            this.speedY += this.aceleration;
            this.y += this.speedY;
            if(this.y > this.row*100+10+100*3){
                this.y = this.row*100+10+100*3;
                this.speedY = 0;
            }
        }else{
            this.speedY += this.aceleration;
            this.y -= this.speedY;
            if(this.y < this.row*100+10+100*3){
                this.y = this.row*100+10+100*3;
                this.speedY = 0;
            }
        }

        // POS X
        if(this.x < this.column*100+40){
            this.speedX+=this.aceleration;
            this.x+=this.speedX;
            if(this.x > this.column*100+40){
                this.x = this.column*100+40
                this.speedX = 0;
            }
        }else{
            this.speedX+=this.aceleration;
            this.x-=this.speedX;
            if(this.x < this.column*100+40){
                this.x = this.column*100+40
                this.speedX = 0;
            }   
        }

    }

    this.render = function(){
        ctx.drawImage(this.img, this.x+10, this.y+10,80,80);
    }
}

var candies = [];

function updateCandies(){
    for (var c in candies){
        candies[c].update();
        candies[c].render();
    }
}

var selectedCandy = 0;
var selectedCandyUp = "";
var selectedCandyDown = "";
var selectedCandyLeft = "";
var selectedCandyRight = "";
function clickCandies(){ // esta función nos servirá para cuando hagamos click en un caramelo, pillar su row y su column y filtrar en la base de datos para seleccionar ese caramelo
    $("#canvas").mousedown(function(event){ // de momento genera caramelos donde haces click
        console.log(event.pageX + " | " + event.pageY);
        if(event.pageX > 40 && event.pageX < 1040 && event.pageY > 10 + 3 * 100 && event.pageY < 1910 - 5 * 100){
            console.log(Math.floor( ( event.pageY - 10 ) / 100 ) - 3+"//"+ Math.floor( ( event.pageX - 40 ) / 100));
            var tempRow =Math.floor( ( event.pageY - 10 ) / 100 ) - 3; //fila donde has hecho click
            var tempColumn =Math.floor( ( event.pageX - 40 ) / 100);   //columna donde has hecho click
            for (var c in candies){
                if(candies[c].row == tempRow && candies[c].column == tempColumn){ // caramelo seleccionado
                    selectedCandy = c;
                }
                if(candies[c].row == tempRow-1 && candies[c].column == tempColumn){ // caramelo seleccionado arriba
                    selectedCandyUp = c;
                }
                if(candies[c].row == tempRow+1 && candies[c].column == tempColumn){ // caramelo seleccionado abajo
                    selectedCandyDown = c;
                }
                if(candies[c].row == tempRow && candies[c].column == tempColumn - 1){ // caramelo seleccionado izquierda
                    selectedCandyLeft = c;
                }
                if(candies[c].row == tempRow && candies[c].column == tempColumn + 1){ // caramelo seleccionado derecha
                    selectedCandyRight = c;
                }
            }
            //candies.push( new Candy(Math.floor( ( event.pageY - 10 ) / 100 ) - 3, Math.floor( ( event.pageX - 40 ) / 100), Math.ceil( Math.random() * 8 ) , candyCount ) );
            //addCandyToDatabase(candies[candies.length-1].row,candies[candies.length-1].column,candyCount);
            //candyCount++;
        }
    });

    $("#canvas").swipe( {
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            console.log(direction);
            switch(direction){
                case "left":
                    if(selectedCandyLeft == ""){}else{
                     candies[selectedCandy].column -= 1;
                        candies[selectedCandyLeft].column += 1;
                    }

                    break;
                case "right":
                    if(selectedCandyRight == ""){}else{
                        candies[selectedCandy].column += 1;
                        candies[selectedCandyRight].column -= 1;
                    }

                    break;
                case "up":
                    if(selectedCandyUp == ""){}else{
                        candies[selectedCandy].row -= 1;
                        candies[selectedCandyUp].row += 1;
                    }
                    break;
                case "down":
                    if(selectedCandyDown == ""){}else{
                        candies[selectedCandy].row += 1;
                        candies[selectedCandyDown].row -= 1;
                    }
                    break;
            }
            selectedCandyUp = "";
            selectedCandyDown = "";
            selectedCandyLeft = "";
            selectedCandyRight = "";
            console.log(selectedCandyLeft)
        },
        threshold:0
    });
}



function spawnCandies(row,column){
    candies.push(new Candy(row, column, Math.ceil( Math.random() * 6 ), candyCount ) );
    addCandyToDatabase(row, column, candyCount);
    candyCount++;
}

function removeCandies(row,column){
    removeCandyFromDatabase(row,column);
}