app.controller('analisisNivelControler', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
	$scope.rooms = {};
	$scope.jugadores = {};
	$scope.datosJugador = {};
	$scope.games = {};
	$scope.chapters = {};
	$scope.niveles = {};
  	$scope.datos = {};
  	$scope.cantidades = {};
  	$scope.select = {};

  	$('#titulo').hide();

  	//funcion trim para quitar todos los espacios de un string
  	String.prototype.trim = function() { 
    	return this.replace(/^\s+|\s+$/g, ""); 
  	};

  	//se obtiene todos los room
	TodoService.getRoom().then(function(response) {
	    $scope.rooms = response;
	    console.log("EN EL CONTROLADOR");
	    console.log(response);
	});

	//se obtiene todos los jugadores por room
	$scope.jugadoresRoom = function(){
		var idRoom = $scope.select.roomId;
		TodoService.getJugadoresByRoom(idRoom).then(function(response) {
		    $scope.jugadores = response;
		    console.log("EN EL CONTROLADOR");
		    console.log(response);
		});
		$scope.gameRoom();
	}

	//se obtiene el juego por room
	$scope.gameRoom = function(){
		idRoom = $scope.select.roomId;
		TodoService.getGameByRoom(idRoom).then(function(response) {
		    $scope.games = response;
		    console.log("EN EL CONTROLADOR");
		    console.log(response);
		});
	}

	//se obtiene los capitulos por juego
	$scope.chaptersGame = function(){
		var idGame = $scope.games[0].id;
		TodoService.getChaptersByGame(idGame).then(function(response) {
		    $scope.chapters = response;
		    console.log("EN EL CONTROLADOR");
		    console.log(response);
		});
	}
	
	//se obtiene los capitulos por juego
	$scope.nivelesChapter = function(){
		var idChapter = $scope.select.chapterId;
		TodoService.getNivelesByChapter(idChapter).then(function(response) {
		    $scope.niveles = response;
		    console.log("EN EL CONTROLADOR");
		    console.log(response);
		});
	}
	
	//se obtiene todos los datos del jugador
	$scope.datosJugadorFunc = function(){
		console.log($scope.select.jugadorId)
		console.log($('#jugador').val())
		idJugador = $scope.select.jugadorId;
		TodoService.getDatosByJugador(idJugador).then(function(response) {
		    $scope.datosJugador = response;
		    console.log("EN EL CONTROLADOR TODOS DATOS");
		    console.log(response);
		    $scope.games = response;
		});
	}

	$scope.graficar = function(){
		$('#titulo').show();
		$('#noDatos').hide();
		var game = $scope.select.gameId;
		for(var i=0; i<$scope.games.length; i++){
			if($scope.games[i].id == game){
				$scope.datos = $scope.games[i];
				break;
			}
		}
		$scope.añadirHtml();
	}

	$scope.fechaString = function(fecha){
		var date = new Date(fecha);
		var dia = date.getDate();
		var mes = date.getMonth();
		var anio = date.getFullYear();
		var f = dia+"/"+mes+"/"+anio;
		return f; 
	}

	  //funcion para añadir los graficos a la pagina principal por medio de codigo html 
  	$scope.añadirHtml = function(){
      $('#grafico').html('<div id="graficos"></div>')

      for (var i=0; i< $scope.datos.chapters.length; i++){
        console.log("entra")
        var nombre_niveles = [];
        var promedio_correctas = [];
        var promedio_incorrectas = [];
        var promedio_tiempo = [];
        var cantidad_completados = [];
        var cantidad_abandonado = [];
        var fecha_inicio = [];
        var fecha_fin = [];
        var intentos = [];
        var completado = [];
        var informacionTabla = [];
        var info = [];
        var chapters = $scope.datos.chapters[i];
        for (var j=0; j< chapters.niveles[0].length; j++){
            nombre_niveles[j] = chapters.niveles[0][j].nombre.trim();
            var suma_correctas = 0;
            var suma_incorrectas = 0;
            var suma_tiempo = 0;
            var cantidad = 0;
            for (var k=0; k<chapters.niveles[0][j].datos[0].length; k++){

                var fi = $scope.fechaString(chapters.niveles[0][j].datos[0][k].fecha_inicio);
                fecha_inicio.push(fi);
                var ff = $scope.fechaString(chapters.niveles[0][j].datos[0][k].fecha_fin);
                fecha_fin.push(ff);
                
                intentos.push(chapters.niveles[0][j].datos[0][k].intentos);
             
            	var complete = "No";
                if(chapters.niveles[0][j].datos[0][k].estado == "completado"){
                    cantidad++;    
                    complete = "Sí";
              
                } 
                completado.push(complete)
                suma_correctas = suma_correctas + chapters.niveles[0][j].datos[0][k].correctas;
                suma_incorrectas = suma_incorrectas + chapters.niveles[0][j].datos[0][k].incorrectas;
                suma_tiempo = suma_tiempo + chapters.niveles[0][j].datos[0][k].tiempo_juego; 
 
            }
            
            promedio_correctas[j] = suma_correctas ;
            promedio_incorrectas[j] = suma_incorrectas ;
            promedio_tiempo[j] = suma_tiempo ;
            cantidad_completados[j] = cantidad;
            cantidad_abandonado[j] = chapters.niveles[0][j].datos[0].length - cantidad;
        }
        var info_learn = [];
        var fi = $scope.fechaString(chapters.learning[0].datos[0][0].fecha_inicio);
        info_learn[0] = fi;
        var ff = $scope.fechaString(chapters.learning[0].datos[0][0].fecha_fin);
        info_learn[1] = ff;
        info_learn[2] = chapters.learning[0].datos[0][0].tiempo_juego;
        info_learn[3] = "No";
        if(chapters.learning[0].datos[0][0].estado == "completado"){
        	info_learn[3] = "Sí";
        }
        
        info_learn[4] = chapters.learning[0].datos[0][0].num_play;

        info.push(fecha_inicio);
        info.push(fecha_fin);
        info.push(intentos);
        info.push(completado);
        //var nivelesVar = 
        console.log("EL CHAPTER");
        console.log(chapters);
        console.log(informacionTabla)
        $("#graficos").append('<div id="graf_'+i+'"></div>');

        var datos = '<section class="dashboard-header section-padding">'+
                    '<div class="container-fluid">'+
                        '<div class="row d-flex align-items-md-stretch">'+
                            '<div class="col-lg-12 col-md-12">'+
                                '<h2 class="display h4"> Capítulo '+i+': '+ $scope.datos.chapters[i].nombre+'</h2>'+
                            '</div>'+
                            '<div class="col-lg-4 col-md-6">'+
                                '<div class="card project-progress">'+    
                                    '<p> Cantidad promedio de respuestas correctas e incorrectas.</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="correctas'+i+'" width="300" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-4 col-md-6">'+
                                '<div class="card project-progress">'+
                                    '<p> Tiempo promedio en segundos para completar los niveles.</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="tiempo'+i+'" width="300" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-4 col-md-6 text-center">'+
                                '<div class="card project-progress" id="tabla_learn'+i+'">'+
                                	'<h2 class="display h4"> Información de Historia</h2>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-8 col-md-6" style="padding-top:60px">'+
                                '<div class="card project-progress" style="padding-top:10px" id="tabla_juego'+i+'">'+
                         
                                '</div>'+
                            '</div>'+
                            
                        '</div>'+
                    '</div>'+
                '</section>';

        $('#graf_'+i+'').html(datos);
        
        var criterios = ["Fecha Inicio", "Fecha_Fin", "Intentos", "Completado"];

        // tabla de informacion de juego
        var divTabla = document.getElementById('tabla_juego'+i+'');
		var tabla   = document.createElement("table");
		var tblHead = document.createElement("thead");
		var trHead = document.createElement("tr");

		var thHead = document.createElement("th");
		var textoth = document.createTextNode(" ");
		thHead.appendChild(textoth);
		trHead.appendChild(thHead);

		var thHead = document.createElement("th");
		var textoth = document.createTextNode("Información de Juego");
		thHead.setAttribute("colspan","4");
		thHead.className = "text-center";
		thHead.appendChild(textoth);
		trHead.appendChild(thHead);

		tblHead.appendChild(trHead);
		var trHead = document.createElement("tr");

		var thHead = document.createElement("th");
		var textoth = document.createTextNode("Nivel");
		thHead.appendChild(textoth);
		trHead.appendChild(thHead);

		for(var p=0; p<criterios.length; p++){
			var thHead = document.createElement("th");
			var textoth = document.createTextNode(criterios[p].trim());
			thHead.appendChild(textoth);
			trHead.appendChild(thHead);
		}
		tblHead.appendChild(trHead);

		var tblBody = document.createElement("tbody");
		for (var m = 0; m < nombre_niveles.length; m++) {
		    var trBody = document.createElement("tr");

			var thBody = document.createElement("th");
		    var textoCelda = document.createTextNode(nombre_niveles[m].trim());
		    thBody.appendChild(textoCelda);
		    trBody.appendChild(thBody);

		    for (var n = 0; n < criterios.length; n++) {
			  
		      var tdBody = document.createElement("td");
		      var textoCelda = document.createTextNode(info[n][m]);
		      tdBody.appendChild(textoCelda);
		      trBody.appendChild(tdBody);
		    }
		    tblBody.appendChild(trBody);
		  }
		  tabla.appendChild(tblHead);
		  tabla.appendChild(tblBody);
		  divTabla.appendChild(tabla);
		tabla.className = "table table-bordered text-center";
		

		var criterios_learn = ["Fecha Inicio", "Fecha_Fin", "duracion", "Completado", "intentos"];
		//tabla de informacion de historia
		var divTabla = document.getElementById('tabla_learn'+i+'');
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
        var textoth = document.createTextNode("Datos");
        thHead.appendChild(textoth);
        trHead.appendChild(thHead);
        
        tblHead.appendChild(trHead);

        var tblBody = document.createElement("tbody");
        for (var m = 0; m < criterios_learn.length; m++) {
            var trBody = document.createElement("tr");

            var thBody = document.createElement("th");
            var textoCelda = document.createTextNode(criterios_learn[m]);
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
        tabla.className = "table table-bordered text-center";


        var correctas = $('#correctas'+i)
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

        //grafico de tiempos
        var tiempo = $('#tiempo'+i)
        var myBarChart = new Chart(tiempo, {
            type: 'bar',
            data: {
                labels: nombre_niveles,
                datasets: [
                    {
                        label: "tiempo",
                        data: promedio_tiempo,
                        backgroundColor: "#E3A151" }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Segundos'
                          }
                    }]
                }
            }
        });

        //grafico de completos
        /*var completos = $('#completos'+i)
        var myBarChart = new Chart(completos, {
            type: 'bar',
            data: {
                labels: nombre_niveles,
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
        });*/
      }
    };

}]);