'use strict';

var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'datatables']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: '/appAngular/views/general.html',
      controller: 'TodoCtrl'
    }).
    when('/especifico', {
      templateUrl: '/appAngular/views/especifico.html',
      controller: 'EspecificoController'
    }).
    when('/tablaPosiciones', {
      templateUrl: '/appAngular/views/tablaPosiciones.html',
      controller: 'TablaController'
    }).
    when('/comparaciones', {
      templateUrl: '/appAngular/views/comparaciones.html',
      controller: 'comparacionesController'
    }).
    when('/reporteJuegos', {
      templateUrl: '/appAngular/views/reporteJuegos.html',
      controller: 'reporteGameController'
    }).
    when('/reporteNiños', {
      templateUrl: '/appAngular/views/reporteNiños.html',
      controller: 'reporteNiñoController'
    }).
    otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);