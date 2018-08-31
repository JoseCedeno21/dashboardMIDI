app.controller('setRoomController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
    $scope.rooms = [];
    var idRoomActual = 0;

    //se obtiene todos los room
    TodoService.getRoom().then(function(response) {
        $scope.rooms = response;
    });

    $scope.activateRoom = function(){
        idRoomActual = $scope.select.roomId;
        await Room.update({id:idRoomActual}).set({estado:Activo});
        
        for each (var room in $scope.rooms) {
            if(room.id != idRoomActual)
                await Room.update({id:room.id}).set({estado:Inactivo});
        }
    }
    
}]);