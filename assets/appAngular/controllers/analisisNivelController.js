app.controller('analisisNivelController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
    var levels = [];
    var level_users = [];
    $scope.resultados = [];

    var intentos_ok = 0;
    var correctas_ok = 0;
    var incorrectas_ok = 0;
    var tiempo_juego_ok = 0;
    var cont_ok = 0;

    TodoService.getLevels().then(function(response) {
        levels = response;
        TodoService.getLevelUser().then(function(response) {
            level_users = response;
            for(var i = 0; i < levels.length; i++){
                for(var j = 0; j < level_users.length; j++){
                    if (levels[i].id == level_users[j].id_nivel && (level_users[j].estado).toLowerCase() == "completado") {
                        intentos_ok = intentos_ok + level_users[j].intentos;
                        correctas_ok = correctas_ok + level_users[j].correctas;
                        incorrectas_ok = incorrectas_ok + level_users[j].incorrectas;
                        tiempo_juego_ok = tiempo_juego_ok + level_users[j].tiempo_juego;
                        cont_ok++;
                    }
                }
                intentos_ok = intentos_ok / cont_ok;
                correctas_ok = correctas_ok / cont_ok;
                incorrectas_ok = incorrectas_ok / cont_ok;
                tiempo_juego_ok = tiempo_juego_ok / cont_ok;

                $scope.resultados.push({
                    id: (i + 1),
                    nombre: levels[i].nombre,
                    resultado: EfectividadMeta(correctas_ok, incorrectas_ok).toFixed(2),
                });
            }
        });
        
    });

    function EfectividadMeta(correctas, incorrectas){ //relacion del total de respuestas correctas vs el total de intentos
        if ((correctas + incorrectas) == 0) return 0;
        return (correctas / (correctas + incorrectas));
    }
}]);