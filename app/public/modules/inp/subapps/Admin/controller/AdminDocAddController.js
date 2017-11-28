'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('AdminDocAddController', ['drgFactory','drgHTTPService',function (drgFactory,drgHTTPService) {
		var self = this;
		  self.header = "Add a Doctor";
		    self.secondryHeader = "Here is you can Add New Doctor";
		    self.docName = {
		    	      textLable: "Doctor Name",
		    	      value: "Dr ",
		    	      type: "text",
		    	      placeholder: "Please Enter Doctor Name",

		    	      additionalInputClass: {
		    	        "input-lg": true
		    	      },
		    	      errorRuleSet: {
		    	        minLength: {
		    	          rule: "6",
		    	          message: "Doctor Name should be greter than 6 charector"
		    	        },
		    	        maxLength: {
		    	          rule: "25",
		    	          message: "Doctor Name should be less than 25 charector"
		    	        },
		    	        regex: {
		    	          rule: /^[a-zA-Z0-9 ]*$/,
		    	          message: "Enter Valid Doctor Name"
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
		    self.docAddress = {
		    	      textLable: "Doctor's Address",
		    	      value: "",
		    	      placeholder: "Please Enter Doctor's Address",

		    	      additionalInputClass: {
		    	        "input-lg": true
		    	      },
		    	      errorRuleSet: {
		    	        minLength: {
		    	          rule: "6",
		    	          message: "Address should be greter than 6 charector"
		    	        },
		    	        maxLength: {
		    	          rule: "100",
		    	          message: "Address should be less than 100 charector"
		    	        },
		    	        regex: {
		    	          rule: /^[a-zA-Z0-9_ \n]*$/,
		    	          message: "Enter Valid User ID"
		    	        }
		    	      }
		    	    };
		    self.docSpaciality = {
		    	      textLable: "Doctor Digree",
		    	      value: "",
		    	      type: "text",
		    	      placeholder: "Please Enter Spaciality",

		    	      additionalInputClass: {
		    	        "input-lg": true
		    	      },
		    	      errorRuleSet: {
		    	        minLength: {
		    	          rule: "3",
		    	          message: "Doctor Spaciality should be greter than 3 charector"
		    	        },
		    	        maxLength: {
		    	          rule: "25",
		    	          message: "Doctor Spaciality should be less than 25 charector"
		    	        },
		    	        regex: {
		    	          rule: /^[a-zA-Z0-9 ]*$/,
		    	          message: "Enter Valid User ID"
		    	        }
		    	      }
		    	    };
		    self.submitFun = function() {
		    	var self = this;
		        console.log("submit");
		        debugger;
		        var data = {};
		        data.docName = this.docName.value
		        data.docMob = this.mobile.value
		        data.docAddress = this.docAddress.value
		        data.docDigree = this.docSpaciality.value
		        drgHTTPService.callAjax('POST', '/addDoc', data).then(function(response) {
		        	debugger;
		            self.info = {
		              show: true,
		              additionalClass: "alert-success",
		              msg: response.msg
		            }
		            self.docName.value = "Dr ";
		            self.mobile.value = "";
		            self.docAddress.value = "";
		            self.docSpaciality.value = "";
		        }, function(response) {
		            self.info = {
		              show: true,
		              class: "alert-danger",
		              msg: response.error
		            }
		          })
		       // drgFactory.routeFactory.goToState('inp.admin.Doctor');
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
