'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('UserAddPatientController', ['drgFactory','drgHTTPService',function (drgFactory,drgHTTPService) {
		var self = this;
		self.header = "Register";
	    self.secondryHeader = " new patient";
	    self.updateList = function() {
	    	   drgHTTPService.callAjax('POST', '/getDoc',{}).then(function(response) {
	    		   self.DoctorsList = response;
	    		   self.searchDoctor = response;
	    		}, function(response) {
		            self.info = {
		              show: true,
		              additionalClass: "alert-danger",
		              msg: response.error
		            };
		           
		          })
		};
	    self.patientName = {
	    	      textLable: "Patient Name",
	    	      value: "",
	    	      type: "text",
	    	      placeholder: "Please Enter Patient Name",

	    	      additionalInputClass: {
	    	        "input-lg": true
	    	      },
	    	      errorRuleSet: {
	    	        minLength: {
	    	          rule: "4",
	    	          message: "Name should be greter than 4 charector"
	    	        },
	    	        maxLength: {
	    	          rule: "25",
	    	          message: "Name should be less than 25 charector"
	    	        },
	    	        regex: {
	    	        	rule: /^[a-zA-Z ]*$/,
	    	          message: "Enter Valid Name"
	    	        }
	    	      }
	    	    };
	    self.patientAge = {
	    	      textLable: "Patient Age",
	    	      value: "",
	    	      type: "text",
	    	      placeholder: "",

	    	      additionalInputClass: {
	    	        "input-lg": true
	    	      },
	    	      errorRuleSet: {
	    	        minLength: {
	    	          rule: "1",
	    	          message: "Name should be greter than 0"
	    	        },
	    	        maxLength: {
	    	          rule: "2",
	    	          message: "Age should be less than 100"
	    	        },
	    	        regex: {
	    	        	rule: /^[0-9]*$/,
	    	          message: "Enter Valid Name"
	    	        }
	    	      }
	    	    };
	    self.selectSex = {
				additionalCLass : {
					"form-control" : true,
					"input-lg" : true
				},
				textLabel : "SEX",
				value: "M",
				options : [
					
					{value:"Male",key:"M"},
					{value:"Female",key:"F"}
				]
				};
	    self.searchDoctor = {
	    	      textLable: "Doctor Name",
	    	      value: "",
	    	      additionalInputClass: {
		    	        "input-lg": true
		    	      },
	    	      lists: [{"_id":"580369d30dbf2e900850f9aa","docName":"Dr A K Gupta","docMob":"9038001500","docAddress":"akbarpur","docDigree":"MBBS radiologist","date":"December 14th 2016, 11:50:37 pm"},{"_id":"5804b94950c6eba0218d2764","docName":"Dr Mukul","docMob":"9876543001","docAddress":"akbarpur","docDigree":"MBBS","date":"October 17th 2016, 5:13:05 pm"},{"_id":"5804bb9750c6eba0218d2766","docName":"Dr Sasikant","docMob":"6789054321","docAddress":"akbarpur","docDigree":"MBBS","date":"October 17th 2016, 5:22:55 pm"},{"_id":"5804bbdb50c6eba0218d2767","docName":"Dr R Yadav","docMob":"9876543990","docAddress":"tanda ambedkernagar","docDigree":"MBBS MS","date":"October 17th 2016, 5:24:03 pm"},{"_id":"5804bc0350c6eba0218d2768","docName":"Dr Major","docMob":"9878837288","docAddress":"tanda ambedkarnagar","docDigree":"MBBS","date":"December 12th 2016, 7:49:25 pm"},{"_id":"5804bc4a50c6eba0218d2769","docName":"Dr Belala","docMob":"7238723770","docAddress":"ilfatgang","docDigree":"BUMS","date":"October 17th 2016, 5:25:54 pm"}],
	    	      placeholder: "Please Enter Doctor Name",
	    	      LeftAddon:true
	    	      };
	    //self.updateList();
	    
		}]);
	
});