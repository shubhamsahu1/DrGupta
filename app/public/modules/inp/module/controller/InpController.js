'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('InpController', ['$scope','drgFactory','drgHTTPService',function ($scope,drgFactory,drgHTTPService) {
		  // Do something with myService
		var self =this;
		self.loginSuccess = false;
		 $scope.$on("Login:LoginSuccess", function (evt, data) {
		       self.userName = data.userName;
		       self.loginSuccess = true;
		    });
		self.logOut = function() {
			drgHTTPService.callAjax('POST','/logout').then(function(response) {
				drgFactory.routeFactory.goToState('inp.login.Signin');
				self.userName = "";
				self.loginSuccess = false;
			},function(response){
				drgFactory.routeFactory.goToState('inp.login.Signin');
				self.userName = "";
				self.loginSuccess = false;
			})
		}
		}]);
	
});