app.controller('EspecificoController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
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

	  //funcion para añadir los graficos a la pagina principal por medio de codigo html 
  	$scope.añadirHtml = function(){
      //$("#titulo_juego").append('<div style="text-align:center"><h1 class="">Juego: '+$scope.datos.nombre+'</h1></div>');
      $('#grafico').html('<div id="graficos"></div>')
      //var div = document.getElementById("graf_3");
      //if(div != null){
      //div.parentElement.removeChild(div);
      //}
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
            	//info[0][k] = chapters.niveles[0][j].datos[0][k].fecha_inicio;
                //info[1][k] = chapters.niveles[0][j].datos[0][k].fecha_fin;
                //info[2][k] = chapters.niveles[0][j].datos[0][k].intentos;
                fecha_inicio.push(chapters.niveles[0][j].datos[0][k].fecha_inicio);
                
                fecha_fin.push(chapters.niveles[0][j].datos[0][k].fecha_fin);
                
                intentos.push(chapters.niveles[0][j].datos[0][k].intentos);
                

            	var complete = "";
            	//info[4][k] = "";
                if(chapters.niveles[0][j].datos[0][k].estado == "completado"){
                    cantidad++;    
                    complete = "X";
                    //info[4][k] = "X";               
                } 
                completado.push(complete)
                suma_correctas = suma_correctas + chapters.niveles[0][j].datos[0][k].correctas;
                suma_incorrectas = suma_incorrectas + chapters.niveles[0][j].datos[0][k].incorrectas;
                suma_tiempo = suma_tiempo + chapters.niveles[0][j].datos[0][k].tiempo_juego; 
                

                
                //informacionTabla.push()
            }
            
            promedio_correctas[j] = suma_correctas ;
            promedio_incorrectas[j] = suma_incorrectas ;
            promedio_tiempo[j] = suma_tiempo ;
            cantidad_completados[j] = cantidad;
            cantidad_abandonado[j] = chapters.niveles[0][j].datos[0].length - cantidad;
        }
        info.push(fecha_inicio);
        info.push(fecha_fin);
        info.push(intentos);
        info.push(completado);
        //var nivelesVar = 
        console.log("EL INFO");
        console.log(info);
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
                            '<div class="col-lg-4 col-md-6">'+
                                '<div class="card project-progress" id="tabla'+i+'">'+
                                	'<p> Tabla de información por niveles del capítulo.</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';

        $('#graf_'+i+'').html(datos);
        
        var criterios = ["Fecha Inicio", "Fecha_Fin", "Intentos", "Completado"];

        var divTabla = document.getElementById('tabla'+i+'');
		var tabla   = document.createElement("table");
		var tblHead = document.createElement("thead");
		var trHead = document.createElement("tr");

		var thHead = document.createElement("th");
		var textoth = document.createTextNode("criterio");
		thHead.appendChild(textoth);
		trHead.appendChild(thHead);

		for(var p=0; p<nombre_niveles.length; p++){
			var thHead = document.createElement("th");
			var textoth = document.createTextNode(nombre_niveles[p].trim());
			thHead.appendChild(textoth);
			trHead.appendChild(thHead);
		}
		tblHead.appendChild(trHead);

		var tblBody = document.createElement("tbody");
		for (var m = 0; m < 4; m++) {
		    var trBody = document.createElement("tr");

			var thBody = document.createElement("th");
		    var textoCelda = document.createTextNode(criterios[m]);
		    thBody.appendChild(textoCelda);
		    trBody.appendChild(thBody);

		    for (var n = 0; n < nombre_niveles.length; n++) {
			  
		      var tdBody = document.createElement("td");
		      var textoCelda = document.createTextNode(info[m][n]);
		      tdBody.appendChild(textoCelda);
		      trBody.appendChild(tdBody);
		    }
		    tblBody.appendChild(trBody);
		  }
		  tabla.appendChild(tblHead);
		  tabla.appendChild(tblBody);
		  divTabla.appendChild(tabla);
		  tabla.setAttribute("border", "1");
		//document.getElementBy
		//tabla.className = "table";
		//tabla.className = "table-bordered";
		

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