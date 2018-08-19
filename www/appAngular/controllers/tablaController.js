app.controller('TablaController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.jugadores = {};
	$scope.games = {};
	$scope.datos = {};
	$scope.temporal = {};
	//se obtiene todos los jugadores
	TodoService.getJugadores().then(function(response) {
	    $scope.jugadores = response;
	    $scope.temporal = response;
	});

	TodoService.getGames().then(function(response) {
	    $scope.games = response;
	    //$scope.select.gameId = response[0].id;
	    //$scope.datosFunction();
	});

	$scope.datosGame = function(){
		//$scope.temp = 
		$scope.temp = {};
      	TodoService.getDatos($scope.select.gameId).then(function(response) {
	        $scope.datos = response;
	        $scope.jugadores = [];
	        for(var m=0; m<$scope.temporal.length; m++){
	        	var suma_puntos = 0;
	        	var suma_tiempo = 0;
	        	var suma_niveles = 0;
		        for(var i=0; i<$scope.datos.chapters.length; i++){
		        	for(var j=0; j<$scope.datos.chapters[i].niveles[0].length; j++){
		        		for(var k=0; k<$scope.datos.chapters[i].niveles[0][j].datos[0].length; k++){
		        			var jug = $scope.datos.chapters[i].niveles[0][j].datos[0][k];
		        			if($scope.temporal[m].id == jug.id_usuario){
		        				suma_puntos = suma_puntos + (jug.correctas*3) - (jug.incorrectas);
		        				suma_tiempo = suma_tiempo + (jug.tiempo_juego);
		        			}
		        		}
		        		if(suma_puntos > 0){
		        			suma_niveles++;
		        		}
		        	}
		        }
		        if(suma_puntos > 0){
			        $scope.jugadores.push({
			        	nombre: $scope.temporal[m].nombre,
			        	cantidad: suma_niveles,
			        	puntos: suma_puntos,
			        	tiempo: suma_tiempo			
			        })
		        }

		    }

      	});
	}


}]);