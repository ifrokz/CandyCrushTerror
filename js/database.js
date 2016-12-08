var db = openDatabase('CandyCrushTerror', '1.0', 'filas y columnas de caramelos', 2*1024*1024);
function removeDataBaseTable(){
    db.transaction(function(peticion){
        peticion.executeSql('DROP TABLE posiciones');
    });
}
// removeDataBaseTable(); // Activar para cambiar propiedades de la tabla
db.transaction(function(peticion){
    peticion.executeSql('CREATE TABLE posiciones (row, column, id)');
});
function clearData(){
    db.transaction(function(peticion){
        peticion.executeSql('DELETE FROM posiciones')
    });
}
function addCandyToDatabase(rowToAdd,columnToAdd,idToAdd){
    db.transaction(function(peticion){
        peticion.executeSql('INSERT INTO posiciones values(" '+rowToAdd+' "," '+columnToAdd+' "," '+idToAdd+' ")');
    });
}
function removeCandyFromDatabase(rowToRemove,columnToRemove){
    db.transaction(function(peticion){
        peticion.executeSql('DELETE FROM posiciones WHERE row=" '+rowToRemove+' " AND column = " '+columnToRemove+' " ');
    });
}
function selectCandyFromDatabase(rowToSelect, columnToSelect){ // asigna a selectedCandy la id del caramelo a partir de su fila y su columna
    resultSelect = [];
    db.transaction(function(peticion){
        peticion.executeSql('SELECT id FROM posiciones WHERE row=" '+rowToSelect+' " AND column=" '+columnToSelect+' " ', [], function(tx,rs){
                for(var i = 0; i < rs.rows.length; i++){
                    var tempRow = rs.rows.item(i);
                    resultSelect.push( parseInt(tempRow['id']) );
                    console.log(resultSelect[i]);
                }
        });
    });
}