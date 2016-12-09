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
    //console.log(this.row+"//"+this.column);


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
var selectedCandyUp = ["","",""];
var selectedCandyDown = ["","",""];
var selectedCandyLeft = ["","",""];
var selectedCandyRight = ["","",""];
var clickCandy = 0;
var clickCandyUp = "";
var clickCandyDown = "";
var clickCandyLeft = "";
var clickCandyRight = "";
function clickCandies(){ // esta función nos servirá para cuando hagamos click en un caramelo, pillar su row y su column y filtrar en la base de datos para seleccionar ese caramelo
    $("#canvas").mousedown(function(event){ // de momento genera caramelos donde haces click
        //console.log("pageX:"+event.pageX + " | pageY:" + event.pageY);
        if(event.pageX > 40 && event.pageX < 1040 && event.pageY > 10 + 3 * 100 && event.pageY < 1910 - 5 * 100){
            //console.log("fila:" + (Math.floor( ( event.pageY - 10 ) / 100 ) - 3)+"//columna:"+ Math.floor( ( event.pageX - 40 ) / 100));
            var tempRow = (Math.floor( ( event.pageY - 10 ) / 100 ) - 3); //fila donde has hecho click
            var tempColumn =(Math.floor( ( event.pageX - 40 ) / 100));   //columna donde has hecho click
            for (var c in candies){
                if(candies[c].row == tempRow){
                    if (candies[c].column == tempColumn){ // caramelo seleccionado
                        clickCandy = c;
                    }
                    if (candies[c].column == tempColumn-1) { // caramelo seleccionado izquierda
                        clickCandyLeft = c;
                    }
                    if(candies[c].column == tempColumn + 1){ // caramelo seleccionado derecha
                        clickCandyRight = c;
                    } 
                }
                if(candies[c].column == tempColumn){ 
                    if(candies[c].row == tempRow-1){ //caramelos seleccionados arriba
                        clickCandyUp = c;
                    }
                    if(candies[c].row == tempRow+1){ //caramelos seleccionados abajo
                        clickCandyDown = c;
                    } 
                }  
            }
            //candies.push( new Candy(Math.floor( ( event.pageY - 10 ) / 100 ) - 3, Math.floor( ( event.pageX - 40 ) / 100), Math.ceil( Math.random() * 8 ) , candyCount ) );
            //addCandyToDatabase(candies[candies.length-1].row,candies[candies.length-1].column,candyCount);
            //candyCount++;
        }
    });

    $("#canvas").swipe( {
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            //console.log(direction);
            switch(direction){
                case "left":
                    if(clickCandyLeft == ""){}else{
                        candies[clickCandy].column -= 1;
                        candies[clickCandyLeft].column += 1;
                    }

                    break;
                case "right":
                    if(clickCandyRight == ""){}else{
                        candies[clickCandy].column += 1;
                        candies[clickCandyRight].column -= 1;
                    }

                    break;
                case "up":
                    if(clickCandyUp == ""){}else{
                        candies[clickCandy].row -= 1;
                        candies[clickCandyUp].row += 1;
                    }
                    break;
                case "down":
                    if(clickCandyDown == ""){}else{
                        candies[clickCandy].row += 1;
                        candies[clickCandyDown].row -= 1;
                    }
                    break;
            }
            clickCandyUp = "";
            clickCandyDown = "";
            clickCandyLeft = "";
            clickCandyRight = "";
            //console.log(selectedCandyLeft)
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


function checkCandies(){
    for (var i = 0; i < candies.length; i++){ // busca L o T
        sameVertical = 1;
        sameHorizontal = 1;
        selectCandy(candies[i].row, candies[i].column);
        checkUp();
        checkDown();
        checkLeft();
        checkRight();
        if(sameVertical >= 3 && sameHorizontal >= 3){ // tenemos una L o T
            console.log("tenemos L o T en la fila:"+candies[selectedCandy].row+"//columna:"+candies[selectedCandy].column)
        }
    }
    for (var i = 0; i < candies.length; i++){ //busca combinaciones horizontales o verticales
        sameVertical = 1;
        sameHorizontal = 1;
        selectCandy(candies[i].row, candies[i].column);
        checkUp();
        checkDown();
        checkLeft();
        checkRight();
        if(sameVertical >= 3){ // tenemos combinacion vertical
            console.log("tenemos combinacion vertical");
        }
        if(sameHorizontal >= 3){ // tenemos combinación horizontal
            console.log("tenemos combinacion horizontal");
        }
    }
}

function checkUp(){
    for (var i = 0; i < 3; i++){
        if(selectedCandyUp[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyUp[i]].type){
                sameVertical++;
            }else{return}
        }else{return}
    }
}
function checkDown(){
    for (var i = 0; i < 3; i++){
        if(selectedCandyDown[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyDown[i]].type){
                sameVertical++;
            }else{return}
        }else{return}
    }
}
function checkLeft(){
    for (var i = 0; i < 3; i++){
        if(selectedCandyLeft[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyLeft[i]].type){
                sameHorizontal++;
            }else{return}
        }else{return}
    }
}
function checkRight(){
    for (var i = 0; i < 3; i++){
        if(selectedCandyRight[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyRight[i]].type){
                sameHorizontal++;
            }else{return}
        }else{return}
    }
}

function selectCandy(selectedRow,selectedColumn){
    selectedCandy = 0;
    selectedCandyUp = ["","",""];
    selectedCandyDown = ["","",""];
    selectedCandyLeft = ["","",""];
    selectedCandyRight = ["","",""];
    for (var c in candies){
        if(candies[c].row == selectedRow){
            if (candies[c].column == selectedColumn){ // caramelo seleccionado
                selectedCandy = c;
            }
            for (var i=0; i<3; i++){
                if (candies[c].column == selectedColumn-(i+1)) { // caramelo seleccionado izquierda
                    selectedCandyLeft[i] = c;
                }
                if(candies[c].column == selectedColumn + (i+1)){ // caramelo seleccionado derecha
                    selectedCandyRight[i] = c;
                } 
            }
        }
        if(candies[c].column == selectedColumn){ 
            for (var i = 0; i < 3; i++){
                if(candies[c].row == selectedRow-(i+1)){ //caramelos seleccionados arriba
                    selectedCandyUp[i] = c;
                }
                if(candies[c].row == selectedRow+(i+1)){ //caramelos seleccionados abajo
                    selectedCandyDown[i] = c;
                } 
            }
        }  
    }
    /*console.log("selectedCandy = "+selectedCandy );
    console.log("selectedCandyUp = " + selectedCandyUp);
    console.log("selectedCandyDown = "+ selectedCandyDown);
    console.log("selectedCandyLeft = "+ selectedCandyLeft );
    console.log("selectedCandyRight = "+selectedCandyRight); */
}