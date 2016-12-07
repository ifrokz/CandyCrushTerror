var Tile = function(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.img = new Image();
    this.img.src = "img/tile/"+this.type+".png";
}
var tiles = [];

function updateTiles(){
    for (var t in tiles){
        tiles[t].render();
    }
}

Tile.prototype.render = function(){
    ctx.drawImage(this.img, this.x, this.y);
}