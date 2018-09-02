app.controller('setRoomController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
    $scope.rooms = [];
    $scope.room_actual;
    $scope.roomsByEscuela = [];
    $scope.escuelas = [];
    $scope.response = [];
    $scope.escuelas_room = [];
    $scope.boton_activar;
    var idRoomActual = 0;
    var url = 'http://localhost:1337/api/v1/entrance/AlmacenarDatosController';
    //var url: 'http://hidden-wildwood-12729.herokuapp.com/api/v1/entrance/AlmacenarDatosController';

    //se obtiene todos los room
    TodoService.getRoom().then(function(response) {
        $scope.rooms = response;
    });

    TodoService.getEscuelas().then(function(response) {
        $scope.escuelas = response;
    });

    TodoService.getEscuelaRoom().then(function(response) {
        $scope.escuelas_room = response;
    });

    $scope.escuelaRoom = function(){
        TodoService.getRoomByEscuela($scope.select.escId).then(function(response) {
            $scope.roomsByEscuela = response;
        });
    }

    $scope.actualizarTabla = function(){
        
        TodoService.getEscuelaRoom().then(function(response) {
            $scope.response = [];
            $scope.escuelas_room = response;
            for(var i = 0; i < $scope.escuelas.length; i++){
                for(var j = 0; j < $scope.escuelas_room.length; j++){
                    if ($scope.escuelas[i].id == $scope.escuelas_room[j].id_escuela) {
                        $scope.response.push({
                            id: $scope.escuelas_room[j].id,
                            escuela_code: $scope.escuelas[i].nombre,
                            escuela_nombre: $scope.escuelas[i].descripcion,
                            room_id: $scope.escuelas_room[j].id_room,
                            room_code: "",
                            room_nombre: "",
                        });
                    }
                }
            }

            for(var i=0; i<$scope.response.length; i++){
                for(var j=0; j<$scope.rooms.length; j++){
                    if ($scope.response[i].room_id == $scope.rooms[j].id) {
                        $scope.response[i].room_code = $scope.rooms[j].nombre;
                        $scope.response[i].room_nombre = $scope.rooms[j].descripcion;
                    }
                }
            }
        });
    }

    $scope.activateRoom = function(){
        level_room_tmp = $scope.escuelas_room.filter(function(esc_room) {
            return (esc_room.id_escuela == $scope.select.escId && esc_room.id_room == $scope.select.roomId);
        });
        console.log(level_room_tmp);
        if (level_room_tmp.length == 0) {
            //$scope.boton_activar = "Activar";
            var arr = { tipo: "activar_room",idRoom: $scope.select.roomId, idEscuela: $scope.select.escId};
            $.ajax({
                async: true,
                url: url,
                type: 'POST',
                data: JSON.stringify(arr),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    alert(msg);
                }
            });
        } else {
            var arr = { tipo: "desactivar_room",idRoom: $scope.select.roomId, idEscuela: $scope.select.escId};
            $.ajax({
                async: true,
                url: url,
                type: 'POST',
                data: JSON.stringify(arr),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    alert(msg);
                }
            });
        }

        $scope.actualizarTabla();
    }
}]);