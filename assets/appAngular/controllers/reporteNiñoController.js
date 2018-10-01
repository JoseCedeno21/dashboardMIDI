app.controller('reporteNiñoController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {

  $scope.rooms = {};
  $scope.games = {};
  $scope.escuelas = {};
  $scope.jugadores = {};
  $scope.datos = {};
  $scope.datosJuego = {};
  $scope.select = {};
  //scope para historia
  $scope.promTiempo = {};
  $scope.promIntentos = {};
  $scope.fechaInicio = {};
  $scope.fechaFin = {};
  $scope.completadoHistoria = {};

  //scope para juego
  $scope.promTiempoJuego = {};
  $scope.completadoJuego = {};
  $scope.abandonoJuego = {};
  $scope.correctasJuego = {};
  $scope.porcAbandonoJuego = {};

  //funcion trim para quitar todos los espacios de un string
  String.prototype.trim = function() { 
    return this.replace(/^\s+|\s+$/g, ""); 
  };

  $('#reporte').hide();

  $scope.datosJugador = {};


    //se obtiene todos los room
    TodoService.getEscenarios().then(function(response) {
        $scope.rooms = response;
        console.log("EN EL CONTROLADOR");
        console.log(response);
    });

    TodoService.getEscuelas().then(function(response) {
        $scope.escuelas = response;
        console.log("EN EL CONTROLADOR");
        console.log(response);
    });

    TodoService.getGames().then(function(response) {
        $scope.games = response;
        console.log("EN EL CONTROLADOR");
        console.log(response);
    });

  //se obtiene todos los jugadores por room
  $scope.jugadoresRoomEscuela = function(){
        var idRoom = $scope.select.roomId;
        var idEscuela = $scope.select.escuelaId;
        TodoService.getJugadoresByRoomEscuela($scope.select.gameId, $scope.select.roomId, $scope.select.escuelaId).then(function(response) {
            $scope.jugadores = response;
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
        $scope.mostrarReporte();
    });
  }

  $scope.mostrarReporte = function(){
    $('#reporte').show();
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
      var promedio_tiempo_learn = [];
      var promedio_intentos_learn = [];
      var fecha_inicio_learn = [];
      var fecha_fin_learn = [];
      var completado_learn = [];
      var datos_juego = [];
      var info_learn = [];
      for (var i=0; i< $scope.datos.chapters.length; i++){
        console.log("entra")
        var promedio_correctas = [];
        var promedio_incorrectas = [];
        var promedio_tiempo = [];
        var completJuego = [];
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
            var suma_correctas = 0;
            var suma_incorrectas = 0;
            var suma_tiempo = 0;
            var cantidad = 0;
            if(chapters.niveles[0][j].datos){
              for (var k=0; k<chapters.niveles[0][j].datos[0].length; k++){

                  var fi = $scope.fechaString(chapters.niveles[0][j].datos[0][k].fecha_inicio);
                  fecha_inicio.push(fi);
                  var ff = $scope.fechaString(chapters.niveles[0][j].datos[0][k].fecha_fin);
                  fecha_fin.push(ff);
                  
                  intentos.push(chapters.niveles[0][j].datos[0][k].intentos);
               
                  var complete = "No";
                  if((chapters.niveles[0][j].datos[0][k].estado).toLowerCase() == "completado"){
                      cantidad++;    
                      complete = "Sí";
                
                  } 
                  completado.push(complete)
                  suma_correctas = suma_correctas + chapters.niveles[0][j].datos[0][k].correctas;
                  suma_incorrectas = suma_incorrectas + chapters.niveles[0][j].datos[0][k].incorrectas;
                  suma_tiempo = suma_tiempo + chapters.niveles[0][j].datos[0][k].tiempo_juego; 
   
              }
            }  

            //conclusion para respuestas correctass e incorrectas
            var sc = suma_correctas;
            var si = suma_incorrectas;
            var porcentaje = Math.round((si*100)/sc);
            if(porcentaje <= 25){
              var conclusion = sc+", la cantidad de respuestas incorrectas es "+si+" lo cual equivale a un porcentaje del "+porcentaje+"%, por lo tanto al niño no se le dificultó concluir el nivel";
            } else if(porcentaje > 25 && porcentaje < 50){
              var conclusion = sc+", la cantidad de respuestas incorrectas es "+si+" lo cual equivale a un porcentaje del "+porcentaje+"%, por lo tanto al niño se le dificultó un poco concluir el nivel";
            } else {
              var conclusion = sc+", la cantidad de respuestas incorrectas es "+si+" lo cual equivale a un porcentaje del "+porcentaje+"%, por lo tanto al niño se les dificultó bastante concluir el nivel";
            }
            promedio_correctas.push({conclusion: conclusion});

            //conlusion para tiempo jugado
            promedio_tiempo.push({cantidad:suma_tiempo});

            //conclusion para completados y abandonos 
            completJuego.push({completado:complete});

        }

        $scope.promTiempoJuego = promedio_tiempo;
        $scope.correctasJuego = promedio_correctas;
        $scope.completadoJuego = completJuego;

        datos_juego.push({
          tiempo: $scope.promTiempoJuego,
          completado: $scope.completadoJuego,
          correctas: $scope.correctasJuego
        })

        var info_learn = [];
        if(chapters.learning[0].datos[0][0]){
          var fi = $scope.fechaString(chapters.learning[0].datos[0][0].fecha_inicio);
          info_learn[0] = fi;
          var ff = $scope.fechaString(chapters.learning[0].datos[0][0].fecha_fin);
          info_learn[1] = ff;
          info_learn[2] = chapters.learning[0].datos[0][0].tiempo_juego;
          info_learn[3] = "No";
          if((chapters.learning[0].datos[0][0].estado).toLowerCase() == "completado"){
            info_learn[3] = "Sí";
          }
          
          info_learn[4] = chapters.learning[0].datos[0][0].num_play;
        }

        //conclusiones para el tiempo de visualizacion de la historia
        var ptl = info_learn[2];
        if(ptl > chapters.learning[0].duracion+5){
          var conclusion = ptl+" segundos, el cual es mayor al de la duración real, lo que quiere decir que al niño le cuesta un poco mas su entendimiento";
        } else if(ptl < chapters.learning[0].duracion+5){
          var conclusion = ptl+" segundos, el cual es menor al de la duración real, lo que quiere decir que al niño no le llama la atencion esta historia o lo aburre";
        } else {
          var conclusion = ptl+" segundos, el cual es igual o aproximado a la duración real, por lo tanto la historia es entendible e interesante para el niño";
        }
        promedio_tiempo_learn.push({conclusion:conclusion});

        //conclusiones para la cantidad de intentos 
        promedio_intentos_learn.push({cantidad:info_learn[4]});

        fecha_inicio_learn.push({fecha:info_learn[0]}) ;
        fecha_fin_learn.push({fecha:info_learn[1]});

        completado_learn.push({completado:info_learn[3]});
      }

      $scope.promTiempo = promedio_tiempo_learn;
      $scope.promIntentos = promedio_intentos_learn;
      $scope.fechaInicio = fecha_inicio_learn;
      $scope.fechaFin = fecha_fin_learn;
      $scope.completadoHistoria = completado_learn;

      $scope.datosJuego = datos_juego;
      console.log($scope.datosJuego)
    };

}]);



      
