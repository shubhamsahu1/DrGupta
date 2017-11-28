'use strict';

define(['angular'], function(angular) {
  var app = angular.module('drg.inp');
  app.register.controller('AdminDiagViewUpdateController', ['drgFactory', 'drgHTTPService', function(drgFactory, drgHTTPService) {
    var self = this;
    self.header = "Manage Diagnosis";
    self.secondryHeader = "Here is you can Manage Diagnosis";
    self.selectedDiag = {
      "diagName": "",
      "deptID": "",
      "patientRate": "",
      "insDocLimited": "",
      "setLimit": "",
      "insDoctor": "",
      "insStaf": "",
    };
    self.info = {
            show: false,
            additionalClass: "alert-success",
            msg: ""
          }
    self.diagDropChange = function() {
    	self.info.show = false;
    	 self.edited = false;
      console.log("diag Drop Change");
      self.selectedDiag = {
        "diagName": "",
        "deptID": "",
        "patientRate": "",
        "insDocLimited": "",
        "setLimit": "",
        "insDoctor": "",
        "insStaf": "",
      };
      for (var i = 0, size = self.DiagnosisData.length; i < size; i++) {
        if (self.selectDiag.value == self.DiagnosisData[i]._id) {
          self.selectedDiag = self.DiagnosisData[i]
        }
      }
     
    }
    self.selectDept = {
      additionalCLass: {
        "form-control": true,
        "input-lg": true
      },
      value: "-1",
      textLabel: "Select Department",
      options: [{
        value: "Please select Department",
        key: "-1"
      }]
    };
    drgHTTPService.callAjax('GET', '/getDept').then(function(response) {
      if (response.length > 0) {
        for (var i = 0, size = response.length; i < size; i++) {
          self.selectDept.options.push({
            value: response[i].deptName,
            key: response[i].deptID
          });
        }
      } else {
        self.info = {
          show: true,
          additionalClass: "alert-danger",
          msg: "Please add Department First"
        }
      }
    }, function(response) {
      self.info = {
        show: true,
        class: "alert-danger",
        msg: response.error
      }
    })
    self.selectDiag = {
      additionalCLass: {
        "form-control": true,
        "input-lg": true
      },
      value: "-1",
      textLabel: "Select Diagnosis",
      options: [{
        value: "Please select Diagnosis",
        key: "-1"
      }]
    };
    self.DiagnosisData = {};
    self.deptDropChange = function() {
    	self.info.show = false;
    	 self.edited = false;
      console.log("dept value :" + self.selectDept.value)
      self.selectedDiag = {
        "diagName": "",
        "deptID": "",
        "patientRate": "",
        "insDocLimited": "",
        "setLimit": "",
        "insDoctor": "",
        "insStaf": "",
      };
      self.selectDiag.options = [{
        value: "Please select Diagnosis",
        key: "-1"
      }];
      self.selectDiag.value = "-1";
      drgHTTPService.callAjax('POST', '/getDiag', {
        deptID: self.selectDept.value
      }).then(function(response) {
        if (response.length > 0) {
          self.DiagnosisData = response;
          for (var i = 0, size = response.length; i < size; i++) {
            self.selectDiag.options.push({
              value: response[i].diagName,
              key: response[i]._id
            });
          }
        } else {
          self.info = {
            show: true,
            additionalClass: "alert-danger",
            msg: "No Diagnosis found, Please add Diagnosis "
          }

        }
      }, function(response) {
        self.info = {
          show: true,
          class: "alert-danger",
          msg: response.error
        }
      })
    }

    self.delete = {
      buttonText: "Delete Current Diagnosis",
      type: "button",
      additionalCLass: {
        "btn-danger": true,
        "btn-lg": true,
        "btn-block": true
      }
    };
    self.edit = {
      buttonText: "Edit Department",
      type: "button",
      additionalCLass: {
        "btn-link": true
      }
    };
    self.editDone = {
      buttonText: "Done",
      type: "button",
      additionalCLass: {
        "btn-link": true
      }
    };
    self.edited = false;
    self.editDiag = function() {
      self.edited = true;
      self.diagTxtName.value = self.selectedDiag.diagName.split("_")[1];
      self.patientRate.value = self.selectedDiag.patientRate;
      self.insentiveLimited.value = self.selectedDiag.insDocLimited;
      self.Limit.value = self.selectedDiag.setLimit;
      self.insentiveNormal.value = self.selectedDiag.insDoctor;
      self.insentiveStaf.value = self.selectedDiag.insStaf;
    };
    self.editDoneDiag = function() {
      self.edited = false;
      self.selectedDiag.diagName = self.selectedDiag.deptID +"_"+ self.diagTxtName.value;
       self.selectedDiag.patientRate = self.patientRate.value;
      self.selectedDiag.insDocLimited = self.insentiveLimited.value;
      self.selectedDiag.setLimit = self.Limit.value
      self.selectedDiag.insDoctor = self.insentiveNormal.value;
      self.selectedDiag.insStaf = self.insentiveStaf.value;
      drgHTTPService.callAjax('POST', '/addDiag', self.selectedDiag).then(function(response) {
          self.info = {
            show: true,
            additionalClass: "alert-success",
            msg: response.msg
          }


        }, function(response) {
          self.info = {
            show: true,
            class: "alert-danger",
            msg: response.error
          }
        })
    };
    self.Delete = function() {

      drgHTTPService.callAjax('POST', '/deleteDiag', {
        diagID: self.selectedDiag._id
      }).then(function(response) {
        self.deptDropChange();
        self.info = {
          show: true,
          additionalClass: "alert-success",
          msg: response.msg
        }


      }, function(response) {
        self.info = {
          show: true,
          class: "alert-danger",
          msg: response.error
        }
      })
    };
    self.diagTxtName = {
      textLable: "Diagnosis Name",
      value: "",
      type: "text",
      placeholder: "Please Enter Diagnosis Name",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "4",
          message: "user name should be greter than 4 charector"
        },
        maxLength: {
          rule: "25",
          message: "user name should be less than 25 charector"
        },
        regex: {
          rule: /^[a-zA-Z0-9 ]*$/,
          message: "Enter Valid Diagnosis Name"
        }
      }
    };
    self.patientRate = {
      textLable: "Patient Rate",
      value: "",
      type: "text",
      placeholder: "Please Enter Patient Rate",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "1",
          message: "user name should be greter than 1 charector"
        },
        maxLength: {
          rule: "5",
          message: "user name should be less than 5 charector"
        },
        regex: {
          rule: /^[0-9]*$/,
          message: "Enter Valid Rate"
        }
      }
    };
    self.insentiveLimited = {
      textLable: "Insentive of Doctor to limited Number of Patiant",
      value: "",
      type: "text",
      placeholder: "Insentive of Doctor to limited Number of Patiant",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "1",
          message: "Insentive should be greter than 1 charector"
        },
        maxLength: {
          rule: "5",
          message: "Insentive should be less than 5 charector"
        },
        regex: {
          rule: /^[0-9]*$/,
          message: "Enter Valid Insentive"
        }
      }
    };

    self.Limit = {
      textLable: "Set Limit",
      value: "",
      type: "text",
      placeholder: "limited in Insentive for Number of Patiant",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "1",
          message: "Insentive should be greter than 1 charector"
        },
        maxLength: {
          rule: "1",
          message: "Insentive should be less than 5 charector"
        },
        regex: {
          rule: /^[0-9]*$/,
          message: "Enter Valid Insentive"
        }
      }
    };
    self.insentiveNormal = {
      textLable: "Insentive of Doctor",
      value: "",
      type: "text",
      placeholder: "Insentive of Doctor to more than limited Number of Patiant",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "1",
          message: "Insentive should be greter than 1 charector"
        },
        maxLength: {
          rule: "5",
          message: "Insentive should be less than 5 charector"
        },
        regex: {
          rule: /^[0-9]*$/,
          message: "Enter Valid Insentive"
        }
      }
    };
    self.insentiveStaf = {
      textLable: "Insentive of Staf",
      value: "",
      type: "text",
      placeholder: "Insentive of Staf",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "1",
          message: "Insentive should be greter than 1 charector"
        },
        maxLength: {
          rule: "5",
          message: "Insentive should be less than 3 charector"
        },
        regex: {
          rule: /^[0-9]*$/,
          message: "Enter Valid Insentive"
        }
      }
    };
  }]);

});