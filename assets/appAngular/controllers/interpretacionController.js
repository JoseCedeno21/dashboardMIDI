app.controller('interpretacionController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.questions = [];
	$scope.metricas = [];
	$scope.resultados = [];
	$scope.levels = [];
	$scope.level = [];
	$scope.learning = [];

	//se obtiene todos los niveles
	TodoService.getLevels().then(function(response) {
	    $scope.levels = response;
	    //$scope.temporal = response;
	});

	TodoService.getMetrics().then(function(response) {
		$scope.metricas = response;
		
		$.getScript('appAngular/controllers/resultados_metricas.js', function()
		{
		    //console.log(hello());
		});
	});
	

	$scope.funcionLevel = function(){
		var resultado = 0;
		var q_lower = 0;
		var q_mid = 0;
		var q_upper = 0;
		//var q_lower = numbers.statistic.quantile(data, 1, 4);
		//var q_mid = numbers.statistic.quantile(data, 2, 4);
		//var q_upper = numbers.statistic.quantile(data, 3, 4);
        
        var t_play = [$scope.level.length - 1]; //Arreglo del tiempo de juego de un nivel
        var t_play_prom = 0; //promedio de tiempo de juego de un nivel
        var num_try = [$scope.level.length - 1]; //Arreglo del numero de intentos de un nivel
        var num_try_prom = 0; // promedio de numero de intentos de un nivel

        var n_wrong = [];
        var n_wrong_prom = 0;
        var n_right = [];
        var n_right_prom = 0;

        var intentos_ok = 0;
		var correctas_ok = 0;
		var tiempo_juego_ok = 0;

		TodoService.getLearnUserByLevel($scope.select.levelId).then(function(response) {
			$scope.learning = response;
			console.log($scope.learning);
		});
		//$scope.temp = 
      	TodoService.getLevelUserByLevel($scope.select.levelId).then(function(response) {
      		$scope.level = response;
      		for(var i=0; i<$scope.level.length; i++){
				t_play_prom = t_play_prom + $scope.level[i].tiempo_juego;
				num_try_prom = num_try_prom + $scope.level[i].intentos;
				n_wrong_prom = n_wrong_prom + $scope.level[i].incorrectas;
				n_right_prom = n_right_prom + $scope.level[i].correctas;
				
				t_play[i] = $scope.level[i].tiempo_juego;
				num_try[i] = $scope.level[i].intentos;
				n_wrong[i] = $scope.level[i].incorrectas;
				n_right[i] = $scope.level[i].correctas;
				//Solo se toma en cuenta los usuarios que competaron el nivel
				if ($scope.level[i].estado == "completado") {
					intentos_ok = intentos_ok + $scope.level[i].intentos;
					correctas_ok = correctas + $scope.level[i].correctas;
					tiempo_juego_ok = tiempo_juego_ok + $scope.level[i].tiempo_juego;
				}
			}
			t_play_prom = t_play_prom / $scope.level.length;
			n_wrong_prom = n_wrong_prom / $scope.level.length;
			n_right_prom = n_right_prom / $scope.level.length;
			//q_mid = numbers.statistic.quantile(t_play, 2, 4);
			num_try_prom = num_try_prom / $scope.level.length;
			//q_mid = numbers.statistic.quantile(num_try, 2, 4);

			intentos_ok = intentos_ok / $scope.level.length;
			correctas_ok = correctas  / $scope.level.length;
			tiempo_juego_ok = tiempo_juego_ok  / $scope.level.length;
		
      		
	        for(var i=0; i<$scope.metricas.length; i++){
	        	$scope.resultados.push({
					id: $scope.metricas[i].id,
			        nombre: $scope.metricas[i].nombre,
			        nombre_car: $scope.metricas[i].nombre_car,
			        proposito: $scope.metricas[i].proposito,
			        formula: $scope.metricas[i].formula,
			        interpretacion: $scope.metricas[i].interpretacion,
			        resultado: 0,
			    });
	        	switch($scope.metricas[i].nombre){
	        		case "Efectividad en la Meta":
	        			resultado = EfectividadMeta(n_right_prom, n_wrong_prom).toFixed(3);
	        			$scope.resultados[i].resultado = resultado;
	        			break;
	        		case "Completitud de la Meta":
	        			resultado = CompletitudMeta(n_right_prom, num_try_prom).toFixed(3);
	        			$scope.resultados[i].resultado = resultado;
	        			break;
	        		case "Frecuencia de Intentos por Meta":
		        		resultado = FrecuenciaIntentosMeta(intentos_ok, correctas_ok).toFixed(3);
	        			break;
					case "Tiempo de Meta":
						resultado = TiempoMeta(tiempo_juego_ok).toFixed(3);
						break;
					case "Eficiencia de Meta":
						resultado = EficienciaMeta().toFixed(3);
						break;
					case "Eficiencia Relativa al Nivel del Usuario":
						resultado = EficienciaRelativaUsuario().toFixed(3);
						break;
					case "Accesibilidad":
						resultado = Accesibilidad().toFixed(3);
						break;
					case "Personalización":
						resultado = Personalizacion().toFixed(3);
						break;
					case "Seguridad y Salud del Jugador":
						resultado = SeguridadSaludJugador().toFixed(3);
						break;
					case "Daño software":
						resultado = Daniosoftware().toFixed(3);
						break;
					case "Escala de Satisfacción":
						resultado = EscalaSatisfaccion().toFixed(3);
						break;
					case "Cuestionario de Satisfacción":
						resultado = CuestionarioSatisfaccion().toFixed(3);
						break;
					case "Preferencia de Uso":
						resultado = PreferenciaUso().toFixed(3);
						break;
					case "Socialización":
						resultado = Socializacion().toFixed(3);
						break;
	        		default:
	        		//lo que sobre
	        	}
	        }

	        $scope.levels = [];



      	});
	}



	$scope.funcionLevel2 = function(){
		//$scope.temp = 
      	TodoService.getLevelUserByLevel($scope.select.levelId).then(function(response) {
      		var q_lower = 0;
			var q_mid = 0;
			var q_upper = 0;
			//var q_lower = numbers.statistic.quantile(data, 1, 4);
			//var q_mid = numbers.statistic.quantile(data, 2, 4);
			//var q_upper = numbers.statistic.quantile(data, 3, 4);
	        $scope.level = response;
	        var t_play = [$scope.level.length - 1];
	        var t_play_prom = 0;
	        var num_try = [$scope.level.length - 1];
	        var num_try_prom = 0;

	        var n_wrong_real = [];
	        var n_wrong_prom = [];
	        var n_right_real = [];
	        var n_right_prom = [];
	        

	        for(var m=0; m<$scope.questions.length; m++){
	        	t_play_prom = 0;
	        	num_try_prom = 0;
	        	switch($scope.questions[m].id){
	        		case 1:
	        			
	        			break;
	        		case 2:
	        			
	        			break;
	        		case 3:
	        			console.log("Pregunta 3");
		        		TodoService.getLearnUserByLevel($scope.select.levelId).then(function(response) {
		        			$scope.learning = response;
		        			console.log($scope.learning);
		        		});
	        			TodoService.getMetrics().then(function(response) {
		        			$scope.metricas = response;
		        			
		        			$.getScript('appAngular/controllers/resultados_metricas.js', function()
							{
							    console.log(hello());
							});

		        			console.log($scope.metricas);
		        			
		        		});
	        			break;
	        		default:
	        		//lo que sobre
	        	}
	        }

	        $scope.levels = [];



      	});
	}


}]);