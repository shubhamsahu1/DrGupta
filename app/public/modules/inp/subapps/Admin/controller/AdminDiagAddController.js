'use strict';

define(['angular'], function(angular) {
  var app = angular.module('drg.inp');
  app.register.controller('AdminDiagAddController', ['drgFactory','drgHTTPService', function(drgFactory,drgHTTPService) {
    var self = this;
    self.header = "Add a Diagnosis";
    self.secondryHeader = "Here is you can Add Diagnosis";
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
 
      	 drgHTTPService.callAjax('GET','/getDept').then(function(response) {
      		 if(response.length>0){
      			self.depts = response;
      	    	for(var i = 0, size = response.length; i < size ; i++){
      	    		self.selectDept.options.push({
      	    			value:response[i].deptName,
      	    			key:response[i].deptID
      	    		});
      	    	   } 
      		 }else{
      			self.info = {
   					 show : true,
   					additionalClass:"alert-danger",
   					 msg:"Please add Department First"
      			}
      		 }
      	    	
      	    	
      		},function(response){
      			self.info = {
   					 show : true,
   					 class:"alert-danger",
   					 msg:response.error
   			 }
      		})
   	
   	
    
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
          message: "Insentive should be less than 2 charector"
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
          message: "Insentive should be less than 6 charector"
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
          message: "Insentive should be less than 5 charector"
        },
        regex: {
          rule: /^[0-9]*$/,
          message: "Enter Valid Insentive"
        }
      }
    };
    self.info = {
    		show : false,
    		additionalClass:"",
			 msg:""	
    };
    self.resetField = function() {
    	self.patientRate.value="";
    	self.insentiveLimited.value="";
    	self.Limit.value="";
    	self.insentiveNormal.value="";
    	self.insentiveStaf.value="";
    	self.FinalDiagName="";
    	self.selectDept.value="-1";
    	self.diagTxtName.value="";
	}
    self.Submit = function() {
    	var self = this;
    	var data = {};
    	data.patientRate = this.patientRate.value;
    	data.insDocLimited = this.insentiveLimited.value
    	data.setLimit = this.Limit.value;
    	data.insDoctor = this.insentiveNormal.value;
    	data.insStaf = this.insentiveStaf.value
    	data.diagName = this.FinalDiagName;
    	data.deptID = this.selectDept.value
    	 drgHTTPService.callAjax('POST','/addDiag',data).then(function(response) {
    		 if(response.code == "200"){
    			 self.info = {
    					 show : true,
    					 additionalClass:"alert-success",
    					 msg:response.msg
    			 }
    			 self.resetField();
    		 }
   	    },function(response){
	   	     self.info = {
					 show : true,
					 additionalClass:"alert-danger",
					 msg:response.error
			 }
   		})
    };
    self.Reset = function() {
    	self.resetField();
    };
    self.Back = function() {
    	console.log("_Back");
    	drgFactory.routeFactory.goToState('inp.admin.Diagnosis');
    };
    self.submit = {
      buttonText: "submit",
      type: "button",
      additionalCLass: {
        "btn-success": true,
        "btn-lg":true,
        "btn-block":true
      }
    };
    self.reset = {
      buttonText: "Reset",
      type: "button",
     additionalCLass: {
        "btn-link": true
      }
    };
    self.back = {
      buttonText: "Back",
      type: "button",
      additionalCLass: {
        "btn-link": true
      }
    };
    self.FinalDiagName = "";
    self.diagTxtChange = function() {
    	self.FinalDiagName = self.selectDept.value +"_"+ self.diagTxtName.value;
	}
    self.deptDropChange = function() {
    	 if (self.selectDept.value == -1) {
    	    	self.FinalDiagName = "";
    		} else {
    			 self.FinalDiagName = self.selectDept.value +"_"+ self.diagTxtName.value;
    		}
	}
  
   
  }]);

});