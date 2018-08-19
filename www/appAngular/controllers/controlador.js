app.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {

  $scope.games = {};
  $scope.datos = {};
  $scope.cantidades = {};
  $scope.select = {};

  //funcion trim para quitar todos los espacios de un string
  String.prototype.trim = function() { 
    return this.replace(/^\s+|\s+$/g, ""); 
  };

  //$('#titulo_juego').hide();

  //se obtiene todos los juegos
  TodoService.getGames().then(function(response) {
    $scope.games = response;
    console.log("EN EL CONTROLADOR");
    console.log(response);
    //document.getElementById("game").options[0].selected = true;
    //$('select[name="game"]').selectedIndex = 1;
    //console.log('el sel')
    //console.log(sel)
    //sel.selectedIndex = "1";
    $scope.select.gameId = response[0].id;
    //$scope.select.gameId = 1;
    $scope.datosFunction();

  });



  //se obtiene todas las cantidades para la pagina principal
  TodoService.getCantidades().then(function(response){
    $scope.cantidades = response;
  });

  //se obtiene todos los datos de un juego especificado por id
  $scope.datosFunction = function(){
    //console.log(id);
    console.log($scope.select.gameId)
      TodoService.getDatos($scope.select.gameId).then(function(response) {
        $scope.datos = response;
        console.log("EN EL CONTROLADOR");
        console.log(response);
        var nombre_juego = $scope.datos.nombre;
        console.log(nombre_juego)
        $scope.añadirHtml();
        //if($('select[name="game"] options:selected').text() == ""){
        //    document.getElementById("game").selectedIndex = 1;
        //}
      });

  }
  //console.log($scope.select.gameId);
  

  //funcion para añadir los graficos a la pagina principal por medio de codigo html 
  $scope.añadirHtml = function(){
      var titulo = '<section class="dashboard-titulo">'+
        '<div class="container-fluid">'+
          '<div class="row" >'+
            '<div class="col-md-12 col-xl-12" id="titulo_juego">'+
              '<div style="text-align:center"><h1 class="">Juego: '+$scope.datos.nombre+'</h1></div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</section>'
      $('#titulo2').html(titulo);
      //document.getElementById('titulo_juego').setAttribute("hidden",false)
      //$('#titulo_juego').show();
      //$("#titulo_juego").append('<div style="text-align:center"><h1 class="">Juego: '+$scope.datos.nombre+'</h1></div>');
      $('#grafico').html('<div id="graficos"></div>')
      //var div = document.getElementById("graf_3");
      //if(div != null){
      //div.parentElement.removeChild(div);
      //}
      var nombre_capitulos = [];
      var promedio_tiempo_learn = [];
      var promedio_intentos_learn = [];
      var cantidad_completados_learn = [];
      var cantidad_abandonado_learn = [];
      var info_learn = [];
      for (var i=0; i< $scope.datos.chapters.length; i++){
        
        nombre_capitulos[i] = $scope.datos.chapters[i].nombre.trim();
        
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
                                        '<canvas id="correctas'+i+'" width="350" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-4 col-md-6">'+
                                '<div class="card project-progress">'+
                                    '<p> Tiempo promedio en segundos para completar los niveles.</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="tiempo'+i+'" width="350" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-4 col-md-12 ">'+
                                '<div class="card project-progress">'+
                                    '<p> Cantidad promedio por niveles completados y abandonados</p>'+
                                    '<div class="pie-chart">'+
                                        '<canvas id="completos'+i+'" width="350" height="300"></canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';

        $('#graf_'+i+'').html(datos);
        var nombre_niveles = [];
        var promedio_correctas = [];
        var promedio_incorrectas = [];
        var promedio_tiempo = [];
        var cantidad_completados = [];
        var cantidad_abandonado = [];

        

        var chapters = $scope.datos.chapters[i];
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

        var datos_learn = '<section class="dashboard-header section-padding">'+
                    '<div class="container-fluid" style="text-align:center">'+
                        '<div class="row d-flex align-items-md-stretch">'+
                            '<div class="col-lg-12 col-md-12">'+
                                '<h2 class="display h4"> </h2>'+
                            '</div>'+
                            '<div class="col-lg-2 col-md-6">'+
                                '<div class="card project-progress" id="tablaTiempos">'+
                                    '<p> Tabla de duraciones de animaciones por capitulo.</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-5 col-md-6">'+
                                '<div class="card project-progress">'+    
                                    '<p> Tiempo promedio en que se ha visualizado la historia.</p>'+
                                    '<div class="pie-chart2">'+
                                        '<canvas id="tiempos_learn" width="450" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-5 col-md-6">'+
                                '<div class="card project-progress">'+
                                    '<p> Cantidad promedio de historia visualizada completamente.</p>'+
                                    '<div class="pie-chart2">'+
                                        '<canvas id="completos_learn" width="450" height="300"> </canvas>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';



        $('#graficos_learn').html(datos_learn);
        //grafico de completos
        var completos = $('#completos'+i)
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
                        stacked: true,

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
      }

      //tabla
      console.log("EL INFO LEARN")
      console.log(info_learn);
      var criterios = ["Fecha Inicio", "Fecha_Fin", "Intentos", "Completado"];

        var divTabla = document.getElementById('tablaTiempos');
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

      //grafico de tiempos historia
        var tiempo = $('#tiempos_learn')
        var myBarChart = new Chart(tiempo, {
            type: 'bar',
            data: {
                labels: nombre_capitulos,
                datasets: [
                    {
                        label: "tiempo",
                        data: promedio_tiempo_learn,
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

        //grafico de completos learn
        var completos = $('#completos_learn')
        var myBarChart = new Chart(completos, {
            type: 'bar',
            data: {
                labels: nombre_capitulos,
                datasets: [
                    {
                        label: "Completos",
                        data: cantidad_completados_learn,
                        backgroundColor: "rgba(75,192,192,1)" },
                    {
                        label: "Abandonos",
                        data: cantidad_abandonado_learn,
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
        

    }





  var brandPrimary = '#33b35a';

}]);
    /*
    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var LINECHART = $('#lineCahrt');
    var myLineChart = new Chart(LINECHART, {
        type: 'line',
        options: {
            legend: {
                display: false
            }
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(77, 193, 75, 0.4)",
                    borderColor: brandPrimary,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: brandPrimary,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: brandPrimary,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 0,
                    data: [50, 20, 60, 31, 52, 22, 40],
                    spanGaps: false
                },
                {
                    label: "My First dataset",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 30, 81, 46, 55, 30],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Pie Chart
    // ------------------------------------------------------ //
    var PIECHART = $('#pieChart');
    var myPieChart = new Chart(PIECHART, {
        type: 'doughnut',
        data: {
            labels: [
                "First",
                "Second",
                "Third"
            ],
            datasets: [
                {
                    data: [300, 50, 100],
                    borderWidth: [1, 1, 1],
                    backgroundColor: [
                        brandPrimary,
                        "rgba(75,192,192,1)",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        brandPrimary,
                        "rgba(75,192,192,1)",
                        "#FFCE56"
                    ]
                }]
        }
    });*/