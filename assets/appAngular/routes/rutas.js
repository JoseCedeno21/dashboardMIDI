'use strict';

var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);
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
    otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);