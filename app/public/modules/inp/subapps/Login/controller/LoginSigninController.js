'use strict';

define(['angular'], function (angular) {
	var app = angular.module('drg.inp');
	app.register.controller('LoginSigninController', ['$scope',"drgFactory","drgHTTPService",function ($scope,drgFactory,drgHTTPService) {
		var self = this;
		self.content = {
				"LoginHeader":"Please Sign in"
		};
		
		var _signin = function() {
			var data = {};
			data.user = self.userName.value;
			data.pass =  self.password.value;
			data.role = self.selectRole.value;
			if (self.selectRole.value=='counter') {
				drgHTTPService.callAjax('POST','/Login',data).then(function(response) {
					drgFactory.routeFactory.goToState('inp.user');
					$scope.$emit("Login:LoginSuccess",response);
				},function(response){
					self.info = {
		   					 show : true,
		   					additionalClass:"alert-danger",
		   					 msg:response.error
		      			}
				})
			} else if(self.selectRole.value=='Admin'){
				drgHTTPService.callAjax('POST','/Login',data).then(function(response) {
					drgFactory.routeFactory.goToState('inp.admin');
					$scope.$emit("Login:LoginSuccess",response);
				},function(response){
					
				})
				
			} else if(self.selectRole.value=='ComOpt'){
				drgFactory.routeFactory.goToState('inp.comOpt');
			}
			
		}
		var _forgotPassword = function() {
			drgFactory.routeFactory.goToState('inp.login.ForgotPwd');
		}
		self.userName = {
				textLable:"User Name",
				value:"",
				type:"text",
				placeholder:"Please Enter User Name",

				additionalInputClass:{
					"input-lg":true
				},
				errorRuleSet:{minLength:{
					rule:"6",
					message:"user name should be greter than 6 charector"},
					maxLength:{
						rule:"16",
						message:"user name should be less than 16 charector"},
					regex:{
						rule:"^[a-zA-Z0-9_]*$",
						message:"Enter Valid User ID"}
				}
		};
		self.password = {
				textLable:"Password",
				value:"",
				type:"password",
				placeholder:"Please Enter Password",
				additionalInputClass:{
					"input-lg":true
				},
				errorRuleSet:{minLength:{
					rule:"6",
					message:"Password should be greter than 6 charector"},
					maxLength:{
						rule:"16",
						message:"Password should be less than 16 charector"},
					regex:{
						rule:"^[a-zA-Z0-9_]*$",
						message:"Enter Valid password"}
				}
		};
		self.selectRole = {
				additionalCLass : {
					"form-control" : true,
					"input-lg" : true
				},
				value:"counter",
				textLabel : "Please select Role",
				options : [
				             {value:"Counter",key:"counter"},
				             {value:"Admin",key:"Admin"},
				             {value:"Computer Operator",key:"ComOpt"}
				             ]
		};

		self.forgotPwd = {
				buttonText : "Forgot Password",
				type: "link",
				clicked : _forgotPassword,
				additionalCLass : {
					"btn-link" : true,
					"pull-right" : true
				}
		};
		self.loginButton = {
				buttonText : "Sign In",
				type: "button",
				clicked : _signin,
				additionalCLass : {
					"btn-lg" : true,
					"btn-success" : true,
					"btn-block" : true
				}
		};
		
	}]);

});
