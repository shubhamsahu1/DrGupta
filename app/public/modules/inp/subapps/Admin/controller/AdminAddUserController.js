'use strict';

define(['angular'], function(angular) {
  var app = angular.module('drg.inp');
  app.register.controller('AdminAddUserController', ['drgFactory','drgHTTPService', function(drgFactory,drgHTTPService) {
    var self = this;
    self.header = "Add a User";
    self.secondryHeader = "Here is you can Add user who can manage information";
    self.userName = {
      textLable: "User Name",
      value: "",
      type: "text",
      placeholder: "Please Enter User Name",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "6",
          message: "user name should be greter than 6 charector"
        },
        maxLength: {
          rule: "16",
          message: "user name should be less than 16 charector"
        },
        regex: {
          rule: /^[a-zA-Z0-9_ ]*$/,
          message: "Enter Valid User ID"
        }
      }
    };
    self.answar = {
      textLable: "Answar",
      value: "",
      type: "text",
      placeholder: "Please Enter Answar",
      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "6",
          message: "Answar should be greter than 6 charector"
        },
        maxLength: {
          rule: "16",
          message: "Answar should be less than 16 charector"
        },
        regex: {
          rule: /^[a-zA-Z0-9_ ]*$/,
          message: "Enter Valid Answar"
        }
      }
    };
    self.selectOption = {
      additionalCLass: {
        "form-control": true,
        "input-lg": true
      },
      value: "-1",
      textLabel: "Please Set Security Question",
      options: [{
        value: "Select a question",
        key: "-1"
      }, {
        value: "What is your Mother's Maiden Name?",
        key: "1"
      }, {
        value: "What was the name of your First Car?",
        key: "2"
      }, {
        value: "What is your mother's DOB?",
        key: "3"
      }]
    };
    self.selectRole = {
    	      additionalCLass: {
    	        "form-control": true,
    	        "input-lg": true
    	      },
    	      value: "-1",
    	      textLabel: "Set Role of user",
    	      options: [{
    	        value: "Select a Role",
    	        key: "-1"
    	      }, {
    	        value: "Counter",
    	        key: "counter"
    	      }, {
    	        value: "Computer Oprator",
    	        key: "compOpt"
    	      }, {
    	        value: "Department",
    	        key: "dept"
    	      }]
    	    };
    
    self.selectDept = {
  	      additionalCLass: {
  	        "form-control": true,
  	        "input-lg": true
  	      },
  	      value: "-1",
  	      textLabel: "Department",
  	      options: [{
  	        value: "Select a Department",
  	        key: "-1"
  	      }]
  	    };
    self.showDepartment = false;
self.roleDropChange = function() {
		if (self.selectRole.value == "dept") {
			 self.showDepartment = true;
			 self.selectDept.options= [{
		  	        value: "Select a Department",
		  	        key: "-1"
		  	      }];
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
		 		});
		}else{
			self.showDepartment = false;
		}
	}
   
    
    
    self.emailID = {
      textLable: "Email ID",
      value: "",
      type: "email",
      placeholder: "Please Enter Email ID",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        regex: {
          rule: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter Valid Email ID"
        }
      }
    };
    self.mobile = {
      textLable: "Mobile Number",
      value: "",
      type: "text",
      placeholder: "Please Enter Mobile Number",

      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        regex: {
          rule: /^(\+91-|\+91|0)?\d{10}$/,
          message: "Enter Valid Mobile number"
        }
      }
    };
    self.password = {
      textLable: "Password",
      value: "",
      type: "password",
      placeholder: "Please Enter Password",
      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "6",
          message: "Password should be greter than 6 charector"
        },
        maxLength: {
          rule: "16",
          message: "Password should be less than 16 charector"
        },
        regex: {
          rule: /^[a-zA-Z0-9_]*$/,
          message: "Enter Valid password"
        }
      }
    };
    self.ConfPassword = {
      textLable: "Confirm Password",
      value: "",
      type: "password",
      placeholder: "Please Re Enter Password",
      additionalInputClass: {
        "input-lg": true
      },
      errorRuleSet: {
        minLength: {
          rule: "6",
          message: "Password should be greter than 6 charector"
        },
        maxLength: {
          rule: "16",
          message: "Password should be less than 16 charector"
        },
        regex: {
          rule: /^[a-zA-Z0-9_]*$/,
          message: "Enter Valid password"
        }
      }
    };
    self.resetField = function() {
    	 self.userName.value = "";
    	 self.emailID.value = "";
    	 self.mobile.value = "";
    	 self.password.value = "";
    	 self.selectOption.value = "-1";
    	 self.answar.value = "";
    	 self.selectRole.value = "-1";
	}
    self.submitFun = function() {
      console.log("submit");
      if(self.password.value == self.ConfPassword.value){
    	 var data = {}
    	 data.userName = self.userName.value
    	 data.userEmail = self.emailID.value
    	 data.userMobile = self.mobile.value
    	 data.userPass = self.password.value
    	 data.userQus = self.selectOption.value
    	 data.userAns = self.answar.value
    	 self.showDepartment = false;
    	 if (self.selectRole.value == "dept") {
    		 data.userRole = "dept";
    		 data.userDept = self.selectDept.value;
		}else{
			data.userRole = self.selectRole.value;
		}
    	
    	 drgHTTPService.callAjax('POST','/addUser',data).then(function(response) {
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
    		});
      }else{
    	  self.info = {
					 show : true,
					 additionalClass:"alert-danger",
					 msg:"Both Password should be equal"
			 }
      }
      
      //drgFactory.routeFactory.goToState('inp.admin.User');
    }
    self.Submit = {
      buttonText: "Submit",
      type: "button",
      additionalCLass: {
        "btn-lg": true,
        "btn-success": true,
        "btn-block": true
      }
    };
  }]);

});