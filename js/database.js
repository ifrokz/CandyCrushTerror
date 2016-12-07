var db = openDatabase('CandyCrushTerror', '1.0', 'filas y columnas de caramelos', 2*1024*1024);
db.transaction(function(peticion){
    peticion.executeSql('CREATE TABLE posiciones (row,column)');
});
function clearData(){
    db.transaction(function(peticion){
        peticion.executeSql('DELETE FROM posiciones')
    });
}
function addCandyToDatabase(row,column){
    db.transaction(function(peticion){
        peticion.executeSql('INSERT INTO posiciones values("'+row+'","'+column+'")');
    });
}
function removeCandyFromDatabase(row,column){
    
}