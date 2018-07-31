app.controller('interpretacionController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.questions = [];
	$scope.levels = [];
	$scope.level = [];
	$scope.learning = [];

	$scope.questions.push({
		id: 1,
		pregunta: "¿El nivel es entretenido?",
		respuesta: "",
		descripcion: "t_play (alto) - num_try(alto) – status(completado)"});
	$scope.questions.push({
		id: 2,
		pregunta: "¿El nivel es frustrante?",
		respuesta: "",
		descripcion: "t_play (alto) - num_try(alto) – status(abandonado)"});
	$scope.questions.push({
		id: 3,
		pregunta: "¿Es eficiente la parte de Enseñanza del Nivel?",
		respuesta: "",
		descripcion: "status(finalizado) - n_wrong(bajo) - t_play (promedio) - num_play(promedio) – status(completado)"});

	//se obtiene todos los niveles
	TodoService.getLevels().then(function(response) {
	    $scope.levels = response;
	    //$scope.temporal = response;
	});


	$scope.funcionLevel = function(){
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
	        			console.log("Pregunta 1: " + $scope.questions[m].pregunta + " - con ID: " + $scope.questions[m].id);
	        			
	        			var t_play_status = "", num_try_status = "", completado = false;

						for(var i=0; i<$scope.level.length; i++){
							t_play_prom = t_play_prom + $scope.level[i].tiempo_juego;
							num_try_prom = num_try_prom + $scope.level[i].intentos;
							t_play[i] = $scope.level[i].tiempo_juego;
							num_try[i] = $scope.level[i].intentos;
							if ($scope.level[i].estado == "completado") {completado = true;}
						}
						if (completado) {
						//TIEMPO JUGADO
							t_play_prom = t_play_prom / $scope.level.length;
							q_mid = numbers.statistic.quantile(t_play, 2, 4);
							
		        			if (t_play_prom <= q_mid) t_play_status = "ALTO";
		        			else t_play_status = "BAJO";
		        			console.log("Promedio de juego: " + t_play_prom);
							console.log("Cuartil 2: " + q_mid);
							console.log("Status: " + t_play_status);
		        			
		        			//INTENTOS
							num_try_prom = num_try_prom / $scope.level.length;
							q_mid = numbers.statistic.quantile(num_try, 2, 4);
							
		        			if (num_try_prom <= q_mid) num_try_status = "ALTO";
		        			else num_try_status = "BAJO";
		        			console.log("Promedio de intentos: " + num_try_prom);
							console.log("Cuartil 2: " + q_mid);
							console.log("Status: " + num_try_status);
						}

	        			//RESPUESTA
	        			if (t_play_status == "ALTO" && t_play_status == "ALTO") $scope.questions[0].respuesta = "Si es divertido";
	        			else $scope.questions[1].respuesta = "Normal";
	        			console.log("Supuesta respuesta: " + $scope.questions[0].respuesta);
	        			
	        			break;
	        		case 2:
	        			console.log("Pregunta 2");

	        			var t_play_status = "", num_try_status = "", abandonado = false;

						for(var i=0; i<$scope.level.length; i++){
							t_play_prom = t_play_prom + $scope.level[i].tiempo_juego;
							num_try_prom = num_try_prom + $scope.level[i].intentos;
							t_play[i] = $scope.level[i].tiempo_juego;
							num_try[i] = $scope.level[i].intentos;
							if ($scope.level[i].estado == "abandonado") {abandonado = true;}
						}
						if (abandonado) {
						//TIEMPO JUGADO
							t_play_prom = t_play_prom / $scope.level.length;
							q_mid = numbers.statistic.quantile(t_play, 2, 4);
							
		        			if (t_play_prom <= q_mid) t_play_status = "ALTO";
		        			else t_play_status = "BAJO";
		        			console.log("Promedio de juego: " + t_play_prom);
							console.log("Cuartil 2: " + q_mid);
							console.log("Status: " + t_play_status);
		        			
		        			//INTENTOS
							num_try_prom = num_try_prom / $scope.level.length;
							q_mid = numbers.statistic.quantile(num_try, 2, 4);
							
		        			if (num_try_prom <= q_mid) num_try_status = "ALTO";
		        			else num_try_status = "BAJO";
		        			console.log("Promedio de intentos: " + num_try_prom);
							console.log("Cuartil 2: " + q_mid);
							console.log("Status: " + num_try_status);
						}

	        			//RESPUESTA
	        			if (t_play_status == "ALTO" && t_play_status == "ALTO") $scope.questions[1].respuesta = "Si es divertido";
	        			else $scope.questions[1].respuesta = "Normal";
	        			console.log("Supuesta respuesta: " + $scope.questions[1].respuesta);
	        			
	        			break;
	        		case 3:
	        			console.log("Pregunta 3");
		        		TodoService.getLearnUserByLevel($scope.select.levelId).then(function(response) {
		        			$scope.learning = response;
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