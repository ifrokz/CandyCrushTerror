var Tile = function(x,y,type){
    this.column  = x;
    this.row = y;
    this.type = type;
    this.img = new Image();
    this.img.src = "img/tile/"+this.type+".png";

    this.render = function(){
        ctx.drawImage(this.img, this.x, this.y);
    }
}
var tiles = [];

function updateTiles(){
    for (var t in tiles){
        tiles[t].render();
    }

    for(var t in tiles){
        if(tiles[t].type == 1){
            candies.push( new Candy(tiles[t].row, tiles[t].column, Math.ceil( Math.random() * 6 ), candyCount) );
            candyCount++;
        }
    }
}

tiles[1] = new Tile(0,0,1);


