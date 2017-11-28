'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('LoginController', ['drgFactory','drgHTTPService',function (drgFactory,drgHTTPService) {
		var self = this;
		console.log("inp.login.Signin");
		drgHTTPService.callAjax('GET','/auth').then(function(response) {
			if(response.login == "Admin"){
				drgFactory.routeFactory.goToState('inp.admin');
			}else if(response.login == "counter"){
				drgFactory.routeFactory.goToState('inp.user');
			}else{
				drgFactory.routeFactory.goToState('inp.login.Signin');
			}
			
		},function(response){
			drgFactory.routeFactory.goToState('inp.login.Signin');
		})
				
		}]);
	
});