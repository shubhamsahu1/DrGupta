'use strict';

define(['angular'], function(angular) {
  var app = angular.module('drg.inp');
  app.register.controller('AdminReportController', ['drgFactory', function(drgFactory) {
    var self = this;
    var _ProceedToCurrentDayReport = function() {
      console.log("_ProceedToCurrentDayReport");

    }
    var _ProceedToSpacificDayReport = function() {
        console.log("_ProceedToSpacificDayReport");

      }
    var _ProceedToMonthReport = function() {
        console.log("_ProceedToMonthReport");

      }
      var _ProceedToUnpaid = function() {
          console.log("_ProceedToUnpaid");

        }
    self.header = "Report";
    self.secondryHeader = "Here is your Daily transaction";
    self.thumbNailData = [{
      header: "Current day transaction",
      pargraph: "Here you can see your todays Transaction",
      buttons: [{
        buttonText: "Proceed",
        type: "button",
        clicked: _ProceedToCurrentDayReport,
        additionalCLass: {
          "btn-primary": true
        }
      }]
    }, {
      header: "spacific day transaction",
      pargraph: "Here you can see your todays of last 30 days",
      buttons: [{
        buttonText: "Proceed",
        type: "button",
        clicked: _ProceedToSpacificDayReport,
        additionalCLass: {
          "btn-primary": true
        }
      }]
    },{
        header: "Month wise transaction",
        pargraph: "Here you can see your Month transaction",
        buttons: [{
          buttonText: "Proceed",
          type: "button",
          clicked: _ProceedToMonthReport,
          additionalCLass: {
            "btn-primary": true
          }
        }]
      },
      {
          header: "unpaid transaction",
          pargraph: "Here you can see transactions which are not submited",
          buttons: [{
            buttonText: "Proceed",
            type: "button",
            clicked: _ProceedToUnpaid,
            additionalCLass: {
              "btn-primary": true
            }
          }]
        }];
  }]);

});