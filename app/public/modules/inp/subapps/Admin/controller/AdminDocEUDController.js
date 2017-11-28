'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('AdminDocEUDController', ['drgFactory','drgHTTPService',function (drgFactory,drgHTTPService) {
		var self = this;
		  self.header = "Add a Doctor";
		    self.secondryHeader = "Here is you can Add New Doctor";
		    self.DoctorsList = [];
		   self.oneAtATime = true;
		    self.docTxtName = {
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
		    self.docTxtMobile = {
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
		    self.docTxtAddress = {
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
		    self.docTxtDigree = {
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
		   
		    self.edit = {
		    	      buttonText: "Edit",
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
		    self.deletebtn = {
		    	      buttonText: "Delete",
		    	      type: "button",
		    	      additionalCLass: {
		    	        "btn-danger": true
		    	      }
		    	    };
		    self.editDepartment = function(id) {
		    	 for (var i = 0; i < self.DoctorsList.length; i++) {
		 			if(self.DoctorsList[i]._id==id)
		 				{
		 				self.DoctorsList[i].edit = !self.DoctorsList[i].edit;
		 				}
		 			}
		    	
		    };
		     self.editDoneDepartment = function(id) {
		    	 for (var i = 0; i < self.DoctorsList.length; i++) {
			 			if(self.DoctorsList[i]._id==id)
			 				{
			 				self.DoctorsList[i].edit = !self.DoctorsList[i].edit;
			 				var data = {};
			 				data._id = self.DoctorsList[i]._id;
			 				data.docName = self.DoctorsList[i].docTxtName.value;
			 				data.docMob = self.DoctorsList[i].docTxtMobile.value;
			 				data.docDigree = self.DoctorsList[i].docTxtDigree.value;
			 				data.docAddress = self.DoctorsList[i].docTxtAddress.value;
			 				drgHTTPService.callAjax('POST','/addDoc',data).then(function(response) {
			 					self.info = {
							              show: true,
							              additionalClass: "alert-success",
							              msg: response.msg
							            }
							},function(response){
								self.info = {
							              show: true,
							              additionalClass: "alert-danger",
							              msg: response.error
							            }
							})
			 				}
			 			}

						
						
		   };
		   self.deleteDoc = function(id) {
			   
						var data = {};
						data._id = id;
						debugger;
						drgHTTPService.callAjax('POST','/deleteDoc',data).then(function(response) {
							self.updateList();
						},function(response){
							debugger;
						})
						
					
		      };
		    self.updateList = function() {
		    	   drgHTTPService.callAjax('POST', '/getDoc',{}).then(function(response) {
		    		   self.DoctorsList = response;
		    		   for (var i = 0; i < self.DoctorsList.length; i++) {
		      		    	self.DoctorsList[i].docTxtName = angular.copy(self.docTxtName);
		      		    	self.DoctorsList[i].docTxtMobile = angular.copy(self.docTxtMobile);
		      		    	self.DoctorsList[i].docTxtDigree = angular.copy(self.docTxtDigree);
		      		    	self.DoctorsList[i].docTxtAddress = angular.copy(self.docTxtAddress);
		      		    	self.DoctorsList[i].docTxtName.value = self.DoctorsList[i].docName ;
		      		    	self.DoctorsList[i].docTxtMobile.value = self.DoctorsList[i].docMob ;
		      		    	self.DoctorsList[i].docTxtDigree.value = self.DoctorsList[i].docDigree ;
		      		    	self.DoctorsList[i].docTxtAddress.value = self.DoctorsList[i].docAddress ;
		      		    	self.DoctorsList[i].edit = false;
		      		    	
		      	   		 }
			        }, function(response) {
			            self.info = {
			              show: true,
			              additionalClass: "alert-danger",
			              msg: response.error
			            }
			          })
			};
			 self.updateList();
		}]);

});
