app.controller('interpretacionController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.questions = [];
	$scope.metricas = [];
	$scope.resultados = [];
	$scope.levels = [];
	$scope.level = [];
	$scope.learning = [];
	$scope.rooms_level = [];

	var rooms_default = [];
	var rooms_rest = [];

	var efectividad_default = 0;

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
		var q_lower_time_ok = 0;
		var q_mid_time_ok = 0;
		var q_upper_time_ok = 0;
		var rango_interquartil = 0;
		var limite_externo_menor = 0;
		var limite_externo_mayor = 0;
		//var q_lower = numbers.statistic.quantile(data, 1, 4);
		//var q_mid = numbers.statistic.quantile(data, 2, 4);
		//var q_upper = numbers.statistic.quantile(data, 3, 4);
        
        var t_play = [$scope.level.length - 1]; //Arreglo del tiempo de juego de un nivel
        var tiempo_juego = 0; //promedio de tiempo de juego de un nivel
        var num_try = [$scope.level.length - 1]; //Arreglo del numero de intentos de un nivel
        var num_try_prom = 0; // promedio de numero de intentos de un nivel
        var n_user_complete = 0; //Número de usuarios que completaron el nivel

        var n_wrong = [];
        var n_wrong_prom = 0;
        var n_right = [];
        var tiempo_juego_ok_list = [];
        var n_right_prom = 0;

        var intentos_ok = 0;
		var correctas_ok = 0;
		var incorrectas_ok = 0;
		var tiempo_juego_ok = 0;

		TodoService.getLearnUserByLevel($scope.select.levelId).then(function(response) {
			$scope.learning = response;
			console.log($scope.learning);
		});
		//$scope.temp = 
      	TodoService.getLevelUserByLevel($scope.select.levelId).then(function(response) {
      		$scope.resultados = [];
      		$scope.level = response;

      		TodoService.getRoomsByLevel($scope.select.levelId).then(function(response) {
				$scope.rooms_level = response;
				console.log($scope.rooms_level);
				for(var i=0; i < $scope.rooms_level.length; i++){
					if ($scope.rooms_level.tipo == 'Default') {
						rooms_default.push($scope.rooms_level[i]);
					} else{
						rooms_rest.push($scope.rooms_level[i]);
					}
				}
			});

      		for(var i=0; i<$scope.level.length; i++){
				tiempo_juego = tiempo_juego + $scope.level[i].tiempo_juego;
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
					correctas_ok = correctas_ok + $scope.level[i].correctas;
					incorrectas_ok = incorrectas_ok + $scope.level[i].incorrectas;
					tiempo_juego_ok = tiempo_juego_ok + $scope.level[i].tiempo_juego;

					tiempo_juego_ok_list[i] = $scope.level[i].tiempo_juego;
					n_user_complete++;
				}
			}
			tiempo_juego = tiempo_juego / $scope.level.length;
			n_wrong_prom = n_wrong_prom / $scope.level.length;
			n_right_prom = n_right_prom / $scope.level.length;
			//q_mid = numbers.statistic.quantile(t_play, 2, 4);
			num_try_prom = num_try_prom / $scope.level.length;
			//q_mid = numbers.statistic.quantile(num_try, 2, 4);

			intentos_ok = intentos_ok / n_user_complete;
			correctas_ok = correctas_ok  / n_user_complete;
			incorrectas_ok = incorrectas_ok  / n_user_complete;
			tiempo_juego_ok = tiempo_juego_ok  / n_user_complete;

			//quartiles para el tiempo de usuarios que terminaron en nivel
			q_lower_time_ok = quartile(tiempo_juego_ok_list, 1, 4);
			q_upper_time_ok = quartile(tiempo_juego_ok_list, 3, 4);
			rango_interquartil = q_upper_time_ok - q_lower_time_ok;
			var l_externo_inf = q_lower_time_ok - ( rango_interquartil * 3);
			var l_externo_sup = q_upper_time_ok + ( rango_interquartil * 3);
      		
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
	        	switch($scope.metricas[i].id){
	        		//Eficiencia
	        		case 1:
	        			resultado = TiempoMeta(tiempo_juego_ok).toFixed(2);
	        			$scope.resultados[i].resultado = resultado;
	        			break;
	        		case 2:
	        			resultado = EficienciaMeta(correctas_ok, tiempo_juego).toFixed(2);
	        			$scope.resultados[i].resultado = resultado;
	        			break;
	        		case 3:
		        		resultado = EficienciaMetaPorIncorrectas(incorrectas_ok, tiempo_juego).toFixed(2);
		        		$scope.resultados[i].resultado = resultado;
	        			break;
					case 4:
						var best_time = 0, cont_best_time = 0;
						for(var j=0; j < tiempo_juego_ok_list.length; j++){
							if (tiempo_juego_ok_list[j] > l_externo_sup) {
								best_time = best_time + tiempo_juego_ok_list[j];
								cont_best_time++;
							}
						}
						if (cont_best_time != 0)
							best_time = best_time / cont_best_time;
						else
							best_time = 1;
						resultado = EficienciaRelativaUsuarioOK(cont_best_time, $scope.level.length).toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					case 5:
						var worst_time = 0, cont_worst_time = 0;
						for(var j=0; j < tiempo_juego_ok_list.length; j++){
							if (tiempo_juego_ok_list[j] < l_externo_inf) {
								worst_time = worst_time + tiempo_juego_ok_list[j];
								cont_worst_time++;
							}
						}
						if (cont_best_time != 0)
							worst_time = worst_time / cont_worst_time;
						else
							worst_time = 1;
						
						resultado = EficienciaRelativaUsuarioBAD(cont_worst_time, $scope.level.length).toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					//Efectividad
					case 6:
						resultado = EfectividadMeta(n_right_prom, n_wrong_prom).toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					case 7:
						resultado = CompletitudMeta(n_user_complete, $scope.level.length).toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					case 8:
						resultado = FrecuenciaIntentosMeta(intentos_ok, correctas_ok).toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					//Flexibilidad
					case 9:
						resultado = AccesibilidadPorMetas(correctas_defauls=0, incorrectas_ok);
						$scope.resultados[i].resultado = resultado;
						break;
					case 10:
						resultado = Daniosoftware().toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					case 11:
						resultado = EscalaSatisfaccion().toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					case 12:
						resultado = CuestionarioSatisfaccion().toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
					case 13:
						resultado = PreferenciaUso().toFixed(2);
						$scope.resultados[i].resultado = resultado;
						break;
	        		default:
	        		//lo que sobre
	        	}
	        }

	        



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
	        var tiempo_juego = 0;
	        var num_try = [$scope.level.length - 1];
	        var num_try_prom = 0;

	        var n_wrong_real = [];
	        var n_wrong_prom = [];
	        var n_right_real = [];
	        var n_right_prom = [];
	        

	        for(var m=0; m<$scope.questions.length; m++){
	        	tiempo_juego = 0;
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