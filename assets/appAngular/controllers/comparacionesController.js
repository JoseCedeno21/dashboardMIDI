app.controller('comparacionesController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.games = {};
	$scope.select1 = {};
	$scope.select2 = {};
	$scope.datos1 = {};
	$scope.datos2 = {};

  	TodoService.getGames().then(function(response) {
	    $scope.games = response;
  	});

  	$scope.datosFunction = function(){
    //console.log(id);
    	console.log($scope.select1.gameId)
      	TodoService.getDatos($scope.select1.gameId).then(function(response) {
        	$scope.datos1 = response;
        	var nombre_juego = $scope.datos.nombre;
        	console.log(nombre_juego)
        	TodoService.getDatos($scope.select2.gameId).then(function(response) {
	        	$scope.datos2 = response;
	        	var nombre_juego = $scope.datos.nombre;
	        	console.log(nombre_juego)
	        	$scope.añadirHtml();
	      	});
      	});

      	

  	}

  	$scope.añadirHtml = function(){
      $('#grafico').html('<div id="graficos"></div>')
      var nombre_capitulos = [];
      var promedio_tiempo_learn = [];
      var promedio_intentos_learn = [];
      var cantidad_completados_learn = [];
      var cantidad_abandonado_learn = [];
      var info_learn = [];
      for (var i=0; i< $scope.datos1.chapters.length; i++){
        console.log("entra")
        nombre_capitulos[i] = $scope.datos.chapters[i].nombre.trim();
        
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

        $('#graf_'+i+'').html(datos);
        for(var n=0; n<2; n++){
	        var nombre_niveles = [];
	        var promedio_correctas = [];
	        var promedio_incorrectas = [];
	        var promedio_tiempo = [];
	        var cantidad_completados = [];
	        var cantidad_abandonado = [];
	        if(n == 0){
	        	var chapters = $scope.datos1.chapters[i];
	        } else {
	        	var chapters = $scope.datos2.chapters[i];
	        }
	        for (var j=0; j< chapters.niveles[0].length; j++){
	            nombre_niveles[j] = chapters.niveles[0][j].nombre.trim();
	            var suma_correctas = 0;
	            var suma_incorrectas = 0;
	            var suma_tiempo = 0;
	            var cantidad = 0;            
	            for (var k=0; k<chapters.niveles[0][j].datos[0].length; k++){
	                if(chapters.niveles[0][j].datos[0][k].estado == "completado"){
	                    cantidad++;
	                    suma_correctas = suma_correctas + chapters.niveles[0][j].datos[0][k].correctas;
	                    suma_incorrectas = suma_incorrectas + chapters.niveles[0][j].datos[0][k].incorrectas;
	                    suma_tiempo = suma_tiempo + chapters.niveles[0][j].datos[0][k].tiempo_juego;
	                }  
	            }
	            promedio_correctas[j] = suma_correctas / cantidad;
	            promedio_incorrectas[j] = suma_incorrectas / cantidad;
	            promedio_tiempo[j] = suma_tiempo / cantidad;
	            cantidad_completados[j] = cantidad;
	            cantidad_abandonado[j] = chapters.niveles[0][j].datos[0].length - cantidad;            
	        }
	        var cantidad_learn = 0;
	        var suma_tiempo_learn = 0;
	        var suma_intentos_learn = 0;
	        info_learn.push(chapters.learning[0].duracion);
	        for (var m=0; m<chapters.learning[0].datos[0].length; m++){
	            if(chapters.learning[0].datos[0][m].estado == "completado"){
	                cantidad_learn++;
	                suma_tiempo_learn = suma_tiempo_learn + chapters.learning[0].datos[0][m].tiempo_juego;
	                suma_intentos_learn = suma_intentos_learn + chapters.learning[0].datos[0][m].num_play;
	            }
	        }
	        promedio_tiempo_learn[i] = suma_tiempo_learn / cantidad_learn;
	        promedio_intentos_learn[i] = suma_intentos_learn / cantidad_learn;
	        cantidad_completados_learn[i] = cantidad_learn;
	        cantidad_abandonado_learn[i] = chapters.learning[0].datos[0].length - cantidad_learn;
	        console.log(promedio_tiempo_learn);
	        console.log(cantidad_completados_learn);
	        console.log(cantidad_abandonado_learn);

	        var correctas = $('#correctas'+n+i)
	        var myBarChart = new Chart(correctas, {
	            type: 'bar',
	            data: {
	                labels: nombre_niveles,
	                datasets: [
	                    {
	                        label: "Correctas",
	                        data: promedio_correctas,
	                        backgroundColor: "#5C9CEA" },
	                    {
	                        label: "Incorrectas",
	                        data: promedio_incorrectas,
	                        backgroundColor: "#EDA2BA" }
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
	                            labelString: 'Cantidad'
	                          }
	                    }]
	                }
	            }
	        });

	        //grafico de completos 
	        var completos = $('#completas'+n+i)
	        var myBarChart = new Chart(completos, {
	            type: 'bar',
	            data: {
	                labels: nombre_capitulos,
	                datasets: [
	                    {
	                        label: "Completos",
	                        data: cantidad_completados,
	                        backgroundColor: "rgba(75,192,192,1)" },
	                    {
	                        label: "Abandonos",
	                        data: cantidad_abandonado,
	                        backgroundColor: "#84D89A" }
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
	                            labelString: 'Cantidad'
	                          }
	                    }]
	                }
	            }
	        });


	      	//tabla
	      	console.log("EL INFO LEARN")
	      	console.log(info_learn);
	      	var criterios = ["Tiempo", "Completado"];

	        var divTabla = document.getElementById('tablaTiempos'+n);
	        var tabla   = document.createElement("table");
	        var tblHead = document.createElement("thead");
	        var trHead = document.createElement("tr");

	        var thHead = document.createElement("th");
	        var textoth = document.createTextNode(" ");
	        thHead.appendChild(textoth);
	        trHead.appendChild(thHead);

	        //for(var p=0; p<nombre_capitulos.length; p++){
	        var thHead = document.createElement("th");
	            //var textoth = document.createTextNode(nombre_capitulos[p].trim());
	        var textoth = document.createTextNode("Segundos");
	        thHead.appendChild(textoth);
	        trHead.appendChild(thHead);
	        
	        tblHead.appendChild(trHead);

	        var tblBody = document.createElement("tbody");
	        for (var m = 0; m < nombre_capitulos.length; m++) {
	            var trBody = document.createElement("tr");

	            var thBody = document.createElement("th");
	            var textoCelda = document.createTextNode(nombre_capitulos[m]);
	            thBody.appendChild(textoCelda);
	            trBody.appendChild(thBody);

	            //for (var n = 0; n < nombre_capitulos.length; n++) {
	              
	            var tdBody = document.createElement("td");
	            var textoCelda = document.createTextNode(info_learn[m]);
	            tdBody.appendChild(textoCelda);
	            trBody.appendChild(tdBody);
	            //}
	            tblBody.appendChild(trBody);
	        }
	        tabla.appendChild(tblHead);
	        tabla.appendChild(tblBody);
	        divTabla.appendChild(tabla);
	        //tabla.setAttribute("border", "1");
	        tabla.className = "table table-bordered";
	    }

      }  

    }

}]);