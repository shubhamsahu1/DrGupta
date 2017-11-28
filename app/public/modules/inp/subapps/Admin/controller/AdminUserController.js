'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');

	app.register.controller('AdminUserController', ['drgFactory','$uibModal','drgHTTPService',function (drgFactory,$uibModal,drgHTTPService,modalInstanceCtrl) {
		var self = this;
		 self.header = "Manage User";
		    self.secondryHeader = "Here is you Users";
		    self.oneAtATime = true;
		    self.ProceedToDeleteUser = function(arg) {
		    	 drgHTTPService.callAjax('POST','/deleteUser',{"_id":arg}).then(function(response) {
		    		 self.getUsers();
					  self.info = {
								 show : true,
								additionalClass:"alert-danger",
								 msg:response.msg
			 			}
			 		},function(response){
			 			self.info = {
								 show : true,
								 class:"alert-danger",
								 msg:response.error
						 }
			 		});
			}
		    var _addUser = function() {
		    	drgFactory.routeFactory.goToState('inp.admin.AddUser');
			}
		    self.delete={
			        buttonText: "Delete User",
			        type: "button",
			       additionalCLass: {
			          "btn-danger": true
			        }};
		    self.addUser = {
		    		 buttonText: " Add User",
				        type: "button",
				        clicked: _addUser,
				        additionalCLass: {
				        	
				         "pull-right":true,	
				          "btn-link": true
				          
				        }};
		    self.Users = [];
		    self.getUsers = function() {
				
					 
					 drgHTTPService.callAjax('POST','/getUser',{}).then(function(response) {
						  if(response.length>0){
				 			self.Users = response;
				 		 }else{
				 			self.info = {
									 show : true,
									additionalClass:"alert-danger",
									 msg:"Please add user First"
				 			}
				 		 }
				 	    	
				 	    	
				 		},function(response){
				 			self.info = {
									 show : true,
									 class:"alert-danger",
									 msg:response.error
							 }
				 		});
				
			}
		    self.getUsers();
		}]);
	

});
