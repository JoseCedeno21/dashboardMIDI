app.controller('interpretacionController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.metricas = [];
	$scope.resultados = [];
	$scope.levels = [];
	$scope.level = [];
	$scope.learning = [];
	$scope.rooms_level = [];
	$scope.jugadores = [];	
	$scope.games = [];

	var efectividad_default = 0;
	var niveles = [], level_users = [];
	var idGameActual;

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
	//se obtiene todos los niveles
	TodoService.getJugadores().then(function(response) {
	    $scope.jugadores = response;
	    //$scope.temporal = response;
	});

	//se obtiene todos los niveles
	TodoService.getGames().then(function(response) {
	    $scope.games = response;
	    //$scope.temporal = response;
	});

	TodoService.getLevels().then(function(response) {
		niveles = response;
	});
	TodoService.getLevelUser().then(function(response) {
		level_users = response;
	});

	$scope.nivelesGame = function(){
        idGameActual = $scope.select.gameId;
        TodoService.getLevelsByGame(idGameActual).then(function(response) {
            $scope.levels = response;
        });
    }

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

		var rooms_default = [];
		var rooms_rest = [];
		var jugadores_room_default = [], jugadores_room_rest = [];

		
		TodoService.getLearnUserByLevel($scope.select.levelId).then(function(response) {
			$scope.learning = response;
		});

		TodoService.getEscenariosByLevel($scope.select.levelId).then(function(response) {
			$scope.rooms_level = response;
			var id_room = -100;
			for(var j=0; j < $scope.rooms_level.length; j++){
				if ($scope.rooms_level[j].nombre == 'escenario-con-historia-guia') {
					rooms_default.push($scope.rooms_level[j]);
					id_room = rooms_default[0].id;
				} else{
					rooms_rest.push($scope.rooms_level[j]);
				}
			}
			//Aquí se guardan los jugadores del room por defecto y del resto
			TodoService.getJugadoresByEscenario(id_room).then(function(response) {
	            jugadores_room_default = response;
	            TodoService.getJugadoresExceptAnEscenario(id_room).then(function(response) {
		            jugadores_room_rest = response;

		            TodoService.getLevelUserByLevel($scope.select.levelId).then(function(response) {
			      		$scope.resultados = [];
			      		$scope.level = response;

			      		

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
				        			$scope.resultados[i].resultado = resultado + " seg";
				        			break;
				        		case 2:
				        			resultado = EficienciaMeta(correctas_ok, (tiempo_juego/60)).toFixed(2);
				        			$scope.resultados[i].resultado = resultado + " corr/min";
				        			break;
				        		case 3:
					        		resultado = EficienciaMetaPorIncorrectas(incorrectas_ok, (tiempo_juego/60)).toFixed(2);
					        		$scope.resultados[i].resultado = resultado + " incorr/min";;
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
									$scope.resultados[i].resultado = resultado + "%";
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
									$scope.resultados[i].resultado = resultado + "%";
									break;
								//Efectividad
								case 6:
									resultado = EfectividadMeta(n_right_prom, n_wrong_prom).toFixed(2);
									$scope.resultados[i].resultado = resultado + "% aciertos";
									break;
								case 7:
									resultado = CompletitudMeta(n_user_complete, $scope.level.length).toFixed(2);
									$scope.resultados[i].resultado = resultado + "% j. completaron";
									break;
								case 8:
									resultado = FrecuenciaIntentosMeta(intentos_ok, correctas_ok).toFixed(2);
									$scope.resultados[i].resultado = resultado + " intentos";
									break;
								//Flexibilidad
								case 9:
									resultado = AccesibilidadPorMetas(rooms_default, rooms_rest, $scope.level, jugadores_room_default, jugadores_room_rest).toFixed(3);
									if (isNaN(resultado)) $scope.resultados[i].resultado = "No hay Jugadores en Escenario por Default";
									else $scope.resultados[i].resultado = resultado;
									break;
								case 10:
									resultado = AccesibilidadPorTiempo(rooms_default, rooms_rest, $scope.level, jugadores_room_default, jugadores_room_rest).toFixed(3);
									if (isNaN(resultado)) $scope.resultados[i].resultado = "No hay Jugadores en Escenario por Default";
									else $scope.resultados[i].resultado = resultado;
									break;
								//Satisfaccion
								case 11:
									resultado = PreferenciaUso(n_user_complete, $scope.level, niveles, level_users).toFixed(3);
									$scope.resultados[i].resultado = resultado / 100;
									break;
				        		default:
				        			break;
				        	}
				        }
			      	});

		        });
	        });
	        

	      	
		});
	}

}]);