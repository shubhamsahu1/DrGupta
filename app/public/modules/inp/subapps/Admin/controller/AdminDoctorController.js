'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('AdminDoctorController', ['drgFactory',function (drgFactory) {
		var self = this;
		var _ProceedToViewNUdateDoctor = function() {
			drgFactory.routeFactory.goToState('inp.admin.DocEUD');
		    };
	    var _ProceedToAddDoctor = function() {
	    		drgFactory.routeFactory.goToState('inp.admin.DocAdd');
		    };
		    
	    var _ProceedToDeleteDoctor = function() {
		      console.log("_ProceedToDeleteDoctor");
		    };
		    self.header = "Doctors";
		    self.secondryHeader = "Here is you can Manage Doctors information";
		    self.thumbNailData = [{
			      header: "Add a Doctor",
			      pargraph: "Here you can Add Doctor",
			      buttons: [{
			        buttonText: "Proceed",
			        type: "button",
			        clicked: _ProceedToAddDoctor,
			        additionalCLass: {
			          "btn-primary": true
			        }
			      }]
			    },{
		      header: "View Update & Delete Doctor",
		      pargraph: "Here you can View and Update Doctors Data",
		      buttons: [{
		        buttonText: "Proceed",
		        type: "button",
		        clicked: _ProceedToViewNUdateDoctor,
		        additionalCLass: {
		          "btn-primary": true
		        }
		      }]
		    }];
		}]);

});
