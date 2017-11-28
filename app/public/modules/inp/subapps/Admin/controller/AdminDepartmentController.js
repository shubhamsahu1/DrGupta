'use strict';

define(['angular'], function(angular) {
  var app = angular.module('drg.inp');
  app.register.controller('AdminDepartmentController', ['drgFactory','drgHTTPService', function(drgFactory,drgHTTPService) {
    var self = this;
    self.header = "Manage Department";
    self.secondryHeader = "Here is you Departments";
    self.oneAtATime = true;
    self.deleteDepartment = function(arg) {
      console.log("_deleteDepartment" + "  " + arg);
    }
    self.editDepartment = function(arg) {
    	 for (var i = 0; i < self.depts.length; i++) {
 			if(self.depts[i].deptID==arg)
 				{
 				self.depts[i].edit = !self.depts[i].edit;
 				}
 		}
    	
    }
    self.updateDept = function() {
   	 drgHTTPService.callAjax('GET','/getDept').then(function(response) {
   	    	self.depts = response;
   	    	for (var i = 0; i < self.depts.length; i++) {
   		    	self.depts[i].deptTxtName = angular.copy(self.deptTxtName);
   		    	self.depts[i].deptTxtID = angular.copy(self.deptTxtID);
   		    	self.depts[i].deptTxtName.value = self.depts[i].deptName;
   		    	self.depts[i].deptTxtID.value = self.depts[i].deptID;
   		    	self.depts[i].edit = false;
   	   		 }
   		},function(response){
   			self.depts=[];
   		})
	     
	};
    self.updateDept();
    self.editDoneDepartment = function(arg) {
   	 for (var i = 0; i < self.depts.length; i++) {
			if(self.depts[i].deptID==arg)
				{
				self.depts[i].edit = !self.depts[i].edit;
				var data = {};
				data.deptName =  self.depts[i].deptTxtName.value;
				data.deptID = self.depts[i].deptTxtID.value;
				if(self.depts[i]._id){
					data._id = self.depts[i]._id;
				}
				drgHTTPService.callAjax('POST','/addDept',data).then(function(response) {
					self.updateDept();
				},function(response){
					debugger;
				})
				
				}
		}
   };
    self.deleteDepartment = function(arg) {
    	for (var i = 0; i < self.depts.length; i++) {
			if(self.depts[i].deptID==arg)
				{
				
				var data = self.depts[i];
				debugger;
				drgHTTPService.callAjax('POST','/deleteDept',data).then(function(response) {
					self.updateDept();
				},function(response){
					debugger;
				})
				
				}
		}
      };
    self.delete = {
      buttonText: "Delete Department",
      type: "button",
      additionalCLass: {
        "btn-danger": true
      }
    };
    self.deptTxtName = {
    		textLable:"Department Name",
    		value:"",
			type:"text",
			placeholder:"Please Enter Department Name",

			additionalInputClass:{
				
			},
			errorRuleSet:{minLength:{
				rule:"4",
				message:"user name should be greter than 4 charector"},
				maxLength:{
					rule:"25",
					message:"user name should be less than 25 charector"},
				regex:{
					rule:/^[a-zA-Z0-9_ ]*$/,
					message:"Enter Valid Department Name"}
			}
	};
    self.deptTxtID = {
    		textLable:"Department ID",
    		value:"",
			type:"text",
			placeholder:"Please Enter Department ID",

			additionalInputClass:{
			},
			errorRuleSet:{minLength:{
				rule:"1",
				message:"user name should be greter than 1 charector"},
				maxLength:{
					rule:"4",
					message:"user name should be less than 4 charector"},
				regex:{
					rule:/^[a-zA-Z0-9_]*$/,
					message:"Enter Valid Department Name"}
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
    self.addDepartment = function() {
    	self.depts.push({
    		deptName: "New Department",
    	      deptID: "",
    	      deptTxtName : angular.copy(self.deptTxtName),
    	     deptTxtID : angular.copy(self.deptTxtID),
    	     edit : true,
    	     open:true	
    	})
	}
    self.addDept = {
      buttonText: " Add Department",
      type: "button",
      additionalCLass: {
    	"pull-right": true,
        "btn-link": true

      }
    };
    self.depts=[];
    
   
   
   
   
  }]);

});