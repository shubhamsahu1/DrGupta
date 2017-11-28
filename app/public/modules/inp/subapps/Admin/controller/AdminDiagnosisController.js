'use strict';

define(['angular'], function(angular) {
  var app = angular.module('drg.inp');
  app.register.controller('AdminDiagnosisController', ['drgFactory', function(drgFactory) {
    var self = this;
    var _ProceedToViewNUdateDeleteDiagnosis = function() {
      console.log("_ProceedToViewNUdateDiagnosis");
      drgFactory.routeFactory.goToState('inp.admin.DiagViewUpdate');
    };
    var _ProceedToAddDiagnosis = function() {
      console.log("_ProceedToAddDiagnosis");
      drgFactory.routeFactory.goToState('inp.admin.DiagAdd');

    };

  
    self.header = "Diagnosis";
    self.secondryHeader = "Here is you can Manage Diagnosis information";
    self.thumbNailData = [{
      header: "Add a Diagnosis",
      pargraph: "Here you can Add Diagnosis",
      buttons: [{
        buttonText: "Proceed",
        type: "button",
        clicked: _ProceedToAddDiagnosis,
        additionalCLass: {
          "btn-primary": true
        }
      }]
    }, {
      header: "View, Update and Delete a Diagnosis",
      pargraph: "Here you can View and Update Diagnosis Data",
      buttons: [{
        buttonText: "Proceed",
        type: "button",
        clicked: _ProceedToViewNUdateDeleteDiagnosis,
        additionalCLass: {
          "btn-primary": true
        }
      }]
    }];
  }]);

});