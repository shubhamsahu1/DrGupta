'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('UserController', ['drgFactory',function (drgFactory) {
		var self = this;
		drgFactory.routeFactory.goToState('inp.user.Home');
		self.leftNav={
				list:[
					{	
						  active:false,
						  value:"Report",
						  toState:"inp.user.Report"
					},{	
						  active:false,
						  value:"Patient",
						  toState:"inp.user.AddPatient"
					  },{	
						  active:false,
						  value:"Doctor",
						  toState:"inp.user.addDoctor"
					  }]
		};
		}]);
	
});