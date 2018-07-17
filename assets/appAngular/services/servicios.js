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
    'getJugadoresByRoom': function(idRoom) {
      var defer = $q.defer();
      $http.get('/jugadoresByRoom/'+idRoom).success(function(resp){
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
    }
}});