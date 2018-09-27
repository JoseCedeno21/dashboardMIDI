app.controller('reporteGameController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {

  $scope.games = {};
  $scope.datos = {};
  $scope.datosJuego = {};
  $scope.select = {};
  //scope para historia
  $scope.promTiempo = {};
  $scope.promIntentos = {};
  $scope.completadoHistoria = {};
  $scope.abandonoHistoria = {};
  $scope.porcAbandonoHistoria = {};

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

  //se obtiene todos los juegos
  TodoService.getGames().then(function(response) {
    $scope.games = response;
    $scope.select.gameId = response[0].id;
    //$scope.select.gameId = 1;
    //$scope.datosFunction();

  });

  $scope.datosGame = function(){
    $('#noDatos').hide();
    $('#reporte').show();
    TodoService.getDatos($scope.select.gameId).then(function(response) {
      $scope.datos = response;

      var nombre_capitulos = [];
      var promedio_tiempo_learn = [];
      var promedio_intentos_learn = [];
      var cantidad_completados_learn = [];
      var cantidad_abandonado_learn = [];
      var porcentaje_abandonado_learn = [];
      var datos_juego = [];
      var info_learn = [];
      for (var i=0; i< $scope.datos.chapters.length; i++){
        nombre_capitulos[i] = $scope.datos.chapters[i].nombre.trim();
        var nombre_niveles = [];
        var promedio_correctas = [];
        var promedio_incorrectas = [];
        var promedio_tiempo = [];
        var cantidad_completados = [];
        var cantidad_abandonado = [];
        var porcentaje_abandonado = [];
        var chapters = $scope.datos.chapters[i];
        for (var j=0; j< chapters.niveles[0].length; j++){
            nombre_niveles[j] = chapters.niveles[0][j].nombre.trim();
            var suma_correctas = 0;
            var suma_incorrectas = 0;
            var suma_tiempo = 0;
            var cantidad = 0;           
            for (var k=0; k<chapters.niveles[0][j].datos[0].length; k++){
                if((chapters.niveles[0][j].datos[0][k].estado).toLowerCase() == "completado"){
                    cantidad++;
                }  
                suma_correctas = suma_correctas + chapters.niveles[0][j].datos[0][k].correctas;
                suma_incorrectas = suma_incorrectas + chapters.niveles[0][j].datos[0][k].incorrectas;
                suma_tiempo = suma_tiempo + chapters.niveles[0][j].datos[0][k].tiempo_juego;
            }
            //conclusion para respuestas correctass e incorrectas
            var sc = (suma_correctas / cantidad).toFixed(2);
            var si = (suma_incorrectas / cantidad).toFixed(2);
            var porcentaje = Math.round((si*100)/sc);
            if(porcentaje <= 25){
              var conclusion = sc+", la cantidad promedio de respuesta incorrectas es "+si+" lo cual equivale a un porcentaje del "+porcentaje+"%, por lo tanto a la mayoria de los niños no se les dificulta concluir el nivel";
            } else if(porcentaje > 25 && porcentaje < 50){
              var conclusion = sc+", la cantidad promedio de respuesta incorrectas es "+si+" lo cual equivale a un porcentaje del "+porcentaje+"%, por lo tanto a la mayoria de los niños se le dificulta un poco concluir el nivel";
            } else {
              var conclusion = sc+", la cantidad promedio de respuesta incorrectas es "+si+" lo cual equivale a un porcentaje del "+porcentaje+"%, por lo tanto a la mayoria de los niños se les dificulta concluir el nivel y merece ser revisado";
            }
            promedio_correctas.push({conclusion: conclusion});

            //conlusion para tiempo jugado
            promedio_tiempo.push({cantidad:Math.round(suma_tiempo / cantidad)});

            //conclusion para completados y abandonos
            var cc = cantidad;
            var ca = chapters.niveles[0][j].datos[0].length - cantidad;
            var porc = Math.round((ca*100)/(cc+ca)); 
            cantidad_completados.push({cantidad:cc});
            cantidad_abandonado.push({cantidad:ca}); 
            porcentaje_abandonado.push({cantidad:porc});
        }
        $scope.promTiempoJuego = promedio_tiempo;
        $scope.completadoJuego = cantidad_completados;
        $scope.abandonoJuego = cantidad_abandonado;
        $scope.correctasJuego = promedio_correctas;
        $scope.porcAbandonoJuego = porcentaje_abandonado;

        datos_juego.push({
          tiempo: $scope.promTiempoJuego,
          completado: $scope.completadoJuego,
          abandono: $scope.abandonoJuego,
          porcAbandono: $scope.porcAbandonoJuego,
          correctas: $scope.correctasJuego
        })

        var cantidad_learn = 0;
        var suma_tiempo_learn = 0;
        var suma_intentos_learn = 0;
        info_learn.push(chapters.learning[0].duracion);
        for (var m=0; m<chapters.learning[0].datos[0].length; m++){
            if((chapters.learning[0].datos[0][m].estado).toLowerCase() == "completado"){
                cantidad_learn++;
            }
            suma_tiempo_learn = suma_tiempo_learn + chapters.learning[0].datos[0][m].tiempo_juego;
            suma_intentos_learn = suma_intentos_learn + chapters.learning[0].datos[0][m].num_play;
        }
        //conclusiones para el tiempo de visualizacion de la historia
        var ptl = Math.round(suma_tiempo_learn / cantidad_learn);
        if(ptl > chapters.learning[0].duracion+5){
          var conclusion = ptl+" segundos, el cual es mayor al de la duración real, lo que quiere decir que a los niños les cuesta un poco mas su entendimiento";
        } else if(ptl < chapters.learning[0].duracion+5){
          var conclusion = ptl+" segundos, el cual es menor al de la duración real, lo que quiere decir que a los niños no les llama la atencion esta historia o los aburre";
        } else {
          var conclusion = ptl+" segundos, el cual es igual o aproximado a la duración real, por lo tanto la historia es entendible e interesante para los niños";
        }
        promedio_tiempo_learn.push({conclusion:conclusion});

        //conclusiones para la cantidad de intentos 
        var pil = (suma_intentos_learn / cantidad_learn).toFixed(2);
        if(pil > 1.5){
          var conclusion = pil+" por lo tanto los niños generalmente repiten la historia para poder entenderla";
        } else {
          var conclusion = pil+" por lo tanto los niños entienden la historia en la primera visualización";
        }
        promedio_intentos_learn.push({conclusion:conclusion});

        //conclusiones para la cantidad de completados y abandonos
        var ccl = cantidad_learn;
        var cal = chapters.learning[0].datos[0].length - cantidad_learn;
        var porcl = Math.round((cal*100)/(ccl+cal));
        cantidad_completados_learn.push({cantidad:cantidad_learn}) ;
        cantidad_abandonado_learn.push({cantidad:cal});
        porcentaje_abandonado_learn.push({cantidad:porcl});
      }
      $scope.promTiempo = promedio_tiempo_learn;
      $scope.promIntentos = promedio_intentos_learn;
      $scope.completadoHistoria = cantidad_completados_learn;
      $scope.abandonoHistoria = cantidad_abandonado_learn;
      $scope.porcAbandonoHistoria = porcentaje_abandonado_learn;

      $scope.datosJuego = datos_juego;
      console.log($scope.datosJuego)

    });
  }

}]);



      
