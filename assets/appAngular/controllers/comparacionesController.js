app.controller('comparacionesController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.games = {};
	$scope.select1 = {};
	$scope.select2 = {};
	$scope.datos1 = {};
	$scope.datos2 = {};

  	TodoService.getGames().then(function(response) {
	    $scope.games = response;
  	});

  	$("#comparacion").hide()

  	$scope.datosFunction = function(){
    //console.log(id);
    	console.log($scope.select1.gameId)
      	TodoService.getDatos($scope.select1.gameId).then(function(response) {
        	$scope.datos1 = response;
        	var nombre_juego1 = $scope.datos1.nombre;
        	console.log(nombre_juego1)
        	TodoService.getDatos($scope.select2.gameId).then(function(response) {
	        	$scope.datos2 = response;
	        	var nombre_juego2 = $scope.datos2.nombre;
	        	console.log(nombre_juego2)
	        	$("#comparacion").show();
	        	$scope.añadirHtml();
	      	});
      	});

      	

  	}

  	$scope.añadirHtml = function(){
  	  $("#noDatos").hide();
  	  $("#comparacion").show();
      //$('#grafico').html('<div id="graficos"></div>')
      var nombre_capitulos = [];
      var promedio_tiempo_learn = [];
      var promedio_intentos_learn = [];
      var cantidad_completados_learn = [];
      var cantidad_abandonado_learn = [];
      var info_learn = [];
      //for (var i=0; i< $scope.datos1.chapters.length; i++){

        


        //$('#graf_'+i+'').html(datos);
        $scope.juegoCompletas = [];
        $scope.juegoAbandono = [];
        $scope.historiaCompletas = [];
        $scope.historiaAbandono = [];
        $scope.juegoTiempo = [];
        $scope.juegoTiempoMinutos = [];
        for(var n=0; n<2; n++){
	        
	        if(n == 0){
	        	var chapters = $scope.datos1.chapters;
	        } else {
	        	var chapters = $scope.datos2.chapters;
	        }
	        var suma_promedio_incorrectas = 0;
		    var suma_promedio_total_tiempo = 0;
		    var suma_promedio_total_abandonos = 0;

		    var suma_total_completados_learn = 0;
		    var suma_total_abandonos_learn = 0;

		    var suma_total_completados_juego = 0;
		    var suma_total_abandonos_juego = 0;
		    console.log(chapters)
	        for(var z=0; z<chapters.length; z++){
	        	var suma_total_preguntas = 0;
		        var suma_total_incorrectas = 0;
		        var suma_promedio_tiempo = 0;
		        var suma_total_completados = 0;
		        var suma_total_abandonos = 0;
		        for (var j=0; j< chapters[z].niveles[0].length; j++){
		            var suma_correctas = 0;
		            var suma_incorrectas = 0;
		            var suma_tiempo = 0;
		            var cantidad = 0;            
		            for (var k=0; k<chapters[z].niveles[0][j].datos[0].length; k++){
		                if((chapters[z].niveles[0][j].datos[0][k].estado).toLowerCase() == "completado"){
		                    cantidad++;   
		                }  
		                suma_correctas = suma_correctas + chapters[z].niveles[0][j].datos[0][k].correctas;
		                suma_incorrectas = suma_incorrectas + chapters[z].niveles[0][j].datos[0][k].incorrectas;
		                suma_tiempo = suma_tiempo + chapters[z].niveles[0][j].datos[0][k].tiempo_juego;
		            }
		            suma_total_preguntas = suma_total_preguntas + (suma_correctas/cantidad);
		            suma_total_incorrectas = suma_total_incorrectas + (suma_incorrectas/cantidad);
		            suma_promedio_tiempo = suma_promedio_tiempo + (suma_tiempo/cantidad);
		            suma_total_completados = suma_total_completados + cantidad;
		            suma_total_abandonos = suma_total_abandonos + (chapters[z].niveles[0][j].datos[0].length - cantidad);
	          
		        }
		        suma_total_completados_juego = suma_total_completados_juego + suma_total_completados;
		        suma_total_abandonos_juego = suma_total_abandonos_juego + suma_total_abandonos;
		        //total_preguntas_juego = total_preguntas_juego + suma_total_preguntas;
		        suma_promedio_incorrectas = suma_promedio_incorrectas + ((suma_total_incorrectas*100)/suma_total_preguntas);
		        suma_promedio_total_tiempo = suma_promedio_total_tiempo + (suma_promedio_tiempo / chapters[z].niveles[0].length);
		        suma_promedio_total_abandonos = suma_promedio_total_abandonos + ((suma_total_abandonos*100)/(suma_total_completados+suma_total_abandonos));

		        var cantidad_learn = 0;
		        var suma_tiempo_learn = 0;
		        var suma_intentos_learn = 0;
		        info_learn.push(chapters[z].learning[0].duracion);
		        for (var m=0; m<chapters[z].learning[0].datos[0].length; m++){
		            if((chapters[z].learning[0].datos[0][m].estado).toLowerCase() == "completado"){
		                cantidad_learn++;
		            }
		            suma_tiempo_learn = suma_tiempo_learn + chapters[z].learning[0].datos[0][m].tiempo_juego;
		            suma_intentos_learn = suma_intentos_learn + chapters[z].learning[0].datos[0][m].num_play;
		        }
		        suma_total_completados_learn = suma_total_completados_learn + cantidad_learn;
		        suma_total_abandonos_learn = suma_total_abandonos_learn + (chapters[z].learning[0].datos[0].length - cantidad_learn);

		        promedio_tiempo_learn[i] = Math.round(suma_tiempo_learn / cantidad_learn);
		        promedio_intentos_learn[i] = (suma_intentos_learn / cantidad_learn).toFixed(2);
		        cantidad_completados_learn[i] = cantidad_learn;
		        cantidad_abandonado_learn[i] = chapters[z].learning[0].datos[0].length - cantidad_learn;

		    }

		    $scope.juegoCompletas[n] = (suma_total_completados_juego).toFixed(2);
        	$scope.juegoAbandono[n] = (suma_total_abandonos_juego).toFixed(2);

		    $scope.historiaCompletas[n] = suma_total_completados_learn;
		    $scope.historiaAbandono[n] = suma_total_abandonos_learn;
		    $scope.juegoTiempo[n] = Math.round(suma_promedio_total_tiempo);
		    $scope.juegoTiempoMinutos[n] = Math.round(suma_promedio_total_tiempo/60)

		    var porcentaje_incorrectas = (suma_promedio_incorrectas / chapters.length).toFixed(2);
		    var porcentaje_tiempo = suma_promedio_total_tiempo / chapters.length;
		    var porcentaje_abandonos = (suma_total_abandonos_juego*100)/(suma_total_completados_juego+suma_total_abandonos_juego)


	        var incorrectas = $('#incorrectas'+n)
	        var myBarChart = new Chart(incorrectas, {
	            type: 'bar',
	            data: {
	                labels: [""],
	                datasets: [
	                    {
	                        label: "Incorrectas",
	                        data: [porcentaje_incorrectas],
	                        backgroundColor: "#5C9CEA" 
	                    }
	                ]
	            },
	            options: {
	                scales: {
	                    xAxes: [{
	                        stacked: true
	                    }],
	                    yAxes: [{
	                        stacked: true,
	                        scaleLabel: {
	                            display: true,
	                            labelString: 'Porcentaje'
	                        },
	                        ticks: {
				                suggestedMax: 100,
				            }
	                    }]
	                }
	            }
	        });

	        //grafico de completos 
	        var completos = $('#completas'+n)
	        var myBarChart = new Chart(completos, {
	            type: 'bar',
	            data: {
	                labels: [""],
	                datasets: [
	                    {
	                        label: "Abandonos",
	                        data: [porcentaje_abandonos],
	                        backgroundColor: "rgba(75,192,192,1)" 
	                    }
	                ]
	            },
	            options: {
	                scales: {
	                    xAxes: [{
	                        stacked: true
	                    }],
	                    yAxes: [{
	                        stacked: true,
	                        scaleLabel: {
	                            display: true,
	                            labelString: 'Porcentaje'
	                        },
	                        ticks: {
				                suggestedMax: 100,
				            }
	                    }]
	                }
	            }
	        });


	    }

      //}  

    }

}]);

/*
        $("#graficos").append('<div id="graf_'+i+'"></div>');

        var datos = '<section class="dashboard-header section-padding">'+
                    '<div class="container-fluid">'+
                        '<div class="row d-flex align-items-md-stretch">'+
                            '<div class="col-lg-6 col-md-6">'+
                                '<h2 class="display h4"> Capítulo '+i+': '+ $scope.datos1.chapters[i].nombre+'</h2>'+
                            '</div>'+
                            '<div class="col-lg-6 col-md-6">'+
                                '<h2 class="display h4"> Capítulo '+i+': '+ $scope.datos2.chapters[i].nombre+'</h2>'+
                            '</div>'+
                            '<div class="col-lg-6 col-md-6">'+
                                '<div class="card project-progress">'+    
                                    '<p> Cantidad promedio de respuestas correctas e incorrectas.</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="correctas0'+i+'" width="300" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-6 col-md-6">'+
                                '<div class="card project-progress">'+
                                    '<p> Tiempo promedio en segundos para completar los niveles.</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="completos0'+i+'" width="300" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-3 col-md-6 ">'+
                                '<div class="card project-progress">'+
                                    '<p> Cantidad promedio por niveles completados y abandonados</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="correctas1'+i+'" width="300" height="300"></canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-3 col-md-6">'+
                                '<div class="card project-progress" id="tablaTiempos0">'+
                                    '<p> Tabla de duraciones de animaciones por capitulo.</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-6 col-md-6 ">'+
                                '<div class="card project-progress">'+
                                    '<p> Cantidad promedio por niveles completados y abandonados</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="completos1'+i+'" width="300" height="300"></canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-3 col-md-6">'+
                                '<div class="card project-progress" id="tablaTiempos1">'+
                                    '<p> Tabla de duraciones de animaciones por capitulo.</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';

*/