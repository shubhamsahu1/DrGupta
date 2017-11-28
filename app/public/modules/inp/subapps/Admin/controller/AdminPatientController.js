'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('AdminPatientController', ['drgFactory',function (drgFactory) {
		var self = this;
		var _ProceedToViewPatient = function() {
		      console.log("_ProceedToViewPatient");
		    };
	    var _ProceedToUpdatePatient = function() {
		      console.log("_ProceedToUpdatePatient");
		    };
		    
	    var _ProceedToDeletePatient = function() {
		      console.log("_ProceedToUpdatePatient");
		    };
		    self.header = "Patient";
		    self.secondryHeader = "Here is you can Manage Patient information";
		    self.thumbNailData = [{
		      header: "View a Patient",
		      pargraph: "Here you can View Patient Data",
		      buttons: [{
		        buttonText: "Proceed",
		        type: "button",
		        clicked: _ProceedToViewPatient,
		        additionalCLass: {
		          "btn-primary": true
		        }
		      }]
		    }, {
		      header: "Update a Patient",
		      pargraph: "Here you can Update Patient Data",
		      buttons: [{
		        buttonText: "Proceed",
		        type: "button",
		        clicked: _ProceedToUpdatePatient,
		        additionalCLass: {
		          "btn-primary": true
		        }
		      }]
		    },{
		        header: "Delete a Patient",
		        pargraph: "Here you can Delete Patient Data",
		        buttons: [{
		          buttonText: "Proceed",
		          type: "button",
		          clicked: _ProceedToUpdatePatient,
		          additionalCLass: {
		            "btn-primary": true
		          }
		        }]
		      }];
		
		}]);

});
