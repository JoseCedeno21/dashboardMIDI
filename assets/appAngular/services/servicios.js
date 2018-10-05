app.service('TodoService', function($http, $q) {
  return {
    'getGames': function() {
      var defer = $q.defer();
      $http.get('/games').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getDatos': function(id) {
      var defer = $q.defer();
      $http.get('/datosGame/'+id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getDatosEscuela': function(juego,room,escuela) {
      var defer = $q.defer();
      $http.get('/datosGameEscuela/'+juego+'/'+room+'/'+escuela).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getCantidades': function() {
      var defer = $q.defer();
      $http.get('/cantidades').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getRoom': function() {
      var defer = $q.defer();
      $http.get('/rooms').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getEscuelas': function() {
      var defer = $q.defer();
      $http.get('/escuelas').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getRoomById': function(id) {
      var defer = $q.defer();
      $http.get('/room/' + id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getJugadores': function() {
      var defer = $q.defer();
      $http.get('/jugadores').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getJugadoresByRoom': function(idRoom) {
      var defer = $q.defer();
      $http.get('/jugadoresByRoom/'+idRoom).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getJugadoresByRoomEscuela': function(idGame,idRoom,idEscuela) {
      var defer = $q.defer();
      $http.get('/jugadoresByRoomEscuela/'+idGame+"/"+idRoom+"/"+idEscuela).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getGameByRoom': function(idRoom) {
      var defer = $q.defer();
      $http.get('/gameByRoom/'+idRoom).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getChaptersByGame': function(idGame) {
      var defer = $q.defer();
      $http.get('/chaptersByGame/'+idGame).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getNivelesByChapter': function(idChapter) {
      var defer = $q.defer();
      $http.get('/nivelesByChapter/'+idChapter).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getDatosByJugador': function(idJugador) {
      var defer = $q.defer();
      $http.get('/datosByJugador/'+idJugador).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevels': function() {
      var defer = $q.defer();
      $http.get('/niveles').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getNivelById': function(id) {
      var defer = $q.defer();
      $http.get('/nivel/'+id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getEscenariosByLevel': function(idlevel) {
      var defer = $q.defer();
      $http.get('/escenariosByLevel/' + idlevel).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevelUserByLevel': function(id) {
      var defer = $q.defer();
      $http.get('/leveluser/'+id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLearnUserByLevel': function(id) {
      var defer = $q.defer();
      $http.get('/learnuser/'+id).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getMetrics': function() {
      var defer = $q.defer();
      $http.get('/metrics').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevelUserByLevelUser': function(idLevel_idUser) {
      var defer = $q.defer();
      $http.get('/leveluserByUser/' + idLevel_idUser).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getUsersByRoom': function(idRoom) {
      var defer = $q.defer();
      $http.get('/usersByRoom/' + idRoom).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevelUser': function() {
      var defer = $q.defer();
      $http.get('/getLevelUser').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevelsByRoom': function(idRoom) {
      var defer = $q.defer();
      $http.get('/levelsByRoom/' + idRoom).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevelsByGame': function(idGame) {
      var defer = $q.defer();
      $http.get('/levelsByGame/' + idGame).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getLevelUserByEscenario': function(idEscenario) {
      var defer = $q.defer();
      $http.get('/levelUserByEscenario/' + idEscenario).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'getRoomByEscuela': function(idEscuela) {
      var defer = $q.defer();
      $http.get('/roomByEscuela/' + idEscuela).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    getEscuelaRoom: function() {
      var defer = $q.defer();
      $http.get('/escuelaRoom').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    getEscenarios: function() {
      var defer = $q.defer();
      $http.get('/escenarios').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    getEscenarioById: function(idEscenario) {
      var defer = $q.defer();
      $http.get('/escenario/' + idEscenario).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    getJuegosByEscenario: function(idEscenario) {
      var defer = $q.defer();
      $http.get('/juegosByEscenario/' + idEscenario).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    getJugadoresByEscenario: function(idEscenario) {
      var defer = $q.defer();
      $http.get('/jugadoresByEscenario/' + idEscenario).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    getJugadoresExceptAnEscenario: function(idEscenario) {
      var defer = $q.defer();
      $http.get('/jugadoresExceptAnEscenario/' + idEscenario).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
}});