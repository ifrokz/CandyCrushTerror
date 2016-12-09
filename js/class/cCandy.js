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
    this.remove = false;
    this.width = 80;
    this.height = 80;
    //console.log(this.row+"//"+this.column);


    this.update = function(){ // de momento implementado solamente que caigan pabajo
        
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
        ctx.drawImage(this.img, this.x+10-this.width/2+40, this.y+10-this.height/2+40,this.width,this.height);
    }
}

var candies = [];

function updateCandies(){
    for (var c in candies){
        candies[c].update();
        candies[c].render();
    }
}

var selectedCandy = "";
var selectedCandyUp = ["","","","","","","","","",""];
var selectedCandyDown = ["","","",""];
var selectedCandyLeft = ["","","",""];
var selectedCandyRight = ["","","",""];
var clickCandy = 0;
var clickCandyUp = "";
var clickCandyDown = "";
var clickCandyLeft = "";
var clickCandyRight = "";
var candiesToRemove = [];
function clickCandies(){ // esta función nos servirá para cuando hagamos click en un caramelo, pillar su row y su column y filtrar en la base de datos para seleccionar ese caramelo
    $("#canvas").mousedown(function(event){ // de momento genera caramelos donde haces click
        if(!cannotMove){
            firstClick = true;
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
        }
    });

    $("#canvas").swipe( {
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            //console.log(direction);
            if(!cannotMove){
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
            }
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkCandies(){
    for (var c in candies){
        if(candies[c].remove == true){
            cannotMove = true;
            candies[c].width -= 5;
            candies[c].height -= 5;
            if(candies[c].width < 10){
                selectCandy(candies[c].row,candies[c].column);
                for (var s in selectedCandyUp){
                    if(selectedCandyUp[s] != ""){
                        if(selectedQuantity == 1){
                            candies[selectedCandyUp[s]].row ++;
                        }
                    }
                }
                candies.splice(c,1);
                firstClick = false;
                cannotMove = false;
            }
        }
        candiesSorted = false;
    }
    for (var i = 0; i < candies.length; i++){ // busca L o T
        sameVertical = 1;
        sameHorizontal = 1;
        removeCandy = false;
        selectCandy(candies[i].row, candies[i].column);
        checkUp(removeCandy);
        checkDown(removeCandy);
        checkLeft(removeCandy);
        checkRight(removeCandy);
        if(sameVertical >= 3 && sameHorizontal >= 3){ // tenemos una L o T
            console.log("tenemos L o T en la fila:"+candies[selectedCandy].row+"//columna:"+candies[selectedCandy].column)
            removeCandy = true;
            candiesToRemove.push(selectedCandy);
            checkUp(removeCandy);
            checkDown(removeCandy);
            checkLeft(removeCandy);
            checkRight(removeCandy);
            removeCandy = false;
            for(var c in candiesToRemove){
                candies[candiesToRemove[c]].remove = true;
            }
            candiesToRemove=[];
            if(firstClick){
                candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[selectedCandy].type+30,candyCount));
                candyCount++;
            }else{
                candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+30,candyCount));
                candyCount++;
            }
            return;
        }
    }
    for (var i = 0; i < candies.length; i++){ //busca combinaciones horizontales o verticales
        sameVertical = 1;
        sameHorizontal = 1;
        removeCandy = false;
        selectCandy(candies[i].row, candies[i].column);
        checkUp(removeCandy);
        checkDown(removeCandy);
        checkLeft(removeCandy);
        checkRight(removeCandy);
        if(sameVertical >= 3){ // tenemos combinacion vertical
            console.log("tenemos combinacion vertical");
            removeCandy = true;
            candiesToRemove.push(selectedCandy);
            checkUp(removeCandy);
            checkDown(removeCandy);
            removeCandy = false;
            for(var c in candiesToRemove){
                candies[candiesToRemove[c]].remove = true;
            }
            candiesToRemove=[];
            if (firstClick){
                if (sameVertical == 4){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type+10,candyCount));
                    candyCount++;
                }
                if (sameVertical == 5){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,40,candyCount));
                    candyCount++;
                }
            }else{
                if (sameVertical == 4){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+10,candyCount));
                    candyCount++;
                }
                if (sameVertical == 5){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,40,candyCount));
                    candyCount++;
                }
            }
            return;
        }
        if(sameHorizontal >= 3){ // tenemos combinación horizontal
            console.log("tenemos combinacion horizontal");
            removeCandy = true;
            candiesToRemove.push(selectedCandy);
            checkLeft(removeCandy);
            checkRight(removeCandy);
            removeCandy = false;
            console.log("borrame:"+candiesToRemove)
            for(var c in candiesToRemove){
                candies[candiesToRemove[c]].remove = true;
            }
            candiesToRemove=[];
            if(firstClick){
                if (sameHorizontal == 4){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type+20,candyCount));
                    candyCount++;
                }
                if (sameHorizontal == 5){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type+30,candyCount));
                    candyCount++;
                }
            }else{
                if (sameHorizontal == 4){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+20,candyCount));
                    candyCount++;
                }
                if (sameHorizontal == 5){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+30,candyCount));
                    candyCount++;
                }
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkUp(removeCandy){
    for (var i = 0; i < 10; i++){
        if(selectedCandyUp[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyUp[i]].type){       
                if(removeCandy){
                    candiesToRemove.push(selectedCandyUp[i]);
                }else{sameVertical++;}
            }else{return}
        }else{return}
    }
}
function checkDown(removeCandy){
    for (var i = 0; i < 4; i++){
        if(selectedCandyDown[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyDown[i]].type){       
                if(removeCandy){
                    candiesToRemove.push(selectedCandyDown[i]);
                }else{sameVertical++;}
            }else{return}
        }else{return}
    }
}
function checkLeft(removeCandy){
    for (var i = 0; i < 4; i++){
        if(selectedCandyLeft[i] != ""){
            //if(removeCandy){console.log("en el frame:"+frame+", vale:"+selectedCandyLeft[i])}
            if(candies[selectedCandy].type == candies[selectedCandyLeft[i]].type){
                if(removeCandy){
                    //console.log("en el frame:"+frame+", vale:"+selectedCandyLeft[i])
                    candiesToRemove.push(selectedCandyLeft[i]);
                }else{sameHorizontal++;}
            }else{return}
        }else{return}
    }
}
function checkRight(removeCandy){
    for (var i = 0; i < 4; i++){
        if(selectedCandyRight[i] != ""){
            if(candies[selectedCandy].type == candies[selectedCandyRight[i]].type){
                if(removeCandy){
                    candiesToRemove.push(selectedCandyRight[i]);
                }else{sameHorizontal++;}
            }else{return}
        }else{return}
    }
}

function selectCandy(selectedRow,selectedColumn){
    selectedCandy = "";
    selectedQuantity = 0;
    selectedCandyUp = ["","","",""];
    selectedCandyDown = ["","","",""];
    selectedCandyLeft = ["","","",""];
    selectedCandyRight = ["","","",""];
    for (var c in candies){
        if(candies[c].row == selectedRow){
            if (candies[c].column == selectedColumn){ // caramelo seleccionado
                selectedCandy = c;
                selectedQuantity++;
            }
            for (var i=0; i<4; i++){
                if (candies[c].column == selectedColumn-(i+1)) { // caramelo seleccionado izquierda
                    selectedCandyLeft[i] = c;
                }
                if(candies[c].column == selectedColumn + (i+1)){ // caramelo seleccionado derecha
                    selectedCandyRight[i] = c;
                } 
            }
        }
        if(candies[c].column == selectedColumn){ 
            for (var i = 0; i < 4; i++){
                if(candies[c].row == selectedRow-(i+1)){ //caramelos seleccionados arriba
                    selectedCandyUp[i] = c;
                }
                if(candies[c].row == selectedRow+(i+1)){ //caramelos seleccionados abajo
                    selectedCandyDown[i] = c;
                } 
            }
            for(var i = 4; i<10;i++){
                if(candies[c].row == selectedRow-(i+1)){ //caramelos seleccionados arriba
                    selectedCandyUp[i] = c;
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

function sortCandies(){
    
}