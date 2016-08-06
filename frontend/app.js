'use strict';

const angular = require('angular');
const angularRoute = require('angular-route');
const angularResource = require('angular-resource');
const app = angular.module('rps', [ 'ngRoute', 'ngResource' ]);
 
app.controller('application-controller', require('./application-controller'));
app.factory('socketService', require('./socket-service'));

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', { controller: 'application-controller', templateUrl: 'template/application', })
		.otherwise({ redirectTo: '/' });
}]);