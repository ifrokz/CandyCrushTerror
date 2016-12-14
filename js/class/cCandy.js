var candyCount = 1;
var candies = [];

var Candy = function(row,column,type,id){
    this.row = row;
    this.column = column;
    this.type = type;
    this.id = id;
    /*this.img = new Image();
    this.img.src = "img/candy/"+this.type+".png"; */
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
        ctx.drawImage(candyImg[this.type], this.x+10-this.width/2+40, this.y+10-this.height/2+40,this.width,this.height);
    }
}

function updateCandies(){
    for (var c in candies){
        candies[c].update();
        candies[c].render();
    }
}

var selectedCandy = ""; // selected candy es para barrer todos los caramelos
var selectedCandyUp = ["","","","","","","","","",""]; // guardo los 10 caramelos de arriba
var selectedCandyDown = ["","","",""];  // guardo los 4 caramelos de abajo
var selectedCandyLeft = ["","","",""];  // eso...
var selectedCandyRight = ["","","",""]; 
var clickCandy = 0; // click candy es para el caramelo que has hecho click (así sabemos donde hay que colocar el caramelo especial en caso de que proceda)
var clickCandyUp = "";
var clickCandyDown = "";
var clickCandyLeft = "";
var clickCandyRight = "";
var candiesToRemove = []; // aquí guardo los indices de los caramelos que se van a eliminar (para la animación antes de que se eliminen)
function clickCandies(){ 
    $("#canvas").mousedown(function(event){ 
        if(!cannotMove){ //cannotMove es para impedir movimientos mientras hay caramelos eliminandose
            firstClick = true; // los caramelos especiales aparecen donde has hecho click, pero si la partida aun no ha empezado (como no has hecho click) el caramelo especial aparecería en la fila 1-1. Además si hay un combo, y la combinacion >3 aparece después de la primera, tampoco debe aparecer donde has hecho click
            //console.log("pageX:"+event.pageX + " | pageY:" + event.pageY);
            if(event.pageX > 40 && event.pageX < 1040 && event.pageY > 10 + 3 * 100 && event.pageY < 1910 - 5 * 100){
                //console.log("fila:" + (Math.floor( ( event.pageY - 10 ) / 100 ) - 3)+"//columna:"+ Math.floor( ( event.pageX - 40 ) / 100));
                var tempRow = (Math.floor( ( event.pageY - 10 ) / 100 ) - 3); //fila donde has hecho click
                var tempColumn =(Math.floor( ( event.pageX - 40 ) / 100));   //columna donde has hecho click
                for (var c in candies){ //todo este bucle for es para seleccionar los índices de los caramelos adyacentes al que has hecho click
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
            if(!cannotMove){ // solo puedes hacer swipe mientras no haya animación de eliminación de caramelos
                switch(direction){
                    case "left":
                        if(clickCandyLeft === ""){}else{
                            candies[clickCandy].column -= 1;
                            candies[clickCandyLeft].column += 1;
                        }

                        break;
                    case "right":
                        if(clickCandyRight === ""){}else{
                            candies[clickCandy].column += 1;
                            candies[clickCandyRight].column -= 1;
                        }

                        break;
                    case "up":
                        if(clickCandyUp === ""){}else{
                            candies[clickCandy].row -= 1;
                            candies[clickCandyUp].row += 1;
                        }
                        break;
                    case "down":
                        if(clickCandyDown === ""){}else{
                            candies[clickCandy].row += 1;
                            candies[clickCandyDown].row -= 1;
                        }
                        break;
                }
                clickCandyUp = ""; // resetea los valores de los índices del caramelo donde has hecho click y sus adyacentes
                clickCandyDown = "";
                clickCandyLeft = "";
                clickCandyRight = "";
                //console.log(selectedCandyLeft)
                moves--;
            }
        },
        threshold:0
    });
}



function spawnCandies(row,column){ // funciones auxiliares para ahorrarnos lineas luego, no debería ir aquí, soy to desordenao
    candies.push(new Candy(row, column, Math.ceil( Math.random() * 6 ), candyCount ) );
    addCandyToDatabase(row, column, candyCount);
    candyCount++;
}

function removeCandies(row,column){ // era para trabajar con database, ignoralo xDD
    removeCandyFromDatabase(row,column);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkCandies(){
    for (var c in candies){
        if(candies[c].remove === true){ // si el caramelo ha sido asignado para ser eliminado
            cannotMove = true;  // impide que haya movimientos
            candies[c].width -= 5;  // disminuye el tamaño de la imagen
            candies[c].height -= 5; //eso
            if(candies[c].width < 10){  // si el tamaño es menor de 10px
                selectCandy(candies[c].row,candies[c].column); // selecciona al caramelo y sus adyacentes para bajar una posicion a todos los de arriba
                for (var s in selectedCandyUp){
                    if(selectedCandyUp[s] !== ""){
                        if(selectedQuantity == 1){
                            candies[selectedCandyUp[s]].row ++;
                        }
                    }
                }
                candies.splice(c,1); // elimina al caramelo
                firstClick = false; // por si hay combos, que fristclick true sea solo para la primera eliminación
                cannotMove = false; // en el caso de que esta eliminación sea la última, ya te puedes mover, sino volverá a ser true al proximo caramelo que encuentre que se esté eliminando
            }
        }
    }
    for (var i = 0; i < candies.length; i++){ // busca L o T
        sameVertical = 1; // variable que se incremente cada vez que hay un adyacente vertical del mismo tipo
        sameHorizontal = 1; // variable que se incremente cada vez que hay un adyacente horizontal del mismo tipo
        removeCandy = false; // las funciones checkdown(), checkup(), checkleft(), checkright() lo utilizan como argumento y si es true hace operaciones adicionales. Por defecto la primera vez se llama a esas funciones con removeCandy=false
        selectCandy(candies[i].row, candies[i].column); // selecciona el caramelo y sus adyacentes
        checkUp(removeCandy); // haz las funciones check con removecandy = false, siendo false, lo que hace es aumentar sameHorizontal y samevertical en caso de encontrar un caramelo igual
        checkDown(removeCandy);
        checkLeft(removeCandy);
        checkRight(removeCandy);
        if(sameVertical >= 3 && sameHorizontal >= 3){ // tenemos una L o T, por lo tanto se volveran a hacer las funciones checkup() y compañía con el argumento removeCandy = true
            console.log("tenemos L o T en la fila:"+candies[selectedCandy].row+"//columna:"+candies[selectedCandy].column)
            removeCandy = true;
            candiesToRemove.push(selectedCandy); // el selected candy es seleccionado para ser eliminado this.remove = true, bueno, en verdad meto el índice en la matriz candiestoremove que va a contener los caramelos que van a cambiar su propiedad a this.remove = true
            checkUp(removeCandy); // si removecandy = true, ahora lo que hace la función es seleccionar a los caramelos que son iguales para ser eliminados (this.remove = true)
            checkDown(removeCandy);
            checkLeft(removeCandy);
            checkRight(removeCandy);
            removeCandy = false; // vuelva a poner remove candy como false para que vuelva a funcionar de la otra forma las funciones check
            for(var c in candiesToRemove){
                candies[candiesToRemove[c]].remove = true; // pues eso, los caramelos anteriormente seleccionados seran etiquetados como this.remove = true y en el siguiente bucle empezarán a empequeñecer
            }
            candiesToRemove=[]; // una vez que hayas cambiado la propiedad a true, vacia la matriz para las siguientes comprobaciones
            if(firstClick){ // aquí se mete el caramelo especial, lo hace de una manera o de otra en función de si firstclick = true o false
                candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[selectedCandy].type+30,candyCount));
                candyCount++;
            }else{
                candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+30,candyCount));
                candyCount++;
            }
            return; // en caso de que haya habido una combinación en T o en L, no sigas comprobando en este frame
        }
    }
    for (var i = 0; i < candies.length; i++){ //busca combinaciones horizontales o verticales en caso de que no haya habido ninguna L o T
        sameVertical = 1; // todo lo de aquí tiene estructura similar a los de L o T
        sameHorizontal = 1;
        removeCandy = false;
        selectCandy(candies[i].row, candies[i].column);
        checkUp(removeCandy);
        checkDown(removeCandy); // haz los check incrementando sameHorizontal y sameVertical
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
                if (sameVertical === 4){ // si 
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type+10,candyCount));
                    candyCount++;
                }
                if (sameVertical === 5){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,40,candyCount));
                    candyCount++;
                }
            }else{
                if (sameVertical === 4){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+10,candyCount));
                    candyCount++;
                }
                if (sameVertical === 5){
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
                if (sameHorizontal === 4){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,candies[clickCandy].type+20,candyCount));
                    candyCount++;
                }
                if (sameHorizontal === 5){
                    candies.push(new Candy(candies[clickCandy].row,candies[clickCandy].column,40,candyCount));
                    candyCount++;
                }
            }else{
                if (sameHorizontal === 4){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,candies[selectedCandy].type+20,candyCount));
                    candyCount++;
                }
                if (sameHorizontal === 5){
                    candies.push(new Candy(candies[selectedCandy].row,candies[selectedCandy].column,40,candyCount));
                    candyCount++;
                }
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkUp(removeCandy){
    for (var i = 0; i < 10; i++){
        if(selectedCandyUp[i] !== ""){
            if(candies[selectedCandy].type == candies[selectedCandyUp[i]].type){       // si los caramelos son del mismo tipo
                if(removeCandy){ // este if se ejecuta si removecandy == true
                    candiesToRemove.push(selectedCandyUp[i]);
                }else{sameVertical++;}  // esto se ejecuta si removecandy == false
            }else{return} // al primer caramelo que no sea igual que el primero, deja de comparar
        }else{return} // al primer caramelo que intente comparar que no exista, deja de comparar
    }
}
function checkDown(removeCandy){ // lo mismo que checkup pero para abajo
    for (var i = 0; i < 4; i++){
        if(selectedCandyDown[i] !== ""){
            if(candies[selectedCandy].type == candies[selectedCandyDown[i]].type){       
                if(removeCandy){
                    candiesToRemove.push(selectedCandyDown[i]);
                }else{sameVertical++;}
            }else{return}
        }else{return}
    }
}
function checkLeft(removeCandy){// lo mismo que checkup pero para left
    for (var i = 0; i < 4; i++){
        if(selectedCandyLeft[i] !== ""){
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
function checkRight(removeCandy){// lo mismo que checkup pero para right
    for (var i = 0; i < 4; i++){
        if(selectedCandyRight[i] !== ""){
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


