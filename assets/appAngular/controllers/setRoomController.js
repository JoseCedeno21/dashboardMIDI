app.controller('setRoomController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
    $scope.rooms = [];
    $scope.room_actual;
    var idRoomActual = 0;

    //se obtiene todos los room
    TodoService.getRoom().then(function(response) {
        $scope.rooms = response;
        $scope.rooms.forEach(function(element) {
            console.log(element);
            if (element.nombre == "Activo") {$scope.room_actual = element;}
        });
    });

    $scope.activateRoom = function(){
        var estado;
        idRoomActual = $scope.select.roomId;
        TodoService.getRoomById(idRoomActual).then(function(response) {
            $scope.room_actual = response;
        });
        nameRoomActual = $scope.select.roomId;
        //await Room.update({id:idRoomActual}).set({estado:Activo});
        
        $scope.rooms.forEach(function(element) {
            console.log(element);
            if(element.id == idRoomActual) estado = "Activo";
            else estado = "Inactivo";
            //await Room.update({id:room.id}).set({estado:Inactivo});
            var arr = { idRoom: element.id, estado: estado, tipo:"room" };
            $.ajax({
                async: true,
                //url: 'http://localhost:1337/api/v1/entrance/AlmacenarDatosController',
                url: 'http://hidden-wildwood-12729.herokuapp.com/api/v1/entrance/AlmacenarDatosController',
                type: 'POST',
                data: JSON.stringify(arr),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(msg) {
                    alert(msg);
                }
            });
        });

        TodoService.getRoom().then(function(response) {
            $scope.rooms = response;
        });
    }
    
}]);