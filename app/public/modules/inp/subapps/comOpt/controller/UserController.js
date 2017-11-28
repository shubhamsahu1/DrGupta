'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('LoginController', ['drgFactory',function (drgFactory) {
		var self = this;
		drgFactory.routeFactory.goToState('inp.login.Signin');		
		}]);
	
});