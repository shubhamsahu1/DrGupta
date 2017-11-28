'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('AdminController', ['drgFactory',function (drgFactory) {
		var self = this;
		drgFactory.routeFactory.goToState('inp.admin.Home');
		self.leftNav={
				list:[
					{	
						  active:false,
						  value:"Report",
						  toState:"inp.admin.Report"
					},{	
						  active:false,
						  value:"Patient",
						  toState:"inp.admin.Patient"
					  },{	
						  active:false,
						  value:"Doctor",
						  toState:"inp.admin.Doctor"
					  },{	
						  active:false,
						  value:"Add User",
						  toState:"inp.admin.User"
					  },{	
						  active:false,
						  value:"Department",
						  toState:"inp.admin.Department"
					  },{	
						  active:false,
						  value:"Diagnosis",
						  toState:"inp.admin.Diagnosis"
					  }]
		};
		}]);

});
